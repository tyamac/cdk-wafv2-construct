import {Construct} from 'constructs';
import * as wafv2 from 'aws-cdk-lib/aws-wafv2';
import * as logs from 'aws-cdk-lib/aws-logs';
import * as cdk from 'aws-cdk-lib';
import {
  WafConstructProps,
  AwsManagedRuleProps,
  IpSetProps,
  UserManagedRuleProps,
} from "./types";


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

  static userManagedRule(props: UserManagedRuleProps): wafv2.CfnWebACL.RuleProperty {
    return {
      priority: props.priority,
      name: props.ruleName,
      statement: props.statement,
      action: props.action ?? { allow: {} }, // デフォルトで許可ルールに設定
      overrideAction: props.overrideAction ?? { none: {} },
      visibilityConfig: WafConstruct.createVisibilityConfig(props.ruleName),
    };
  }
  /**
   * visibilityConfigを生成するヘルパー関数
   * @param metricName CloudWatchに登録するメトリック名
   * @param cloudWatchMetricsEnabled {boolean} [optional]
   * @param sampledRequestsEnabled {boolean} [optional]
   * @returns VisibilityConfigオブジェクト
   */
  static createVisibilityConfig (
    metricName: string,
    cloudWatchMetricsEnabled?: boolean,
    sampledRequestsEnabled?: boolean,
  ): wafv2.CfnWebACL.VisibilityConfigProperty {
    return {
      metricName,
      cloudWatchMetricsEnabled: cloudWatchMetricsEnabled ?? true,
      sampledRequestsEnabled: sampledRequestsEnabled ?? true,
    };
  }

}


/**
 * IpSetConstructはAWS WAFのIPセットを作成するためのCDK構築クラスです。
 * 
 * このクラスを使用して、特定のIPアドレスまたはIP範囲を指定し、
 * それに基づくフィルタリングルールをWAFで適用可能なIPセットリソースを作成します。
 *
 * 必要なプロパティについては{@link IpSetProps}を参照してください。
 * 
 * ### 使用例
 * ```typescript
 * const ipSet = new IpSetConstruct(this, 'MyIpSet', {
 *   name: 'MyIpSetName',
 *   scope: 'REGIONAL',
 *   ipAddressVersion: 'IPV4',
 *   addresses: [
 *     '203.0.113.0/24',
 *     '198.51.100.0/24',
 *   ],
 * });
 * ```
 */
export class IpSetConstruct extends Construct {
  readonly ipSet: wafv2.CfnIPSet;

  constructor(scope: Construct, id: string, props: IpSetProps) {
    super(scope, id);

    this.ipSet = new wafv2.CfnIPSet(this, 'IpSet', {
      scope: props.scope ?? 'REGIONAL',
      addresses: props.addresses ?? [],
      ipAddressVersion: props.ipAddressVersion ?? 'IPV4',
      name: props.name,
    });
  }



  public ipSetStatement(props?: wafv2.CfnWebACL.IPSetForwardedIPConfigurationProperty): wafv2.CfnWebACL.StatementProperty {
  // public ipSetStatement(props?: IpSetForwardedIPConfigurationProps): wafv2.CfnWebACL.StatementProperty {
    return {
      ipSetReferenceStatement: {
        arn: this.ipSet.attrArn,
        ipSetForwardedIpConfig: props,
      },
    }
  }
}

// const test: IpSetForwardedIPConfigurationProps = {
//   headerName: 'X-Forwarded-For',
//   fallbackBehavior: 'MATCH',
//   position: 'FIRST'
// }