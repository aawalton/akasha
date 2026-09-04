import { z } from "zod"
import type { InventoryDatabase } from "../inventory-types/inventory-types.module.code.ts"

function readString(value: unknown): string | undefined {
  return typeof value === "string" ? value : undefined
}

function readNumber(value: unknown): number | undefined {
  return typeof value === "number" ? value : undefined
}

const INVENTORY_DATABASE_SCHEMA: z.ZodType<InventoryDatabase> = z.custom<InventoryDatabase>(
  () => true
)

export function assembleInventory(
  chunks: readonly Record<string, unknown>[]
): InventoryDatabase | null {
  if (chunks.length === 0) return null
  const ordered = [...chunks].sort((a, b) => {
    const ai = readNumber(a.chunkIndex) ?? 0
    const bi = readNumber(b.chunkIndex) ?? 0
    return ai - bi
  })
  const combined = ordered.map((c) => readString(c.data) ?? "").join("")
  try {
    return INVENTORY_DATABASE_SCHEMA.parse(JSON.parse(combined))
  } catch {
    return null
  }
}
