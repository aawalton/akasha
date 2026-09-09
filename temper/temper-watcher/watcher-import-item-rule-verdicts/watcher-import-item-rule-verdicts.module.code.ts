import { upsertPage } from "@akasha/pages-access/upsert"
import { askComposed } from "@akasha/pages-query/store-spelled-asking"
import { asRecord } from "@akasha/utils/narrow/as-record"
import { isJson } from "@akasha/utils/narrow/is-json"
import type { Json } from "@akasha/utils/narrow/json-value"
import { readFirstAccountWide } from "akasha/temper/saved-variables/account-wide/account-wide.module.code.ts"
import { luaArrayOrEmpty } from "akasha/temper/saved-variables/lua-array/lua-array.module.code.ts"
import { parseLuaSavedVariablesFile } from "akasha/temper/saved-variables/lua-parser/lua-parser.module.code.ts"
import { upsertItemRuleByItemId } from "akasha/temper/temper-items-rules-core/inventory-rule-settings/inventory-rule-settings.module.code.ts"
import type { ItemAction } from "akasha/temper/temper-items-rules-core/inventory-rule-types/inventory-rule-types.module.code.ts"
import { z } from "zod"
import { log, logError } from "../watcher-logging/watcher-logging.module.code.ts"
import { toRuleSettings } from "../watcher-settings-consumables/watcher-settings-consumables.module.code.ts"
import {
  type SignedInReader,
  signedInUserId,
} from "../watcher-signed-in-user/watcher-signed-in-user.module.code.ts"

const TEMPER_PLAYER_PAGE_TYPE_SLUG = "temper-player"

const INVENTORY_SAVED_VARIABLES_GLOBAL = "TemperInventory_SavedVariables"

const OUTBOX_KEY = "pendingSettingsMutations"

const SETTINGS = "settings"

const ENDING = "json"

const INDENT = 2

const VERDICT_ACTIONS = ["sell", "nothing"] as const satisfies readonly ItemAction[]

const VERDICT_SCHEMA = z
  .object({
    kind: z.literal("item-rule-verdict"),
    itemId: z.number().int(),
    itemName: z.string(),
    action: z.enum(VERDICT_ACTIONS),
  })
  .strict()

const OUTBOX_SCHEMA = luaArrayOrEmpty(z.unknown())

export type ItemRuleVerdict = z.infer<typeof VERDICT_SCHEMA>

export type ParsedOutbox = {
  readonly found: number
  readonly mutations: readonly ItemRuleVerdict[]
}

const EMPTY_OUTBOX: ParsedOutbox = { found: 0, mutations: [] }

export function parsePendingSettingsMutations(raw: unknown): ParsedOutbox {
  const container = OUTBOX_SCHEMA.safeParse(raw)
  if (!container.success) return EMPTY_OUTBOX
  const out: ItemRuleVerdict[] = []
  for (const entry of container.data) {
    const parsed = VERDICT_SCHEMA.safeParse(entry)
    if (parsed.success) out.push(parsed.data)
  }
  return { found: container.data.length, mutations: out }
}

export function extractPendingSettingsMutations(content: string): ParsedOutbox {
  const root = parseLuaSavedVariablesFile(content, INVENTORY_SAVED_VARIABLES_GLOBAL)
  const defaultTable = asRecord(root.Default)
  if (!defaultTable) return EMPTY_OUTBOX
  const accountWide = readFirstAccountWide(defaultTable)
  if (!accountWide) return EMPTY_OUTBOX
  return parsePendingSettingsMutations(accountWide[OUTBOX_KEY])
}

export type VerdictImportLog = {
  readonly log: (message: string) => void
  readonly logError: (message: string) => void
}

export const WATCHER_VERDICT_LOG: VerdictImportLog = { log, logError }

export type VerdictUserSource = {
  readonly userId: () => Promise<string>
}

export function knownUserSource(userId: string): VerdictUserSource {
  return { userId: async () => userId }
}

export function supabaseUserSource(reader: SignedInReader): VerdictUserSource {
  return { userId: async () => signedInUserId(reader, "import these item-rule verdicts") }
}

export type InventorySettingsRead =
  | { readonly present: false }
  | { readonly present: true; readonly inventory: unknown }

export type VerdictSettingsStore = {
  readonly read: (userId: string) => Promise<InventorySettingsRead>
  readonly write: (userId: string, inventory: Json) => Promise<void>
}

async function settingsBlobOf(userId: string): Promise<Record<string, unknown> | null> {
  const asked = await askComposed({
    "page-type": TEMPER_PLAYER_PAGE_TYPE_SLUG,
    where: { title: { is: userId } },
    keys: ["slug", SETTINGS],
    files: [SETTINGS],
    limit: 1,
  })
  if (!asked.ok) {
    throw new Error(`the ${TEMPER_PLAYER_PAGE_TYPE_SLUG} page went unread — ${asked.why}`)
  }
  const row = asked.answer.rows[0]
  if (row === undefined) return null
  const held = row.values[SETTINGS]
  if (typeof held !== "string" || held === "") return {}
  if (held === ENDING) {
    throw new Error(
      `\`${SETTINGS}\` came back as the ending \`${ENDING}\` rather than the body of the file ` +
        `beside the player page, so what is already set went unread`
    )
  }
  return asRecord(JSON.parse(held)) ?? {}
}

export function temperPlayerSettingsStore(): VerdictSettingsStore {
  return {
    read: async (userId) => {
      const blob = await settingsBlobOf(userId)
      if (blob === null) return { present: false }
      return { present: true, inventory: blob.inventory }
    },
    write: async (userId, inventory) => {
      const blob = await settingsBlobOf(userId)
      if (blob === null) {
        throw new Error(`no ${TEMPER_PLAYER_PAGE_TYPE_SLUG} page carries title='${userId}'`)
      }
      await upsertPage({
        pageTypeSlug: TEMPER_PLAYER_PAGE_TYPE_SLUG,
        where: [{ key: "title", eq: userId }],
        set: { title: userId, [SETTINGS]: ENDING },
        bodies: { [SETTINGS]: JSON.stringify({ ...blob, inventory }, null, INDENT) },
      })
    },
  }
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
  return
}

export async function runImportItemRuleVerdicts(
  content: string,
  userSource: VerdictUserSource,
  logger: VerdictImportLog = WATCHER_VERDICT_LOG,
  store: VerdictSettingsStore = temperPlayerSettingsStore()
): Promise<void> {
  const { found, mutations } = extractPendingSettingsMutations(content)
  if (mutations.length === 0) {
    reportOutcome(logger, found, 0, found === 0 ? undefined : "every queued verdict was discarded")
    return
  }

  const userId = await userSource.userId()
  const current = await store.read(userId)
  if (!current.present) {
    reportOutcome(logger, found, 0, "no temper-player page for this user")
    return
  }

  if (current.inventory === undefined) {
    reportOutcome(logger, found, 0, "this account's inventory settings could not be read")
    return
  }

  let ruleSettings = toRuleSettings(current.inventory)
  for (const verdict of mutations) {
    ruleSettings = upsertItemRuleByItemId(ruleSettings, {
      itemId: verdict.itemId,
      itemName: verdict.itemName,
      action: verdict.action,
    })
  }

  if (!isJson(ruleSettings)) {
    throw new Error("Rebuilt inventory settings are not JSON-serializable.")
  }
  await store.write(userId, ruleSettings)

  reportOutcome(logger, found, mutations.length)
}
