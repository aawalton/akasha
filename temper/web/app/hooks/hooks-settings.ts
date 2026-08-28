"use client"

import { useAuth } from "@shared/auth/use-auth"
import { useSingleFlight } from "@shared/design-primitives/hooks/use-single-flight"
import { NEVER_MATCH_VALUE } from "@shared/pages-access/sentinels"
import { upsertPage } from "@shared/pages-access/upsert"
import { useOptimisticUpsertPage } from "@shared/pages-ui/supabase/mutations/use-optimistic-upsert-page"
import { usePagesSupabase } from "@shared/pages-ui/supabase/use-pages"
import type { Json } from "../../../../shared/supabase-database/src/generated/database"
import { isRecord } from "../../../../shared/utils-narrow/src/is-record"
import type { InventoryLoggingSettings } from "@temper/game-items-core/inventory-logging-types"
import {
  ALL_DESTRUCTIVE_ACTIONS,
  type InventorySafetySettings,
} from "@temper/game-items-core/inventory-safety-types"
import type { ShoppingSettings } from "@temper/player-economics-core/shopping-not-available-types"
import { useCallback, useMemo } from "react"

const PLAYER_PAGE_TYPE_SLUG = "temper-player"

interface SettingsBlob {
  logging?: InventoryLoggingSettings
  safety?: InventorySafetySettings
  shopping?: ShoppingSettings | Record<string, boolean>
}

function isInventoryLoggingSettings(v: unknown): v is InventoryLoggingSettings {
  if (!isRecord(v)) return false
  return typeof v.actionReports === "string" && typeof v.perfTracing === "string"
}

function isInventorySafetySettings(v: unknown): v is InventorySafetySettings {
  if (!isRecord(v)) return false
  if (!Array.isArray(v.confirmActions)) return false
  if (typeof v.openCooldownProtection !== "boolean") return false
  return v.confirmActions.every((a) => typeof a === "string")
}

function isShoppingSettingsLike(v: unknown): v is ShoppingSettings | Record<string, boolean> {
  return isRecord(v)
}

function asSettingsBlob(value: unknown): SettingsBlob {
  if (!isRecord(value)) return {}
  const out: SettingsBlob = {}
  if (isInventoryLoggingSettings(value.logging)) out.logging = value.logging
  if (isInventorySafetySettings(value.safety)) out.safety = value.safety
  if (isShoppingSettingsLike(value.shopping)) out.shopping = value.shopping
  return out
}

function asJson(blob: SettingsBlob): Json {
  return blob as Json
}

function isStringBooleanRecord(value: unknown): value is Record<string, boolean> {
  if (!isRecord(value)) return false
  for (const v of Object.values(value)) {
    if (typeof v !== "boolean") return false
  }
  return true
}

function useSettingsBlob() {
  const { userId } = useAuth()
  const { rows } = usePagesSupabase({
    pageTypeSlug: PLAYER_PAGE_TYPE_SLUG,
    where:
      userId != null ? [{ key: "userId", eq: userId }] : [{ key: "userId", eq: NEVER_MATCH_VALUE }],
    limit: 1,
  })
  const playerRow = rows[0]
  const settings = useMemo<SettingsBlob>(() => {
    return asSettingsBlob(playerRow?.settings)
  }, [playerRow?.settings])
  const runUpsert = useOptimisticUpsertPage((args) => upsertPage(args))

  const rawWrite = useCallback(
    async (next: SettingsBlob) => {
      if (userId == null) return
      const handle = typeof playerRow?.handle === "string" ? playerRow.handle : null
      const profileMetadata = isRecord(playerRow?.profileMetadata) ? playerRow.profileMetadata : {}
      await runUpsert({
        pageTypeSlug: PLAYER_PAGE_TYPE_SLUG,
        where: [{ key: "title", eq: userId }],
        set: {
          userId,
          title: userId,
          handle,
          profileMetadata,
          settings: asJson(next),
        },
      })
    },
    [runUpsert, userId, playerRow]
  )

  const write = useSingleFlight(rawWrite)
  return { settings, write, userId }
}

const DEFAULT_LOGGING_SETTINGS: InventoryLoggingSettings = {
  actionReports: "verbose",
  perfTracing: "none",
}

export function useLoggingSettings() {
  const { settings, write } = useSettingsBlob()
  const loggingSettings = settings.logging ?? DEFAULT_LOGGING_SETTINGS

  const updateLoggingSettings = useCallback(
    async (partial: Partial<InventoryLoggingSettings>) => {
      await write({ ...settings, logging: { ...loggingSettings, ...partial } })
    },
    [settings, loggingSettings, write]
  )

  return {
    loggingSettings,
    updateLoggingSettings,
  }
}

const DEFAULT_SAFETY_SETTINGS: InventorySafetySettings = {
  confirmActions: [...ALL_DESTRUCTIVE_ACTIONS],
  openCooldownProtection: true,
}

export function useSafetySettings() {
  const { settings, write } = useSettingsBlob()
  const safetySettings = settings.safety ?? DEFAULT_SAFETY_SETTINGS

  const updateSafetySettings = useCallback(
    async (partial: Partial<InventorySafetySettings>) => {
      await write({ ...settings, safety: { ...safetySettings, ...partial } })
    },
    [settings, safetySettings, write]
  )

  return {
    safetySettings,
    updateSafetySettings,
  }
}

export function useShoppingMarks() {
  const { settings, write } = useSettingsBlob()
  const shoppingSettings = settings.shopping

  const updateShoppingMarks = useCallback(
    async (keys: readonly string[]) => {
      const current = isStringBooleanRecord(shoppingSettings) ? shoppingSettings : {}
      const updated: Record<string, boolean> = { ...current }
      for (const key of keys) {
        updated[key] = true
      }
      await write({ ...settings, shopping: updated })
    },
    [settings, shoppingSettings, write]
  )

  return {
    shoppingSettings,
    updateShoppingMarks,
  }
}
