import { ITEM_CATEGORY_TREE } from "akasha/temper/items/core/modules/item-category-tree-data/item-category-tree-data.module.code.ts"
import type { ItemCategoryNode } from "akasha/temper/items/core/modules/item-category-tree-types/item-category-tree-types.module.code.ts"
import { buildConditionalActions } from "akasha/temper/items/rules/core/modules/conditional-actions/conditional-actions.module.code.ts"
import { buildCraftingMaterialActions } from "akasha/temper/items/rules/core/modules/crafting-material-actions/crafting-material-actions.module.code.ts"
import { buildEquipmentConfig } from "akasha/temper/items/rules/core/modules/equipment-config/equipment-config.module.code.ts"
import type {
  InventoryRules,
  ItemAction,
} from "akasha/temper/items/rules/core/modules/inventory-rule-types/inventory-rule-types.module.code.ts"
import type { InventoryConfig } from "akasha/temper/items/rules/core/modules/inventory-settings-types/inventory-settings-types.module.code.ts"
import { INVENTORY_CONFIG_DEFAULTS } from "akasha/temper/items/rules/core/modules/inventory-settings-types/inventory-settings-types.module.code.ts"
import { buildItemCategoryActions } from "akasha/temper/items/rules/core/modules/item-category-actions/item-category-actions.module.code.ts"
import { resolveRuleConditionStates } from "akasha/temper/items/rules/core/modules/rule-condition-states/rule-condition-states.module.code.ts"
import { collectDestinations } from "akasha/temper/items/rules/core/modules/rule-destinations/rule-destinations.module.code.ts"
import { collectTraitActions } from "akasha/temper/items/rules/core/modules/trait-actions/trait-actions.module.code.ts"

export function rulesToInventoryConfig(
  settings: InventoryRules,
  categories: Record<string, ItemCategoryNode> = ITEM_CATEGORY_TREE
): InventoryConfig {
  const activeRules = settings.rules.filter((r) => r.active !== false)
  const states = resolveRuleConditionStates(activeRules, categories)

  const action = (nodeId: string): ItemAction | false => {
    return states.unconditional[nodeId] ?? false
  }

  return {
    ...buildItemCategoryActions(action, states),
    equipment: buildEquipmentConfig(activeRules, action),
    ...buildCraftingMaterialActions(action),
    dailyLogin: { ...INVENTORY_CONFIG_DEFAULTS.dailyLogin },
    ...buildConditionalActions(states),
    traitActions: collectTraitActions(activeRules),
    destinations: collectDestinations(activeRules),
  }
}
