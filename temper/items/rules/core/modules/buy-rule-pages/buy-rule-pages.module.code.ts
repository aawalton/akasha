import type { BuyRule } from "akasha/temper/items/rules/core/modules/buy-rule-types/buy-rule-types.module.code.ts"
import { instantOf } from "akasha/temper/items/rules/core/modules/inventory-rule-to-pages/inventory-rule-to-pages.module.code.ts"
import type { RuleWrites } from "akasha/temper/items/rules/core/modules/inventory-rule-writes/inventory-rule-writes.module.code.ts"
import {
  epochIn,
  idIn,
  itemNamedIn,
  numberIn,
  ordered,
  type PageRow,
  pageWritesFor,
  refusedRule,
  refuseItem,
  sharedIn,
  sharedValuesOf,
  slugFor,
  slugIn,
  type WantedPage,
} from "akasha/temper/items/rules/core/modules/item-rule-pages/item-rule-pages.module.code.ts"

export const BUY_RULE_PAGE_TYPE = "temper-buy-rule"

const SLUG_PREFIX = "buy-rule-"

const KIND = "buy rule"

const CLEARABLE = ["title", "description", "goal", "locked"] as const

export function buyRuleFromRow(row: PageRow): {
  readonly displayOrder: number
  readonly rule: BuyRule
} {
  const slug = slugIn(row, KIND)
  const { itemId, itemName } = itemNamedIn(row, KIND, slug)
  const rule: BuyRule = {
    id: idIn(slug, SLUG_PREFIX),
    itemId,
    itemName,
    targetQuantity: numberIn(row, "targetQuantity", KIND, slug),
    source: "merchant",
    active: row.active !== false,
    updatedAt: epochIn(row, KIND, slug),
    ...sharedIn(row),
  }
  return { displayOrder: numberIn(row, "displayOrder", KIND, slug), rule }
}

export function buyRulesFromRows(rows: readonly PageRow[]): readonly BuyRule[] {
  return ordered(rows.map(buyRuleFromRow))
}

export function buyRulePageOf(
  rule: BuyRule,
  accountPage: string,
  displayOrder: number,
  writtenAt: number
): WantedPage {
  const slug = slugFor(SLUG_PREFIX, rule.id, KIND)
  refuseItem(KIND, slug, rule.itemId, rule.itemName)
  if (!Number.isInteger(rule.targetQuantity) || rule.targetQuantity < 0) {
    throw refusedRule(KIND, slug, `keeps ${rule.targetQuantity} bought, which is no count`)
  }
  return {
    slug,
    values: {
      slug,
      accountPage,
      itemId: rule.itemId,
      name: rule.itemName,
      displayOrder,
      targetQuantity: rule.targetQuantity,
      active: rule.active !== false,
      updatedAt: instantOf(rule.updatedAt ?? writtenAt),
      ...sharedValuesOf(rule, KIND, slug),
    },
  }
}

export function buyRuleWritesFor(
  rules: readonly BuyRule[],
  rows: readonly PageRow[],
  accountPage: string,
  writtenAt: number
): RuleWrites {
  return pageWritesFor(
    rules.map((rule, at) => buyRulePageOf(rule, accountPage, at, writtenAt)),
    rows,
    CLEARABLE,
    []
  )
}
