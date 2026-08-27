import { indexRoot } from "../../page/index/place/place.ts"
import { type Fixture, installPages } from "./fixture.ts"

/**
 * THE PAGE INDEX IS PINNED TO THE LIVE CHECKOUT, at this module's load and so before any fixture
 * moves `AKASHA_ROOT`. `page/property/registry.ts` builds the page type registry out of
 * `loadPages()` and nothing else, and `page/index/place/place.ts` works out where that index stands
 * once and holds the answer for the life of the process. Answered here it is the live repository's,
 * which says which paths are page types; the tree the registry then opens is still the fixture's,
 * so a page type it holds no copy of is no page type of its. Answered first from inside a fixture it
 * would be a temp root carrying no index, and the registry would state no page type at all.
 */
indexRoot()

/**
 * The pages a category rule walk is spelled out of: the rule set, the two kinds of rule it reaches,
 * the transaction fields its conditions name, and the vocabulary the merchant field is read out of.
 *
 * COPIED RATHER THAN WRITTEN OUT HERE. `tools/lib/rules-engine-rule-set.ts` takes a rule set's path
 * pattern, its fields and their values off these pages, so a stand-in written beside them drifts
 * from what the audit judges in the live tree while still reading green.
 */
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

/** The same for an email rule walk, whose fields are read straight off the message. */
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
