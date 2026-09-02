import { getPage } from "@akasha/pages-access/get"
import type { SupabaseServiceRoleClient } from "@akasha/supabase-server/service-role"
import { asRecord } from "@akasha/utils-narrow/as-record"
import { isRecord } from "@akasha/utils-narrow/is-record"
import { DEFAULT_BACKPACK_SETTINGS } from "@temper/game-items-core/backpack-settings-types"
import { ruleFingerprint } from "@temper/game-items-rules-core/filters/rule-fingerprint"
import { compileRules } from "@temper/game-items-rules-core/inventory-rule-compiler"
import { buildAllControlledRules } from "@temper/game-items-rules-core/inventory-rule-controlled"
import { rulesToInventoryConfig } from "@temper/game-items-rules-core/inventory-rule-mapping"
import type { InventoryTimestamps } from "@temper/game-items-rules-core/inventory-settings-types"
import type { AutomationSettings } from "@temper/shared-engine/automation/automation-settings-types"
import { serializeLuaBlock } from "@akasha/temper-saved-variables/lua-serializer"
import {
  compileBuyStock,
  compileCharacterPriority,
  compileConsumableStock,
  compileWantedConsumables,
  describeInventoryReadFailure,
  readLatestInventory,
  toRuleSettings,
} from "./export-settings-consumables"
import {
  compileWantedCompanionEquipment,
  compileWantedEquipment,
} from "./export-settings-equipment"
import { detectIndent, replaceOrInsertLuaBlock } from "./export-settings-lua"
import { toLoggingSettings, toSafetySettings } from "./export-settings-normalize"
import {
  buildSideFileContent,
  type SideFileValues,
  writeSideFileIfChanged,
} from "./export-settings-side-file"
import { computePricingTables } from "./price-extracts"

const TEMPER_INVENTORY_SIBLINGS = ["db", "version"] as const

const SETTINGS_TYPE = "inventory"
const LOGGING_TYPE = "logging"
const SAFETY_TYPE = "safety"
const AUTOMATION_TYPE = "automation"
const BACKPACK_TYPE = "backpack"

const ALL_SETTING_TYPES = [
  SETTINGS_TYPE,
  AUTOMATION_TYPE,
  LOGGING_TYPE,
  SAFETY_TYPE,
  BACKPACK_TYPE,
] as const

const TEMPER_PLAYER_PAGE_TYPE_SLUG = "temper-player"

function toBackpackSettings(value: unknown): {
  bufferSlots: number
  autoStack: boolean
} {
  const v = asRecord(value)
  if (!v) return { ...DEFAULT_BACKPACK_SETTINGS }
  const bufferSlots =
    typeof v.bufferSlots === "number" &&
    Number.isInteger(v.bufferSlots) &&
    v.bufferSlots >= 0 &&
    v.bufferSlots <= 100
      ? v.bufferSlots
      : DEFAULT_BACKPACK_SETTINGS.bufferSlots
  const autoStack = v.autoStack !== false
  return { bufferSlots, autoStack }
}

function isAutomationSettings(value: unknown): value is AutomationSettings {
  const v = asRecord(value)
  if (!v) return false
  if (!isRecord(v.characters)) return false
  if (!isRecord(v.companions)) return false
  return true
}

async function readSettings(
  userId: string,
  types: readonly string[]
): Promise<Record<string, unknown>> {
  const page = await getPage({
    pageTypeSlug: TEMPER_PLAYER_PAGE_TYPE_SLUG,
    where: [{ key: "title", eq: userId }],
  })
  if (page == null) return {}
  const settings = asRecord(page.settings)
  if (!settings) return {}
  const result: Record<string, unknown> = {}
  for (const type of types) {
    if (settings[type] !== undefined) result[type] = settings[type]
  }
  return result
}

export interface ExportSettingsResult {
  content: string
  modified: boolean
  inventoryConfigSideFileHash: string | null
}

export async function runExportSettings(
  content: string,
  supabase: SupabaseServiceRoleClient,
  options: { userId?: string; dryRun?: boolean; inventoryConfigPath?: string } = {}
): Promise<ExportSettingsResult> {
  const dryRun = options.dryRun ?? false
  const inventoryConfigPath = options.inventoryConfigPath

  let userId = options.userId
  if (userId == null) {
    const userResult = await supabase.auth.getUser()
    if (userResult.error || !userResult.data.user) {
      throw new Error(
        `runExportSettings: not authenticated (${userResult.error?.message ?? "no user"})`
      )
    }
    userId = userResult.data.user.id
  }

  const settingsByType = await readSettings(userId, ALL_SETTING_TYPES)

  const inventoryValue = settingsByType[SETTINGS_TYPE]
  const automationValue = settingsByType[AUTOMATION_TYPE]
  const loggingValue = settingsByType[LOGGING_TYPE]
  const safetyValue = settingsByType[SAFETY_TYPE]
  const backpackValue = settingsByType[BACKPACK_TYPE]

  if (Object.keys(settingsByType).length === 0) {
    console.log("No settings to export.")
    return { content, modified: false, inventoryConfigSideFileHash: null }
  }

  console.log(`Processing settings: ${Object.keys(settingsByType).join(", ")}\n`)

  let automationSettings: AutomationSettings | undefined
  if (isAutomationSettings(automationValue)) {
    automationSettings = automationValue
  }

  let lines: readonly string[] = content.split("\n")
  const indent = detectIndent(lines, "sell", TEMPER_INVENTORY_SIBLINGS)

  const sideFileValues: SideFileValues = {}

  if (inventoryValue !== undefined) {
    const baseRuleSettings = toRuleSettings(inventoryValue)

    let ruleSettings = baseRuleSettings
    if (automationSettings) {
      const { characterRules, companionRules } = buildAllControlledRules(automationSettings)
      const controlledRules = [...characterRules, ...companionRules]
      if (controlledRules.length > 0) {
        ruleSettings = {
          ...baseRuleSettings,
          rules: [...controlledRules, ...baseRuleSettings.rules],
        }
      }
    }

    const inventoryConfig = rulesToInventoryConfig(ruleSettings)

    const inventoryTimestamps: InventoryTimestamps = {}
    for (const rule of ruleSettings.rules) {
      if (rule.categoryId != null && rule.updatedAt != null) {
        inventoryTimestamps[ruleFingerprint(rule)] = Math.floor(rule.updatedAt / 1000)
      }
    }

    const configBlock = serializeLuaBlock("sell", inventoryConfig, indent)
    const timestampsBlock = serializeLuaBlock("sellTimestamps", inventoryTimestamps, indent)

    const [wantedEquipment, wantedCompanionEquipment] = await Promise.all([
      compileWantedEquipment(userId, automationSettings),
      compileWantedCompanionEquipment(userId, automationSettings),
    ])

    if (wantedEquipment.length > 0) {
      console.log(`Compiled ${wantedEquipment.length} wanted equipment signature(s).`)
    }
    if (wantedCompanionEquipment.length > 0) {
      console.log(
        `Compiled ${wantedCompanionEquipment.length} wanted companion equipment signature(s).`
      )
    }

    const inventoryRead = await readLatestInventory(userId)
    const latestInventory = inventoryRead.ok ? inventoryRead.db : null
    if (!inventoryRead.ok) {
      console.warn(
        `  ⚠ Inventory stock unavailable: ${describeInventoryReadFailure(inventoryRead.failure)}.`
      )
    }

    const wantedConsumables = await compileWantedConsumables(userId, automationSettings)
    const wantedItemIds = new Set(Object.keys(wantedConsumables).map(Number))
    const consumableStock = compileConsumableStock(latestInventory, wantedItemIds)

    const buyItemIds = new Set<number>()
    for (const rule of ruleSettings.buyRules ?? []) {
      if (rule.active === false) continue
      buyItemIds.add(rule.itemId)
    }
    const {
      available: buyStockAvailable,
      buyStockByChar,
      buyStockAccount,
    } = compileBuyStock(inventoryRead, buyItemIds)

    const characterPriority = await compileCharacterPriority(userId)

    if (characterPriority.length > 0) {
      console.log(`Compiled ${characterPriority.length} character(s) in priority order.`)
    }

    const compiledConfig = compileRules(
      ruleSettings,
      wantedEquipment,
      wantedCompanionEquipment,
      wantedConsumables,
      consumableStock,
      characterPriority
    )

    if (buyItemIds.size > 0) {
      compiledConfig.buyStockAvailable = buyStockAvailable
      compiledConfig.buyStockByChar = buyStockByChar
      compiledConfig.buyStockAccount = buyStockAccount
      if (!buyStockAvailable) {
        console.warn(
          `  ⚠ ${buyItemIds.size} buy rule(s) suspended for item(s) ${[...buyItemIds].join(", ")}: without an inventory snapshot the addon cannot tell what is already owned, so it will decline rather than buy.`
        )
      }
    }

    const compiledBlock = serializeLuaBlock("sellCompiled", compiledConfig, indent)

    if (dryRun) {
      console.log("\nGenerated Lua config block:")
      for (const line of configBlock) console.log(line)
      console.log("\nGenerated Lua timestamps block:")
      for (const line of timestampsBlock) console.log(line)
      console.log("\nGenerated compiled config block:")
      for (const line of compiledBlock) console.log(line)
    }

    lines = replaceOrInsertLuaBlock(lines, "sell", configBlock, TEMPER_INVENTORY_SIBLINGS)
    lines = replaceOrInsertLuaBlock(
      lines,
      "sellTimestamps",
      timestampsBlock,
      TEMPER_INVENTORY_SIBLINGS
    )
    lines = replaceOrInsertLuaBlock(lines, "sellCompiled", compiledBlock, TEMPER_INVENTORY_SIBLINGS)

    sideFileValues.sell = inventoryConfig
    sideFileValues.sellTimestamps = inventoryTimestamps
    sideFileValues.sellCompiled = compiledConfig
  }

  {
    const loggingNormalized = toLoggingSettings(loggingValue ?? null)
    const loggingBlock = serializeLuaBlock("logging", loggingNormalized, indent)

    if (dryRun) {
      console.log("\nGenerated Lua logging block:")
      for (const line of loggingBlock) console.log(line)
    }

    lines = replaceOrInsertLuaBlock(lines, "logging", loggingBlock, TEMPER_INVENTORY_SIBLINGS)
    sideFileValues.logging = loggingNormalized
  }

  {
    const safetyNormalized = toSafetySettings(safetyValue ?? null)
    const safetyBlock = serializeLuaBlock("safety", safetyNormalized, indent)

    if (dryRun) {
      console.log("\nGenerated Lua safety block:")
      for (const line of safetyBlock) console.log(line)
    }

    lines = replaceOrInsertLuaBlock(lines, "safety", safetyBlock, TEMPER_INVENTORY_SIBLINGS)
    sideFileValues.safety = safetyNormalized
  }

  if (automationSettings !== undefined) {
    const automationBlock = serializeLuaBlock("automation", automationSettings, indent)

    if (dryRun) {
      console.log("\nGenerated Lua automation block:")
      for (const line of automationBlock) console.log(line)
    }

    lines = replaceOrInsertLuaBlock(lines, "automation", automationBlock, TEMPER_INVENTORY_SIBLINGS)
    sideFileValues.automation = automationSettings
  }

  {
    const backpackNormalized = toBackpackSettings(backpackValue ?? null)
    const backpackBlock = serializeLuaBlock("backpack", backpackNormalized, indent)

    if (dryRun) {
      console.log("\nGenerated Lua backpack block:")
      for (const line of backpackBlock) console.log(line)
    }

    lines = replaceOrInsertLuaBlock(lines, "backpack", backpackBlock, TEMPER_INVENTORY_SIBLINGS)
    sideFileValues.backpack = backpackNormalized
  }

  {
    const { currencyRates, crownReplacementCosts } = await computePricingTables()
    const currencyRatesBlock = serializeLuaBlock("currencyRates", currencyRates, indent)
    const crownReplacementCostsBlock = serializeLuaBlock(
      "crownReplacementCosts",
      crownReplacementCosts,
      indent
    )

    if (dryRun) {
      console.log("\nGenerated Lua currencyRates block:")
      for (const line of currencyRatesBlock) console.log(line)
      console.log("\nGenerated Lua crownReplacementCosts block:")
      for (const line of crownReplacementCostsBlock) console.log(line)
    }

    lines = replaceOrInsertLuaBlock(
      lines,
      "currencyRates",
      currencyRatesBlock,
      TEMPER_INVENTORY_SIBLINGS
    )
    lines = replaceOrInsertLuaBlock(
      lines,
      "crownReplacementCosts",
      crownReplacementCostsBlock,
      TEMPER_INVENTORY_SIBLINGS
    )
    sideFileValues.currencyRates = currencyRates
    sideFileValues.crownReplacementCosts = crownReplacementCosts
  }

  const modifiedContent = lines.join("\n")
  const modified = modifiedContent !== content

  let inventoryConfigSideFileHash: string | null = null
  if (inventoryConfigPath != null && !dryRun) {
    const sideFileContent = buildSideFileContent(sideFileValues)
    inventoryConfigSideFileHash = writeSideFileIfChanged(inventoryConfigPath, sideFileContent)
  }

  return { content: modifiedContent, modified, inventoryConfigSideFileHash }
}
