import { DataError } from "akasha/code/error/errors-core/modules/exit-code/exit-code.module.code.ts"
import { assertNever } from "akasha/code/type/narrowing/modules/assert-never/assert-never.module.code.ts"
import { savedVariablesRootSchema } from "akasha/temper/eso/saved-variable/modules/account-wide/account-wide.module.code.ts"
import { parseLuaSavedVariablesFile } from "akasha/temper/eso/saved-variable/modules/lua-parser/lua-parser.module.code.ts"
import {
  knownMotifChaptersByStyleFromLore,
  styleChapters,
} from "akasha/temper/items/core/modules/motif-chapter-set/motif-chapter-set.module.code.ts"
import { getScriptItemIdByName } from "akasha/temper/items/core/modules/script-knowledge-lookup/script-knowledge-lookup.module.code.ts"
import type { ItemKey } from "akasha/temper/items/rules/core/modules/use-destination-types/use-destination-types.module.code.ts"
import { loadSkillCatalog } from "akasha/temper/player/character/skill/modules/skill-catalog-loading/skill-catalog-loading.module.code.ts"
import { loadLoreLibrary } from "akasha/temper/player/completion/modules/held-lore-library-loading/held-lore-library-loading.module.code.ts"
import type { MorphCharacterCompletion } from "akasha/temper/player/skill-morph/access/modules/morph-completion-shapes/morph-completion-shapes.module.code.ts"
import type { MorphSkillLineProgressMap } from "akasha/temper/player/skill-morph/modules/character-morph-progress-eso/character-morph-progress-eso.module.code.ts"
import { z } from "zod"

type CharacterCurseState = "vampire" | "werewolf"

export interface CharacterKnowledge {
  readonly id: string
  readonly name: string | null
  readonly recipeResultItemIds: ReadonlySet<number>
  readonly motifChaptersByStyle: ReadonlyMap<number, ReadonlySet<number>>
  readonly unlockedScriptIds: ReadonlySet<number>
  readonly skillLineRanksByEsoLineId: ReadonlyMap<number, number>
  readonly researchedTraitsByCraftingType: ReadonlyMap<number, ReadonlyMap<string, boolean>>
  readonly curseState: CharacterCurseState | undefined
  readonly morphCompletion: MorphCharacterCompletion | undefined
}

const FILE_NAME = "TemperCharacters.lua"

const VARIABLES_NAME = "TemperCharacters_SavedVariables"

const ACCOUNT_MARK = "@"

const NUMBER_LIST_OR_RECORD_SCHEMA = z.union([
  z.array(z.unknown()),
  z.record(z.string(), z.unknown()),
])

const RECIPES_SCHEMA = z.record(z.string(), NUMBER_LIST_OR_RECORD_SCHEMA).optional()

const LORE_CATEGORY_SCHEMA = z.record(z.string(), NUMBER_LIST_OR_RECORD_SCHEMA)
const LORE_LIBRARY_SCHEMA = z.record(z.string(), LORE_CATEGORY_SCHEMA).optional()

const SCRIBING_SCRIPT_ENTRY_SCHEMA = z
  .object({ unlocked: z.boolean().optional(), name: z.string().optional() })
  .passthrough()

const SCRIBING_SCHEMA = z
  .object({
    scripts: z.record(z.string(), SCRIBING_SCRIPT_ENTRY_SCHEMA).optional(),
  })
  .passthrough()
  .optional()

const SKILL_LINE_PROGRESS_ENTRY_SCHEMA = z
  .object({ currentRank: z.number().optional(), skills: z.unknown().optional() })
  .passthrough()

const MORPH_VARIANT_SCHEMA = z
  .object({ name: z.string(), rank: z.number().optional() })
  .passthrough()

const MORPH_SKILL_SCHEMA = z
  .object({
    base: MORPH_VARIANT_SCHEMA,
    morph1: MORPH_VARIANT_SCHEMA,
    morph2: MORPH_VARIANT_SCHEMA,
  })
  .passthrough()

const SKILL_LINE_PROGRESS_SCHEMA = z.record(z.string(), SKILL_LINE_PROGRESS_ENTRY_SCHEMA).optional()

const TRAIT_SCHEMA = z
  .object({ name: z.string().optional(), known: z.boolean().optional() })
  .passthrough()

const TRAIT_LINE_SCHEMA = z
  .object({ traits: z.record(z.string(), TRAIT_SCHEMA).optional() })
  .passthrough()

const TRAIT_CRAFTING_TYPE_SCHEMA = z
  .object({ lines: z.record(z.string(), TRAIT_LINE_SCHEMA).optional() })
  .passthrough()

const TRAIT_RESEARCH_SCHEMA = z.record(z.string(), TRAIT_CRAFTING_TYPE_SCHEMA).optional()

const CHARACTER_RECORD_SCHEMA = z
  .object({
    name: z.string().optional(),
    classId: z.number().optional().catch(undefined),
    raceId: z.number().optional().catch(undefined),
    recipes: RECIPES_SCHEMA,
    loreLibrary: LORE_LIBRARY_SCHEMA,
    scribing: SCRIBING_SCHEMA,
    skillLineProgress: SKILL_LINE_PROGRESS_SCHEMA,
    traitResearch: TRAIT_RESEARCH_SCHEMA,
    curseState: z.string().optional(),
  })
  .passthrough()

const CHARACTERS_TABLE_SCHEMA = z.record(z.string(), CHARACTER_RECORD_SCHEMA)

const ACCOUNT_WIDE_SCHEMA = z
  .object({
    characters: CHARACTERS_TABLE_SCHEMA.optional(),
  })
  .passthrough()

const ROOT_SCHEMA = savedVariablesRootSchema(ACCOUNT_WIDE_SCHEMA)

const CRAFTING_MOTIFS_CATEGORY_INDEX = "2"

function valuesAsNumbers(listOrRecord: unknown): readonly number[] {
  if (Array.isArray(listOrRecord)) {
    const out: number[] = []
    for (const v of listOrRecord) {
      if (typeof v === "number") out.push(v)
    }
    return out
  }
  if (listOrRecord !== null && typeof listOrRecord === "object") {
    const out: number[] = []
    for (const v of Object.values(listOrRecord)) {
      if (typeof v === "number") out.push(v)
    }
    return out
  }
  return []
}

function collectRecipeResultIds(recipes: z.infer<typeof RECIPES_SCHEMA>): ReadonlySet<number> {
  const ids = new Set<number>()
  if (!recipes) return ids
  for (const listValue of Object.values(recipes)) {
    for (const id of valuesAsNumbers(listValue)) ids.add(id)
  }
  return ids
}

function collectMotifChaptersByStyle(
  loreLibrary: z.infer<typeof LORE_LIBRARY_SCHEMA>
): ReadonlyMap<number, ReadonlySet<number>> {
  const motifCategory = loreLibrary?.[CRAFTING_MOTIFS_CATEGORY_INDEX]
  if (!motifCategory) return new Map()
  const booksByCollection = new Map<number, Set<number>>()
  for (const [collectionKey, knownBooks] of Object.entries(motifCategory)) {
    const collection = Number(collectionKey)
    if (!Number.isInteger(collection)) continue
    booksByCollection.set(collection, new Set(valuesAsNumbers(knownBooks)))
  }
  return knownMotifChaptersByStyleFromLore(
    (collectionIndex, bookIndex) => booksByCollection.get(collectionIndex)?.has(bookIndex) === true
  )
}

function collectUnlockedScriptIds(scribing: z.infer<typeof SCRIBING_SCHEMA>): ReadonlySet<number> {
  const ids = new Set<number>()
  const scripts = scribing?.scripts
  if (!scripts) return ids
  for (const entry of Object.values(scripts)) {
    if (entry.unlocked !== true) continue
    const name = entry.name
    if (name === undefined || name === "") continue
    const itemId = getScriptItemIdByName(name)
    if (itemId !== undefined) ids.add(itemId)
  }
  return ids
}

function collectSkillLineRanks(
  progress: z.infer<typeof SKILL_LINE_PROGRESS_SCHEMA>
): ReadonlyMap<number, number> {
  const out = new Map<number, number>()
  if (!progress) return out
  for (const [lineKey, entry] of Object.entries(progress)) {
    const esoSkillLineId = Number(lineKey)
    if (!Number.isInteger(esoSkillLineId)) continue
    out.set(esoSkillLineId, entry.currentRank ?? 0)
  }
  return out
}

function collectMorphCompletion(
  classId: number | undefined,
  raceId: number | undefined,
  progress: z.infer<typeof SKILL_LINE_PROGRESS_SCHEMA>
): MorphCharacterCompletion | undefined {
  if (classId === undefined || raceId === undefined || !progress) return undefined
  const skillLineProgress: MorphSkillLineProgressMap = {}
  for (const [lineKey, entry] of Object.entries(progress)) {
    const esoSkillLineId = Number(lineKey)
    if (!Number.isInteger(esoSkillLineId)) continue
    const heldSkills = entry.skills
    if (heldSkills === null || typeof heldSkills !== "object") {
      skillLineProgress[esoSkillLineId] = {}
      continue
    }
    const skills: NonNullable<MorphSkillLineProgressMap[number]["skills"]> = {}
    for (const [skillKey, raw] of Object.entries(heldSkills)) {
      const parsed = MORPH_SKILL_SCHEMA.safeParse(raw)
      if (!parsed.success) continue
      const { base, morph1, morph2 } = parsed.data
      skills[Number(skillKey)] = {
        base: { name: base.name, rank: base.rank },
        morph1: { name: morph1.name, rank: morph1.rank },
        morph2: { name: morph2.name, rank: morph2.rank },
      }
    }
    skillLineProgress[esoSkillLineId] = { skills }
  }
  return { classId, raceId, skillLineProgress }
}

function collectResearchedTraits(
  traitResearch: z.infer<typeof TRAIT_RESEARCH_SCHEMA>
): ReadonlyMap<number, ReadonlyMap<string, boolean>> {
  const out = new Map<number, Map<string, boolean>>()
  if (!traitResearch) return out
  for (const [craftKey, craftingType] of Object.entries(traitResearch)) {
    const craftingTypeId = Number(craftKey)
    if (!Number.isInteger(craftingTypeId)) continue
    const researched = new Map<string, boolean>()
    for (const line of Object.values(craftingType.lines ?? {})) {
      for (const trait of Object.values(line.traits ?? {})) {
        const traitName = trait.name
        if (traitName === undefined || traitName === "") continue
        const key = traitName.toLowerCase()
        if (trait.known !== true) researched.set(key, false)
        else if (!researched.has(key)) researched.set(key, true)
      }
    }
    if (researched.size > 0) out.set(craftingTypeId, researched)
  }
  return out
}

function readCurseState(held: string | undefined): CharacterCurseState | undefined {
  return held === "vampire" || held === "werewolf" ? held : undefined
}

export function knownMotifChapters(
  held: CharacterKnowledge,
  styleId: number
): ReadonlySet<number> | undefined {
  return held.motifChaptersByStyle.get(styleId)
}

export function knownMotifStyleIds(held: CharacterKnowledge): ReadonlySet<number> {
  return new Set(held.motifChaptersByStyle.keys())
}

export function knowsItem(held: CharacterKnowledge, itemKey: ItemKey): boolean {
  switch (itemKey.kind) {
    case "recipe":
      return held.recipeResultItemIds.has(itemKey.resultItemId)
    case "motif": {
      const knownChapters = knownMotifChapters(held, itemKey.styleId)
      if (knownChapters === undefined) return false
      if (itemKey.chapterId === null) {
        const chapters = styleChapters(itemKey.styleId)
        if (chapters === undefined || chapters.length === 0) return false
        return knownChapters.size === chapters.length
      }
      return knownChapters.has(itemKey.chapterId)
    }
    case "script":
      return held.unlockedScriptIds.has(itemKey.scriptId)
    case "consumable":
      return false
    default:
      return assertNever(itemKey)
  }
}

export function parseTemperCharacters(content: string): ReadonlyArray<CharacterKnowledge> {
  const rawRoot = parseLuaSavedVariablesFile(content, VARIABLES_NAME)
  const root = ROOT_SCHEMA.parse(rawRoot)

  const defaultTable = root.Default
  if (!defaultTable) {
    throw new DataError(`${FILE_NAME}: missing Default table`)
  }

  const accountKeys = Object.keys(defaultTable).filter((one) => one.startsWith(ACCOUNT_MARK))
  if (accountKeys.length === 0) {
    throw new DataError(`${FILE_NAME}: no ${ACCOUNT_MARK}<account> entry under Default`)
  }

  let charactersTable: z.infer<typeof CHARACTERS_TABLE_SCHEMA> | undefined
  for (const key of accountKeys) {
    const characters = defaultTable[key]?.$AccountWide?.characters
    if (characters && Object.keys(characters).length > 0) {
      charactersTable = characters
      break
    }
  }

  if (!charactersTable) {
    throw new DataError(
      `${FILE_NAME}: no characters under any ${ACCOUNT_MARK}<account>/$AccountWide`
    )
  }

  const result: CharacterKnowledge[] = []
  for (const [id, record] of Object.entries(charactersTable)) {
    result.push({
      id,
      name: record.name ?? null,
      recipeResultItemIds: collectRecipeResultIds(record.recipes),
      motifChaptersByStyle: collectMotifChaptersByStyle(record.loreLibrary),
      unlockedScriptIds: collectUnlockedScriptIds(record.scribing),
      skillLineRanksByEsoLineId: collectSkillLineRanks(record.skillLineProgress),
      researchedTraitsByCraftingType: collectResearchedTraits(record.traitResearch),
      curseState: readCurseState(record.curseState),
      morphCompletion: collectMorphCompletion(
        record.classId,
        record.raceId,
        record.skillLineProgress
      ),
    })
  }
  return result
}

export async function loadTemperCharactersFromPath(
  path: string
): Promise<ReadonlyArray<CharacterKnowledge>> {
  const file = Bun.file(path)
  if (!(await file.exists())) {
    throw new DataError(`${FILE_NAME}: file not found at ${path}`)
  }
  let content: string
  try {
    content = await file.text()
  } catch (err) {
    const reason = err instanceof Error ? err.message : String(err)
    throw new DataError(`${FILE_NAME}: failed to read ${path} — ${reason}`)
  }
  await Promise.all([loadSkillCatalog(), loadLoreLibrary()])
  return parseTemperCharacters(content)
}
