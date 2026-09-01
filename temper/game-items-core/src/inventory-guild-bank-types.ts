import { isRecord } from "@akasha/utils-narrow/is-record"

export interface ManagedGuildBankSettings {
  managedGuildBanks: readonly string[]
}

const SETTINGS_SLICE_KEY = "managed-guild-banks"

export function readManagedGuildBanks(settings: unknown): ReadonlySet<string> {
  if (!isRecord(settings)) return new Set()
  const slice = settings[SETTINGS_SLICE_KEY]
  if (!isRecord(slice)) return new Set()
  const keys = slice.managedGuildBanks
  if (!Array.isArray(keys)) return new Set()
  return new Set(keys.filter((key): key is string => typeof key === "string"))
}
