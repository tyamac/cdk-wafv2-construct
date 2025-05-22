import {
  aws_wafv2 as wafv2,
  aws_logs as logs,
  CfnTag
} from "aws-cdk-lib";
import { AwsManagedRuleGroup } from "./managed-rule-names.enum";

/**
 * AWS WAFのWeb ACL構成を表します。
 */
interface WebAclProps {
  /**
   * Web ACLのスコープを指定します。
   * - `REGIONAL`: 各AWSリージョンに適用。
   * - `CLOUDFRONT`: Amazon CloudFront配信に適用。
   *
   * @example
   * scope: 'REGIONAL'
   */
  scope: 'REGIONAL' | 'CLOUDFRONT'; // WAFv2 only allows these two

  /**
   * Web ACLの名前を指定します。（オプション）
   *
   * @example
   * name: 'MyWebACL'
   */
  name?: string;

  /**
   * Web ACLに関連付けられたルールのリストを定義します。
   *
   * @example
   * rules: [{ priority: 1, name: 'Rule1', ... }]
   */
  rules: wafv2.CfnWebACL.RuleProperty[];

  /**
   * Web ACLに対してデフォルトで行うアクション（許可またはブロック）を指定します。（オプション）
   *
   * @example
   * defaultAction: { allow: {} }
   */
  defaultAction?: wafv2.CfnWebACL.DefaultActionProperty;

  /**
   * Web ACLの監視や可視性に影響する設定を指定します。（オプション）
   *
   * @example
   * visibilityConfig: {
   *   cloudWatchMetricsEnabled: true,
   *   metricName: 'MyMetrics',
   *   sampledRequestsEnabled: true,
   * }
   */
  visibilityConfig?: wafv2.CfnWebACL.VisibilityConfigProperty;
}

/**
 * Web ACLをAWSリソースに関連付けるためのプロパティを表します。
 */
interface WebAclAssociationProps {
  /**
   * ルールを関連付けるAWSリソースのARNを指定します。
   *
   * @example
   * resourceArn: 'arn:aws:s3:::example-bucket'
   */
  resourceArn: string;
}

type AwsWafLogsGroupName = `aws-waf-logs-${string}`;

/**
 * AWS WAFのログ設定を表します。
 */
interface WebAclLoggingProps extends logs.LogGroupProps {
  /**
   * ログ設定の有効化を制御します。（オプション）
   * デフォルトでは有効。
   *
   * @example
   * enabled: true
   */
  enabled?: boolean;

  /**
   * ロググループ名を指定します。（オプション）
   *
   * @example
   * logGroupName: 'aws-waf-logs-my-web-acl'
   */
  logGroupName?: AwsWafLogsGroupName;
}

/**
 * AWS WAF全体構成のためのプロパティを定義します。
 */
export interface WafConstructProps {
  /**
   * Web ACLの構成プロパティを指定します。
   */
  webAcl: WebAclProps;

  /**
   * Web ACLのリソースへの関連付けに関するプロパティを指定します。（オプション）
   */
  association?: WebAclAssociationProps;

  /**
   * Web ACLログ設定のプロパティを指定します。（オプション）
   */
  logging?: WebAclLoggingProps;
}

/**
 * AWS WAFのマネージドルールセットを設定するためのプロパティを表します。
 */
export interface AwsManagedRuleProps {
  /**
   * ルール優先順位を指定します。値が小さいほど高い優先度になります。
   *
   * @example
   * priority: 1 // 最も優先されるルール
   */
  priority: number;

  /**
   * 適用するAWSの管理ルールグループ名を指定します。
   *
   * @see AwsManagedRuleGroup
   * @example
   * ruleName: AwsManagedRuleGroup.AWSManagedRulesCommonRuleSet
   */
  ruleName: AwsManagedRuleGroup;

  /**
   * ルールグループから除外したい特定のルールを指定します。（オプション）
   *
   * @example
   * excludedRules: [
   *   { name: 'SizeRestrictionsRule' },
   *   { name: 'SQLiRule' }
   * ]
   */
  excludedRules?: wafv2.CfnWebACL.ExcludedRuleProperty[];

  /**
   * このルールが適用される条件をさらに絞り込むスコープダウン条件を指定します。（オプション）
   *
   * @example
   * scopeDownStatement: {
   *   ipSetReferenceStatement: {
   *     arn: 'arn:aws:wafv2:region:account-id:ipset/name/ID'
   *   }
   * }
   */
  scopeDownStatement?: wafv2.CfnWebACL.StatementProperty;

  /**
   * マネージドルールセットのバージョンを明示的に指定します。（オプション）
   * バージョンを指定しない場合、最新のバージョンが使用されます。
   *
   * @example
   * version: '1.1'
   */
  version?: string;
}


enum IpVersion {
  IPV4 = 'IPV4',
  IPV6 = 'IPV6',
}

/**
 * IpSetPropsはIpSetConstructのパラメータとして使用されるプロパティを定義します。
 */
export interface IpSetProps {
  scope?: 'REGIONAL' | 'CLOUDFRONT';
  addresses: string[];
  ipAddressVersion?: IpVersion;
  name?: string;
  description?: string;
  tags?: CfnTag
}

export interface IpSetForwardedIPConfigurationProps { //extends wafv2.CfnWebACL.IPSetForwardedIPConfigurationProperty {
  headerName: string;
  fallbackBehavior: 'MATCH' | 'NO_MATCH';
  position: 'FIRST' | 'LAST' | 'ANY';
}

export interface UserManagedRuleProps {
  priority: number;
  ruleName: string;
  statement: wafv2.CfnWebACL.StatementProperty;
  action?: wafv2.CfnWebACL.RuleActionProperty;
  overrideAction?: wafv2.CfnWebACL.OverrideActionProperty;
  visibilityConfig?: wafv2.CfnWebACL.VisibilityConfigProperty;
}