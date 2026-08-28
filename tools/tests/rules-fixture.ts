import { indexRoot } from "../../page/index/place/place.ts"
import { type Fixture, installPages } from "./fixture.ts"

indexRoot()

const CATEGORY_PAGES = [
  "pages/rules-engine-rule-set/category-rule.rules-engine-rule-set.md",
  "pages/page-type/category-rule-agent.page-type.md",
  "pages/page-type/category-rule-code.page-type.md",
  "pages/page-type/category-rule-merchant.page-type.md",
  "pages/category-rule-merchant/merchants.category-rule-merchant.md",
  "pages/page-property-definition/monarch-transaction-merchant.page-property-definition.md",
  "pages/page-property-definition/monarch-transaction-sign.page-property-definition.md",
  "pages/page-property-definition/monarch-transaction-description.page-property-definition.md",
]

const EMAIL_PAGES = [
  "pages/rules-engine-rule-set/email-rule.rules-engine-rule-set.md",
  "pages/page-type/email-rule-agent.page-type.md",
  "pages/page-type/email-rule-code.page-type.md",
  "pages/page-property-definition/email-message-from.page-property-definition.md",
  "pages/page-property-definition/email-message-list.page-property-definition.md",
  "pages/page-property-definition/email-message-subject.page-property-definition.md",
  "pages/page-property-definition/email-message-to.page-property-definition.md",
]

export function categoryRuleStore(at: Fixture): void {
  installPages(at.root, CATEGORY_PAGES)
}

export function emailRuleStore(at: Fixture): void {
  installPages(at.root, EMAIL_PAGES)
}
