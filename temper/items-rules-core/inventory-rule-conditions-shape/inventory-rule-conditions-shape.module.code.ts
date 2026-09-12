import type { CategoryRule } from "akasha/temper/items-rules-core/inventory-rule-types/inventory-rule-types.module.code.ts"
import { RULE_CONSTANT_KEYS } from "akasha/temper/items-rules-core/rule-constants/rule-constants.module.code.ts"
import { z } from "zod"

const COMPARISON_OP_SCHEMA = z.enum(["<", "<=", "=", ">=", ">"])

const RULE_CONSTANT_KEY_SCHEMA = z.lazy(() => z.enum(RULE_CONSTANT_KEYS))
const VALUE_THRESHOLD_SCHEMA = z.union([z.number(), RULE_CONSTANT_KEY_SCHEMA])

export type RuleConditions = NonNullable<CategoryRule["conditions"]>

export const CategoryRuleConditionsShape: z.ZodType<RuleConditions> = z
  .object({
    maxQuality: z.number().optional(),
    qualityOp: COMPARISON_OP_SCHEMA.optional(),
    traits: z.array(z.string()).readonly().optional(),
    location: z
      .enum([
        "worn",
        "backpack",
        "bank",
        "craftbag",
        "housing-storage",
        "house",
        "companion",
        "guild",
      ])
      .array()
      .readonly()
      .optional(),
    setSourceTypes: z.array(z.string()).readonly().optional(),
    maxLevel: z.number().optional(),
    levelOp: COMPARISON_OP_SCHEMA.optional(),
    stolen: z.enum(["stolen", "not-stolen"]).optional(),
    crafted: z.enum(["crafted", "not-crafted"]).optional(),
    bound: z.enum(["bound", "not-bound"]).optional(),
    bopTradeable: z.enum(["bop-tradeable", "not-bop-tradeable"]).optional(),
    questRelevant: z.enum(["quest-relevant", "not-quest-relevant"]).optional(),
    locked: z.enum(["locked", "not-locked"]).optional(),
    reconstructed: z.enum(["reconstructed", "not-reconstructed"]).optional(),
    transmuted: z.enum(["transmuted", "not-transmuted"]).optional(),
    known: z.enum(["known", "not-known"]).optional(),
    canInspire: z.enum(["can-inspire", "cannot-inspire"]).optional(),
    canResearch: z.enum(["can-research", "cannot-research"]).optional(),
    canUnlock: z.enum(["can-unlock", "cannot-unlock"]).optional(),
    canOpen: z.enum(["can-open"]).optional(),
    canSell: z.enum(["can-sell"]).optional(),
    canListAtGuildTrader: z.enum(["can-list-at-guild-trader"]).optional(),
    canGiveMaxRewards: z.enum(["can-give-max-rewards"]).optional(),
    canCompanionEquip: z.enum(["can-companion-equip", "cannot-companion-equip"]).optional(),
    isTargetEquip: z.enum(["is-target-equip", "not-target-equip"]).optional(),
    isTargetCompanionEquip: z
      .enum(["is-target-companion-equip", "not-target-companion-equip"])
      .optional(),
    allStocked: z.enum(["all-stocked", "not-all-stocked"]).optional(),
    stockThreshold: z.number().optional(),
    maxValue: z.number().optional(),
    minValue: z.number().optional(),
    value: VALUE_THRESHOLD_SCHEMA.optional(),
    valueOp: COMPARISON_OP_SCHEMA.optional(),
    marketValue: VALUE_THRESHOLD_SCHEMA.optional(),
    marketValueOp: COMPARISON_OP_SCHEMA.optional(),
    merchantValue: VALUE_THRESHOLD_SCHEMA.optional(),
    merchantValueOp: COMPARISON_OP_SCHEMA.optional(),
    replacementValue: VALUE_THRESHOLD_SCHEMA.optional(),
    replacementValueOp: COMPARISON_OP_SCHEMA.optional(),
    keepQuantity: z.number().optional(),
    targetQuantity: z.number().optional(),
    keepFloor: z.number().optional(),
    itemNamePattern: z.string().optional(),
    potionEffects: z.array(z.string()).readonly().optional(),
    potionEffectsMode: z.enum(["all", "any"]).optional(),
  })
  .passthrough()

export interface WrongCondition {
  readonly field: string
  readonly held: unknown
  readonly why: string
}

export type ConditionsRead =
  | { readonly taken: RuleConditions }
  | { readonly wrong: readonly WrongCondition[] }

export function conditionsTaken(held: Record<string, unknown>): ConditionsRead {
  const read = CategoryRuleConditionsShape.safeParse(held)
  if (read.success) return { taken: read.data }
  const wrong = read.error.issues.map((issue) => {
    const field = issue.path.join(".")
    return { field, held: held[String(issue.path[0])], why: issue.message }
  })
  return { wrong }
}

export function saidWrong(one: WrongCondition): string {
  const shown = JSON.stringify(one.held) ?? String(one.held)
  return `\`${one.field}\` holds ${shown}, and the shape that field declares refuses it: ${one.why}`
}
