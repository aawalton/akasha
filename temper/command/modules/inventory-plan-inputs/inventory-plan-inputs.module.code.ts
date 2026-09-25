import { readFile } from "node:fs/promises"
import { DataError } from "akasha/code/error/errors-core/modules/exit-code/exit-code.module.code.ts"
import {
  type CharacterKnowledge,
  loadTemperCharactersFromPath,
} from "akasha/temper/command/modules/inventory-characters-reading/inventory-characters-reading.module.code.ts"
import {
  type CompiledInventoryConfig,
  parseTemperItemsConfig,
} from "akasha/temper/command/modules/inventory-config-reading/inventory-config-reading.module.code.ts"
import {
  accountInventory,
  type InventoryHeader,
  inventoryDatabase,
} from "akasha/temper/command/modules/inventory-reading/inventory-reading.module.code.ts"
import { savedVarsFile } from "akasha/temper/eso/path/modules/eso-paths-resolve/eso-paths-resolve.module.code.ts"
import { luaStringsOrEmpty } from "akasha/temper/eso/saved-variable/modules/lua-array/lua-array.module.code.ts"
import { classifyItemToNodeIds } from "akasha/temper/items/core/modules/classify-item-node-ids/classify-item-node-ids.module.code.ts"
import { parseInventoryContent } from "akasha/temper/items/core/modules/inventory-parser/inventory-parser.module.code.ts"
import type { InventoryDatabase } from "akasha/temper/items/core/modules/inventory-types/inventory-types.module.code.ts"
import type { CompiledOrderedRule } from "akasha/temper/items/rules/core/modules/inventory-rule-compiler-types/inventory-rule-compiler-types.module.code.ts"
import type { ClassifiedInventoryItem } from "akasha/temper/items/rules/core/modules/inventory-rule-matcher-types/inventory-rule-matcher-types.module.code.ts"
import type { ItemRule } from "akasha/temper/items/rules/core/modules/inventory-rule-types/inventory-rule-types.module.code.ts"
import type { RuleMatcherContext } from "akasha/temper/items/rules/core/modules/rule-matcher-context-types/rule-matcher-context-types.module.code.ts"
import { skillLines } from "akasha/temper/player/character/skill/line/modules/skill-lines/skill-lines.module.code.ts"

export const DEFAULT_INVENTORY_PATH = savedVarsFile("TemperItems.lua")
export const DEFAULT_CHARACTERS_PATH = savedVarsFile("TemperCharacters.lua")

const ACCOUNT_PAGE_TYPE = "temper-account"

const BANK = "Bank"

const WHOLE_NUMBER = /^\d+$/

interface InventoryPlanInputs {
  readonly db: InventoryDatabase
  readonly orderedRules: readonly CompiledOrderedRule[]
  readonly itemRules: readonly ItemRule[]
  readonly context: RuleMatcherContext
  readonly classifiedItems: readonly ClassifiedInventoryItem[]
}

export interface HoldingsStore {
  readonly accountInventory: (accountUserId: string) => Promise<InventoryHeader | null>
  readonly inventoryDatabase: (slug: string) => Promise<InventoryDatabase | null>
}

const STORE: HoldingsStore = { accountInventory, inventoryDatabase }

type StoredHoldings =
  | { readonly db: InventoryDatabase; readonly accountSlug: string }
  | { readonly refused: string }

export async function storedHoldings(
  accountUserId: string,
  store: HoldingsStore = STORE
): Promise<StoredHoldings> {
  const header = await store.accountInventory(accountUserId)
  if (header === null) {
    return {
      refused: `no ${ACCOUNT_PAGE_TYPE} page is reached by ${accountUserId}, so no holdings reading is stored`,
    }
  }
  const db = await store.inventoryDatabase(header.slug)
  if (db === null) {
    return { refused: `the account ${header.slug} carries no holdings reading a plan can read` }
  }
  return { db, accountSlug: header.slug }
}

export async function loadInventoryPlanInputs(
  inventoryPath: string,
  charactersPath: string
): Promise<InventoryPlanInputs> {
  const inventoryContent = await readInventoryContent(inventoryPath)
  const db = parseInventoryContent(inventoryContent)
  const config = parseTemperItemsConfig(inventoryContent)

  const characters = await loadTemperCharactersFromPath(charactersPath)
  const charactersById = new Map<string, CharacterKnowledge>(characters.map((one) => [one.id, one]))

  const context = buildMatcherContext(config, charactersById, db)
  const classifiedItems = classifyInventoryForMatcher(db)
  const orderedRules: readonly CompiledOrderedRule[] = config.orderedRules.map((rule, i) => ({
    ...rule,
    id: config.rules[i]?.id ?? `rule#${i}`,
  }))

  return { db, orderedRules, itemRules: config.itemRules, context, classifiedItems }
}

export function buildMatcherContext(
  config: CompiledInventoryConfig,
  charactersById: ReadonlyMap<string, CharacterKnowledge>,
  db: InventoryDatabase
): RuleMatcherContext {
  const knownRecipesByCharacter = new Map<string, Set<number>>()
  const knownMotifsByCharacter = new Map<string, Map<number, Set<number>>>()
  const knownMotifsByStyleIdByCharacter = new Map<string, Map<number, Set<number>>>()
  const knownScriptsByCharacter = new Map<string, Set<number>>()
  const researchedTraitsByCharacter = new Map<string, Map<number, Map<string, boolean>>>()
  for (const [charId, knowledge] of charactersById) {
    knownRecipesByCharacter.set(charId, new Set(knowledge.recipeResultItemIds))
    const motifMap = new Map<number, Set<number>>()
    for (const [styleId, chapters] of knowledge.motifChaptersByStyle) {
      motifMap.set(styleId, new Set(chapters))
    }
    knownMotifsByCharacter.set(charId, motifMap)
    const motifKnowledgeMap = new Map<number, Set<number>>()
    for (const [styleId, chapters] of knowledge.motifKnowledgeByStyle) {
      motifKnowledgeMap.set(styleId, new Set(chapters))
    }
    knownMotifsByStyleIdByCharacter.set(charId, motifKnowledgeMap)
    knownScriptsByCharacter.set(charId, new Set(knowledge.unlockedScriptIds))
    const researchedMap = new Map<number, Map<string, boolean>>()
    for (const [craftingType, researched] of knowledge.researchedTraitsByCraftingType) {
      researchedMap.set(craftingType, new Map(researched))
    }
    if (researchedMap.size > 0) researchedTraitsByCharacter.set(charId, researchedMap)
  }
  const wantedConsumables = compileWantedConsumablesFromConfig(config.wantedConsumables)
  return {
    wantedEquipment: config.wantedEquipment,
    wantedCompanionEquipment: config.wantedCompanionEquipment,
    wantedConsumables,
    consumableStock: compileConsumableStock(db, wantedConsumables),
    bankStock: compileBankStock(db),
    characterLevels: new Map(),
    knownRecipesByCharacter,
    knownMotifsByCharacter,
    knownMotifsByStyleIdByCharacter,
    knownScriptsByCharacter,
    researchedTraitsByCharacter,
    characterPriority: config.characterPriority,
    craftingLevels: compileCraftingLevels(db),
    openCooldowns: compileOpenCooldowns(db),
    transmuteCrystalCap: db.transmuteCrystalCap,
    transmuteCrystalAmount: db.transmuteCrystalAmount,
    getCharacterSkillLineRanks: (charId, skillLineId) =>
      skillLineRanksOf(charactersById, charId, skillLineId),
    getCharacterCurseState: (charId) => charactersById.get(charId)?.curseState,
  }
}

function skillLineRanksOf(
  charactersById: ReadonlyMap<string, CharacterKnowledge>,
  charId: string,
  skillLineId: string
): { readonly currentRank: number; readonly maxRank: number } | undefined {
  if (!skillLines.has(skillLineId)) return undefined
  const template = skillLines.data[skillLineId]
  if (template.esoSkillLineId <= 0) return undefined
  const currentRank = charactersById
    .get(charId)
    ?.skillLineRanksByEsoLineId.get(template.esoSkillLineId)
  if (currentRank === undefined) return undefined
  return { currentRank, maxRank: template.maxRank }
}

function compileCraftingLevels(db: InventoryDatabase): Map<string, Map<number, number>> {
  const result = new Map<string, Map<number, number>>()
  if (!db.craftingLevels) return result
  for (const [charId, perChar] of Object.entries(db.craftingLevels)) {
    const ranks = new Map<number, number>()
    for (const [craftKey, rank] of Object.entries(perChar)) {
      ranks.set(Number(craftKey), rank)
    }
    result.set(charId, ranks)
  }
  return result
}

function compileOpenCooldowns(db: InventoryDatabase): Map<string, number> {
  const result = new Map<string, number>()
  if (!db.openCooldowns) return result
  for (const [groupKey, expiresAt] of Object.entries(db.openCooldowns)) {
    result.set(groupKey, expiresAt)
  }
  return result
}

function compileWantedConsumablesFromConfig(
  wanted: Record<string, unknown>
): Map<number, string[]> {
  const out = new Map<number, string[]>()
  for (const [itemIdStr, value] of Object.entries(wanted)) {
    const itemId = Number(itemIdStr)
    if (!Number.isFinite(itemId)) continue
    const charIds = luaStringsOrEmpty(value)
    if (charIds.length > 0) out.set(itemId, [...charIds])
  }
  return out
}

function compileConsumableStock(
  db: InventoryDatabase,
  wantedConsumables: Map<number, string[]>
): Map<number, Map<string, number>> {
  const result = new Map<number, Map<string, number>>()
  if (wantedConsumables.size === 0) return result
  for (const [locationKey, location] of Object.entries(db.locations)) {
    if (!WHOLE_NUMBER.test(locationKey)) continue
    for (const slots of Object.values(location.bags)) {
      for (const item of Object.values(slots)) {
        if (!wantedConsumables.has(item.itemId)) continue
        let charStock = result.get(item.itemId)
        if (!charStock) {
          charStock = new Map<string, number>()
          result.set(item.itemId, charStock)
        }
        charStock.set(locationKey, (charStock.get(locationKey) ?? 0) + item.stackCount)
      }
    }
  }
  return result
}

function compileBankStock(db: InventoryDatabase): Map<number, number> {
  const result = new Map<number, number>()
  const bank = db.locations[BANK]
  if (!bank) return result
  for (const slots of Object.values(bank.bags)) {
    for (const item of Object.values(slots)) {
      result.set(item.itemId, (result.get(item.itemId) ?? 0) + item.stackCount)
    }
  }
  return result
}

export function classifyInventoryForMatcher(
  db: InventoryDatabase
): readonly ClassifiedInventoryItem[] {
  const out: ClassifiedInventoryItem[] = []
  for (const [locationKey, location] of Object.entries(db.locations)) {
    for (const [bagIdStr, slots] of Object.entries(location.bags)) {
      for (const item of Object.values(slots)) {
        out.push({
          item,
          locationKey,
          locationDisplayName: location.displayName,
          nodeIds: classifyItemToNodeIds(item),
          bagId: Number(bagIdStr),
        })
      }
    }
  }
  return out
}

async function readInventoryContent(path: string): Promise<string> {
  try {
    return await readFile(path, "utf8")
  } catch (err) {
    const reason = err instanceof Error ? err.message : String(err)
    throw new DataError(`could not read TemperItems.lua at ${path}: ${reason}`)
  }
}
