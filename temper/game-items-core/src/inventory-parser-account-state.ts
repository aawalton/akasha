import { asRecord } from "@akasha/utils-narrow/as-record"

export function parseOpenCooldowns(raw: unknown): Record<string, number> | undefined {
  const obj = asRecord(raw)
  if (!obj) return undefined
  const out: Record<string, number> = {}
  for (const [k, v] of Object.entries(obj)) {
    if (typeof v === "number") out[k] = v
  }
  return Object.keys(out).length > 0 ? out : undefined
}

export function parseCraftingLevels(
  raw: unknown
): Record<string, Record<number, number>> | undefined {
  const obj = asRecord(raw)
  if (!obj) return undefined
  const out: Record<string, Record<number, number>> = {}
  for (const [charId, charValue] of Object.entries(obj)) {
    const charLevels = asRecord(charValue)
    if (!charLevels) continue
    const levels: Record<number, number> = {}
    for (const [craftKey, level] of Object.entries(charLevels)) {
      const craftType = Number(craftKey)
      if (Number.isFinite(craftType) && typeof level === "number") {
        levels[craftType] = level
      }
    }
    if (Object.keys(levels).length > 0) out[charId] = levels
  }
  return Object.keys(out).length > 0 ? out : undefined
}

export function parseTransmuteCrystalCap(raw: unknown): number | undefined {
  return typeof raw === "number" ? raw : undefined
}

export function parseTransmuteCrystalAmount(raw: unknown): number | undefined {
  return typeof raw === "number" ? raw : undefined
}
