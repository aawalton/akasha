import { describe, expect, test } from "bun:test"
import { holdRecipeCatalogFromCheckout } from "akasha/temper/catalog/pursuit/temper-recipe-list/modules/recipe-list-catalog/recipe-list-catalog.module.test-fixtures.ts"
import {
  capacityFilter,
  classifyItem,
  inventoryParser,
  managementPlan,
  parseCharacters,
  parseConfig,
  planChecklist,
  planInputs,
  ruleMatcher,
} from "akasha/temper/command/modules/inventory-plan-capabilities/inventory-plan-capabilities.module.code.ts"
import { holdItemCategoryTreeFromCheckout } from "akasha/temper/items/core/modules/item-category-tree/item-category-tree.module.test-fixtures.ts"
import { holdKeyedTitlesFromCheckout } from "akasha/temper/items/core/modules/keyed-titles/keyed-titles.module.test-fixtures.ts"
import { temperVenue } from "akasha/temper/items/rules/routing/core/temper-venue/temper-venue.page-type.ts"
import { holdSkillCatalogFromCheckout } from "akasha/temper/player/character/skill/modules/held-skill-catalog/held-skill-catalog.module.test-fixtures.ts"
import { temperItemAction } from "akasha/temper/player/progress/temper-item-action/temper-item-action.page-type.ts"

holdRecipeCatalogFromCheckout()
holdSkillCatalogFromCheckout()
holdKeyedTitlesFromCheckout(temperVenue.slug)
holdKeyedTitlesFromCheckout(temperItemAction.slug)
holdItemCategoryTreeFromCheckout()

describe("planInputs", () => {
  test("hands over the two default saved variables paths and the two loaders", async () => {
    const held = await planInputs()
    expect(held.DEFAULT_INVENTORY_PATH).toContain("TemperItems.lua")
    expect(held.DEFAULT_CHARACTERS_PATH).toContain("TemperCharacters.lua")
    expect(typeof held.loadInventoryPlanInputs).toBe("function")
    expect(typeof held.buildMatcherContext).toBe("function")
  })

  test("hands over the reader of the holdings stored on the account", async () => {
    expect(typeof (await planInputs()).storedHoldings).toBe("function")
  })
})

describe("the parts a plan run takes one at a time", () => {
  test("each part is handed over on its own", async () => {
    expect(Object.keys(await ruleMatcher())).toEqual(["computeAllRuleAffectedItems"])
    expect(Object.keys(await managementPlan())).toEqual(["buildManagementPlan"])
    expect(Object.keys(await planChecklist())).toEqual(["formatPlanChecklist"])
    expect(Object.keys(await classifyItem())).toEqual(["classifyItemToNodeIds"])
    expect(Object.keys(await inventoryParser())).toEqual(["parseInventoryContent"])
    expect(Object.keys(await parseCharacters())).toEqual(["loadTemperCharactersFromPath"])
  })

  test("the capacity filter is handed over with and without its audit", async () => {
    const held = await capacityFilter()
    expect(typeof held.applyDestinationCapacityFilter).toBe("function")
    expect(typeof held.applyDestinationCapacityFilterWithAudit).toBe("function")
  })

  test("a config is parsed from content or read from a path", async () => {
    const held = await parseConfig()
    expect(typeof held.parseTemperItemsConfig).toBe("function")
    expect(typeof held.loadTemperItemsConfigFromPath).toBe("function")
  })
})
