import { getPage } from "@shared/pages-access/get"
import { patchPage } from "@shared/pages-access/patch"
import type { SupabaseServiceRoleClient } from "../../../../shared/supabase-server/src/service-role"
import { asRecord } from "../../../../shared/utils-narrow/src/as-record"
import { isJson } from "../../../../shared/utils-narrow/src/is-json"
import { upsertItemRuleByItemId } from "@temper/game-items-rules-core/inventory-rule-settings"
import { luaArrayOrEmpty } from "@temper/shared-saved-variables/lua-array"
import { parseLuaSavedVariablesFile } from "@temper/shared-saved-variables/lua-parser"
import { z } from "zod"
import { toRuleSettings } from "./export-settings-consumables"

const TEMPER_PLAYER_PAGE_TYPE_SLUG = "temper-player"

const pendingSettingsMutationSchema = z
  .object({
    kind: z.literal("item-rule-verdict"),
    itemId: z.number().int(),
    itemName: z.string(),
    action: z.enum(["sell", "nothing"]),
  })
  .strict()

type PendingSettingsMutation = z.infer<typeof pendingSettingsMutationSchema>

const outboxContainerSchema = luaArrayOrEmpty(z.unknown())

export type ParsedOutbox = {
  readonly found: number
  readonly mutations: readonly PendingSettingsMutation[]
}

export function parsePendingSettingsMutations(raw: unknown): ParsedOutbox {
  const container = outboxContainerSchema.safeParse(raw)
  if (!container.success) return { found: 0, mutations: [] }
  const out: PendingSettingsMutation[] = []
  for (const entry of container.data) {
    const parsed = pendingSettingsMutationSchema.safeParse(entry)
    if (parsed.success) out.push(parsed.data)
  }
  return { found: container.data.length, mutations: out }
}

function extractPendingSettingsMutations(content: string): ParsedOutbox {
  const empty: ParsedOutbox = { found: 0, mutations: [] }
  const root = parseLuaSavedVariablesFile(content, "TemperInventory_SavedVariables")
  const defaultTable = asRecord(root.Default)
  if (!defaultTable) return empty
  for (const key of Object.keys(defaultTable)) {
    if (!key.startsWith("@")) continue
    const accountWide = asRecord(asRecord(defaultTable[key])?.["$AccountWide"])
    if (accountWide) return parsePendingSettingsMutations(accountWide.pendingSettingsMutations)
  }
  return empty
}

export type VerdictImportLog = {
  readonly log: (message: string) => void
  readonly logError: (message: string) => void
}

function reportOutcome(
  logger: VerdictImportLog,
  found: number,
  materialized: number,
  reason?: string
): undefined {
  const suffix = reason == null ? "" : ` — ${reason}`
  const line = `Item-rule verdicts: materialized ${materialized}/${found} queued verdict(s) into settings.inventory${suffix}.`
  if (materialized < found) {
    logger.logError(line)
    return
  }
  logger.log(line)
}

export async function runImportItemRuleVerdicts(
  content: string,
  supabase: SupabaseServiceRoleClient,
  logger: VerdictImportLog,
  options: { userId?: string } = {}
): Promise<void> {
  const { found, mutations } = extractPendingSettingsMutations(content)
  if (mutations.length === 0) {
    reportOutcome(logger, found, 0, found === 0 ? undefined : "every queued verdict was discarded")
    return
  }

  let userId = options.userId
  if (userId == null) {
    const userResult = await supabase.auth.getUser()
    if (userResult.error || !userResult.data.user) {
      throw new Error(
        `runImportItemRuleVerdicts: not authenticated (${userResult.error?.message ?? "no user"})`
      )
    }
    userId = userResult.data.user.id
  }

  const page = await getPage({
    pageTypeSlug: TEMPER_PLAYER_PAGE_TYPE_SLUG,
    where: [{ key: "title", eq: userId }],
  })
  if (page == null) {
    reportOutcome(logger, found, 0, "no temper-player page for this user")
    return
  }

  const settings = asRecord(page.settings) ?? {}
  let ruleSettings = toRuleSettings(settings.inventory)
  for (const verdict of mutations) {
    ruleSettings = upsertItemRuleByItemId(ruleSettings, {
      itemId: verdict.itemId,
      itemName: verdict.itemName,
      action: verdict.action,
    })
  }

  if (!isJson(ruleSettings)) {
    throw new Error("runImportItemRuleVerdicts: rebuilt inventory settings not JSON-serializable")
  }
  await patchPage({
    pageTypeSlug: TEMPER_PLAYER_PAGE_TYPE_SLUG,
    where: [{ key: "title", eq: userId }],
    set: {},
    patch: [{ op: "replace", path: "/settings/inventory", value: ruleSettings }],
  })

  reportOutcome(logger, found, mutations.length)
}
