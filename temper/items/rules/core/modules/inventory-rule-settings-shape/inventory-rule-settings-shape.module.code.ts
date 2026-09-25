import {
  type CategoryRule,
  type InventoryRuleSettings,
  ITEM_ACTION_VALUES,
} from "akasha/temper/items/rules/core/modules/inventory-rule-types/inventory-rule-types.module.code.ts"
import { z } from "zod"

const SETTINGS_VERSION = 2

const ITEM_ACTION_SCHEMA = z.enum(ITEM_ACTION_VALUES)

const CategoryRuleSchema: z.ZodType<CategoryRule> = z
  .object({
    id: z.string(),
    categoryId: z.string(),
    action: ITEM_ACTION_SCHEMA,
    active: z.boolean(),
  })
  .passthrough()

export const InventoryRuleSettingsShape: z.ZodType<InventoryRuleSettings> = z
  .object({
    version: z.literal(SETTINGS_VERSION),
    rules: z.array(CategoryRuleSchema).readonly(),
  })
  .passthrough()
