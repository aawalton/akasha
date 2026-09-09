import "@akasha/temper-eso-types/eso-api"
import "@akasha/temper-eso-types/eso-functions-01"
import "@akasha/temper-eso-types/eso-functions-02"
import { getSavedVariables } from "../trading-saved-variables/trading-saved-variables.module.code.ts"
import type {
  LastSoldEntry,
  SavedVariablesData,
} from "../trading-types/trading-types.module.code.ts"

function getLastSoldRecord(this: void): Record<string, LastSoldEntry> {
  const sv: SavedVariablesData = getSavedVariables()
  const record = readLastSoldRecord(sv.lastSold)
  if (record === undefined) {
    const fresh: Record<string, LastSoldEntry> = {}
    sv.lastSold = fresh
    return fresh
  }
  return record
}

function readLastSoldRecord(this: void, raw: unknown): Record<string, LastSoldEntry> | undefined {
  if (!isLastSoldRecord(raw)) return undefined
  return raw
}

function isLastSoldRecord(this: void, raw: unknown): raw is Record<string, LastSoldEntry> {
  return typeof raw === "object" && raw !== null && !Array.isArray(raw)
}

export function getLastSold(this: void, key: string): LastSoldEntry | undefined {
  const entry = getLastSoldRecord()[key]
  if (entry === undefined) return undefined
  if (typeof entry.pricePerUnit !== "number" || typeof entry.stackCount !== "number") {
    return undefined
  }
  return entry
}

export function putLastSold(
  this: void,
  key: string,
  stackCount: number,
  pricePerUnit: number
): undefined {
  getLastSoldRecord()[key] = { stackCount, pricePerUnit }
}
