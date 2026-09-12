import { InputError } from "akasha/alan/harness/errors-core/exit-code/exit-code.module.code.ts"
import type { BuySource } from "akasha/temper/items-rules-core/buy-rule-types/buy-rule-types.module.code.ts"
import {
  destinationFormsSaid,
  narrowDestination,
} from "akasha/temper/items-rules-core/inventory-destination-parse/inventory-destination-parse.module.code.ts"
import { CategoryRuleConditionsShape } from "akasha/temper/items-rules-core/inventory-rule-conditions-shape/inventory-rule-conditions-shape.module.code.ts"
import {
  type CategoryRule,
  type DestinationChain,
  ITEM_ACTION_VALUES,
  type ItemAction,
  type MoveToDestination,
  type StockScope,
} from "akasha/temper/items-rules-core/inventory-rule-types/inventory-rule-types.module.code.ts"
import { z } from "zod"

export const STOCK_SCOPE_VALUES = ["current-character", "any-character"] as const

export const BUY_SOURCE_VALUES: readonly BuySource[] = ["merchant"]

export function itemActionValues(): readonly ItemAction[] {
  return ITEM_ACTION_VALUES
}

export function narrowItemAction(value: string, flagName: string): ItemAction {
  const found = ITEM_ACTION_VALUES.find((one) => one === value)
  if (found === undefined) {
    throw new InputError(
      `${flagName}: invalid action '${value}' (expected one of: ${ITEM_ACTION_VALUES.join(", ")})`
    )
  }
  return found
}

export function narrowStockScope(value: string, flagName: string): StockScope {
  const found = STOCK_SCOPE_VALUES.find((one) => one === value)
  if (found === undefined) {
    throw new InputError(
      `${flagName}: invalid stock scope '${value}' (expected one of: ${STOCK_SCOPE_VALUES.join(", ")})`
    )
  }
  return found
}

export function narrowMoveToDestination(value: string, flagName: string): MoveToDestination {
  const found = narrowDestination(value)
  if (found === undefined) {
    throw new InputError(
      `${flagName}: invalid destination '${value}' (expected one of: ${destinationFormsSaid()})`
    )
  }
  return found
}

export function parseBooleanFlag(value: string | undefined, flagName: string): boolean | undefined {
  if (value === undefined) return undefined
  if (value === "true") return true
  if (value === "false") return false
  throw new InputError(`${flagName}: expected 'true' or 'false', got '${value}'`)
}

export function parseConditionsJson(
  raw: string | undefined
): CategoryRule["conditions"] | undefined {
  if (raw === undefined) return undefined
  try {
    return CategoryRuleConditionsShape.parse(JSON.parse(raw))
  } catch (err) {
    if (err instanceof SyntaxError) {
      throw new InputError(`--conditions: not valid JSON (${err.message})`)
    }
    throw new InputError(`--conditions: ${err instanceof Error ? err.message : String(err)}`)
  }
}

const TierCharEligibilitySchema = z
  .object({
    requiredSkillLines: z
      .object({
        skillLineIds: z.array(z.string()).readonly(),
        mode: z.enum(["all-maxed", "any-not-maxed"]),
      })
      .optional(),
    canLevelMorphs: z.object({ mode: z.literal("can-level") }).optional(),
  })
  .strict()

const TierSchema = z
  .object({
    destination: z.custom<MoveToDestination>((v) => typeof v === "string" && v.length > 0),
    targetQuantity: z.number().optional(),
    charEligibility: TierCharEligibilitySchema.optional(),
  })
  .strict()

const DestinationChainSchema: z.ZodType<DestinationChain> = z.array(TierSchema).readonly()

export function parseDestinationChainJson(raw: string | undefined): DestinationChain | undefined {
  if (raw === undefined) return undefined
  try {
    return DestinationChainSchema.parse(JSON.parse(raw))
  } catch (err) {
    if (err instanceof SyntaxError) {
      throw new InputError(`--destination-chain: not valid JSON (${err.message})`)
    }
    throw new InputError(`--destination-chain: ${err instanceof Error ? err.message : String(err)}`)
  }
}
