"use client"

import { isRecord } from "akasha/code/type/narrowing/modules/is-record/is-record.module.code.ts"
import type { Json } from "akasha/code/type/narrowing/modules/json-value/json-value.module.code.ts"
import { saidBy } from "akasha/code/type/narrowing/modules/said-by/said-by.module.code.ts"
import { listenerSet } from "akasha/design/interface/primitive/modules/listener-set/listener-set.module.code.ts"
import { useSingleFlight } from "akasha/design/interface/primitive/modules/use-single-flight/use-single-flight.module.code.ts"
import { deletePages } from "akasha/page/access/modules/deleting/deleting.module.code.ts"
import { patchPage } from "akasha/page/access/modules/patch/patch.module.code.ts"
import { NEVER_MATCH_VALUE } from "akasha/page/access/modules/sentinels/sentinels.module.code.ts"
import { upsertPages } from "akasha/page/access/modules/upsert/upsert.module.code.ts"
import { askComposed } from "akasha/page/query/modules/store-spelled-asking/store-spelled-asking.module.code.ts"
import {
  followChanges,
  notFollowing,
} from "akasha/page/ui/modules/loader-following/loader-following.module.code.ts"
import { useUserId } from "akasha/page/ui/modules/use-user-id/use-user-id.module.code.tsx"
import { usePages } from "akasha/page/ui/supabase/modules/use-pages/use-pages.module.code.ts"
import { useOptimisticDeletePages } from "akasha/page/ui/supabase/mutation/modules/use-optimistic-delete-pages/use-optimistic-delete-pages.module.code.ts"
import { useOptimisticPatchPage } from "akasha/page/ui/supabase/mutation/modules/use-optimistic-patch-page/use-optimistic-patch-page.module.code.ts"
import { useOptimisticUpsertPages } from "akasha/page/ui/supabase/mutation/modules/use-optimistic-upsert-pages/use-optimistic-upsert-pages.module.code.ts"
import {
  type BackpackSettings,
  DEFAULT_BACKPACK_SETTINGS,
} from "akasha/temper/items/core/modules/backpack-settings-types/backpack-settings-types.module.code.ts"
import type { CraftBagAccessSettings } from "akasha/temper/items/core/modules/inventory-craft-bag-types/inventory-craft-bag-types.module.code.ts"
import {
  type ManagedGuildBankSettings,
  readManagedGuildBanks,
} from "akasha/temper/items/core/modules/inventory-guild-bank-types/inventory-guild-bank-types.module.code.ts"
import { BUY_RULE_PAGE_TYPE } from "akasha/temper/items/rules/core/modules/buy-rule-pages/buy-rule-pages.module.code.ts"
import type {
  InventoryRuleSettings,
  InventoryRules,
} from "akasha/temper/items/rules/core/modules/inventory-rule-types/inventory-rule-types.module.code.ts"
import { ITEM_RULE_PAGE_TYPE } from "akasha/temper/items/rules/core/modules/item-rule-pages/item-rule-pages.module.code.ts"
import {
  type HeldPages,
  heldPagesOf,
  NO_PAGES,
  ruleSetOf,
  ruleWritesFor,
} from "akasha/temper/items/rules/core/modules/rule-set-writes/rule-set-writes.module.code.ts"
import type {
  AutomationSettings,
  CharacterAutomationToggles,
  CompanionAutomationToggles,
} from "akasha/temper/player/character/build/build-support/modules/automation-settings/automation-settings.module.code.ts"
import { ACCOUNT_PAGE_TYPE } from "akasha/temper/player/character/temper-account/modules/account-address/account-address.module.code.ts"
import { useAccountAddress } from "akasha/temper/web/modules/use-account-address/use-account-address.module.code.ts"
import { useCallback, useEffect, useMemo, useSyncExternalStore } from "react"

const RULE_PAGE_TYPE_SLUG = "temper-inventory-rule"

const RULES_AT_MOST = 500

interface SettingsBlob {
  "craft-bag-access"?: CraftBagAccessSettings
  "managed-guild-banks"?: ManagedGuildBankSettings
  inventory?: InventoryRuleSettings
  automation?: AutomationSettings
  backpack?: BackpackSettings
  [key: string]: unknown
}

function parseSettingsBlob(value: unknown): SettingsBlob {
  return (isRecord(value) ? value : {}) as SettingsBlob
}

const SETTINGS = "settings"

const ENDING = "json"

async function settingsBodyOf(userId: string): Promise<SettingsBlob> {
  const asked = await askComposed({
    "page-type": ACCOUNT_PAGE_TYPE,
    where: { key: { is: userId } },
    keys: ["slug", SETTINGS],
    files: [SETTINGS],
  })
  if (!asked.ok) throw new Error(asked.why)
  const held = asked.answer.rows[0]?.values[SETTINGS]
  if (held === undefined || held === "") return {}
  if (typeof held !== "string") {
    throw new Error(`\`${SETTINGS}\` came back as a ${typeof held} rather than the file's body.`)
  }
  if (held === ENDING) {
    throw new Error(
      `\`${SETTINGS}\` came back as the ending \`${ENDING}\` rather than the body of the file beside the account page, so what is already set went unread. Nothing has been written.`
    )
  }
  return parseSettingsBlob(JSON.parse(held))
}

interface SettingsHeld {
  readonly blob: SettingsBlob
  readonly isRead: boolean
  readonly error: Error | null
}

const UNREAD: SettingsHeld = { blob: {}, isRead: false, error: null }

let heldFor: string | null = null
let held: SettingsHeld = UNREAD
const settingsListeners = listenerSet()

function holdSettings(next: SettingsHeld): undefined {
  held = next
  settingsListeners.tell()
}

function readSettings(): SettingsHeld {
  return held
}

let unfollow: () => undefined = notFollowing

function settingsInto(userId: string): undefined {
  void (async () => {
    try {
      const blob = await settingsBodyOf(userId)
      if (heldFor !== userId) return
      holdSettings({ blob, isRead: true, error: null })
    } catch (thrown) {
      if (heldFor !== userId) return
      holdSettings({
        blob: {},
        isRead: false,
        error: thrown instanceof Error ? thrown : new Error(String(thrown)),
      })
    }
  })()
}

export function useSettingsBlob() {
  const userId = useUserId()
  const state = useSyncExternalStore(settingsListeners.subscribe, readSettings, readSettings)

  useEffect(() => {
    if (userId == null) {
      heldFor = null
      unfollow()
      holdSettings(UNREAD)
      return
    }
    if (heldFor === userId) return
    heldFor = userId
    holdSettings(UNREAD)
    settingsInto(userId)
    unfollow()
    unfollow = followChanges([ACCOUNT_PAGE_TYPE], () => settingsInto(userId))
  }, [userId])

  const runPatch = useOptimisticPatchPage((args) => patchPage(args))

  const rawWrite = useCallback(
    async (next: SettingsBlob) => {
      if (userId == null) return
      if (!state.isRead) {
        throw new Error(
          "the settings beside the account page have not been read yet, so writing now would put this over them"
        )
      }
      const patched = await runPatch({
        pageTypeSlug: ACCOUNT_PAGE_TYPE,
        where: [{ key: "key", eq: userId }],
        set: { [SETTINGS]: ENDING },
        bodies: { [SETTINGS]: JSON.stringify(next) },
      })
      if (patched === null) {
        throw new Error(
          `no ${ACCOUNT_PAGE_TYPE} page has the key ${userId}, so these settings have nowhere to be written`
        )
      }
      holdSettings({ blob: next, isRead: true, error: null })
    },
    [runPatch, userId, state.isRead]
  )

  const write = useSingleFlight(rawWrite)
  return { settings: state.blob, write, userId }
}

export function useCraftBagAccess() {
  const { settings, write } = useSettingsBlob()

  const updateCraftBagAccess = useCallback(
    async (craftBagAccess: boolean | undefined) => {
      const next: SettingsBlob = { ...settings }
      if (craftBagAccess === undefined) {
        delete next["craft-bag-access"]
      } else {
        next["craft-bag-access"] = { craftBagAccess }
      }
      await write(next)
    },
    [settings, write]
  )

  return {
    craftBagAccess: settings["craft-bag-access"]?.craftBagAccess,
    updateCraftBagAccess,
  }
}

export function useManagedGuildBanks() {
  const { settings, write } = useSettingsBlob()

  const managedSet = useMemo(() => readManagedGuildBanks(settings), [settings])

  const updateManagedGuildBanks = useCallback(
    async (managedGuildBanks: readonly string[]) => {
      await write({ ...settings, "managed-guild-banks": { managedGuildBanks } })
    },
    [settings, write]
  )

  return {
    managedSet,
    updateManagedGuildBanks,
  }
}

const NO_RULES: InventoryRules = { version: 2, rules: [] }

export const RULES_UNREAD_WRITE =
  "the rules beside this account went unread, so writing now would put this over them"

export function isRulesUnreadWrite(thrown: unknown): boolean {
  return thrown instanceof Error && thrown.message === RULES_UNREAD_WRITE
}

export function useInventorySettings() {
  const { userId } = useSettingsBlob()
  const accountPage = useAccountAddress(userId).address
  const where = [{ key: "accountPage", eq: accountPage ?? NEVER_MATCH_VALUE }]
  const { rows } = usePages({ pageTypeSlug: RULE_PAGE_TYPE_SLUG, where, limit: RULES_AT_MOST })
  const items = usePages({ pageTypeSlug: ITEM_RULE_PAGE_TYPE, where, limit: RULES_AT_MOST })
  const buys = usePages({ pageTypeSlug: BUY_RULE_PAGE_TYPE, where, limit: RULES_AT_MOST })
  const itemRows = items.rows
  const buyRows = buys.rows

  const built = useMemo<{
    readonly held: HeldPages
    readonly settings: InventoryRules
    readonly unread: string | null
  }>(() => {
    try {
      const held = heldPagesOf(rows, itemRows, buyRows)
      return { held, settings: ruleSetOf(held), unread: null }
    } catch (thrown) {
      return { held: NO_PAGES, settings: NO_RULES, unread: saidBy(thrown) }
    }
  }, [rows, itemRows, buyRows])

  const inventorySettings = built.settings
  const rulesUnread = built.unread
  const heldPages = built.held

  const runUpserts = useOptimisticUpsertPages((args) => upsertPages(args))
  const runDeletes = useOptimisticDeletePages((args) => deletePages(args))

  const updateInventorySettings = useCallback(
    async (next: InventoryRules) => {
      if (userId == null) return
      if (accountPage == null || rulesUnread !== null) throw new Error(RULES_UNREAD_WRITE)
      const planned = ruleWritesFor(next, heldPages, accountPage, Date.now())
      for (const { pageTypeSlug, writes } of planned) {
        if (writes.upserts.length > 0) {
          await runUpserts({
            pageTypeSlug,
            items: writes.upserts.map((one) => ({
              where: [{ key: "slug", eq: one.slug }],
              set: one.values as Record<string, Json>,
              clears: one.clears,
            })),
          })
        }
        if (writes.deletes.length > 0) {
          await runDeletes({ pageTypeSlug, where: [{ key: "slug", in: [...writes.deletes] }] })
        }
      }
    },
    [heldPages, userId, accountPage, runUpserts, runDeletes, rulesUnread]
  )

  return {
    inventorySettings,
    updateInventorySettings,
    rulesUnread,
  }
}

export function useBackpackSettings() {
  const { settings, write } = useSettingsBlob()
  const backpackSettings = settings.backpack ?? DEFAULT_BACKPACK_SETTINGS

  const updateBackpackSettings = useCallback(
    async (partial: Partial<BackpackSettings>) => {
      await write({ ...settings, backpack: { ...backpackSettings, ...partial } })
    },
    [settings, backpackSettings, write]
  )

  return {
    backpackSettings,
    updateBackpackSettings,
  }
}

const DEFAULT_AUTOMATION_SETTINGS: AutomationSettings = {
  characters: {},
  companions: {},
}

export function useAutomationSettings() {
  const { settings, write } = useSettingsBlob()
  const automationSettings = settings.automation ?? DEFAULT_AUTOMATION_SETTINGS

  const writeAutomation = useCallback(
    async (next: AutomationSettings) => {
      await write({ ...settings, automation: next })
    },
    [settings, write]
  )

  const updateCharacterToggle = useCallback(
    async (
      esoCharId: string,
      section: keyof CharacterAutomationToggles,
      enabled: boolean | undefined
    ) => {
      const existing = automationSettings.characters[esoCharId] ?? {}
      const updated: CharacterAutomationToggles = { ...existing }
      if (enabled === undefined) {
        delete updated[section]
      } else {
        updated[section] = enabled
      }
      await writeAutomation({
        ...automationSettings,
        characters: { ...automationSettings.characters, [esoCharId]: updated },
      })
    },
    [automationSettings, writeAutomation]
  )

  const updateCompanionToggle = useCallback(
    async (
      companionId: string,
      section: keyof CompanionAutomationToggles,
      enabled: boolean | undefined
    ) => {
      const existing = automationSettings.companions[companionId] ?? {}
      const updated: CompanionAutomationToggles = { ...existing }
      if (enabled === undefined) {
        delete updated[section]
      } else {
        updated[section] = enabled
      }
      await writeAutomation({
        ...automationSettings,
        companions: { ...automationSettings.companions, [companionId]: updated },
      })
    },
    [automationSettings, writeAutomation]
  )

  const updateGlobalCharacterToggle = useCallback(
    async (section: keyof CharacterAutomationToggles, enabled: boolean) => {
      await writeAutomation({
        ...automationSettings,
        global: {
          ...automationSettings.global,
          characters: {
            ...automationSettings.global?.characters,
            [section]: enabled,
          },
        },
      })
    },
    [automationSettings, writeAutomation]
  )

  const updateGlobalCompanionToggle = useCallback(
    async (section: keyof CompanionAutomationToggles, enabled: boolean) => {
      await writeAutomation({
        ...automationSettings,
        global: {
          ...automationSettings.global,
          companions: {
            ...automationSettings.global?.companions,
            [section]: enabled,
          },
        },
      })
    },
    [automationSettings, writeAutomation]
  )

  return {
    automationSettings,
    updateCharacterToggle,
    updateCompanionToggle,
    updateGlobalCharacterToggle,
    updateGlobalCompanionToggle,
  }
}
