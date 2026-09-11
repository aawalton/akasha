import type { TTCPriceEntry } from "akasha/temper/trading-pricing/pricing-types/pricing-types.module.code.ts"

export function isPriceEntry(value: unknown): value is TTCPriceEntry {
  return (
    typeof value === "object" &&
    value !== null &&
    ("S" in value || "A" in value || "SA" in value || "N" in value)
  )
}
