import { luaArrayOrEmpty } from "@akasha/temper-saved-variables/lua-array"
import { z } from "zod"
import { readInventoryDiagnostic } from "../inventory-diagnostics-reading/inventory-diagnostics-reading.module.code.ts"

const SIGNALS_SCHEMA = z
  .object({
    itemType: z.number(),
    specializedItemType: z.number().optional(),
    filterType: z.number(),
    traitType: z.number(),
    equipType: z.number(),
    armorType: z.number(),
    weaponType: z.number(),
    quality: z.number(),
  })
  .strict()

const CLASSIFICATION_SCHEMA = z
  .object({
    leafCategoryId: z.string(),
    ancestorChain: luaArrayOrEmpty(z.string()),
    categoryPath: z.string(),
  })
  .strict()

const MOTIF_LOOKUP_SCHEMA = z
  .object({
    rawName: z.string(),
    cleanName: z.string(),
    lookupHit: z.boolean(),
    coords: z.object({ collection: z.number(), book: z.number() }).strict().optional(),
  })
  .strict()

const ITEM_KEY_SCHEMA = z
  .object({
    kind: z.enum(["recipe", "motif", "script", "consumable", "collectible", "fragment", "none"]),
    detail: z.record(z.string(), z.union([z.number(), z.string(), z.boolean()])),
  })
  .strict()

const UNLOCK_WALK_SCHEMA = z
  .object({
    currentCharId: z.string(),
    priority: z
      .array(
        z
          .object({
            charId: z.string(),
            knows: z.union([z.boolean(), z.literal("no-data-treated-as-knows")]),
            chosen: z.boolean(),
          })
          .strict()
      )
      .readonly(),
    chosen: z.string().optional(),
  })
  .strict()

const ITEM_RULES_MATCH_SCHEMA = z
  .object({
    itemId: z.number(),
    action: z.string(),
    destination: z.string().optional(),
  })
  .strict()

const MATCHED_WALK_SCHEMA = z
  .object({
    index: z.number(),
    categoryId: z.string(),
    action: z.string(),
    destination: z.string(),
    conditions: z.string(),
  })
  .strict()

const REJECTION_SCHEMA = z
  .object({
    index: z.number(),
    categoryId: z.string(),
    action: z.string(),
    reason: z.enum([
      "category-miss",
      "conditions-fail",
      "destination-resolve-fail",
      "container-skip",
    ]),
    detail: z.string().optional(),
  })
  .strict()

const ORDERED_WALK_SCHEMA = z
  .object({
    rulesConsidered: z.number(),
    rulesEvaluated: z.number(),
    matched: MATCHED_WALK_SCHEMA.optional(),
    rejections: luaArrayOrEmpty(REJECTION_SCHEMA),
  })
  .strict()

const OUTCOME_SCHEMA = z
  .object({
    action: z.string(),
    destination: z.string(),
    summary: z.string(),
  })
  .strict()

const INVENTORY_LOC_SCHEMA = z
  .object({
    found: z.boolean(),
    bagId: z.number().optional(),
    slotIndex: z.number().optional(),
  })
  .strict()

const EXPLAIN_TRACE_SCHEMA = z
  .object({
    schemaVersion: z.number(),
    timestamp: z.number(),
    itemLink: z.string(),
    itemId: z.number(),
    itemName: z.string(),
    itemNameRaw: z.string(),
    inventory: INVENTORY_LOC_SCHEMA,
    signals: SIGNALS_SCHEMA,
    classification: CLASSIFICATION_SCHEMA,
    motifLookup: MOTIF_LOOKUP_SCHEMA.optional(),
    itemKey: ITEM_KEY_SCHEMA,
    unlockWalk: UNLOCK_WALK_SCHEMA.optional(),
    itemRulesMatch: ITEM_RULES_MATCH_SCHEMA.optional(),
    orderedWalk: ORDERED_WALK_SCHEMA,
    outcome: OUTCOME_SCHEMA,
    notes: luaArrayOrEmpty(z.string()),
  })
  .strict()

type ExplainTrace = z.infer<typeof EXPLAIN_TRACE_SCHEMA>

const DIAGNOSTICS_SCHEMA = z
  .object({
    lastExplain: EXPLAIN_TRACE_SCHEMA.optional(),
  })
  .passthrough()

const ACCOUNT_WIDE_SCHEMA = z
  .object({
    diagnostics: DIAGNOSTICS_SCHEMA.optional(),
  })
  .passthrough()

export async function readLastExplain(inventoryPath: string): Promise<ExplainTrace> {
  return await readInventoryDiagnostic(
    inventoryPath,
    ACCOUNT_WIDE_SCHEMA,
    (wide) => wide.diagnostics?.lastExplain,
    "no diagnostics.lastExplain (have you run the in-game explain keybind?)"
  )
}
