"use client"

import { isRecord } from "@akasha/utils/narrow/is-record"
import { useSettingsBlob } from "akasha/temper/player-inventory-management-ui/hooks-inventory-settings/hooks-inventory-settings.module.code.ts"
import type { ShoppingSettings } from "akasha/temper/shopping/shopping-settings/shopping-settings.module.code.ts"
import type { InventoryLoggingSettings } from "akasha/temper/temper-items-core/inventory-logging-types/inventory-logging-types.module.code.ts"
import {
  ALL_DESTRUCTIVE_ACTIONS,
  type InventorySafetySettings,
} from "akasha/temper/temper-items-core/inventory-safety-types/inventory-safety-types.module.code.ts"
import { useCallback } from "react"

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

function isStringBooleanRecord(value: unknown): value is Record<string, boolean> {
  if (!isRecord(value)) return false
  for (const v of Object.values(value)) {
    if (typeof v !== "boolean") return false
  }
  return true
}

const DEFAULT_LOGGING_SETTINGS: InventoryLoggingSettings = {
  actionReports: "verbose",
  perfTracing: "none",
}

export function useLoggingSettings() {
  const { settings, write } = useSettingsBlob()
  const loggingSettings = isInventoryLoggingSettings(settings.logging)
    ? settings.logging
    : DEFAULT_LOGGING_SETTINGS

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
  const safetySettings = isInventorySafetySettings(settings.safety)
    ? settings.safety
    : DEFAULT_SAFETY_SETTINGS

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
  const held = settings.shopping
  const shoppingSettings = isRecord(held)
    ? (held as ShoppingSettings | Record<string, boolean>)
    : undefined

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
