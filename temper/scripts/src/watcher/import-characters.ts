import { upsertPage } from "@akasha/pages-access/upsert"
import type { SupabaseServiceRoleClient } from "@akasha/supabase-server/service-role"
import { parseLuaSavedVariablesFile } from "@akasha/temper-saved-variables/lua-parser"
import { asRecord } from "@akasha/utils-narrow/as-record"
import type { ChampionPointId } from "@temper/game-characters-champion-points/champion-points-source"
import type { CharacterState } from "@temper/game-characters-character/build-types"
import { type SkillLineId, skillLines } from "@temper/game-characters-skill-lines/skill-lines-data"
import { decodeBuild, encodeBuild } from "@temper/game-codec/character/build-codec"
import { BuildHash } from "@temper/shared-formula-framework/branded"

const validSkillLineIds = new Set<string>(skillLines.ids)

function filterValidSkillLineIds(ids: readonly SkillLineId[]): readonly SkillLineId[] {
  return ids.filter((id) => validSkillLineIds.has(id))
}

const CP_SLOT_COUNT = 4

const NO_STAR_PLACEHOLDERS: Record<string, ChampionPointId> = {
  warfare: "no-warfare-star",
  fitness: "no-fitness-star",
  craft: "no-craft-star",
}

function padCpSlotted(
  slotted: readonly ChampionPointId[],
  discipline: string
): readonly ChampionPointId[] {
  const placeholder = NO_STAR_PLACEHOLDERS[discipline] ?? "no-warfare-star"
  const padCount = Math.max(0, CP_SLOT_COUNT - slotted.length)
  return [...slotted, ...Array<ChampionPointId>(padCount).fill(placeholder)]
}

interface ParsedCharacterEntry {
  esoCharacterId: string
  characterName: string
  buildHash: string
}

function parseSavedVariables(content: string): readonly ParsedCharacterEntry[] {
  const root = parseLuaSavedVariablesFile(content, "TemperCharacters_SavedVariables")

  const defaultTable = asRecord(root.Default)
  if (!defaultTable) {
    throw new Error("Missing Default table in saved variables")
  }

  let accountWide: Record<string, unknown> | undefined
  for (const key of Object.keys(defaultTable)) {
    if (key.startsWith("@")) {
      const accountTable = asRecord(defaultTable[key])
      accountWide = asRecord(accountTable?.["$AccountWide"])
      if (accountWide) break
    }
  }

  if (!accountWide) {
    throw new Error("Could not find $AccountWide in saved variables")
  }

  const charactersTable = asRecord(accountWide.characters) ?? {}

  const entries: ParsedCharacterEntry[] = []

  for (const [esoCharacterId, charEntry] of Object.entries(charactersTable)) {
    const rec = asRecord(charEntry)
    if (!rec) continue

    const buildHash = rec.buildHash
    if (typeof buildHash !== "string") continue

    const characterName = typeof rec.name === "string" ? rec.name : `Character ${esoCharacterId}`

    entries.push({ esoCharacterId, characterName, buildHash })
  }

  return entries
}

interface CharacterImportSkipped {
  action: "skip"
  characterName: string
  reason: string
}

interface CharacterImportUpsert {
  action: "upsert"
  characterName: string
  esoCharacterId: string
  canonicalHash: string
}

type CharacterImportAction = CharacterImportSkipped | CharacterImportUpsert

interface CharacterImportPlan {
  actions: readonly CharacterImportAction[]
}

function planCharacterImport(content: string): CharacterImportPlan {
  const entries = parseSavedVariables(content)
  const actions: CharacterImportAction[] = entries.map((entry) => {
    const decoded = decodeBuild(BuildHash(entry.buildHash))
    if (!decoded) {
      return {
        action: "skip",
        characterName: entry.characterName,
        reason: `failed to decode hash "${entry.buildHash}"`,
      }
    }

    decoded.character.skillLineIds = filterValidSkillLineIds(decoded.character.skillLineIds)

    for (const discipline of ["warfare", "fitness", "craft"] as const) {
      decoded.championPoints[discipline].slotted = padCpSlotted(
        decoded.championPoints[discipline].slotted,
        discipline
      )
    }

    const buildState: CharacterState = {
      ...decoded,
      name: entry.characterName,
      character: {
        ...decoded.character,
        name: entry.characterName,
      },
      account: { esoPlus: "no-eso-plus" },
    }

    const canonicalHash = encodeBuild(buildState)

    return {
      action: "upsert",
      characterName: entry.characterName,
      esoCharacterId: entry.esoCharacterId,
      canonicalHash,
    }
  })

  return { actions }
}

async function resolveAccountPageId(userId: string): Promise<string> {
  const row = await upsertPage({
    pageTypeSlug: "temper-account",
    where: [{ key: "title", eq: userId }],
    set: { userId, title: userId },
    select: ["id"],
  })
  const id = row.id
  if (typeof id !== "string") {
    throw new Error("runImportCharacters: page_upsert(temper-account) returned no id")
  }
  return id
}

async function executeCharacterImportPlan(
  plan: CharacterImportPlan,
  supabase: SupabaseServiceRoleClient,
  options: { userId?: string }
): Promise<void> {
  if (plan.actions.length === 0) return

  const upserts = plan.actions.filter((a): a is CharacterImportUpsert => a.action === "upsert")
  const skips = plan.actions.filter((a): a is CharacterImportSkipped => a.action === "skip")

  console.log(`Found ${plan.actions.length} character(s).\n`)

  let userId = options.userId
  if (userId == null) {
    const userResult = await supabase.auth.getUser()
    if (userResult.error || !userResult.data.user) {
      throw new Error(
        `runImportCharacters: not authenticated (${userResult.error?.message ?? "no user"})`
      )
    }
    userId = userResult.data.user.id
  }

  await resolveAccountPageId(userId)

  for (const skip of skips) {
    console.log(`  ${skip.characterName}: ${skip.reason}, skipping`)
  }

  for (const action of upserts) {
    await upsertPage({
      pageTypeSlug: "temper-account-character",
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

    console.log(`  ${action.characterName}: captured hash ${action.canonicalHash}`)
  }

  console.log(`\n=== Summary ===`)
  console.log(`  Captured: ${upserts.length}`)
  if (skips.length > 0) console.log(`  Skipped:  ${skips.length}`)
}

export async function runImportCharacters(
  content: string,
  supabase: SupabaseServiceRoleClient,
  options: { userId?: string } = {}
): Promise<void> {
  const plan = planCharacterImport(content)
  await executeCharacterImportPlan(plan, supabase, options)
}
