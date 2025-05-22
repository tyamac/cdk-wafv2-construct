# @tyamac/cdk-wafv2-construct

A reusable AWS WAFv2 L2 construct for the AWS CDK (written in TypeScript).  
This construct simplifies the definition of WebACLs, AWS managed rules, scope-down statements, and logging.

---

## 🚀 Installation

```bash
npm install @tyamac/cdk-wafv2-construct
```


---

## 📦 Features

- 🛡️ Easily apply AWS Managed Rule Groups
- 🔍 Support for scope-down statements
- 📊 Enable CloudWatch metrics and logging
- ⚙️ Optional IP set blocking and rule exclusions

---

## 🧱 Usage

```ts
import { WafConstruct, AwsManagedRuleGroup } from '@tyamac/cdk-wafv2-construct';

new WafConstruct(this, 'MyWaf', {
  webAcl: {
    scope: 'REGIONAL',
    rules: [
      {
        priority: 1,
        ruleName: AwsManagedRuleGroup.AWSManagedRulesCommonRuleSet
      }
    ]
  }
});
```

---

## 🧰 API Reference

### `WafConstructProps`

| Property         | Type                                                  | Required | Description                                           |
|------------------|-------------------------------------------------------|----------|-------------------------------------------------------|
| `webAcl`         | `WebAclProps`                                         | ✅       | Configuration for the WebACL                         |
| `association`    | `WebAclAssociationProps`                              | ❌       | Optionally associate the WebACL with a resource ARN  |
| `logging`        | `WebAclLoggingProps`                                  | ❌       | CloudWatch log group configuration                   |

---

### `AwsManagedRuleProps`

Define managed rules with support for:

- Priority setting (lower = higher priority)
- Rule group selection via `AwsManagedRuleGroup`
- Excluding specific rules
- Adding scope-down statements
- Optionally specifying a version

---

## 📄 License

MIT © [tyamac](https://github.com/tyamac)
```