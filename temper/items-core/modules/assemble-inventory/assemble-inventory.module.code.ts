import type { InventoryDatabase } from "akasha/temper/items-core/inventory-types/inventory-types.module.code.ts"
import { parseNumber } from "akasha/utils/narrow/parse-number/parse-number.module.code.ts"
import { stringIn } from "akasha/utils/narrow/string-in/string-in.module.code.ts"
import { z } from "zod"

function readNumber(value: unknown): number | undefined {
  return parseNumber(value)
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
  const combined = ordered.map((c) => stringIn(c.data) ?? "").join("")
  try {
    return INVENTORY_DATABASE_SCHEMA.parse(JSON.parse(combined))
  } catch {
    return null
  }
}
