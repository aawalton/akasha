import { namedAs } from "akasha/page/modules/address/page-address.module.code.ts"
import { slugOf } from "akasha/page/modules/value-reading/page-value-reading.module.code.ts"
import { lowerKebabCase } from "akasha/page/name-format/pages/lower-kebab-case/lower-kebab-case.name-format.code.ts"
import {
  type ChainEntry,
  chainOf,
  chainRowsIn,
} from "akasha/temper/items/rules/core/modules/inventory-rule-from-pages/inventory-rule-from-pages.module.code.ts"
import {
  GOAL_NONE_ID,
  inventoryRuleGoals,
} from "akasha/temper/items/rules/core/modules/inventory-rule-goals/inventory-rule-goals.module.code.ts"
import {
  chainEntriesOf,
  instantOf,
} from "akasha/temper/items/rules/core/modules/inventory-rule-to-pages/inventory-rule-to-pages.module.code.ts"
import {
  ITEM_ACTION_VALUES,
  type ItemAction,
  type ItemRule,
  type MoveToDestination,
  type StockScope,
} from "akasha/temper/items/rules/core/modules/inventory-rule-types/inventory-rule-types.module.code.ts"
import {
  type RuleWrite,
  type RuleWrites,
  sameRows,
} from "akasha/temper/items/rules/core/modules/inventory-rule-writes/inventory-rule-writes.module.code.ts"

export const ITEM_RULE_PAGE_TYPE = "temper-item-rule"

const SLUG_PREFIX = "item-rule-"

const ITEM_ACTION = "temper-item-action"

const RULE_GOAL = "temper-rule-goal"

const CHAIN = "destinationChain"

const STOCK_SCOPES: readonly string[] = [
  "current-character",
  "any-character",
] satisfies readonly StockScope[]

const GOALS: ReadonlySet<string> = new Set(
  inventoryRuleGoals.ids.filter((goal) => goal !== GOAL_NONE_ID)
)

const CLEARABLE = [
  "title",
  "description",
  "goal",
  "locked",
  "destination",
  "stockScope",
  "stockQuantity",
] as const

export type PageRow = Readonly<Record<string, unknown>>

export interface WantedPage {
  readonly slug: string
  readonly values: Readonly<Record<string, unknown>>
}

export function textIn(row: PageRow, key: string): string | undefined {
  const value = row[key]
  return typeof value === "string" ? value : undefined
}

export function unreadRule(kind: string, slug: string, why: string): Error {
  return new Error(`the ${kind} \`${slug}\` is unread — ${why}`)
}

export function refusedRule(kind: string, slug: string, why: string): Error {
  return new Error(`the ${kind} \`${slug}\` ${why}, and the rule is not written`)
}

export function slugIn(row: PageRow, kind: string): string {
  const slug = textIn(row, "slug")
  if (slug === undefined) {
    throw new Error(`a ${kind} row states no \`slug\`, so which rule it is cannot be said`)
  }
  return slug
}

export function idIn(slug: string, prefix: string): string {
  return slug.startsWith(prefix) ? slug.slice(prefix.length) : slug
}

export function slugFor(prefix: string, id: string, kind: string): string {
  const slug = `${prefix}${id}`
  if (!lowerKebabCase(slug)) {
    throw refusedRule(kind, slug, "has an id no page slug can hold")
  }
  return slug
}

export function epochIn(row: PageRow, kind: string, slug: string): number {
  const instant = textIn(row, "updatedAt")
  if (instant === undefined) throw unreadRule(kind, slug, "the page states no `updatedAt`")
  const at = Date.parse(instant)
  if (Number.isNaN(at)) throw unreadRule(kind, slug, `\`${instant}\` is no instant`)
  return at
}

export function numberIn(row: PageRow, key: string, kind: string, slug: string): number {
  const value = row[key]
  if (typeof value !== "number") throw unreadRule(kind, slug, `the page states no \`${key}\``)
  return value
}

export function itemNamedIn(
  row: PageRow,
  kind: string,
  slug: string
): { readonly itemId: number; readonly itemName: string } {
  const itemId = numberIn(row, "itemId", kind, slug)
  const itemName = textIn(row, "name")
  if (itemName === undefined) {
    throw unreadRule(kind, slug, "the page states no `name`, so its item goes unnamed")
  }
  return { itemId, itemName }
}

export function refuseItem(
  kind: string,
  slug: string,
  itemId: number,
  itemName: string
): undefined {
  if (!Number.isInteger(itemId) || itemId <= 0) {
    throw refusedRule(kind, slug, `names item ${itemId}, which is no item's number in the game`)
  }
  if (itemName.trim() === "") throw refusedRule(kind, slug, "names its item by no name")
  return undefined
}

export function goalPageOf(goal: string, kind: string, slug: string): string {
  if (!GOALS.has(goal)) {
    throw refusedRule(kind, slug, `names the goal \`${goal}\`, which no ${RULE_GOAL} page is`)
  }
  return namedAs(RULE_GOAL, goal, null)
}

export function sharedIn(row: PageRow): {
  readonly title?: string
  readonly notes?: string
  readonly goal?: string
  readonly locked?: boolean
} {
  const title = textIn(row, "title")
  const notes = textIn(row, "description")
  const goal = textIn(row, "goal")
  return {
    ...(title === undefined ? {} : { title }),
    ...(notes === undefined ? {} : { notes }),
    ...(goal === undefined ? {} : { goal: slugOf(goal) }),
    ...(typeof row.locked === "boolean" ? { locked: row.locked } : {}),
  }
}

export function sharedValuesOf(
  rule: {
    readonly title?: string | null
    readonly notes?: string | null
    readonly goal?: string | null
    readonly locked?: boolean
  },
  kind: string,
  slug: string
): Record<string, unknown> {
  return {
    ...(rule.title == null ? {} : { title: rule.title }),
    ...(rule.notes == null ? {} : { description: rule.notes }),
    ...(rule.goal == null ? {} : { goal: goalPageOf(rule.goal, kind, slug) }),
    ...(rule.locked === undefined ? {} : { locked: rule.locked }),
  }
}

function rowsOf(row: PageRow | undefined, key: string): readonly ChainEntry[] {
  const value = row?.[key]
  return Array.isArray(value) ? (value as readonly ChainEntry[]) : []
}

function alreadySo(was: PageRow, values: Record<string, unknown>, entryKeys: readonly string[]) {
  return Object.entries(values).every(([key, value]) =>
    entryKeys.includes(key)
      ? sameRows(value as readonly ChainEntry[], rowsOf(was, key))
      : was[key] === value
  )
}

export function pageWritesFor(
  wanted: readonly WantedPage[],
  rows: readonly PageRow[],
  clearable: readonly string[],
  entryKeys: readonly string[]
): RuleWrites {
  const held = new Map<string, PageRow>()
  for (const row of rows) {
    const slug = textIn(row, "slug")
    if (slug !== undefined) held.set(slug, row)
  }
  const seen = new Set<string>()
  const upserts: RuleWrite[] = []
  for (const one of wanted) {
    if (seen.has(one.slug)) {
      throw new Error(
        `two rules would both be written as \`${one.slug}\`, so one would go over the other, and neither is written`
      )
    }
    seen.add(one.slug)
    const was = held.get(one.slug)
    const values: Record<string, unknown> = { ...one.values }
    for (const key of entryKeys) {
      if (!(key in values) && rowsOf(was, key).length > 0) values[key] = []
    }
    const clears =
      was === undefined
        ? []
        : clearable.filter((key) => was[key] !== undefined && was[key] !== null && !(key in values))
    if (was !== undefined && clears.length === 0 && alreadySo(was, values, entryKeys)) continue
    upserts.push({ slug: one.slug, values, clears })
  }
  const deletes = [...held.keys()].filter((slug) => !seen.has(slug))
  return { upserts, deletes }
}

export function ordered<Rule>(
  read: readonly { readonly displayOrder: number; readonly rule: Rule }[]
): readonly Rule[] {
  return [...read].sort((one, two) => one.displayOrder - two.displayOrder).map((one) => one.rule)
}

const KIND = "item rule"

export function itemRuleFromRow(row: PageRow): {
  readonly displayOrder: number
  readonly rule: ItemRule
} {
  const slug = slugIn(row, KIND)
  const { itemId, itemName } = itemNamedIn(row, KIND, slug)
  const displayOrder = numberIn(row, "displayOrder", KIND, slug)
  const action = textIn(row, "action")
  if (action === undefined) throw unreadRule(KIND, slug, "the page states no `action`")
  const actionSlug = slugOf(action)
  if (!(ITEM_ACTION_VALUES as readonly string[]).includes(actionSlug)) {
    throw unreadRule(KIND, slug, `the action \`${action}\` names no ${ITEM_ACTION} page`)
  }
  const destination = textIn(row, "destination")
  const stockScope = textIn(row, "stockScope")
  const chain = chainOf(chainRowsIn({ ...row }, slug), slug)
  const rule: ItemRule = {
    id: idIn(slug, SLUG_PREFIX),
    itemId,
    itemName,
    action: actionSlug as ItemAction,
    active: row.active !== false,
    updatedAt: epochIn(row, KIND, slug),
    ...sharedIn(row),
    ...(destination === undefined ? {} : { destination: destination as MoveToDestination }),
    ...(stockScope === undefined ? {} : { stockScope: stockScope as StockScope }),
    ...(typeof row.stockQuantity === "number" ? { stockQuantity: row.stockQuantity } : {}),
    ...(chain === undefined ? {} : { destinationChain: chain }),
  }
  return { displayOrder, rule }
}

export function itemRulesFromRows(rows: readonly PageRow[]): readonly ItemRule[] {
  return ordered(rows.map(itemRuleFromRow))
}

export function itemRulePageOf(
  rule: ItemRule,
  accountPage: string,
  displayOrder: number,
  writtenAt: number
): WantedPage {
  const slug = slugFor(SLUG_PREFIX, rule.id, KIND)
  refuseItem(KIND, slug, rule.itemId, rule.itemName)
  if (!ITEM_ACTION_VALUES.includes(rule.action)) {
    throw refusedRule(
      KIND,
      slug,
      `gives its item \`${rule.action}\`, which no ${ITEM_ACTION} page is`
    )
  }
  if (rule.stockScope !== undefined && !STOCK_SCOPES.includes(rule.stockScope)) {
    throw refusedRule(KIND, slug, `stocks across \`${rule.stockScope}\`, which is no stock scope`)
  }
  const chain = chainEntriesOf(rule.destinationChain)
  if (rule.destination !== undefined && chain.length > 0) {
    throw refusedRule(
      KIND,
      slug,
      "states both a destination and a chain of destinations, so which one sends its item is unsaid"
    )
  }
  return {
    slug,
    values: {
      slug,
      accountPage,
      itemId: rule.itemId,
      name: rule.itemName,
      displayOrder,
      action: namedAs(ITEM_ACTION, rule.action, null),
      active: rule.active !== false,
      updatedAt: instantOf(rule.updatedAt ?? writtenAt),
      ...sharedValuesOf(rule, KIND, slug),
      ...(rule.destination === undefined ? {} : { destination: rule.destination }),
      ...(rule.stockScope === undefined ? {} : { stockScope: rule.stockScope }),
      ...(rule.stockQuantity === undefined ? {} : { stockQuantity: rule.stockQuantity }),
      ...(chain.length === 0 ? {} : { [CHAIN]: chain }),
    },
  }
}

export function itemRuleWritesFor(
  rules: readonly ItemRule[],
  rows: readonly PageRow[],
  accountPage: string,
  writtenAt: number
): RuleWrites {
  return pageWritesFor(
    rules.map((rule, at) => itemRulePageOf(rule, accountPage, at, writtenAt)),
    rows,
    CLEARABLE,
    [CHAIN]
  )
}
