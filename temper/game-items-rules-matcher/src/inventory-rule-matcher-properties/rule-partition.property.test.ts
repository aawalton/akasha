import { describe, expect, it } from "bun:test"
import { IMPLICIT_TERMINAL_RULE_ID } from "@temper/game-items-rules-core/inventory-rule-types"
import fc from "fast-check"
import { computeAllRuleAffectedItems } from "../inventory-rule-matcher"
import {
  activeClaimsByItem,
  categoryRuleListArb,
  classifiedItemListArb,
  expectedClaimerId,
  itemRuleListArb,
  ruleMatchesItem,
} from "../inventory-rule-matcher-property-fixtures"
import { compile } from "./compile-rules"

describe("computeAllRuleAffectedItems — property invariants", () => {
  it("P1+P2: partitions every classified item into exactly one active bucket (terminal counted)", () => {
    fc.assert(
      fc.property(categoryRuleListArb, classifiedItemListArb, (rules, items) => {
        const result = computeAllRuleAffectedItems(compile(rules), items)
        const activeBucketIds = [
          ...rules.filter((r) => r.active !== false).map((r) => r.id),
          IMPLICIT_TERMINAL_RULE_ID,
        ]
        const claims = activeClaimsByItem(items, activeBucketIds, result.ruleMap)
        for (const claimList of claims.values()) {
          expect(claimList.length).toBe(1)
        }
      })
    )
  })

  it("P3: the claiming rule is the earliest active rule whose category matches", () => {
    fc.assert(
      fc.property(categoryRuleListArb, classifiedItemListArb, (rules, items) => {
        const result = computeAllRuleAffectedItems(compile(rules), items)
        const activeBucketIds = [
          ...rules.filter((r) => r.active !== false).map((r) => r.id),
          IMPLICIT_TERMINAL_RULE_ID,
        ]
        const claims = activeClaimsByItem(items, activeBucketIds, result.ruleMap)
        for (const [ci, claimList] of claims) {
          expect(claimList).toEqual([expectedClaimerId(ci, rules, [])])
        }
      })
    )
  })

  it("P3 (with item rules): item rules win over any matching category rule", () => {
    fc.assert(
      fc.property(
        categoryRuleListArb,
        itemRuleListArb,
        classifiedItemListArb,
        (categoryRules, itemRules, items) => {
          const result = computeAllRuleAffectedItems(
            compile(categoryRules),
            items,
            undefined,
            itemRules
          )
          const activeBucketIds = [
            ...itemRules.filter((r) => r.active !== false).map((r) => r.id),
            ...categoryRules.filter((r) => r.active !== false).map((r) => r.id),
            IMPLICIT_TERMINAL_RULE_ID,
          ]
          const claims = activeClaimsByItem(items, activeBucketIds, result.ruleMap)
          for (const [ci, claimList] of claims) {
            expect(claimList).toEqual([expectedClaimerId(ci, categoryRules, itemRules)])
          }
        }
      )
    )
  })

  it("inactive rules show counterfactual matches without affecting active partition", () => {
    fc.assert(
      fc.property(categoryRuleListArb, classifiedItemListArb, (rules, items) => {
        const result = computeAllRuleAffectedItems(compile(rules), items)
        for (const inactive of rules.filter((r) => r.active === false)) {
          const inactiveIdx = rules.indexOf(inactive)
          const earlierActive = rules.slice(0, inactiveIdx).filter((r) => r.active !== false)
          const bucket = result.ruleMap.get(inactive.id) ?? []
          for (const a of bucket) {
            const ci = items.find((i) => i.item === a.item)
            if (!ci) continue
            expect(ruleMatchesItem(inactive, ci)).toBe(true)
            for (const earlier of earlierActive) {
              expect(ruleMatchesItem(earlier, ci)).toBe(false)
            }
          }
        }
      })
    )
  })

  it("the implicit terminal's bucket is precisely the items no active user rule claims", () => {
    fc.assert(
      fc.property(categoryRuleListArb, classifiedItemListArb, (rules, items) => {
        const result = computeAllRuleAffectedItems(compile(rules), items)
        const terminalBucket = result.ruleMap.get(IMPLICIT_TERMINAL_RULE_ID) ?? []
        const expectedTerminalItemRefs = new Set(
          items
            .filter((ci) => {
              for (const r of rules) {
                if (r.active === false) continue
                if (ruleMatchesItem(r, ci)) return false
              }
              return true
            })
            .map((ci) => ci.item)
        )
        const actualTerminalItemRefs = new Set(terminalBucket.map((a) => a.item))
        expect(actualTerminalItemRefs).toEqual(expectedTerminalItemRefs)
      })
    )
  })
})
