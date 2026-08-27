import { ITEM_CATEGORY_TREE } from "@temper/game-items-core/generated/item-category-tree.generated"
import type { ItemCategoryNode } from "@temper/game-items-core/item-category-tree-types"
import { buildConditionalActions } from "./inventory-config/conditional-actions"
import { buildCraftingMaterialActions } from "./inventory-config/crafting-material-actions"
import { buildEquipmentConfig } from "./inventory-config/equipment-config"
import { buildItemCategoryActions } from "./inventory-config/item-category-actions"
import { resolveRuleConditionStates } from "./inventory-config/rule-condition-states"
import { collectDestinations } from "./inventory-config/rule-destinations"
import { collectTraitActions } from "./inventory-config/trait-actions"
import type { InventoryRuleSettings, ItemAction } from "./inventory-rule-types"
import type { InventoryConfig } from "./inventory-settings-types"
import { INVENTORY_CONFIG_DEFAULTS } from "./inventory-settings-types"

export function rulesToInventoryConfig(
  settings: InventoryRuleSettings,
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
