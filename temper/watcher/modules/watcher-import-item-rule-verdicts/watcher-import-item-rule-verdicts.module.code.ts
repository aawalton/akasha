import { asRecord } from "akasha/code/type/narrowing/modules/as-record/as-record.module.code.ts"
import type { Json } from "akasha/code/type/narrowing/modules/json-value/json-value.module.code.ts"
import { deletePages } from "akasha/page/access/modules/deleting/deleting.module.code.ts"
import { getPages } from "akasha/page/access/modules/get/get.module.code.ts"
import { upsertPages } from "akasha/page/access/modules/upsert/upsert.module.code.ts"
import type { ItemRuleVerdictMutation } from "akasha/temper/addon/pages/items/modules/inventory-item-rule-verdict-core/inventory-item-rule-verdict-core.module.code.ts"
import { readFirstAccountWide } from "akasha/temper/eso/saved-variable/modules/account-wide/account-wide.module.code.ts"
import { luaArrayOrEmpty } from "akasha/temper/eso/saved-variable/modules/lua-array/lua-array.module.code.ts"
import { parseLuaSavedVariablesFile } from "akasha/temper/eso/saved-variable/modules/lua-parser/lua-parser.module.code.ts"
import { upsertItemRuleByItemId } from "akasha/temper/items/rules/core/modules/inventory-rule-settings/inventory-rule-settings.module.code.ts"
import type {
  InventoryRules,
  ItemAction,
} from "akasha/temper/items/rules/core/modules/inventory-rule-types/inventory-rule-types.module.code.ts"
import type { RuleWrites } from "akasha/temper/items/rules/core/modules/inventory-rule-writes/inventory-rule-writes.module.code.ts"
import {
  ITEM_RULE_PAGE_TYPE,
  itemRulesFromRows,
  itemRuleWritesFor,
  type PageRow,
} from "akasha/temper/items/rules/core/modules/item-rule-pages/item-rule-pages.module.code.ts"
import {
  ACCOUNT_PAGE_TYPE,
  findAccountAddress,
} from "akasha/temper/player/character/temper-account/modules/account-address/account-address.module.code.ts"
import {
  log,
  logError,
} from "akasha/temper/watcher/modules/watcher-logging/watcher-logging.module.code.ts"
import {
  type SignedInReader,
  signedInUserId,
} from "akasha/temper/watcher/modules/watcher-signed-in-user/watcher-signed-in-user.module.code.ts"
import { z } from "zod"

const INVENTORY_SAVED_VARIABLES_GLOBAL = "TemperInventory_SavedVariables"

const OUTBOX_KEY = "pendingSettingsMutations"

const RULES_AT_MOST = 500

const VERDICT_ACTIONS = ["sell", "nothing"] as const satisfies readonly ItemAction[]

const VERDICT_SCHEMA = z
  .object({
    kind: z.literal("item-rule-verdict"),
    itemId: z.number().int(),
    itemName: z.string(),
    action: z.enum(VERDICT_ACTIONS),
  })
  .strict() satisfies z.ZodType<ItemRuleVerdictMutation>

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

const WATCHER_VERDICT_LOG: VerdictImportLog = { log, logError }

export type VerdictUserSource = {
  readonly userId: () => Promise<string>
}

export function supabaseUserSource(reader: SignedInReader): VerdictUserSource {
  return { userId: async () => signedInUserId(reader, "import these item-rule verdicts") }
}

export type ItemRulesRead =
  | { readonly present: false }
  | { readonly present: true; readonly accountPage: string; readonly rows: readonly PageRow[] }

export type VerdictRuleStore = {
  readonly read: (userId: string) => Promise<ItemRulesRead>
  readonly write: (writes: RuleWrites) => Promise<void>
}

function itemRulePageStore(): VerdictRuleStore {
  return {
    read: async (userId) => {
      const accountPage = await findAccountAddress(userId)
      if (accountPage === null) return { present: false }
      const { rows } = await getPages({
        pageTypeSlug: ITEM_RULE_PAGE_TYPE,
        where: [{ key: "accountPage", eq: accountPage }],
        limit: RULES_AT_MOST,
      })
      return { present: true, accountPage, rows }
    },
    write: async (writes) => {
      if (writes.upserts.length > 0) {
        await upsertPages({
          pageTypeSlug: ITEM_RULE_PAGE_TYPE,
          items: writes.upserts.map((one) => ({
            where: [{ key: "slug", eq: one.slug }],
            set: one.values as Record<string, Json>,
            clears: one.clears,
          })),
        })
      }
      if (writes.deletes.length > 0) {
        await deletePages({
          pageTypeSlug: ITEM_RULE_PAGE_TYPE,
          where: [{ key: "slug", in: [...writes.deletes] }],
        })
      }
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
  const line = `Item-rule verdicts: materialized ${materialized}/${found} queued verdict(s) into item rule pages${suffix}.`
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
  store: VerdictRuleStore = itemRulePageStore()
): Promise<void> {
  const { found, mutations } = extractPendingSettingsMutations(content)
  if (mutations.length === 0) {
    reportOutcome(logger, found, 0, found === 0 ? undefined : "every queued verdict was discarded")
    return
  }

  const userId = await userSource.userId()
  const current = await store.read(userId)
  if (!current.present) {
    reportOutcome(logger, found, 0, `no ${ACCOUNT_PAGE_TYPE} page for this user`)
    return
  }

  let ruleSettings: InventoryRules = {
    version: 2,
    rules: [],
    itemRules: itemRulesFromRows(current.rows),
  }
  for (const verdict of mutations) {
    ruleSettings = upsertItemRuleByItemId(ruleSettings, {
      itemId: verdict.itemId,
      itemName: verdict.itemName,
      action: verdict.action,
    })
  }

  await store.write(
    itemRuleWritesFor(ruleSettings.itemRules ?? [], current.rows, current.accountPage, Date.now())
  )

  reportOutcome(logger, found, mutations.length)
}
