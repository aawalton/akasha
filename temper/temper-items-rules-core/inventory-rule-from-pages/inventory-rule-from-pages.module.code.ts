import type {
  CategoryRule,
  DestinationChain,
  ItemAction,
  MoveToDestination,
  StockScope,
} from "../inventory-rule-types/inventory-rule-types.module.code.ts"

export interface RulePage {
  readonly slug: string
  readonly title?: string
  readonly description?: string
  readonly categoryId: string
  readonly displayOrder: number
  readonly action: string
  readonly active: boolean
  readonly updatedAt: string
  readonly goal?: string
  readonly locked?: boolean
  readonly destination?: string
  readonly stockScope?: string
}

export interface ConditionEntry {
  readonly conditionField: string
  readonly conditionValue: string
}

export interface ChainEntry {
  readonly destination: string
  readonly targetQuantity?: number
  readonly charEligibility?: string
}

export interface HeldRule {
  readonly page: RulePage
  readonly conditions?: readonly ConditionEntry[]
  readonly chain?: readonly ChainEntry[]
}

const SLUG_PREFIX = "rule-"

function keyOf(slug: string): string {
  const [head, ...rest] = slug.split("-")
  return (head ?? "") + rest.map((word) => word.slice(0, 1).toUpperCase() + word.slice(1)).join("")
}

function spelt(value: string): unknown {
  try {
    return JSON.parse(value)
  } catch {
    return value
  }
}

function epochOf(instant: string): number {
  const at = Date.parse(instant)
  if (Number.isNaN(at)) throw new Error(`inventoryRuleFromPages: \`${instant}\` is no instant`)
  return at
}

function conditionsOf(entries: readonly ConditionEntry[]): CategoryRule["conditions"] {
  if (entries.length === 0) return undefined
  const held: Record<string, unknown> = {}
  for (const entry of entries) held[keyOf(entry.conditionField)] = spelt(entry.conditionValue)
  return held as CategoryRule["conditions"]
}

function chainOf(entries: readonly ChainEntry[]): DestinationChain | undefined {
  if (entries.length === 0) return undefined
  return entries.map((entry) => ({
    destination: entry.destination as MoveToDestination,
    ...(entry.targetQuantity === undefined ? {} : { targetQuantity: entry.targetQuantity }),
    ...(entry.charEligibility === undefined
      ? {}
      : { charEligibility: JSON.parse(entry.charEligibility) }),
  }))
}

export function ruleFromPage(held: HeldRule): CategoryRule {
  const page = held.page
  const conditions = conditionsOf(held.conditions ?? [])
  const destinationChain = chainOf(held.chain ?? [])
  return {
    id: page.slug.startsWith(SLUG_PREFIX) ? page.slug.slice(SLUG_PREFIX.length) : page.slug,
    categoryId: page.categoryId,
    action: page.action as ItemAction,
    active: page.active,
    updatedAt: epochOf(page.updatedAt),
    ...(page.title === undefined ? {} : { title: page.title }),
    ...(page.description === undefined ? {} : { notes: page.description }),
    ...(page.goal === undefined ? {} : { goal: page.goal }),
    ...(page.locked === undefined ? {} : { locked: page.locked }),
    ...(page.destination === undefined
      ? {}
      : { destination: page.destination as MoveToDestination }),
    ...(page.stockScope === undefined ? {} : { stockScope: page.stockScope as StockScope }),
    ...(conditions === undefined ? {} : { conditions }),
    ...(destinationChain === undefined ? {} : { destinationChain }),
  }
}

export function rulesFromPages(held: readonly HeldRule[]): readonly CategoryRule[] {
  return [...held]
    .sort((one, two) => two.page.displayOrder - one.page.displayOrder)
    .map(ruleFromPage)
}
