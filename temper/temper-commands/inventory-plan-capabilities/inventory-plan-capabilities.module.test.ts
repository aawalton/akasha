import { describe, expect, test } from "bun:test"
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
  utilsNarrow,
} from "./inventory-plan-capabilities.module.code.ts"

describe("planInputs", () => {
  test("hands over the two default saved variables paths and the two loaders", async () => {
    const held = await planInputs()
    expect(held.DEFAULT_INVENTORY_PATH).toContain("TemperInventory.lua")
    expect(held.DEFAULT_CHARACTERS_PATH).toContain("TemperCharacters.lua")
    expect(typeof held.loadInventoryPlanInputs).toBe("function")
    expect(typeof held.buildMatcherContext).toBe("function")
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
    expect(Object.keys(await utilsNarrow())).toEqual(["assertNever"])
  })

  test("the capacity filter is handed over with and without its audit", async () => {
    const held = await capacityFilter()
    expect(typeof held.applyDestinationCapacityFilter).toBe("function")
    expect(typeof held.applyDestinationCapacityFilterWithAudit).toBe("function")
  })

  test("a config is parsed from content or read from a path", async () => {
    const held = await parseConfig()
    expect(typeof held.parseTemperInventoryConfig).toBe("function")
    expect(typeof held.loadTemperInventoryConfigFromPath).toBe("function")
  })
})
