import {
  BUY_RULE_PAGE_TYPE,
  buyRulesFromRows,
  buyRuleWritesFor,
} from "akasha/temper/items/rules/core/modules/buy-rule-pages/buy-rule-pages.module.code.ts"
import {
  type HeldRule,
  heldFromRows,
  rulesFromPages,
} from "akasha/temper/items/rules/core/modules/inventory-rule-from-pages/inventory-rule-from-pages.module.code.ts"
import type { InventoryRules } from "akasha/temper/items/rules/core/modules/inventory-rule-types/inventory-rule-types.module.code.ts"
import {
  type RuleWrites,
  writesFor,
} from "akasha/temper/items/rules/core/modules/inventory-rule-writes/inventory-rule-writes.module.code.ts"
import {
  ITEM_RULE_PAGE_TYPE,
  itemRulesFromRows,
  itemRuleWritesFor,
  type PageRow,
} from "akasha/temper/items/rules/core/modules/item-rule-pages/item-rule-pages.module.code.ts"

const INVENTORY_RULE_PAGE_TYPE = "temper-inventory-rule"

export interface HeldPages {
  readonly rules: readonly HeldRule[]
  readonly itemRows: readonly PageRow[]
  readonly buyRows: readonly PageRow[]
}

interface PageTypeWrites {
  readonly pageTypeSlug: string
  readonly writes: RuleWrites
}

export const NO_PAGES: HeldPages = { rules: [], itemRows: [], buyRows: [] }

export function heldPagesOf(
  ruleRows: readonly PageRow[],
  itemRows: readonly PageRow[],
  buyRows: readonly PageRow[]
): HeldPages {
  return {
    rules: heldFromRows(ruleRows.map((row) => ({ ...row }))),
    itemRows: itemRows.map((row) => ({ ...row })),
    buyRows: buyRows.map((row) => ({ ...row })),
  }
}

type RowsReader = (pageTypeSlug: string, accountPage: string) => Promise<readonly PageRow[]>

export async function heldPagesReadBy(read: RowsReader, accountPage: string): Promise<HeldPages> {
  const [ruleRows, itemRows, buyRows] = await Promise.all([
    read(INVENTORY_RULE_PAGE_TYPE, accountPage),
    read(ITEM_RULE_PAGE_TYPE, accountPage),
    read(BUY_RULE_PAGE_TYPE, accountPage),
  ])
  return heldPagesOf(ruleRows, itemRows, buyRows)
}

export function countOf(held: HeldPages): number {
  return held.rules.length + held.itemRows.length + held.buyRows.length
}

export function ruleSetOf(held: HeldPages): InventoryRules {
  return {
    version: 2,
    rules: rulesFromPages(held.rules),
    itemRules: itemRulesFromRows(held.itemRows),
    buyRules: buyRulesFromRows(held.buyRows),
  }
}

export function ruleWritesFor(
  next: InventoryRules,
  held: HeldPages,
  accountPage: string,
  writtenAt: number
): readonly PageTypeWrites[] {
  return [
    {
      pageTypeSlug: INVENTORY_RULE_PAGE_TYPE,
      writes: writesFor(next.rules, held.rules, accountPage, writtenAt),
    },
    ...(next.itemRules === undefined
      ? []
      : [
          {
            pageTypeSlug: ITEM_RULE_PAGE_TYPE,
            writes: itemRuleWritesFor(next.itemRules, held.itemRows, accountPage, writtenAt),
          },
        ]),
    ...(next.buyRules === undefined
      ? []
      : [
          {
            pageTypeSlug: BUY_RULE_PAGE_TYPE,
            writes: buyRuleWritesFor(next.buyRules, held.buyRows, accountPage, writtenAt),
          },
        ]),
  ]
}
