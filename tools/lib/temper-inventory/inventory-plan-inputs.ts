import { readFile } from "node:fs/promises"
import { DataError } from "@shared/errors-core/exit"
import { savedVarsFile } from "@temper/shared-foundation-misc-eso-paths-resolve/eso-paths-resolve"
import { classifyItemToNodeIds, parseInventoryContent } from "./game-code.ts"
import type { InventoryDatabase } from "@temper/game-items-core/inventory-types"
import type { CompiledOrderedRule } from "@temper/game-items-rules-core/inventory-rule-compiler-types"
import type { ClassifiedInventoryItem } from "@temper/game-items-rules-core/inventory-rule-matcher-types"
import type { ItemRule } from "@temper/game-items-rules-core/inventory-rule-types"
import type { RuleMatcherContext } from "@temper/game-items-rules-core/rule-matcher-context-types"
import { type CharacterKnowledge, loadTemperCharactersFromPath } from "./parse-temper-characters.ts"
import {
  type CompiledInventoryConfig,
  parseTemperInventoryConfig,
} from "./parse-temper-inventory-config.ts"

export const DEFAULT_INVENTORY_PATH = savedVarsFile("TemperInventory.lua")
export const DEFAULT_CHARACTERS_PATH = savedVarsFile("TemperCharacters.lua")

export interface InventoryPlanInputs {
  readonly db: InventoryDatabase
  readonly orderedRules: readonly CompiledOrderedRule[]
  readonly itemRules: readonly ItemRule[]
  readonly context: RuleMatcherContext
  readonly classifiedItems: readonly ClassifiedInventoryItem[]
}

export async function loadInventoryPlanInputs(
  inventoryPath: string,
  charactersPath: string
): Promise<InventoryPlanInputs> {
  const inventoryContent = await readInventoryContent(inventoryPath)
  const db = parseInventoryContent(inventoryContent)
  const config = parseTemperInventoryConfig(inventoryContent)

  const characters = await loadTemperCharactersFromPath(charactersPath)
  const charactersById = new Map<string, CharacterKnowledge>(characters.map((c) => [c.id, c]))

  const context = buildMatcherContext(config, charactersById, db)
  const classifiedItems = classifyInventoryForMatcher(db)
  const orderedRules: readonly CompiledOrderedRule[] = config.orderedRules.map((rule, i) => ({
    ...rule,
    id: config.rules[i]?.id ?? `rule#${i}`,
  }))

  return { db, orderedRules, itemRules: [], context, classifiedItems }
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
  }
  const wantedConsumables = compileWantedConsumablesFromConfig(config.wantedConsumables)
  return {
    wantedEquipment: [],
    wantedCompanionEquipment: [],
    wantedConsumables,
    consumableStock: compileConsumableStock(db, wantedConsumables),
    bankStock: compileBankStock(db),
    characterLevels: new Map(),
    knownRecipesByCharacter,
    knownMotifsByCharacter,
    knownMotifsByStyleIdByCharacter,
    knownScriptsByCharacter,
    researchedTraitsByCharacter: new Map(),
    characterPriority: config.characterPriority,
    craftingLevels: new Map(),
    openCooldowns: new Map(),
    transmuteCrystalCap: undefined,
    transmuteCrystalAmount: undefined,
  }
}

function compileWantedConsumablesFromConfig(
  wanted: Record<string, unknown>
): Map<number, string[]> {
  const out = new Map<number, string[]>()
  for (const [itemIdStr, value] of Object.entries(wanted)) {
    const itemId = Number(itemIdStr)
    if (!Number.isFinite(itemId)) continue
    const charIds = toStringArray(value)
    if (charIds.length > 0) out.set(itemId, [...charIds])
  }
  return out
}

function toStringArray(value: unknown): readonly string[] {
  const raw = Array.isArray(value)
    ? value
    : typeof value === "object" && value !== null
      ? Object.values(value)
      : []
  return raw.filter((v): v is string => typeof v === "string")
}

function compileConsumableStock(
  db: InventoryDatabase,
  wantedConsumables: Map<number, string[]>
): Map<number, Map<string, number>> {
  const result = new Map<number, Map<string, number>>()
  if (wantedConsumables.size === 0) return result
  for (const [locationKey, location] of Object.entries(db.locations)) {
    if (!/^\d+$/.test(locationKey)) continue
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
  const bank = db.locations["Bank"]
  if (!bank) return result
  for (const slots of Object.values(bank.bags)) {
    for (const item of Object.values(slots)) {
      result.set(item.itemId, (result.get(item.itemId) ?? 0) + item.stackCount)
    }
  }
  return result
}

function classifyInventoryForMatcher(db: InventoryDatabase): readonly ClassifiedInventoryItem[] {
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
    throw new DataError(`could not read TemperInventory.lua at ${path}: ${reason}`)
  }
}
