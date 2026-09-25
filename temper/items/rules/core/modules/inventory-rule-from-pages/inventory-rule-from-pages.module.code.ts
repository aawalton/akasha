import { slugOf } from "akasha/page/modules/value-reading/page-value-reading.module.code.ts"
import {
  conditionsTaken,
  saidWrong,
} from "akasha/temper/items/rules/core/modules/inventory-rule-conditions-shape/inventory-rule-conditions-shape.module.code.ts"
import type {
  CategoryRule,
  CharEligibility,
  DestinationChain,
  ItemAction,
  MoveToDestination,
  StockScope,
} from "akasha/temper/items/rules/core/modules/inventory-rule-types/inventory-rule-types.module.code.ts"
import { z } from "zod"

export interface RulePage {
  readonly slug: string
  readonly accountPage?: string
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
  readonly craftShortfall?: boolean
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

const CONDITION_VALUE = z.union([
  z.number(),
  z.boolean(),
  z.string(),
  z.array(z.string()),
  z.record(z.string(), z.unknown()),
])

const CHAR_ELIGIBILITY: z.ZodType<CharEligibility> = z.strictObject({
  requiredSkillLines: z
    .strictObject({
      skillLineIds: z.array(z.string()).readonly(),
      mode: z.enum(["all-maxed", "any-not-maxed"]),
    })
    .optional(),
  canLevelMorphs: z.strictObject({ mode: z.literal("can-level") }).optional(),
})

export function parseConditionText(text: string): { readonly held: unknown } | null {
  let read: ReturnType<typeof CONDITION_VALUE.safeParse>
  try {
    read = CONDITION_VALUE.safeParse(JSON.parse(text))
  } catch {
    return { held: text }
  }
  return read.success ? { held: read.data } : null
}

function spelt(value: string, slug: string): unknown {
  const read = parseConditionText(value)
  if (read === null) {
    throw unread(slug, `a condition holds \`${value}\`, which is JSON no condition ever holds`)
  }
  return read.held
}

function epochOf(instant: string): number {
  const at = Date.parse(instant)
  if (Number.isNaN(at)) throw new Error(`inventoryRuleFromPages: \`${instant}\` is no instant`)
  return at
}

function unread(slug: string, why: string): Error {
  return new Error(`inventoryRuleFromPages: rule \`${slug}\` is unread — ${why}`)
}

export function conditionsOf(
  entries: readonly ConditionEntry[],
  slug: string
): CategoryRule["conditions"] {
  if (entries.length === 0) return undefined
  const held: Record<string, unknown> = {}
  for (const entry of entries) {
    held[keyOf(slugOf(entry.conditionField))] = spelt(entry.conditionValue, slug)
  }
  const read = conditionsTaken(held)
  if ("wrong" in read) {
    throw unread(slug, read.wrong.map(saidWrong).join("; "))
  }
  return read.taken
}

function eligibilityOf(text: string, slug: string): CharEligibility {
  const read = CHAR_ELIGIBILITY.safeParse(JSON.parse(text))
  if (!read.success) {
    throw unread(slug, `a tier's \`charEligibility\` holds ${text}, which no eligibility is`)
  }
  return read.data
}

function chainOf(entries: readonly ChainEntry[], slug: string): DestinationChain | undefined {
  if (entries.length === 0) return undefined
  return entries.map((entry) => ({
    destination: entry.destination as MoveToDestination,
    ...(entry.targetQuantity === undefined ? {} : { targetQuantity: entry.targetQuantity }),
    ...(entry.charEligibility === undefined
      ? {}
      : { charEligibility: eligibilityOf(entry.charEligibility, slug) }),
  }))
}

function textAt(row: Record<string, unknown>, key: string): string | undefined {
  const value = row[key]
  return typeof value === "string" ? value : undefined
}

function rowsAt(
  row: Record<string, unknown>,
  key: string,
  slug: string
): readonly Record<string, unknown>[] {
  const value = row[key]
  if (value === undefined || value === null) return []
  if (!Array.isArray(value)) {
    throw unread(slug, `\`${key}\` is a ${typeof value} rather than the rows beside the page`)
  }
  const out: Record<string, unknown>[] = []
  for (const one of value) {
    if (typeof one !== "object" || one === null || Array.isArray(one)) {
      throw unread(slug, `a row under \`${key}\` is a ${typeof one} rather than a row`)
    }
    out.push(one as Record<string, unknown>)
  }
  return out
}

function conditionRowsIn(row: Record<string, unknown>, slug: string): readonly ConditionEntry[] {
  const out: ConditionEntry[] = []
  for (const one of rowsAt(row, "conditions", slug)) {
    const conditionField = textAt(one, "conditionField")
    const conditionValue = textAt(one, "conditionValue")
    if (conditionField === undefined || conditionValue === undefined) {
      const short = conditionField === undefined ? "conditionField" : "conditionValue"
      throw unread(
        slug,
        `a condition beside the page states no \`${short}\`, and leaving it out would keep the ` +
          `rule its action with one condition fewer, so the rule would match more than it says`
      )
    }
    out.push({ conditionField, conditionValue })
  }
  return out
}

function chainRowsIn(row: Record<string, unknown>, slug: string): readonly ChainEntry[] {
  const out: ChainEntry[] = []
  for (const one of rowsAt(row, "destinationChain", slug)) {
    const destination = textAt(one, "destination")
    if (destination === undefined) {
      throw unread(
        slug,
        "a tier of the destination chain states no `destination`, and leaving it out would send " +
          "what that tier held on to the tier below it"
      )
    }
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

export function heldFromRow(row: Record<string, unknown>): HeldRule {
  const slug = textAt(row, "slug")
  if (slug === undefined) {
    throw new Error(
      "inventoryRuleFromPages: a rule row states no `slug`, so which rule it is cannot be said"
    )
  }
  const categoryId = textAt(row, "categoryId")
  const action = textAt(row, "action")
  const updatedAt = textAt(row, "updatedAt")
  const displayOrder = row.displayOrder
  if (categoryId === undefined) throw unread(slug, "the page states no `categoryId`")
  if (action === undefined) throw unread(slug, "the page states no `action`")
  if (updatedAt === undefined) throw unread(slug, "the page states no `updatedAt`")
  if (typeof displayOrder !== "number") {
    throw unread(
      slug,
      "the page states no `displayOrder`, so where the rule falls among the rules is unread"
    )
  }
  const page: RulePage = {
    slug,
    ...(textAt(row, "accountPage") === undefined
      ? {}
      : { accountPage: textAt(row, "accountPage") as string }),
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
    ...(typeof row.craftShortfall === "boolean" ? { craftShortfall: row.craftShortfall } : {}),
  }
  return { page, conditions: conditionRowsIn(row, slug), chain: chainRowsIn(row, slug) }
}

export function heldFromRows(rows: readonly Record<string, unknown>[]): readonly HeldRule[] {
  return rows.map((row) => heldFromRow(row))
}

export function ruleFromPage(held: HeldRule): CategoryRule {
  const page = held.page
  const conditions = conditionsOf(held.conditions ?? [], page.slug)
  const destinationChain = chainOf(held.chain ?? [], page.slug)
  return {
    id: page.slug.startsWith(SLUG_PREFIX) ? page.slug.slice(SLUG_PREFIX.length) : page.slug,
    categoryId: slugOf(page.categoryId),
    action: slugOf(page.action) as ItemAction,
    active: page.active,
    updatedAt: epochOf(page.updatedAt),
    ...(page.title === undefined ? {} : { title: page.title }),
    ...(page.description === undefined ? {} : { notes: page.description }),
    ...(page.goal === undefined ? {} : { goal: slugOf(page.goal) }),
    ...(page.locked === undefined ? {} : { locked: page.locked }),
    ...(page.destination === undefined
      ? {}
      : { destination: page.destination as MoveToDestination }),
    ...(page.stockScope === undefined ? {} : { stockScope: page.stockScope as StockScope }),
    ...(page.craftShortfall === undefined ? {} : { craftShortfall: page.craftShortfall }),
    ...(conditions === undefined ? {} : { conditions }),
    ...(destinationChain === undefined ? {} : { destinationChain }),
  }
}

export function rulesFromPages(held: readonly HeldRule[]): readonly CategoryRule[] {
  return [...held]
    .sort((one, two) => one.page.displayOrder - two.page.displayOrder)
    .map(ruleFromPage)
}
