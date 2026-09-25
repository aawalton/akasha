import { DataError } from "akasha/code/error/errors-core/modules/exit-code/exit-code.module.code.ts"
import { savedVariablesRootSchema } from "akasha/temper/eso/saved-variable/modules/account-wide/account-wide.module.code.ts"
import { luaArrayOrEmpty } from "akasha/temper/eso/saved-variable/modules/lua-array/lua-array.module.code.ts"
import { parseLuaSavedVariablesFile } from "akasha/temper/eso/saved-variable/modules/lua-parser/lua-parser.module.code.ts"
import type {
  CompiledOrderedRule,
  WantedCompanionEquipmentSignature,
  WantedEquipmentSignature,
} from "akasha/temper/items/rules/core/modules/inventory-rule-compiler-types/inventory-rule-compiler-types.module.code.ts"
import {
  type CharEligibility,
  ITEM_ACTION_VALUES,
  type ItemRule,
  type MoveToDestination,
  type Tier,
} from "akasha/temper/items/rules/core/modules/inventory-rule-types/inventory-rule-types.module.code.ts"
import { RULE_CONSTANT_KEYS } from "akasha/temper/items/rules/core/modules/rule-constants/rule-constants.module.code.ts"
import { z } from "zod"

export interface CompiledRule {
  readonly id: string
  readonly action: string
  readonly conditions?: unknown
  readonly destination?: string
  readonly categoryId?: string
  readonly [extra: string]: unknown
}

export interface CompiledInventoryConfig {
  readonly rules: ReadonlyArray<CompiledRule>
  readonly orderedRules: ReadonlyArray<CompiledOrderedRule>
  readonly itemRules: ReadonlyArray<ItemRule>
  readonly wantedConsumables: Record<string, unknown>
  readonly wantedEquipment: ReadonlyArray<WantedEquipmentSignature>
  readonly wantedCompanionEquipment: ReadonlyArray<WantedCompanionEquipmentSignature>
  readonly characterPriority: ReadonlyArray<string>
}

const ITEM_RULE_ID_PREFIX = "item:"

function itemRuleIdFor(itemId: number): string {
  return `${ITEM_RULE_ID_PREFIX}${String(itemId)}`
}

const FILE_NAME = "TemperItems.lua"

const VARIABLES_NAME = "TemperInventory_SavedVariables"

const ACCOUNT_MARK = "@"

const ITEM_ACTION_SCHEMA = z.enum(ITEM_ACTION_VALUES)

const COMPARISON_OP_SCHEMA = z.enum(["<=", "<", ">=", ">", "=", "!="])

const RULE_CONSTANT_KEY_SCHEMA = z.lazy(() => z.enum(RULE_CONSTANT_KEYS))
const VALUE_THRESHOLD_SCHEMA = z.union([z.number(), RULE_CONSTANT_KEY_SCHEMA])

const CHARACTER_SCOPE_SCHEMA: z.ZodType<
  "current-character" | "any-character" | `character:${string}`
> = z
  .string()
  .refine(
    (v): v is "current-character" | "any-character" | `character:${string}` =>
      v === "current-character" || v === "any-character" || v.startsWith("character:"),
    {
      message:
        "expected 'current-character' | 'any-character' | 'character:<id>' (got non-conforming value)",
    }
  )
const COMPANION_SCOPE_SCHEMA = z.enum(["active-companion", "any-companion"])
const STOCK_SCOPE_SCHEMA = z.enum(["current-character", "any-character"])

const TIER_CHAR_ELIGIBILITY_SCHEMA: z.ZodType<CharEligibility> = z
  .object({
    requiredSkillLines: z
      .object({
        skillLineIds: luaArrayOrEmpty(z.string()).readonly(),
        mode: z.enum(["all-maxed", "any-not-maxed"]),
      })
      .optional(),
    canLevelMorphs: z.object({ mode: z.literal("can-level") }).optional(),
  })
  .passthrough()

const DESTINATION_TIER_SCHEMA: z.ZodType<Tier> = z
  .object({
    destination: z.custom<MoveToDestination>((one) => typeof one === "string" && one.length > 0),
    targetQuantity: z.number().optional(),
    charEligibility: TIER_CHAR_ELIGIBILITY_SCHEMA.optional(),
  })
  .passthrough()

const COMPILED_ORDERED_RULE_SCHEMA = z
  .object({
    id: z.string().optional(),
    categoryId: z.string(),
    action: ITEM_ACTION_SCHEMA,
    destination: z.string().optional(),

    maxQuality: z.number().optional(),
    qualityOp: COMPARISON_OP_SCHEMA.optional(),
    maxLevel: z.number().optional(),
    levelOp: COMPARISON_OP_SCHEMA.optional(),
    setSourceTypes: luaArrayOrEmpty(z.string()).readonly().optional(),

    bound: z.enum(["bound", "not-bound"]).optional(),
    bopTradeable: z.enum(["bop-tradeable", "not-bop-tradeable"]).optional(),
    questRelevant: z.enum(["quest-relevant", "not-quest-relevant"]).optional(),
    locked: z.enum(["locked", "not-locked"]).optional(),
    known: z.enum(["known", "not-known"]).optional(),
    canResearch: z.enum(["can-research", "cannot-research"]).optional(),
    researchScope: CHARACTER_SCOPE_SCHEMA.optional(),
    canInspire: z.enum(["can-inspire", "cannot-inspire"]).optional(),
    inspireScope: CHARACTER_SCOPE_SCHEMA.optional(),
    canUnlock: z.enum(["can-unlock", "cannot-unlock"]).optional(),
    unlockScope: CHARACTER_SCOPE_SCHEMA.optional(),
    canSell: z.literal("can-sell").optional(),
    canListAtGuildTrader: z.literal("can-list-at-guild-trader").optional(),
    canCompanionEquip: z.enum(["can-companion-equip", "cannot-companion-equip"]).optional(),
    isTargetEquip: z.enum(["is-target-equip", "not-target-equip"]).optional(),
    targetEquipScope: CHARACTER_SCOPE_SCHEMA.optional(),
    isTargetCompanionEquip: z
      .enum(["is-target-companion-equip", "not-target-companion-equip"])
      .optional(),
    targetCompanionEquipScope: COMPANION_SCOPE_SCHEMA.optional(),
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
    stockScope: STOCK_SCOPE_SCHEMA.optional(),
    itemNamePattern: z.string().optional(),

    stolen: z.enum(["stolen", "not-stolen"]).optional(),
    crafted: z.enum(["crafted", "not-crafted"]).optional(),
    reconstructed: z.enum(["reconstructed", "not-reconstructed"]).optional(),
    transmuted: z.enum(["transmuted", "not-transmuted"]).optional(),
    canOpen: z.literal("can-open").optional(),
    canGiveMaxRewards: z.literal("can-give-max-rewards").optional(),
    traits: luaArrayOrEmpty(z.string()).readonly().optional(),
    location: luaArrayOrEmpty(
      z.enum([
        "worn",
        "backpack",
        "bank",
        "craftbag",
        "housing-storage",
        "house",
        "companion",
        "guild",
      ])
    )
      .readonly()
      .optional(),
    potionEffects: luaArrayOrEmpty(z.string()).readonly().optional(),
    potionEffectsMode: z.enum(["all", "any"]).optional(),
    destinationChain: luaArrayOrEmpty(DESTINATION_TIER_SCHEMA).readonly().optional(),
  })
  .passthrough()

const COMPILED_ITEM_RULE_SCHEMA = z
  .object({
    action: ITEM_ACTION_SCHEMA,
    destination: z
      .custom<MoveToDestination>((one) => typeof one === "string" && one.length > 0)
      .optional(),
    targetQuantity: z.number().optional(),
    stockScope: STOCK_SCOPE_SCHEMA.optional(),
    destinationChain: luaArrayOrEmpty(DESTINATION_TIER_SCHEMA).readonly().optional(),
  })
  .passthrough()

const WANTED_CONSUMABLES_SCHEMA = z.record(z.string(), z.unknown())

const EQUIPMENT_SIGNATURE_FIELDS = {
  equipType: z.number(),
  traitType: z.number(),
  quality: z.number(),
  armorType: z.number().optional(),
  weaponType: z.number().optional(),
}

const WANTED_EQUIPMENT_SCHEMA: z.ZodType<WantedEquipmentSignature[]> = luaArrayOrEmpty(
  z.object({ esoCharId: z.string(), ...EQUIPMENT_SIGNATURE_FIELDS }).passthrough()
)

const WANTED_COMPANION_EQUIPMENT_SCHEMA: z.ZodType<WantedCompanionEquipmentSignature[]> =
  luaArrayOrEmpty(
    z.object({ companionName: z.string(), ...EQUIPMENT_SIGNATURE_FIELDS }).passthrough()
  )

const COMPILED_BLOCK_SCHEMA = z
  .object({
    orderedRules: luaArrayOrEmpty(COMPILED_ORDERED_RULE_SCHEMA).default([]),
    itemRules: z.record(z.string(), COMPILED_ITEM_RULE_SCHEMA).default({}),
    wantedConsumables: WANTED_CONSUMABLES_SCHEMA.default({}),
    wantedEquipment: WANTED_EQUIPMENT_SCHEMA.default([]),
    wantedCompanionEquipment: WANTED_COMPANION_EQUIPMENT_SCHEMA.default([]),
    characterPriority: luaArrayOrEmpty(z.string()).default([]),
  })
  .passthrough()

const ACCOUNT_WIDE_SCHEMA = z
  .object({
    sellCompiled: COMPILED_BLOCK_SCHEMA.optional(),
  })
  .passthrough()

const ROOT_SCHEMA = savedVariablesRootSchema(ACCOUNT_WIDE_SCHEMA)

function ruleIdFor(rule: { categoryId?: string }, index: number): string {
  return `${rule.categoryId ?? "rule"}#${index}`
}

export function parseTemperItemsConfig(content: string): CompiledInventoryConfig {
  const rawRoot = parseLuaSavedVariablesFile(content, VARIABLES_NAME)
  const root = ROOT_SCHEMA.parse(rawRoot)

  const defaultTable = root.Default
  if (!defaultTable) {
    throw new DataError(`${FILE_NAME}: missing Default table`)
  }

  const accountKeys = Object.keys(defaultTable).filter((one) => one.startsWith(ACCOUNT_MARK))
  if (accountKeys.length === 0) {
    throw new DataError(`${FILE_NAME}: no ${ACCOUNT_MARK}<account> entry under Default`)
  }

  let compiled: z.infer<typeof COMPILED_BLOCK_SCHEMA> | undefined
  for (const key of accountKeys) {
    const block = defaultTable[key]?.$AccountWide?.sellCompiled
    if (block) {
      compiled = block
      break
    }
  }

  if (!compiled) {
    throw new DataError(
      `${FILE_NAME}: no compiled rule config (sellCompiled) under any ${ACCOUNT_MARK}<account>/$AccountWide`
    )
  }

  const rules: CompiledRule[] = compiled.orderedRules.map((rule, index) => {
    const { id, ...rest } = rule
    return { ...rest, id: id ?? ruleIdFor(rule, index) }
  })

  const orderedRules: ReadonlyArray<CompiledOrderedRule> = compiled.orderedRules.map((rule) => {
    const { id, ...rest } = rule
    return id === undefined ? rest : { ...rest, id }
  })

  return {
    rules,
    orderedRules,
    itemRules: itemRulesFrom(compiled.itemRules),
    wantedConsumables: compiled.wantedConsumables,
    wantedEquipment: compiled.wantedEquipment,
    wantedCompanionEquipment: compiled.wantedCompanionEquipment,
    characterPriority: compiled.characterPriority,
  }
}

function itemRulesFrom(
  keyed: Record<string, z.infer<typeof COMPILED_ITEM_RULE_SCHEMA>>
): ReadonlyArray<ItemRule> {
  const out: ItemRule[] = []
  for (const [itemIdKey, entry] of Object.entries(keyed)) {
    const itemId = Number(itemIdKey)
    if (!Number.isInteger(itemId)) continue
    const rule: ItemRule = {
      id: itemRuleIdFor(itemId),
      itemId,
      itemName: "",
      action: entry.action,
    }
    if (entry.destination !== undefined) rule.destination = entry.destination
    if (entry.targetQuantity !== undefined) rule.stockQuantity = entry.targetQuantity
    if (entry.stockScope !== undefined) rule.stockScope = entry.stockScope
    if (entry.destinationChain !== undefined) rule.destinationChain = entry.destinationChain
    out.push(rule)
  }
  return out.sort((one, two) => one.itemId - two.itemId)
}

export async function loadTemperItemsConfigFromPath(
  path: string
): Promise<CompiledInventoryConfig> {
  const file = Bun.file(path)
  if (!(await file.exists())) {
    throw new DataError(`${FILE_NAME}: file not found at ${path}`)
  }
  let content: string
  try {
    content = await file.text()
  } catch (err) {
    const reason = err instanceof Error ? err.message : String(err)
    throw new DataError(`${FILE_NAME}: failed to read ${path} — ${reason}`)
  }
  return parseTemperItemsConfig(content)
}
