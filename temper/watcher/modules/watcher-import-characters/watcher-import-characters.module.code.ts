import { asRecord } from "akasha/code/type/narrowing/modules/as-record/as-record.module.code.ts"
import { stringsIn } from "akasha/code/type/narrowing/modules/strings-in/strings-in.module.code.ts"
import { upsertPage } from "akasha/page/access/modules/upsert/upsert.module.code.ts"
import type { ChampionPointId } from "akasha/temper/catalog/champion-point/modules/champion-point-source/champion-point-source.module.code.ts"
import { readFirstAccountWide } from "akasha/temper/eso/saved-variable/modules/account-wide/account-wide.module.code.ts"
import { parseLuaSavedVariablesFile } from "akasha/temper/eso/saved-variable/modules/lua-parser/lua-parser.module.code.ts"
import {
  decodeBuild,
  encodeBuild,
} from "akasha/temper/player/character/build/build-codec/modules/build-codec/build-codec.module.code.ts"
import type { CharacterState } from "akasha/temper/player/character/build/modules/build-types/build-types.module.code.ts"
import {
  type FiledCharacterBuild,
  fileCharacterBuilds,
} from "akasha/temper/player/character/character-build/modules/filing/character-build-filing.module.code.ts"
import { loadSetCatalog } from "akasha/temper/player/character/characters-equipment/modules/set-catalog-loading/set-catalog-loading.module.code.ts"
import { buildHash as toBuildHash } from "akasha/temper/player/character/formula-framework/modules/branded-id/branded-id.module.code.ts"
import {
  type SkillLineId,
  skillLines,
} from "akasha/temper/player/character/skill/line/modules/skill-lines/skill-lines.module.code.ts"
import { loadSkillCatalog } from "akasha/temper/player/character/skill/modules/skill-catalog-loading/skill-catalog-loading.module.code.ts"
import { accountAddressOf } from "akasha/temper/player/character/temper-account/modules/account-address/account-address.module.code.ts"
import {
  type RaceAndClass,
  raceAndClassNamed,
} from "akasha/temper/player/character/temper-account-character/modules/character-race-class/character-race-class.module.code.ts"
import { resolveAccountPageId } from "akasha/temper/watcher/modules/watcher-account-page/watcher-account-page.module.code.ts"
import {
  type BuildEdit,
  buildEditsIn,
  type EditedCharacter,
  landBuildEdits,
} from "akasha/temper/watcher/modules/watcher-build-edit-landing/watcher-build-edit-landing.module.code.ts"
import {
  type SignedInReader,
  userIdFor,
} from "akasha/temper/watcher/modules/watcher-signed-in-user/watcher-signed-in-user.module.code.ts"

const CHARACTERS_GLOBAL = "TemperCharacters_SavedVariables"
const CHARACTER_PAGE_TYPE_SLUG = "temper-account-character"
const CP_SLOT_COUNT = 4

type ChampionPointTree = keyof CharacterState["championPoints"]
type ChampionPointTrees = CharacterState["championPoints"]

const NO_STAR_PLACEHOLDERS = {
  warfare: "no-warfare-star",
  fitness: "no-fitness-star",
  craft: "no-craft-star",
} as const satisfies Record<ChampionPointTree, ChampionPointId>

const CHAMPION_POINT_TREES = Object.keys(NO_STAR_PLACEHOLDERS) as readonly ChampionPointTree[]

interface ChosenBuild {
  buildId: string
  over: string
}

interface ParsedCharacterEntry {
  esoCharacterId: string
  characterName: string
  buildHash: string
  chosen?: ChosenBuild
}

interface CharacterImportSkip {
  action: "skip"
  characterName: string
  reason: string
}

interface CharacterImportUpsert {
  action: "upsert"
  characterName: string
  esoCharacterId: string
  canonicalHash: string
  raceAndClass: RaceAndClass
  chosen?: ChosenBuild
}

type CharacterImportAction = CharacterImportSkip | CharacterImportUpsert

interface CharacterImportPlan {
  actions: readonly CharacterImportAction[]
  buildEdits?: readonly BuildEdit[]
}

export type PageUpsert = typeof upsertPage

type ReportLine = (line: string) => void

type AccountAddressOf = (userId: string) => Promise<string>

type CharacterBuildFiler = (accountPage: string) => Promise<readonly FiledCharacterBuild[]>

interface CharacterImportSeams {
  upsert?: PageUpsert
  report?: ReportLine
  addressOf?: AccountAddressOf
  file?: CharacterBuildFiler
  landEdits?: typeof landBuildEdits
}

function filedLine(filed: FiledCharacterBuild): string {
  const owned = filed.owned ? "took the account" : ""
  const attached =
    filed.attachedAs === "liveBuildId"
      ? "became the live build"
      : filed.attachedAs === "targetBuildId"
        ? "became the target"
        : ""
  const done = [owned, attached].filter((part) => part !== "").join(" and ")
  return `  ${filed.character}: build ${filed.buildId} ${done}`
}

export function keepKnownSkillLineIds(ids: readonly SkillLineId[]): readonly SkillLineId[] {
  return ids.filter((id) => skillLines.has(id))
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

function accountWideIn(content: string): Record<string, unknown> {
  const root = parseLuaSavedVariablesFile(content, CHARACTERS_GLOBAL)

  const defaultTable = asRecord(root.Default)
  if (!defaultTable) {
    throw new Error("Missing Default table in saved variables")
  }

  const accountWide = readFirstAccountWide(defaultTable)
  if (!accountWide) {
    throw new Error("Could not find $AccountWide in saved variables")
  }
  return accountWide
}

export function parseCharacterSavedVariables(content: string): readonly ParsedCharacterEntry[] {
  const accountWide = accountWideIn(content)

  const charactersTable = asRecord(accountWide.characters) ?? {}
  const chosenTable = asRecord(accountWide.activeBuilds) ?? {}

  const entries: ParsedCharacterEntry[] = []
  for (const [esoCharacterId, entry] of Object.entries(charactersTable)) {
    const record = asRecord(entry)
    if (!record) continue

    const buildHash = record.buildHash
    if (typeof buildHash !== "string") continue

    const characterName =
      typeof record.name === "string" ? record.name : `Character ${esoCharacterId}`

    const chosen = chosenBuildIn(chosenTable[esoCharacterId])
    entries.push({ esoCharacterId, characterName, buildHash, ...(chosen ? { chosen } : {}) })
  }

  return entries
}

function chosenBuildIn(value: unknown): ChosenBuild | undefined {
  const record = asRecord(value)
  if (typeof record?.buildId !== "string" || typeof record.over !== "string") return undefined
  return { buildId: record.buildId, over: record.over }
}

function chosenTargetOf(
  chosen: ChosenBuild | undefined,
  page: Awaited<ReturnType<PageUpsert>>
): string | undefined {
  if (chosen === undefined || chosen.buildId === chosen.over) return undefined
  if (page.targetBuildId !== chosen.over) return undefined
  return stringsIn(page.targetBuildIds).includes(chosen.buildId) ? chosen.buildId : undefined
}

function canonicalOf(decoded: CharacterState, characterName: string): string {
  return encodeBuild({
    ...decoded,
    name: characterName,
    character: {
      ...decoded.character,
      name: characterName,
      skillLineIds: keepKnownSkillLineIds(decoded.character.skillLineIds),
    },
    championPoints: padEveryTree(decoded.championPoints),
    account: { esoPlus: "no-eso-plus" },
  })
}

export function canonicalHashOf(hash: string, characterName: string): string | null {
  const decoded = decodeBuild(toBuildHash(hash))
  return decoded ? canonicalOf(decoded, characterName) : null
}

function toCharacterImportAction(entry: ParsedCharacterEntry): CharacterImportAction {
  const decoded = decodeBuild(toBuildHash(entry.buildHash))
  if (!decoded) {
    return {
      action: "skip",
      characterName: entry.characterName,
      reason: `failed to decode hash "${entry.buildHash}"`,
    }
  }

  return {
    action: "upsert",
    characterName: entry.characterName,
    esoCharacterId: entry.esoCharacterId,
    canonicalHash: canonicalOf(decoded, entry.characterName),
    raceAndClass: raceAndClassNamed(decoded.character.race, decoded.character.class),
    ...(entry.chosen ? { chosen: entry.chosen } : {}),
  }
}

export function planCharacterImport(content: string): CharacterImportPlan {
  const buildEdits = buildEditsIn(accountWideIn(content).buildEdits)
  return {
    actions: parseCharacterSavedVariables(content).map(toCharacterImportAction),
    ...(buildEdits.length > 0 ? { buildEdits } : {}),
  }
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
  const accountPage = await (seams.addressOf ?? accountAddressOf)(userId)

  for (const skip of skips) {
    report(`  ${skip.characterName}: ${skip.reason}, skipping`)
  }

  const edited = new Map<string, EditedCharacter>()
  for (const action of upserts) {
    const where = [
      { key: "accountPage", eq: accountPage },
      { key: "esoCharacterId", eq: action.esoCharacterId },
    ]
    const page = await upsert({
      pageTypeSlug: CHARACTER_PAGE_TYPE_SLUG,
      where,
      set: {
        accountPage,
        esoCharacterId: action.esoCharacterId,
        title: action.characterName,
        ...action.raceAndClass,
      },
      select: ["id", "targetBuildId", "targetBuildIds"],
    })
    edited.set(action.esoCharacterId, {
      name: action.characterName,
      where,
      targetBuildIds: [...stringsIn(page.targetBuildIds)],
    })

    report(`  ${action.characterName}: captured hash ${action.canonicalHash}`)

    const chosen = chosenTargetOf(action.chosen, page)
    if (chosen === undefined) continue
    await upsert({
      pageTypeSlug: CHARACTER_PAGE_TYPE_SLUG,
      where,
      set: { targetBuildId: chosen },
      select: ["id"],
    })
    report(`  ${action.characterName}: set up as build ${chosen}`)
  }

  await (seams.landEdits ?? landBuildEdits)(
    plan.buildEdits ?? [],
    { accountPage, characters: edited, canonical: canonicalHashOf },
    report
  )

  const filed = await (seams.file ?? fileCharacterBuilds)(accountPage)
  for (const one of filed) report(filedLine(one))

  report(`\n=== Summary ===`)
  report(`  Captured: ${upserts.length}`)
  if (skips.length > 0) report(`  Skipped:  ${skips.length}`)
  if (filed.length > 0) report(`  Filed:    ${filed.length}`)
}

export async function runImportCharacters(
  content: string,
  supabase: SignedInReader,
  options: { userId?: string } = {},
  seams: CharacterImportSeams = {}
): Promise<void> {
  await Promise.all([loadSetCatalog(), loadSkillCatalog()])
  await executeCharacterImportPlan(planCharacterImport(content), supabase, options, seams)
}
