import { upsertPage } from "@akasha/pages-access/upsert"
import type { SupabaseServiceRoleClient } from "@akasha/supabase-server/service-role"
import { asRecord } from "@akasha/utils-narrow/as-record"
import { decodeCompanion, encodeCompanion } from "@temper/game-codec/companions/companion-codec"
import { companionRoles } from "@temper/game-companions-core/generated/temper-companion-role.generated"
import type { CompanionState } from "@temper/game-companions-core/companion-types"
import type { CompanionId } from "@temper/game-companions-core/companions-data"
import { companions, getCompanionIdByDefId } from "@temper/game-companions-core/companions-data"
import { buildHash } from "@akasha/temper-formula-framework/branded-id"
import { parseLuaSavedVariablesFile } from "@akasha/temper-saved-variables/lua-parser"

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

interface ParsedCompanionEntry {
  companionIdStr: CompanionId
  hash: string
}

function parseSavedVariables(content: string): readonly ParsedCompanionEntry[] {
  const root = parseLuaSavedVariablesFile(content, "TemperCompanions_SavedVariables")

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

  const companionsTable = toLuaKeyedRecord(accountWide.companions)

  const entries: ParsedCompanionEntry[] = []

  for (const [companionIdKey, companionEntry] of Object.entries(companionsTable)) {
    const rec = asRecord(companionEntry)
    if (!rec) continue

    const buildRec = asRecord(rec.build)
    const hash = buildRec?.hash
    if (typeof hash !== "string") continue

    const companionId = parseInt(companionIdKey, 10)
    const companionIdStr = getCompanionIdByDefId(companionId)
    if (companionIdStr == null) {
      console.warn(`  Unknown companion ID ${companionId}, skipping`)
      continue
    }

    entries.push({ companionIdStr, hash })
  }

  return entries
}

function generateBuildName(companionId: CompanionId, build: CompanionState): string {
  const companionName = companions.data[companionId].name
  const baseRoles = build.companion.baseRoles
  const roleKey = baseRoles.length === 0 ? "no-role" : [...baseRoles].sort().join("+")
  const role = companionRoles.list.find((r) => r.id === roleKey)
  return `${companionName} ${role?.name ?? roleKey}`
}

interface CompanionImportSkipped {
  action: "skip"
  companionName: string
  reason: string
}

interface CompanionImportUpsert {
  action: "upsert"
  companionIdStr: CompanionId
  companionName: string
  canonicalHash: string
}

type CompanionImportAction = CompanionImportSkipped | CompanionImportUpsert

interface CompanionImportPlan {
  actions: readonly CompanionImportAction[]
}

function planCompanionImport(content: string): CompanionImportPlan {
  const entries = parseSavedVariables(content)
  const actions: CompanionImportAction[] = entries.map((entry) => {
    const decoded = decodeCompanion(buildHash(entry.hash))
    if (!decoded) {
      return {
        action: "skip",
        companionName: companions.data[entry.companionIdStr].name,
        reason: `failed to decode hash "${entry.hash}"`,
      }
    }

    const name = generateBuildName(entry.companionIdStr, decoded)
    decoded.name = name

    const canonicalHash = encodeCompanion(decoded)
    const companionFullName = companions.data[entry.companionIdStr].name

    return {
      action: "upsert",
      companionIdStr: entry.companionIdStr,
      companionName: companionFullName,
      canonicalHash,
    }
  })

  return { actions }
}

const ALL_COMPANION_IDS = [
  "bastian",
  "mirri",
  "ember",
  "isobel",
  "sharp-as-night",
  "azandar",
  "tanlorin",
  "zerith-var",
] as const

async function resolveAccountPageId(userId: string): Promise<string> {
  const row = await upsertPage({
    pageTypeSlug: "temper-account",
    where: [{ key: "title", eq: userId }],
    set: { userId, title: userId },
    select: ["id"],
  })
  const id = row.id
  if (typeof id !== "string") {
    throw new Error("runImportCompanions: page_upsert(temper-account) returned no id")
  }
  return id
}

async function executeCompanionImportPlan(
  plan: CompanionImportPlan,
  supabase: SupabaseServiceRoleClient,
  options: { userId?: string }
): Promise<void> {
  if (plan.actions.length === 0) return

  const upserts = plan.actions.filter((a): a is CompanionImportUpsert => a.action === "upsert")
  const skips = plan.actions.filter((a): a is CompanionImportSkipped => a.action === "skip")

  console.log(`Found ${plan.actions.length} companion(s).\n`)

  let userId = options.userId
  if (userId == null) {
    const userResult = await supabase.auth.getUser()
    if (userResult.error || !userResult.data.user) {
      throw new Error(
        `runImportCompanions: not authenticated (${userResult.error?.message ?? "no user"})`
      )
    }
    userId = userResult.data.user.id
  }

  await resolveAccountPageId(userId)

  for (const companionId of ALL_COMPANION_IDS) {
    await upsertPage({
      pageTypeSlug: "temper-companion-progress",
      where: [
        { key: "accountPage", eq: userId },
        { key: "companionId", eq: companionId },
      ],
      set: { userId, accountPage: userId, companionId },
      select: ["id"],
    })
  }

  console.log(`Pre-created ${ALL_COMPANION_IDS.length} companion pages\n`)

  for (const skip of skips) {
    console.log(`  ${skip.companionName}: ${skip.reason}, skipping`)
  }

  for (const action of upserts) {
    console.log(`  ${action.companionName}: captured hash ${action.canonicalHash}`)
  }

  console.log(`\n=== Summary ===`)
  console.log(`  Captured: ${upserts.length}`)
  if (skips.length > 0) console.log(`  Skipped:  ${skips.length}`)
}

export async function runImportCompanions(
  content: string,
  supabase: SupabaseServiceRoleClient,
  options: { userId?: string } = {}
): Promise<void> {
  const plan = planCompanionImport(content)
  await executeCompanionImportPlan(plan, supabase, options)
}
