import { getPage, getPages } from "@akasha/pages-access/get"
import { readFiles, readPages } from "@akasha/pages-query"
import { asRecord } from "@akasha/utils/narrow/as-record"
import { isRecord } from "@akasha/utils/narrow/is-record"
import type { AutomationSettings } from "akasha/temper/build-support/automation-settings/automation-settings.module.code.ts"
import { serializeLuaBlock } from "akasha/temper/saved-variables/lua-serializer/lua-serializer.module.code.ts"
import type { BackpackSettings } from "akasha/temper/temper-items-core/backpack-settings-types/backpack-settings-types.module.code.ts"
import { DEFAULT_BACKPACK_SETTINGS } from "akasha/temper/temper-items-core/backpack-settings-types/backpack-settings-types.module.code.ts"
import { compileRules } from "akasha/temper/temper-items-rules-core/inventory-rule-compiler/inventory-rule-compiler.module.code.ts"
import { buildAllControlledRules } from "akasha/temper/temper-items-rules-core/inventory-rule-controlled/inventory-rule-controlled.module.code.ts"
import type { HeldRule } from "akasha/temper/temper-items-rules-core/inventory-rule-from-pages/inventory-rule-from-pages.module.code.ts"
import {
  heldFromRows,
  rulesFromPages,
} from "akasha/temper/temper-items-rules-core/inventory-rule-from-pages/inventory-rule-from-pages.module.code.ts"
import { rulesToInventoryConfig } from "akasha/temper/temper-items-rules-core/inventory-rule-mapping/inventory-rule-mapping.module.code.ts"
import type { InventoryTimestamps } from "akasha/temper/temper-items-rules-core/inventory-settings-types/inventory-settings-types.module.code.ts"
import { ruleFingerprint } from "akasha/temper/temper-items-rules-core/rule-fingerprint/rule-fingerprint.module.code.ts"
import { log } from "../watcher-logging/watcher-logging.module.code.ts"
import type {
  ReadFiles,
  ReadPages,
} from "../watcher-page-landing/watcher-page-landing.module.code.ts"
import {
  besidePathsFor,
  contentIn,
} from "../watcher-page-landing/watcher-page-landing.module.code.ts"
import type { PricingTables } from "../watcher-pricing-tables/watcher-pricing-tables.module.code.ts"
import { computePricingTables } from "../watcher-pricing-tables/watcher-pricing-tables.module.code.ts"
import {
  compileBuyStock,
  compileCharacterPriority,
  compileConsumableStock,
  compileWantedConsumables,
  describeInventoryReadFailure,
  type InventoryRowReader,
  PAGE_INVENTORY_ROWS,
  readLatestInventory,
  type TargetBuildCharacterReader,
  toRuleSettings,
} from "../watcher-settings-consumables/watcher-settings-consumables.module.code.ts"
import {
  compileWantedCompanionEquipment,
  compileWantedEquipment,
  DEFAULT_PAGE_READER,
  type PageReader,
  readCharactersWithTargetBuilds,
} from "../watcher-settings-equipment/watcher-settings-equipment.module.code.ts"
import {
  detectIndent,
  replaceOrInsertLuaBlock,
} from "../watcher-settings-lua-block/watcher-settings-lua-block.module.code.ts"
import {
  toLoggingSettings,
  toSafetySettings,
} from "../watcher-settings-normalize/watcher-settings-normalize.module.code.ts"
import type { SideFileValues } from "../watcher-side-file/watcher-side-file.module.code.ts"
import {
  buildSideFileContent,
  writeSideFileIfChanged,
} from "../watcher-side-file/watcher-side-file.module.code.ts"
import {
  type SignedInReader,
  userIdFor,
} from "../watcher-signed-in-user/watcher-signed-in-user.module.code.ts"

const TEMPER_INVENTORY_SIBLINGS = ["db", "version"] as const

const TEMPER_PLAYER_PAGE_TYPE_SLUG = "temper-player"

const TEMPER_INVENTORY_RULE_PAGE_TYPE_SLUG = "temper-inventory-rule"

const SETTINGS_PROPERTY = "settings"

const SETTINGS_ENDING = "json"

const RULES_AT_MOST = 500

const INVENTORY_TYPE = "inventory"
const AUTOMATION_TYPE = "automation"
const LOGGING_TYPE = "logging"
const SAFETY_TYPE = "safety"
const BACKPACK_TYPE = "backpack"

const ALL_SETTING_TYPES = [
  INVENTORY_TYPE,
  AUTOMATION_TYPE,
  LOGGING_TYPE,
  SAFETY_TYPE,
  BACKPACK_TYPE,
] as const

const NOTHING_TO_EXPORT = "No settings to export."

export type Say = (message: string) => undefined

export interface ExportSettingsSeams {
  readonly say: Say
  readonly readPlayerSettings: (
    userId: string,
    types: readonly string[]
  ) => Promise<Record<string, unknown>>
  readonly readPlayerRules: (userId: string) => Promise<readonly HeldRule[]>
  readonly pricingTables: (say: Say) => Promise<PricingTables>
  readonly pages: PageReader
  readonly inventoryRows: InventoryRowReader
  readonly readCharacters: TargetBuildCharacterReader
  readonly writeSideFile: (path: string, content: string) => string
}

function toBackpackSettings(value: unknown): BackpackSettings {
  const held = asRecord(value)
  if (!held) return { ...DEFAULT_BACKPACK_SETTINGS }
  const wanted = held.bufferSlots
  const bufferSlots =
    typeof wanted === "number" && Number.isInteger(wanted) && wanted >= 0 && wanted <= 100
      ? wanted
      : DEFAULT_BACKPACK_SETTINGS.bufferSlots
  return { bufferSlots, autoStack: held.autoStack !== false }
}

function isAutomationSettings(value: unknown): value is AutomationSettings {
  const held = asRecord(value)
  if (!held) return false
  return isRecord(held.characters) && isRecord(held.companions)
}

export async function settingsBodyOf(
  slug: string,
  pages: ReadPages = readPages,
  files: ReadFiles = readFiles
): Promise<string | null> {
  const beside = await besidePathsFor(
    pages,
    TEMPER_PLAYER_PAGE_TYPE_SLUG,
    [slug],
    SETTINGS_PROPERTY,
    SETTINGS_ENDING
  )
  const path = beside.get(slug)
  if (path === undefined) return null
  const found = await files([path])
  if (!found.ok) {
    throw new Error(
      `the settings file beside ${TEMPER_PLAYER_PAGE_TYPE_SLUG}/${slug} went unread: ${found.why}`
    )
  }
  return contentIn(found.bodies, path)
}

export function settingsIn(body: string | null, types: readonly string[]): Record<string, unknown> {
  if (body === null || body.trim() === "") return {}
  let read: unknown
  try {
    read = JSON.parse(body)
  } catch (err) {
    const why = err instanceof Error ? err.message : String(err)
    throw new Error(
      `the settings beside the ${TEMPER_PLAYER_PAGE_TYPE_SLUG} page hold ${body.length} byte(s) that are not valid JSON: ${why}`
    )
  }
  const settings = asRecord(read)
  if (!settings) return {}
  const held: Record<string, unknown> = {}
  for (const type of types) {
    if (settings[type] !== undefined) held[type] = settings[type]
  }
  return held
}

async function readSettings(
  userId: string,
  types: readonly string[]
): Promise<Record<string, unknown>> {
  const page = await getPage({
    pageTypeSlug: TEMPER_PLAYER_PAGE_TYPE_SLUG,
    where: [{ key: "title", eq: userId }],
  })
  const slug = page?.slug
  if (typeof slug !== "string") return {}
  return settingsIn(await settingsBodyOf(slug), types)
}

async function readRules(userId: string): Promise<readonly HeldRule[]> {
  const { rows } = await getPages({
    pageTypeSlug: TEMPER_INVENTORY_RULE_PAGE_TYPE_SLUG,
    where: [{ key: "accountPage", eq: userId }],
    limit: RULES_AT_MOST,
  })
  return heldFromRows(rows)
}

const WATCHER_SEAMS: ExportSettingsSeams = {
  say: log,
  readPlayerSettings: readSettings,
  readPlayerRules: readRules,
  pricingTables: computePricingTables,
  pages: DEFAULT_PAGE_READER,
  inventoryRows: PAGE_INVENTORY_ROWS,
  readCharacters: readCharactersWithTargetBuilds,
  writeSideFile: writeSideFileIfChanged,
}

type RuleSettings = ReturnType<typeof toRuleSettings>

function withControlledRules(
  base: RuleSettings,
  automationSettings: AutomationSettings | undefined
): RuleSettings {
  if (automationSettings === undefined) return base
  const { characterRules, companionRules } = buildAllControlledRules(automationSettings)
  const controlledRules = [...characterRules, ...companionRules]
  if (controlledRules.length === 0) return base
  return { ...base, rules: [...controlledRules, ...base.rules] }
}

function timestampsOf(ruleSettings: RuleSettings): InventoryTimestamps {
  const timestamps: InventoryTimestamps = {}
  for (const rule of ruleSettings.rules) {
    if (rule.categoryId == null || rule.updatedAt == null) continue
    timestamps[ruleFingerprint(rule)] = Math.floor(rule.updatedAt / 1000)
  }
  return timestamps
}

function activeBuyItemIds(ruleSettings: RuleSettings): Set<number> {
  const itemIds = new Set<number>()
  for (const rule of ruleSettings.buyRules ?? []) {
    if (rule.active === false) continue
    itemIds.add(rule.itemId)
  }
  return itemIds
}

function suspendedBuyRules(buyItemIds: ReadonlySet<number>): string {
  const named = [...buyItemIds].join(", ")
  return `${buyItemIds.size} buy rule(s) suspended for item(s) ${named}: without an inventory snapshot the addon cannot tell what is already owned, so it will decline rather than buy.`
}

type InventoryValues = Pick<SideFileValues, "sell" | "sellTimestamps" | "sellCompiled">

async function compileInventoryValues(
  userId: string,
  inventoryValue: unknown,
  heldRules: readonly HeldRule[],
  automationSettings: AutomationSettings | undefined,
  seams: ExportSettingsSeams
): Promise<InventoryValues> {
  const say = seams.say
  const saved = toRuleSettings(inventoryValue)
  const ruleSettings = withControlledRules(
    { ...saved, rules: rulesFromPages(heldRules) },
    automationSettings
  )

  const [wantedEquipment, wantedCompanionEquipment] = await Promise.all([
    compileWantedEquipment(userId, automationSettings, seams.pages),
    compileWantedCompanionEquipment(userId, automationSettings, seams.pages),
  ])
  if (wantedEquipment.length > 0) {
    say(`Compiled ${wantedEquipment.length} wanted equipment signature(s).`)
  }
  if (wantedCompanionEquipment.length > 0) {
    say(`Compiled ${wantedCompanionEquipment.length} wanted companion equipment signature(s).`)
  }

  const inventoryRead = await readLatestInventory(userId, seams.inventoryRows)
  if (!inventoryRead.ok) {
    say(`inventory stock unavailable: ${describeInventoryReadFailure(inventoryRead.failure)}.`)
  }

  const wantedConsumables = await compileWantedConsumables(
    userId,
    automationSettings,
    seams.readCharacters
  )
  const consumableStock = compileConsumableStock(
    inventoryRead.ok ? inventoryRead.db : null,
    new Set(Object.keys(wantedConsumables).map(Number))
  )

  const buyItemIds = activeBuyItemIds(ruleSettings)
  const buyStock = compileBuyStock(inventoryRead, buyItemIds)

  const characterPriority = await compileCharacterPriority(userId, seams.readCharacters)
  if (characterPriority.length > 0) {
    say(`Compiled ${characterPriority.length} character(s) in priority order.`)
  }

  const compiled = compileRules(
    ruleSettings,
    wantedEquipment,
    wantedCompanionEquipment,
    wantedConsumables,
    consumableStock,
    characterPriority
  )

  const sell = rulesToInventoryConfig(ruleSettings)
  const sellTimestamps = timestampsOf(ruleSettings)
  if (buyItemIds.size === 0) return { sell, sellTimestamps, sellCompiled: compiled }

  if (!buyStock.available) say(suspendedBuyRules(buyItemIds))
  return {
    sell,
    sellTimestamps,
    sellCompiled: {
      ...compiled,
      buyStockAvailable: buyStock.available,
      buyStockByChar: buyStock.buyStockByChar,
      buyStockAccount: buyStock.buyStockAccount,
    },
  }
}

export interface ExportSettingsResult {
  content: string
  modified: boolean
  inventoryConfigSideFileHash: string | null
}

export async function runExportSettings(
  content: string,
  supabase: SignedInReader,
  options: { userId?: string; dryRun?: boolean; inventoryConfigPath?: string } = {},
  seams: ExportSettingsSeams = WATCHER_SEAMS
): Promise<ExportSettingsResult> {
  const dryRun = options.dryRun ?? false
  const say = seams.say
  const userId = await userIdFor(supabase, options.userId, "export these settings")

  const [settingsByType, heldRules] = await Promise.all([
    seams.readPlayerSettings(userId, ALL_SETTING_TYPES),
    seams.readPlayerRules(userId),
  ])
  const named = Object.keys(settingsByType)
  if (named.length === 0 && heldRules.length === 0) {
    say(NOTHING_TO_EXPORT)
    return { content, modified: false, inventoryConfigSideFileHash: null }
  }
  if (named.length > 0) say(`settings to export: ${named.join(", ")}`)
  say(`rules to export: ${heldRules.length}`)

  const automationValue = settingsByType[AUTOMATION_TYPE]
  const automationSettings = isAutomationSettings(automationValue) ? automationValue : undefined

  const inventoryValue = settingsByType[INVENTORY_TYPE]
  const inventoryValues: InventoryValues =
    inventoryValue === undefined && heldRules.length === 0
      ? {}
      : await compileInventoryValues(userId, inventoryValue, heldRules, automationSettings, seams)

  const { currencyRates, crownReplacementCosts } = await seams.pricingTables(say)

  const values: Record<string, unknown> & SideFileValues = {
    ...inventoryValues,
    logging: toLoggingSettings(settingsByType[LOGGING_TYPE] ?? null),
    safety: toSafetySettings(settingsByType[SAFETY_TYPE] ?? null),
    ...(automationSettings === undefined ? {} : { automation: automationSettings }),
    backpack: toBackpackSettings(settingsByType[BACKPACK_TYPE] ?? null),
    currencyRates,
    crownReplacementCosts,
  }

  const indent = detectIndent(content.split("\n"), "sell", TEMPER_INVENTORY_SIBLINGS)
  let lines: readonly string[] = content.split("\n")
  for (const [key, value] of Object.entries(values)) {
    const block = serializeLuaBlock(key, value, indent)
    if (dryRun) {
      say(`generated lua block ${key}:`)
      for (const line of block) say(line)
    }
    lines = replaceOrInsertLuaBlock(lines, key, block, TEMPER_INVENTORY_SIBLINGS)
  }

  const modifiedContent = lines.join("\n")
  const sideFilePath = options.inventoryConfigPath
  const inventoryConfigSideFileHash =
    sideFilePath == null || dryRun
      ? null
      : seams.writeSideFile(sideFilePath, buildSideFileContent(values))

  return {
    content: modifiedContent,
    modified: modifiedContent !== content,
    inventoryConfigSideFileHash,
  }
}
