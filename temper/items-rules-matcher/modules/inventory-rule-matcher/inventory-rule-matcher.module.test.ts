import { describe, expect, test } from "bun:test"
import {
  type CategoryRule,
  IMPLICIT_TERMINAL_RULE_ID,
  type ItemRule,
} from "akasha/temper/items-rules-core/modules/inventory-rule-types/inventory-rule-types.module.code.ts"
import { compile } from "akasha/temper/items-rules-matcher/modules/compile-rules/compile-rules.module.code.ts"
import { computeAllRuleAffectedItems } from "akasha/temper/items-rules-matcher/modules/inventory-rule-matcher/inventory-rule-matcher.module.code.ts"
import {
  activeClaimsByItem,
  CATEGORY_RULE_LIST_ARB,
  CLASSIFIED_ITEM_LIST_ARB,
  expectedClaimerId,
  ITEM_RULE_LIST_ARB,
  ruleMatchesItem,
} from "akasha/temper/items-rules-matcher/test-fixtures/inventory-rule-matcher-property-fixtures/inventory-rule-matcher-property-fixtures.test-fixture.code.ts"
import fc from "fast-check"

function activeIds(rules: readonly (CategoryRule | ItemRule)[]): readonly string[] {
  return rules.filter((rule) => rule.active !== false).map((rule) => rule.id)
}

describe("An item is taken by the first rule the item matches.", () => {
  test("every item falls in exactly one active bucket, the terminal counted", () => {
    fc.assert(
      fc.property(CATEGORY_RULE_LIST_ARB, CLASSIFIED_ITEM_LIST_ARB, (rules, items) => {
        const found = computeAllRuleAffectedItems(compile(rules), items)
        const buckets = [...activeIds(rules), IMPLICIT_TERMINAL_RULE_ID]
        for (const claimed of activeClaimsByItem(items, buckets, found.ruleMap).values()) {
          expect(claimed).toHaveLength(1)
        }
      })
    )
  })

  test("the rule taking an item is the earliest active rule its category matches", () => {
    fc.assert(
      fc.property(CATEGORY_RULE_LIST_ARB, CLASSIFIED_ITEM_LIST_ARB, (rules, items) => {
        const found = computeAllRuleAffectedItems(compile(rules), items)
        const buckets = [...activeIds(rules), IMPLICIT_TERMINAL_RULE_ID]
        for (const [item, claimed] of activeClaimsByItem(items, buckets, found.ruleMap)) {
          expect(claimed).toEqual([expectedClaimerId(item, rules, [])])
        }
      })
    )
  })
})

describe("An item rule is answered before any category rule.", () => {
  test("an item rule takes the item from every category rule matching it", () => {
    fc.assert(
      fc.property(
        CATEGORY_RULE_LIST_ARB,
        ITEM_RULE_LIST_ARB,
        CLASSIFIED_ITEM_LIST_ARB,
        (categoryRules, itemRules, items) => {
          const found = computeAllRuleAffectedItems(
            compile(categoryRules),
            items,
            undefined,
            itemRules
          )
          const buckets = [
            ...activeIds(itemRules),
            ...activeIds(categoryRules),
            IMPLICIT_TERMINAL_RULE_ID,
          ]
          for (const [item, claimed] of activeClaimsByItem(items, buckets, found.ruleMap)) {
            expect(claimed).toEqual([expectedClaimerId(item, categoryRules, itemRules)])
          }
        }
      )
    )
  })
})

describe("A rule that is off shows what that rule would have taken.", () => {
  test("an inactive rule's bucket holds what it matches and no earlier active rule matched", () => {
    fc.assert(
      fc.property(CATEGORY_RULE_LIST_ARB, CLASSIFIED_ITEM_LIST_ARB, (rules, items) => {
        const found = computeAllRuleAffectedItems(compile(rules), items)
        for (const off of rules.filter((rule) => rule.active === false)) {
          const earlier = rules.slice(0, rules.indexOf(off)).filter((r) => r.active !== false)
          for (const affected of found.ruleMap.get(off.id) ?? []) {
            const item = items.find((one) => one.item === affected.item)
            if (item === undefined) continue
            expect(ruleMatchesItem(off, item)).toBe(true)
            for (const rule of earlier) expect(ruleMatchesItem(rule, item)).toBe(false)
          }
        }
      })
    )
  })
})

describe("An item no rule claims falls to the implicit terminal rule.", () => {
  test("the terminal's bucket is exactly what no active rule matched", () => {
    fc.assert(
      fc.property(CATEGORY_RULE_LIST_ARB, CLASSIFIED_ITEM_LIST_ARB, (rules, items) => {
        const found = computeAllRuleAffectedItems(compile(rules), items)
        const fell = new Set(
          items
            .filter((item) =>
              rules.every((rule) => rule.active === false || !ruleMatchesItem(rule, item))
            )
            .map((item) => item.item)
        )
        const terminal = found.ruleMap.get(IMPLICIT_TERMINAL_RULE_ID) ?? []
        expect(new Set(terminal.map((affected) => affected.item))).toEqual(fell)
      })
    )
  })
})
