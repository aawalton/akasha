import type { BuyRule } from "@akasha/temper-items-rules-core/buy-rule-types"
import type {
  CategoryRule,
  InventoryRuleSettings,
  ItemRule,
} from "@akasha/temper-items-rules-core/inventory-rule-types"
import { z } from "zod"

const SETTINGS_VERSION = 2

const ITEM_ACTION_SCHEMA = z.enum([
  "nothing",
  "lock",
  "unlock",
  "move-to",
  "stock",
  "character-equip",
  "companion-equip",
  "deconstruct",
  "refine",
  "destroy",
  "fence-launder",
  "fence-sell",
  "list",
  "mail",
  "research",
  "sell",
  "use",
  "open",
])

const CategoryRuleSchema: z.ZodType<CategoryRule> = z
  .object({
    id: z.string(),
    categoryId: z.string(),
    action: ITEM_ACTION_SCHEMA,
  })
  .passthrough()

const ItemRuleSchema: z.ZodType<ItemRule> = z
  .object({
    id: z.string(),
    itemId: z.number(),
    itemName: z.string(),
    action: ITEM_ACTION_SCHEMA,
  })
  .passthrough()

const BUY_SOURCE_SCHEMA = z.enum(["merchant"])

const BuyRuleSchema: z.ZodType<BuyRule> = z
  .object({
    id: z.string(),
    itemId: z.number(),
    itemName: z.string(),
    targetQuantity: z.number(),
    source: BUY_SOURCE_SCHEMA,
  })
  .passthrough()

export const InventoryRuleSettingsShape: z.ZodType<InventoryRuleSettings> = z
  .object({
    version: z.literal(SETTINGS_VERSION),
    rules: z.array(CategoryRuleSchema).readonly(),
    itemRules: z.array(ItemRuleSchema).readonly().optional(),
    buyRules: z.array(BuyRuleSchema).readonly().optional(),
  })
  .passthrough()
