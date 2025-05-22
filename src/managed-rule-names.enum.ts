export enum AwsManagedRuleGroup {
  AWSManagedRulesCommonRuleSet = 'AWSManagedRulesCommonRuleSet',
  AWSManagedRulesAdminProtectionRuleSet = 'AWSManagedRulesAdminProtectionRuleSet',
  AWSManagedRulesKnownBadInputsRuleSet = 'AWSManagedRulesKnownBadInputsRuleSet',
  AWSManagedRulesSQLiRuleSet = 'AWSManagedRulesSQLiRuleSet',
  AWSManagedRulesLinuxRuleSet = 'AWSManagedRulesLinuxRuleSet',
  AWSManagedRulesUnixRuleSet = 'AWSManagedRulesUnixRuleSet',
  AWSManagedRulesWindowsRuleSet = 'AWSManagedRulesWindowsRuleSet',
  AWSManagedRulesPHPRuleSet = 'AWSManagedRulesPHPRuleSet',
  AWSManagedRulesWordPressRuleSet = 'AWSManagedRulesWordPressRuleSet',
  AWSManagedRulesAmazonIpReputationList = 'AWSManagedRulesAmazonIpReputationList',
  AWSManagedRulesAnonymousIpList = 'AWSManagedRulesAnonymousIpList',
  AWSManagedRulesBotControlRuleSet = 'AWSManagedRulesBotControlRuleSet',
  AWSManagedRulesAccountTakeoverPreventionRuleSet = 'AWSManagedRulesAccountTakeoverPreventionRuleSet',
  AWSManagedRulesAccountCreationFraudPreventionRuleSet = 'AWSManagedRulesAccountCreationFraudPreventionRuleSet',
}

export enum AWSManagedRulesCommonRuleSet {
  NoUserAgent_HEADER = 'NoUserAgent_HEADER',
  UserAgent_BadBots_HEADER = 'UserAgent_BadBots_HEADER',
  SizeRestrictions_QUERYSTRING = 'SizeRestrictions_QUERYSTRING',
  SizeRestrictions_Cookie_HEADER = 'SizeRestrictions_Cookie_HEADER',
  SizeRestrictions_BODY = 'SizeRestrictions_BODY',
  SizeRestrictions_URIPATH = 'SizeRestrictions_URIPATH',
  EC2MetaDataSSRF_BODY = 'EC2MetaDataSSRF_BODY',
  EC2MetaDataSSRF_COOKIE = 'EC2MetaDataSSRF_COOKIE',
  EC2MetaDataSSRF_URIPATH = 'EC2MetaDataSSRF_URIPATH',
  EC2MetaDataSSRF_QUERYARGUMENTS = 'EC2MetaDataSSRF_QUERYARGUMENTS',
  GenericLFI_QUERYARGUMENTS = 'GenericLFI_QUERYARGUMENTS',
  GenericLFI_URIPATH = 'GenericLFI_URIPATH',
  GenericLFI_BODY = 'GenericLFI_BODY',
  RestrictedExtensions_URIPATH = 'RestrictedExtensions_URIPATH',
  RestrictedExtensions_QUERYARGUMENTS = 'RestrictedExtensions_QUERYARGUMENTS',
  GenericRFI_QUERYARGUMENTS = 'GenericRFI_QUERYARGUMENTS',
  GenericRFI_BODY = 'GenericRFI_BODY',
  GenericRFI_URIPATH = 'GenericRFI_URIPATH',
  CrossSiteScripting_COOKIE = 'CrossSiteScripting_COOKIE',
  CrossSiteScripting_QUERYARGUMENTS = 'CrossSiteScripting_QUERYARGUMENTS',
  CrossSiteScripting_BODY = 'CrossSiteScripting_BODY',
  CrossSiteScripting_URIPATH = 'CrossSiteScripting_URIPATH',
}

export enum AWSManagedRulesAdminProtectionRuleSet {
  AdminProtection_URIPATH = 'AdminProtection_URIPATH'
}

export enum AWSManagedRulesKnownBadInputsRuleSet {
  JavaDeserializationRCE_HEADER = 'JavaDeserializationRCE_HEADER',
  JavaDeserializationRCE_BODY = 'JavaDeserializationRCE_BODY',
  JavaDeserializationRCE_URIPATH = 'JavaDeserializationRCE_URIPATH',
  JavaDeserializationRCE_QUERYSTRING = 'JavaDeserializationRCE_QUERYSTRING',
  Host_localhost_HEADER = 'Host_localhost_HEADER',
  PROPFIND_METHOD = 'PROPFIND_METHOD',
  ExploitablePaths_URIPATH = 'ExploitablePaths_URIPATH',
  Log4JRCE_HEADER = 'Log4JRCE_HEADER',
  Log4JRCE_QUERYSTRING = 'Log4JRCE_QUERYSTRING',
  Log4JRCE_BODY = 'Log4JRCE_BODY',
  Log4JRCE_URIPATH = 'Log4JRCE_URIPATH',
}

export enum AWSManagedRulesSQLiRuleSet {
  SQLi_QUERYARGUMENTS = 'SQLi_QUERYARGUMENTS',
  SQLiExtendedPatterns_QUERYARGUMENTS = 'SQLiExtendedPatterns_QUERYARGUMENTS',
  SQLi_BODY = 'SQLi_BODY',
  SQLiExtendedPatterns_BODY = 'SQLiExtendedPatterns_BODY',
  SQLi_COOKIE = 'SQLi_COOKIE'
}

export enum AWSManagedRulesLinuxRuleSet {
  LFI_URIPATH = 'LFI_URIPATH',
  LFI_QUERYSTRING = 'LFI_QUERYSTRING',
  LFI_HEADER = 'LFI_HEADER'
}

export enum AWSManagedRulesUnixRuleSet {
  UNIXShellCommandsVariables_QUERYSTRING = 'UNIXShellCommandsVariables_QUERYSTRING',
  UNIXShellCommandsVariables_BODY = 'UNIXShellCommandsVariables_BODY',
  UNIXShellCommandsVariables_HEADER = 'UNIXShellCommandsVariables_HEADER',
}

export enum AWSManagedRulesWindowsRuleSet {
  WindowsShellCommands_COOKIE = 'WindowsShellCommands_COOKIE',
  WindowsShellCommands_QUERYARGUMENTS = 'WindowsShellCommands_QUERYARGUMENTS',
  WindowsShellCommands_BODY = 'WindowsShellCommands_BODY',
  PowerShellCommands_COOKIE = 'PowerShellCommands_COOKIE',
  PowerShellCommands_QUERYARGUMENTS = 'PowerShellCommands_QUERYARGUMENTS',
  PowerShellCommands_BODY = 'PowerShellCommands_BODY',
}

export enum AWSManagedRulesPHPRuleSet {
  PHPHighRiskMethodsVariables_HEADER = 'PHPHighRiskMethodsVariables_HEADER',
  PHPHighRiskMethodsVariables_QUERYSTRING = 'PHPHighRiskMethodsVariables_QUERYSTRING',
  PHPHighRiskMethodsVariables_BODY = 'PHPHighRiskMethodsVariables_BODY',
}

export enum AWSManagedRulesWordPressRuleSet {
  WordPressExploitableCommands_QUERYSTRING = 'WordPressExploitableCommands_QUERYSTRING',
  WordPressExploitablePaths_URIPATH = 'WordPressExploitablePaths_URIPATH'
}

export enum AWSManagedRulesAmazonIpReputationList {
 AWSManagedIPReputationList = 'AWSManagedIPReputationList',
  AWSManagedReconnaissanceList = 'AWSManagedReconnaissanceList',
  AWSManagedIPDDoSList = 'AWSManagedIPDDoSList'
}

export enum AWSManagedRulesAnonymousIpList {
  AnonymousIPList = 'AnonymousIPList',
  HostingProviderIPList = 'HostingProviderIPList'
}

export enum AWSManagedRulesBotControlRuleSet {}

export enum AWSManagedRulesAccountTakeoverPreventionRuleSet {}

export enum AWSManagedRulesAccountCreationFraudPreventionRuleSet {}
