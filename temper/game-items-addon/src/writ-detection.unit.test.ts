import { describe, expect, test } from "bun:test"
import { classifyMasterWritQuest, type MasterWritConditionInfo } from "./writ-detection"

function masterCondition(craftType: number): MasterWritConditionInfo {
  return { masterItemId: 200000 + craftType, craftingType: craftType }
}

function equipmentMasterCondition(craftType: number): MasterWritConditionInfo {
  return { masterItemId: 0, craftingType: craftType }
}

const nonMasterCondition: MasterWritConditionInfo = {
  masterItemId: undefined,
  craftingType: undefined,
}

const zeroCondition: MasterWritConditionInfo = { masterItemId: 0, craftingType: 0 }

describe("classifyMasterWritQuest", () => {
  test("admits a real accepted master writ and returns its craft type", () => {
    expect(classifyMasterWritQuest(false, [masterCondition(1)])).toBe(1)
  })

  test("admits master writs across all seven craft types", () => {
    for (let craftType = 1; craftType <= 7; craftType++) {
      expect(classifyMasterWritQuest(false, [masterCondition(craftType)])).toBe(craftType)
    }
  })

  test("admits an equipment master writ (masterItemId 0, non-zero craft type)", () => {
    expect(classifyMasterWritQuest(false, [equipmentMasterCondition(1)])).toBe(1)
  })

  test("admits equipment master writs across the four equipment craft types", () => {
    for (const craftType of [1, 2, 6, 7]) {
      expect(classifyMasterWritQuest(false, [equipmentMasterCondition(craftType)])).toBe(craftType)
    }
  })

  test("returns the first master-writ condition's craft type when several exist", () => {
    expect(classifyMasterWritQuest(false, [masterCondition(6), masterCondition(2)])).toBe(6)
  })

  test("finds the master-writ condition past leading non-master conditions", () => {
    expect(classifyMasterWritQuest(false, [nonMasterCondition, masterCondition(3)])).toBe(3)
  })

  test("rejects a daily writ / certification quest (no master-writ condition)", () => {
    expect(classifyMasterWritQuest(false, [nonMasterCondition])).toBeUndefined()
    expect(classifyMasterWritQuest(false, [zeroCondition])).toBeUndefined()
  })

  test("rejects a quest with no conditions at all", () => {
    expect(classifyMasterWritQuest(false, [])).toBeUndefined()
  })

  test("rejects an ending-step (turn-in) master writ", () => {
    expect(classifyMasterWritQuest(true, [masterCondition(4)])).toBeUndefined()
  })

  test("rejects a condition with a master item id but zero craft type", () => {
    expect(
      classifyMasterWritQuest(false, [{ masterItemId: 200001, craftingType: 0 }])
    ).toBeUndefined()
  })

  test("admits a condition with a craft type and no master item id", () => {
    expect(classifyMasterWritQuest(false, [{ masterItemId: undefined, craftingType: 5 }])).toBe(5)
  })
})
