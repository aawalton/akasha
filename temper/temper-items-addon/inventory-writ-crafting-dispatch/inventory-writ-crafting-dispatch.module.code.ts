import { getInventoryConfig } from "../inventory-config/inventory-config.module.code.ts"
import { ADDON_NAME } from "../inventory-constants/inventory-constants.module.code.ts"
import { getActionReportLevel } from "../inventory-rules-core-report/inventory-rules-core-report.module.code.ts"
import { resolveAlchemyWrit } from "../inventory-writ-crafting-alchemy/inventory-writ-crafting-alchemy.module.code.ts"
import { resolveEnchantingWrit } from "../inventory-writ-crafting-enchanting/inventory-writ-crafting-enchanting.module.code.ts"
import { dispatchMasterWrit } from "../inventory-writ-crafting-master/inventory-writ-crafting-master.module.code.ts"
import { resolveProvisioningWrit } from "../inventory-writ-crafting-provisioning/inventory-writ-crafting-provisioning.module.code.ts"
import {
  enqueueWritCraft,
  type WritCraftRequest,
} from "../inventory-writ-crafting-queue/inventory-writ-crafting-queue.module.code.ts"
import { resolveSmithingWrit } from "../inventory-writ-crafting-smithing/inventory-writ-crafting-smithing.module.code.ts"
import {
  scanActiveMasterWrits,
  scanActiveWrits,
} from "../inventory-writ-detection/inventory-writ-detection.module.code.ts"
import {
  computeMasterWritEnabled,
  computeMasterWritToggles,
  computeWritToggles,
  type MasterWritToggles,
  type WritToggles,
} from "../inventory-writ-toggles/inventory-writ-toggles.module.code.ts"
export const SMITHING_CRAFT_TYPES = new LuaSet<number>()
SMITHING_CRAFT_TYPES.add(CRAFTING_TYPE_BLACKSMITHING)
SMITHING_CRAFT_TYPES.add(CRAFTING_TYPE_CLOTHIER)
SMITHING_CRAFT_TYPES.add(CRAFTING_TYPE_WOODWORKING)
SMITHING_CRAFT_TYPES.add(CRAFTING_TYPE_JEWELRYCRAFTING)

type WritToggleKey =
  | "dailyWritBlacksmithing"
  | "dailyWritClothier"
  | "dailyWritWoodworking"
  | "dailyWritJewelrycrafting"
  | "dailyWritEnchanting"
  | "dailyWritAlchemy"
  | "dailyWritProvisioning"

export const CRAFT_TYPE_TOGGLE: Record<number, WritToggleKey> = {
  [CRAFTING_TYPE_BLACKSMITHING]: "dailyWritBlacksmithing",
  [CRAFTING_TYPE_CLOTHIER]: "dailyWritClothier",
  [CRAFTING_TYPE_WOODWORKING]: "dailyWritWoodworking",
  [CRAFTING_TYPE_JEWELRYCRAFTING]: "dailyWritJewelrycrafting",
  [CRAFTING_TYPE_ENCHANTING]: "dailyWritEnchanting",
  [CRAFTING_TYPE_ALCHEMY]: "dailyWritAlchemy",
  [CRAFTING_TYPE_PROVISIONING]: "dailyWritProvisioning",
}

type MasterWritToggleKey =
  | "masterWritBlacksmithing"
  | "masterWritClothier"
  | "masterWritWoodworking"
  | "masterWritJewelrycrafting"
  | "masterWritEnchanting"
  | "masterWritAlchemy"
  | "masterWritProvisioning"

export const MASTER_CRAFT_TYPE_TOGGLE: Record<number, MasterWritToggleKey> = {
  [CRAFTING_TYPE_BLACKSMITHING]: "masterWritBlacksmithing",
  [CRAFTING_TYPE_CLOTHIER]: "masterWritClothier",
  [CRAFTING_TYPE_WOODWORKING]: "masterWritWoodworking",
  [CRAFTING_TYPE_JEWELRYCRAFTING]: "masterWritJewelrycrafting",
  [CRAFTING_TYPE_ENCHANTING]: "masterWritEnchanting",
  [CRAFTING_TYPE_ALCHEMY]: "masterWritAlchemy",
  [CRAFTING_TYPE_PROVISIONING]: "masterWritProvisioning",
}

function writDiag(this: void, msg: string): undefined {
  if (getActionReportLevel() !== "verbose") return
  d(`[${ADDON_NAME}] writ: ${msg}`)
}

export function getWritToggles(): WritToggles | undefined {
  return computeWritToggles(getInventoryConfig().automation, tostring(GetCurrentCharacterId()))
}

export function getMasterWritEnabled(this: void): boolean {
  return computeMasterWritEnabled(
    getInventoryConfig().automation,
    tostring(GetCurrentCharacterId())
  )
}

export function getMasterWritToggles(this: void): MasterWritToggles {
  return computeMasterWritToggles(
    getInventoryConfig().automation,
    tostring(GetCurrentCharacterId())
  )
}

export function dispatchWritCrafting(this: void): boolean {
  const stationType = GetCraftingInteractionType()
  if (stationType === 0) return false

  if (dispatchDailyWritAtStation(stationType) > 0) return true
  if (dispatchMasterWritAtStation(stationType) > 0) return true
  return false
}

function dispatchDailyWritAtStation(this: void, stationType: number): number {
  const toggles = getWritToggles()
  if (toggles === undefined) {
    writDiag("dailyWrits master toggle off (per-char and global)")
    return 0
  }
  if (!toggles.dailyWritAutoCraft) {
    writDiag("dailyWritAutoCraft off")
    return 0
  }

  const toggleKey = CRAFT_TYPE_TOGGLE[stationType]
  if (toggleKey !== undefined && !toggles[toggleKey]) {
    writDiag(`${toggleKey} off for station ${stationType}`)
    return 0
  }

  const writs = scanActiveWrits()
  const questIndex = writs.get(stationType)
  if (questIndex === undefined) {
    writDiag(`no active daily writ at station ${stationType}`)
    return 0
  }

  let enqueued: number
  if (SMITHING_CRAFT_TYPES.has(stationType)) {
    enqueued = dispatchPerConditionWrit(questIndex, resolveSmithingWrit)
  } else if (stationType === CRAFTING_TYPE_ENCHANTING) {
    enqueued = dispatchPerConditionWrit(questIndex, resolveEnchantingWrit)
  } else if (stationType === CRAFTING_TYPE_ALCHEMY) {
    enqueued = dispatchPerConditionWrit(questIndex, resolveAlchemyWrit)
  } else if (stationType === CRAFTING_TYPE_PROVISIONING) {
    enqueued = dispatchPerConditionWrit(questIndex, resolveProvisioningWrit)
  } else {
    enqueued = 0
  }
  if (enqueued === 0) {
    writDiag(`station ${stationType} daily quest ${questIndex}: no craftable plan resolved`)
    return 0
  }
  writDiag(`station ${stationType} daily quest ${questIndex}: enqueued ${enqueued} craft(s)`)
  return enqueued
}

function dispatchMasterWritAtStation(this: void, stationType: number): number {
  if (!getMasterWritEnabled()) {
    writDiag("masterWrits toggle off (per-char and global)")
    return 0
  }

  const masterToggleKey = MASTER_CRAFT_TYPE_TOGGLE[stationType]
  if (masterToggleKey !== undefined && !getMasterWritToggles()[masterToggleKey]) {
    writDiag(`${masterToggleKey} off for station ${stationType}`)
    return 0
  }

  const writs = scanActiveMasterWrits()
  const questIndex = writs.get(stationType)
  if (questIndex === undefined) {
    writDiag(`no active master writ at station ${stationType}`)
    return 0
  }

  const enqueued = dispatchMasterWrit(questIndex)
  if (enqueued === 0) {
    writDiag(
      `master writ quest ${questIndex} at station ${stationType}: nothing to craft (complete or unresolved)`
    )
    return 0
  }
  writDiag(`master writ quest ${questIndex}: enqueued ${enqueued} step(s)`)
  return enqueued
}

export function dispatchPerConditionWrit(
  questIndex: number,
  resolver: (questIndex: number, conditionIndex: number) => WritCraftRequest | undefined
): number {
  const numConditions = GetJournalQuestNumConditions(questIndex, 1)

  let enqueued = 0
  for (let c = 1; c <= numConditions; c++) {
    const request = resolver(questIndex, c)
    if (request !== undefined) {
      enqueueWritCraft(request)
      enqueued++
    }
  }
  return enqueued
}
