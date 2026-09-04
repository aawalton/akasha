import { upsertPage } from "@akasha/pages-access/upsert"
import { decodeCompanion, encodeCompanion } from "@akasha/temper-companion-codec/companion-codec"
import { companionRoles } from "@akasha/temper-companions-core/companion-roles"
import type { CompanionState } from "@akasha/temper-companions-core/companion-types"
import type { CompanionId } from "@akasha/temper-companions-core/companions"
import { companions, getCompanionIdByDefId } from "@akasha/temper-companions-core/companions"
import { buildHash } from "@akasha/temper-formula-framework/branded-id"
import { readFirstAccountWide } from "@akasha/temper-saved-variables/account-wide"
import { parseLuaSavedVariablesFile } from "@akasha/temper-saved-variables/lua-parser"
import { asRecord } from "@akasha/utils-narrow/as-record"
import { resolveAccountPageId } from "../watcher-account-page/watcher-account-page.module.code.ts"
import {
  type SignedInReader,
  userIdFor,
} from "../watcher-signed-in-user/watcher-signed-in-user.module.code.ts"

export const COMPANIONS_SAVED_VARIABLES_GLOBAL = "TemperCompanions_SavedVariables"

export const COMPANION_PROGRESS_PAGE_TYPE_SLUG = "temper-companion-progress"

export const NO_ROLE_KEY = "no-role"

export const COMPANION_IDS_WITH_DEF_ID: readonly CompanionId[] = companions.list
  .filter((companion) => companion.esoCompanionId !== 0)
  .map((companion) => companion.id)

export type PageUpsert = typeof upsertPage

export interface CompanionImportPorts {
  readonly upsert?: PageUpsert
  readonly report?: (line: string) => void
  readonly warn?: (line: string) => void
}

export interface CompanionHashEntry {
  readonly companionId: CompanionId
  readonly hash: string
}

export interface CompanionSavedVariables {
  readonly entries: readonly CompanionHashEntry[]
  readonly unknownDefIds: readonly number[]
}

export interface CompanionImportSkip {
  readonly action: "skip"
  readonly companionName: string
  readonly reason: string
}

export interface CompanionImportCapture {
  readonly action: "capture"
  readonly companionId: CompanionId
  readonly companionName: string
  readonly canonicalHash: string
}

export type CompanionImportAction = CompanionImportSkip | CompanionImportCapture

export interface CompanionImportPlan {
  readonly actions: readonly CompanionImportAction[]
}

function toLuaKeyedRecord(value: unknown): Record<string, unknown> {
  if (Array.isArray(value)) {
    const record: Record<string, unknown> = {}
    for (let i = 0; i < value.length; i++) {
      if (value[i] !== undefined) {
        record[String(i + 1)] = value[i]
      }
    }
    return record
  }
  return asRecord(value) ?? {}
}

export function readCompanionSavedVariables(content: string): CompanionSavedVariables {
  const root = parseLuaSavedVariablesFile(content, COMPANIONS_SAVED_VARIABLES_GLOBAL)

  const defaultTable = asRecord(root.Default)
  if (!defaultTable) {
    throw new Error("Missing Default table in saved variables")
  }

  const accountWide = readFirstAccountWide(defaultTable)
  if (!accountWide) {
    throw new Error("Could not find $AccountWide in saved variables")
  }

  const companionsTable = toLuaKeyedRecord(accountWide.companions)

  const entries: CompanionHashEntry[] = []
  const unknownDefIds: number[] = []

  for (const [defIdKey, companionEntry] of Object.entries(companionsTable)) {
    const entryRecord = asRecord(companionEntry)
    if (!entryRecord) continue

    const hash = asRecord(entryRecord.build)?.hash
    if (typeof hash !== "string") continue

    const defId = parseInt(defIdKey, 10)
    const companionId = getCompanionIdByDefId(defId)
    if (companionId == null) {
      unknownDefIds.push(defId)
      continue
    }

    entries.push({ companionId, hash })
  }

  return { entries, unknownDefIds }
}

export function companionBuildName(companionId: CompanionId, build: CompanionState): string {
  const companionName = companions.data[companionId].name
  const baseRoles = build.companion.baseRoles
  const roleKey = baseRoles.length === 0 ? NO_ROLE_KEY : [...baseRoles].sort().join("+")
  const role = companionRoles.list.find((candidate) => candidate.id === roleKey)
  return `${companionName} ${role?.name ?? roleKey}`
}

export function planCompanionImport(reading: CompanionSavedVariables): CompanionImportPlan {
  const actions = reading.entries.map((entry): CompanionImportAction => {
    const companionName = companions.data[entry.companionId].name
    const decoded = decodeCompanion(buildHash(entry.hash))
    if (!decoded) {
      return {
        action: "skip",
        companionName,
        reason: `failed to decode hash "${entry.hash}"`,
      }
    }

    decoded.name = companionBuildName(entry.companionId, decoded)

    return {
      action: "capture",
      companionId: entry.companionId,
      companionName,
      canonicalHash: encodeCompanion(decoded),
    }
  })

  return { actions }
}

async function writeCompanionProgressPages(userId: string, upsert: PageUpsert): Promise<void> {
  await resolveAccountPageId(userId, upsert)

  for (const companionId of COMPANION_IDS_WITH_DEF_ID) {
    await upsert({
      pageTypeSlug: COMPANION_PROGRESS_PAGE_TYPE_SLUG,
      where: [
        { key: "accountPage", eq: userId },
        { key: "companionId", eq: companionId },
      ],
      set: { accountPage: userId, companionId },
      select: ["id"],
    })
  }
}

export async function runImportCompanions(
  content: string,
  supabase: SignedInReader,
  options: { userId?: string } = {},
  ports: CompanionImportPorts = {}
): Promise<void> {
  const upsert = ports.upsert ?? upsertPage
  const report = ports.report ?? ((line: string) => console.log(line))
  const warn = ports.warn ?? ((line: string) => console.warn(line))

  const reading = readCompanionSavedVariables(content)
  for (const defId of reading.unknownDefIds) {
    warn(`  Unknown companion ID ${defId}, skipping`)
  }

  const plan = planCompanionImport(reading)
  if (plan.actions.length === 0) return

  const captures = plan.actions.filter(
    (action): action is CompanionImportCapture => action.action === "capture"
  )
  const skips = plan.actions.filter(
    (action): action is CompanionImportSkip => action.action === "skip"
  )

  report(`Found ${plan.actions.length} companion(s).\n`)

  const userId = await userIdFor(supabase, options.userId, "write these companions")

  await writeCompanionProgressPages(userId, upsert)

  report(`Pre-created ${COMPANION_IDS_WITH_DEF_ID.length} companion pages\n`)

  for (const skip of skips) {
    report(`  ${skip.companionName}: ${skip.reason}, skipping`)
  }

  for (const capture of captures) {
    report(`  ${capture.companionName}: captured hash ${capture.canonicalHash}`)
  }

  report(`\n=== Summary ===`)
  report(`  Captured: ${captures.length}`)
  if (skips.length > 0) report(`  Skipped:  ${skips.length}`)
}
