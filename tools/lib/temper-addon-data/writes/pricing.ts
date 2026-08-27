import type { AddonDataPages } from "../addon-data-pages.ts"
import { generateTemperTtcKioskLocation } from "../generators/ttc-kiosk-locations.ts"
import { TEMPER_PRICING_OUTPUT_DIR } from "../output-dirs.ts"

export function buildAddonDataWritesPricing(
  p: AddonDataPages,
  w: (dir: string, name: string, source: string) => Promise<number>
): readonly Promise<number>[] {
  return [
    w(
      TEMPER_PRICING_OUTPUT_DIR,
      "ttc-kiosk-locations.generated.ts",
      generateTemperTtcKioskLocation(p.ttcKioskLocationPages.rows)
    ),
  ]
}
