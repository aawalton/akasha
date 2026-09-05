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

function textAt(row: Record<string, unknown>, key: string): string | undefined {
  const value = row[key]
  return typeof value === "string" ? value : undefined
}

function rowsAt(row: Record<string, unknown>, key: string): readonly Record<string, unknown>[] {
  const value = row[key]
  if (!Array.isArray(value)) return []
  return value.filter((one): one is Record<string, unknown> => {
    return typeof one === "object" && one !== null && !Array.isArray(one)
  })
}

function conditionRowsIn(row: Record<string, unknown>): readonly ConditionEntry[] {
  const out: ConditionEntry[] = []
  for (const one of rowsAt(row, "conditions")) {
    const conditionField = textAt(one, "conditionField")
    const conditionValue = textAt(one, "conditionValue")
    if (conditionField === undefined || conditionValue === undefined) continue
    out.push({ conditionField, conditionValue })
  }
  return out
}

function chainRowsIn(row: Record<string, unknown>): readonly ChainEntry[] {
  const out: ChainEntry[] = []
  for (const one of rowsAt(row, "destinationChain")) {
    const destination = textAt(one, "destination")
    if (destination === undefined) continue
    const targetQuantity = one.targetQuantity
    const charEligibility = textAt(one, "charEligibility")
    out.push({
      destination,
      ...(typeof targetQuantity === "number" ? { targetQuantity } : {}),
      ...(charEligibility === undefined ? {} : { charEligibility }),
    })
  }
  return out
}

export function heldFromRow(row: Record<string, unknown>): HeldRule | null {
  const slug = textAt(row, "slug")
  const categoryId = textAt(row, "categoryId")
  const action = textAt(row, "action")
  const updatedAt = textAt(row, "updatedAt")
  const displayOrder = row.displayOrder
  if (slug === undefined || categoryId === undefined || action === undefined) return null
  if (updatedAt === undefined || typeof displayOrder !== "number") return null
  const page: RulePage = {
    slug,
    categoryId,
    displayOrder,
    action,
    active: row.active !== false,
    updatedAt,
    ...(textAt(row, "title") === undefined ? {} : { title: textAt(row, "title") as string }),
    ...(textAt(row, "description") === undefined
      ? {}
      : { description: textAt(row, "description") as string }),
    ...(textAt(row, "goal") === undefined ? {} : { goal: textAt(row, "goal") as string }),
    ...(typeof row.locked === "boolean" ? { locked: row.locked } : {}),
    ...(textAt(row, "destination") === undefined
      ? {}
      : { destination: textAt(row, "destination") as string }),
    ...(textAt(row, "stockScope") === undefined
      ? {}
      : { stockScope: textAt(row, "stockScope") as string }),
  }
  return { page, conditions: conditionRowsIn(row), chain: chainRowsIn(row) }
}

export function heldFromRows(rows: readonly Record<string, unknown>[]): readonly HeldRule[] {
  const out: HeldRule[] = []
  for (const row of rows) {
    const held = heldFromRow(row)
    if (held !== null) out.push(held)
  }
  return out
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
    .sort((one, two) => one.page.displayOrder - two.page.displayOrder)
    .map(ruleFromPage)
}
