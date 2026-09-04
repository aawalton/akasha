import { upsertPage } from "@akasha/pages-access/upsert"
import { decodeBuild, encodeBuild } from "@akasha/temper-build-codec/build-codec"
import type { ChampionPointId } from "@akasha/temper-champion-points/champion-point-source"
import type { CharacterState } from "@akasha/temper-character-build/build-types"
import { buildHash as toBuildHash } from "@akasha/temper-formula-framework/branded-id"
import { readFirstAccountWide } from "@akasha/temper-saved-variables/account-wide"
import { parseLuaSavedVariablesFile } from "@akasha/temper-saved-variables/lua-parser"
import { type SkillLineId, skillLines } from "@akasha/temper-skill-lines/skill-lines"
import { asRecord } from "@akasha/utils-narrow/as-record"
import { resolveAccountPageId } from "../watcher-account-page/watcher-account-page.module.code.ts"
import {
  type SignedInReader,
  userIdFor,
} from "../watcher-signed-in-user/watcher-signed-in-user.module.code.ts"

const CHARACTERS_GLOBAL = "TemperCharacters_SavedVariables"
const CHARACTER_PAGE_TYPE_SLUG = "temper-account-character"
const CP_SLOT_COUNT = 4

const KNOWN_SKILL_LINE_IDS = new Set<string>(skillLines.ids)

type ChampionPointTree = keyof CharacterState["championPoints"]
type ChampionPointTrees = CharacterState["championPoints"]

const NO_STAR_PLACEHOLDERS = {
  warfare: "no-warfare-star",
  fitness: "no-fitness-star",
  craft: "no-craft-star",
} as const satisfies Record<ChampionPointTree, ChampionPointId>

const CHAMPION_POINT_TREES = Object.keys(NO_STAR_PLACEHOLDERS) as readonly ChampionPointTree[]

export interface ParsedCharacterEntry {
  esoCharacterId: string
  characterName: string
  buildHash: string
}

export interface CharacterImportSkip {
  action: "skip"
  characterName: string
  reason: string
}

export interface CharacterImportUpsert {
  action: "upsert"
  characterName: string
  esoCharacterId: string
  canonicalHash: string
}

export type CharacterImportAction = CharacterImportSkip | CharacterImportUpsert

export interface CharacterImportPlan {
  actions: readonly CharacterImportAction[]
}

export type PageUpsert = typeof upsertPage

export type ReportLine = (line: string) => void

export interface CharacterImportSeams {
  upsert?: PageUpsert
  report?: ReportLine
}

export function keepKnownSkillLineIds(ids: readonly SkillLineId[]): readonly SkillLineId[] {
  return ids.filter((id) => KNOWN_SKILL_LINE_IDS.has(id))
}

export function padSlottedStars(
  slotted: readonly ChampionPointId[],
  tree: ChampionPointTree
): readonly ChampionPointId[] {
  const placeholder = NO_STAR_PLACEHOLDERS[tree]
  const missing = Math.max(0, CP_SLOT_COUNT - slotted.length)
  return [...slotted, ...Array<ChampionPointId>(missing).fill(placeholder)]
}

export function padEveryTree(championPoints: ChampionPointTrees): ChampionPointTrees {
  const padded = { ...championPoints }
  for (const tree of CHAMPION_POINT_TREES) {
    padded[tree] = {
      ...championPoints[tree],
      slotted: padSlottedStars(championPoints[tree].slotted, tree),
    }
  }
  return padded
}

export function parseCharacterSavedVariables(content: string): readonly ParsedCharacterEntry[] {
  const root = parseLuaSavedVariablesFile(content, CHARACTERS_GLOBAL)

  const defaultTable = asRecord(root.Default)
  if (!defaultTable) {
    throw new Error("Missing Default table in saved variables")
  }

  const accountWide = readFirstAccountWide(defaultTable)
  if (!accountWide) {
    throw new Error("Could not find $AccountWide in saved variables")
  }

  const charactersTable = asRecord(accountWide.characters) ?? {}

  const entries: ParsedCharacterEntry[] = []
  for (const [esoCharacterId, entry] of Object.entries(charactersTable)) {
    const record = asRecord(entry)
    if (!record) continue

    const buildHash = record.buildHash
    if (typeof buildHash !== "string") continue

    const characterName =
      typeof record.name === "string" ? record.name : `Character ${esoCharacterId}`

    entries.push({ esoCharacterId, characterName, buildHash })
  }

  return entries
}

export function toCharacterImportAction(entry: ParsedCharacterEntry): CharacterImportAction {
  const decoded = decodeBuild(toBuildHash(entry.buildHash))
  if (!decoded) {
    return {
      action: "skip",
      characterName: entry.characterName,
      reason: `failed to decode hash "${entry.buildHash}"`,
    }
  }

  const buildState: CharacterState = {
    ...decoded,
    name: entry.characterName,
    character: {
      ...decoded.character,
      name: entry.characterName,
      skillLineIds: keepKnownSkillLineIds(decoded.character.skillLineIds),
    },
    championPoints: padEveryTree(decoded.championPoints),
    account: { esoPlus: "no-eso-plus" },
  }

  return {
    action: "upsert",
    characterName: entry.characterName,
    esoCharacterId: entry.esoCharacterId,
    canonicalHash: encodeBuild(buildState),
  }
}

export function planCharacterImport(content: string): CharacterImportPlan {
  return { actions: parseCharacterSavedVariables(content).map(toCharacterImportAction) }
}

export async function executeCharacterImportPlan(
  plan: CharacterImportPlan,
  supabase: SignedInReader,
  options: { userId?: string } = {},
  seams: CharacterImportSeams = {}
): Promise<void> {
  if (plan.actions.length === 0) return

  const upsert = seams.upsert ?? upsertPage
  const report = seams.report ?? ((line: string) => console.log(line))

  const upserts = plan.actions.filter((a): a is CharacterImportUpsert => a.action === "upsert")
  const skips = plan.actions.filter((a): a is CharacterImportSkip => a.action === "skip")

  report(`Found ${plan.actions.length} character(s).\n`)

  const userId = await userIdFor(supabase, options.userId, "import these characters")

  await resolveAccountPageId(userId, upsert)

  for (const skip of skips) {
    report(`  ${skip.characterName}: ${skip.reason}, skipping`)
  }

  for (const action of upserts) {
    await upsert({
      pageTypeSlug: CHARACTER_PAGE_TYPE_SLUG,
      where: [
        { key: "accountPage", eq: userId },
        { key: "esoCharacterId", eq: action.esoCharacterId },
      ],
      set: {
        userId,
        accountPage: userId,
        esoCharacterId: action.esoCharacterId,
        title: action.characterName,
      },
      select: ["id"],
    })

    report(`  ${action.characterName}: captured hash ${action.canonicalHash}`)
  }

  report(`\n=== Summary ===`)
  report(`  Captured: ${upserts.length}`)
  if (skips.length > 0) report(`  Skipped:  ${skips.length}`)
}

export async function runImportCharacters(
  content: string,
  supabase: SignedInReader,
  options: { userId?: string } = {},
  seams: CharacterImportSeams = {}
): Promise<void> {
  await executeCharacterImportPlan(planCharacterImport(content), supabase, options, seams)
}
