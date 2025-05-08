import {Construct} from 'constructs';
import * as wafv2 from 'aws-cdk-lib/aws-wafv2';
import * as logs from 'aws-cdk-lib/aws-logs';
import * as cdk from 'aws-cdk-lib';
import { WafConstructProps, AwsManagedRuleProps } from "./types";


export class WafConstruct extends Construct {
  readonly webAcl: wafv2.CfnWebACL;

  constructor(scope: Construct, id: string, props: WafConstructProps) {
    super(scope, id);

    const aclName = props.webAcl.name ?? `${id}-WebACL`;

    this.webAcl = new wafv2.CfnWebACL(this, 'WebAcl', {
      name: aclName,
      scope: props.webAcl.scope,
      defaultAction: props.webAcl.defaultAction ?? { allow: {} },
      visibilityConfig: props.webAcl.visibilityConfig ?? {
        cloudWatchMetricsEnabled: true,
        metricName: `${id}-metrics`,
        sampledRequestsEnabled: true,
      },
      rules: props.webAcl.rules,
    });

    if (props.association) {
      new wafv2.CfnWebACLAssociation(this, 'WebAclAssociation', {
        resourceArn: props.association.resourceArn,
        webAclArn: this.webAcl.attrArn,
      });
    }

    const loggingEnabled = props.logging?.enabled !== false;
    if (loggingEnabled) {
      const logGroup = new logs.LogGroup(this, 'WafLogGroup', {
        logGroupName: props.logging?.logGroupName ?? `aws-waf-logs-${aclName}`,
        removalPolicy: cdk.RemovalPolicy.DESTROY,
        retention: logs.RetentionDays.ONE_WEEK,
      });

      new wafv2.CfnLoggingConfiguration(this, 'LoggingConfiguration', {
        resourceArn: this.webAcl.attrArn,
        logDestinationConfigs: [logGroup.logGroupArn],
      });
    }
  }


  static awsManagedRule(props: AwsManagedRuleProps): wafv2.CfnWebACL.RuleProperty {
    return {
      priority: props.priority,
      name: props.ruleName,
      statement: {
        managedRuleGroupStatement: {
          vendorName: 'AWS',
          name: props.ruleName,
          excludedRules: props.excludedRules ?? [],
          ...(props.scopeDownStatement && {
            scopeDownStatement: props.scopeDownStatement,
          }),
          ...(props.version && { version: props.version }),
        }
      },
      overrideAction: { none: {} },
      visibilityConfig: {
        cloudWatchMetricsEnabled: true,
        metricName: props.ruleName,
        sampledRequestsEnabled: true,
      },
    }
  }
}