import { DataError } from "akasha/alan/harness/errors-core/exit-code/exit-code.module.code.ts"
import { LORE_LIBRARY_DATA } from "akasha/temper/completion/lore-library-data/lore-library-data.module.code.ts"
import { parseMotifBookName } from "akasha/temper/items-core/motif-name-parser/motif-name-parser.module.code.ts"
import { parseLuaSavedVariablesFile } from "akasha/temper/saved-variables/lua-parser/lua-parser.module.code.ts"
import { savedVariablesRootSchema } from "akasha/temper/saved-variables/modules/account-wide/account-wide.module.code.ts"
import { z } from "zod"

export type CharacterCurseState = "vampire" | "werewolf"

export interface CharacterKnowledge {
  readonly id: string
  readonly name: string | null
  readonly recipeResultItemIds: ReadonlySet<number>
  readonly motifChaptersByStyle: ReadonlyMap<number, ReadonlySet<number>>
  readonly motifKnowledgeByStyle: ReadonlyMap<number, ReadonlySet<number>>
  readonly unlockedScriptIds: ReadonlySet<number>
  readonly skillLineRanksByEsoLineId: ReadonlyMap<number, number>
  readonly researchedTraitsByCraftingType: ReadonlyMap<number, ReadonlyMap<string, boolean>>
  readonly curseState: CharacterCurseState | undefined
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

const SCRIBING_SCRIPT_ENTRY_SCHEMA = z.object({ unlocked: z.boolean().optional() }).passthrough()

const SCRIBING_SCHEMA = z
  .object({
    scripts: z.record(z.string(), SCRIBING_SCRIPT_ENTRY_SCHEMA).optional(),
  })
  .passthrough()
  .optional()

const MOTIF_KNOWLEDGE_SCHEMA = z.record(z.string(), NUMBER_LIST_OR_RECORD_SCHEMA).optional()

const SKILL_LINE_PROGRESS_ENTRY_SCHEMA = z
  .object({ currentRank: z.number().optional() })
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
    recipes: RECIPES_SCHEMA,
    loreLibrary: LORE_LIBRARY_SCHEMA,
    motifKnowledge: MOTIF_KNOWLEDGE_SCHEMA,
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

const CRAFTING_MOTIFS_CATEGORY = 2

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

interface ParsedMotifCoord {
  readonly styleId: number
  readonly chapterId: number
}

const FILE_COORDS_TO_STYLE_CHAPTER: ReadonlyMap<string, ParsedMotifCoord> = (() => {
  const map = new Map<string, ParsedMotifCoord>()
  const category = LORE_LIBRARY_DATA.find((one) => one.categoryIndex === CRAFTING_MOTIFS_CATEGORY)
  if (!category) return map
  for (const collection of category.collections) {
    for (const book of collection.books) {
      const parsed = parseMotifBookName(book.name)
      if (parsed === undefined || parsed.chapterId === null) continue
      map.set(`${collection.collectionIndex}:${book.bookIndex}`, {
        styleId: parsed.styleId,
        chapterId: parsed.chapterId,
      })
    }
  }
  return map
})()

function collectMotifChaptersByStyle(
  loreLibrary: z.infer<typeof LORE_LIBRARY_SCHEMA>
): ReadonlyMap<number, ReadonlySet<number>> {
  const out = new Map<number, Set<number>>()
  if (!loreLibrary) return out
  const motifCategory = loreLibrary[CRAFTING_MOTIFS_CATEGORY_INDEX]
  if (!motifCategory) return out
  for (const [collectionKey, knownBooks] of Object.entries(motifCategory)) {
    const collection = Number(collectionKey)
    if (!Number.isInteger(collection)) continue
    for (const bookIndex of valuesAsNumbers(knownBooks)) {
      const parsed = FILE_COORDS_TO_STYLE_CHAPTER.get(`${collection}:${bookIndex}`)
      if (parsed === undefined) continue
      let chapterSet = out.get(parsed.styleId)
      if (chapterSet === undefined) {
        chapterSet = new Set<number>()
        out.set(parsed.styleId, chapterSet)
      }
      chapterSet.add(parsed.chapterId)
    }
  }
  return out
}

function collectMotifKnowledgeByStyle(
  motifKnowledge: z.infer<typeof MOTIF_KNOWLEDGE_SCHEMA>
): ReadonlyMap<number, ReadonlySet<number>> {
  const out = new Map<number, Set<number>>()
  if (!motifKnowledge) return out
  for (const [styleKey, chapters] of Object.entries(motifKnowledge)) {
    const styleId = Number(styleKey)
    if (!Number.isInteger(styleId)) continue
    const chapterSet = new Set<number>()
    for (const chapterId of valuesAsNumbers(chapters)) chapterSet.add(chapterId)
    if (chapterSet.size > 0) out.set(styleId, chapterSet)
  }
  return out
}

function collectUnlockedScriptIds(scribing: z.infer<typeof SCRIBING_SCHEMA>): ReadonlySet<number> {
  const ids = new Set<number>()
  const scripts = scribing?.scripts
  if (!scripts) return ids
  for (const [scriptKey, entry] of Object.entries(scripts)) {
    if (entry.unlocked !== true) continue
    const scriptId = Number(scriptKey)
    if (Number.isInteger(scriptId)) ids.add(scriptId)
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
      motifKnowledgeByStyle: collectMotifKnowledgeByStyle(record.motifKnowledge),
      unlockedScriptIds: collectUnlockedScriptIds(record.scribing),
      skillLineRanksByEsoLineId: collectSkillLineRanks(record.skillLineProgress),
      researchedTraitsByCraftingType: collectResearchedTraits(record.traitResearch),
      curseState: readCurseState(record.curseState),
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
  return parseTemperCharacters(content)
}
