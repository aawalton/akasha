import type { AddonDataPages } from "../addon-data-pages.ts"
import { generateTemperTtcKioskLocation } from "@akasha/temper-addon-generators/ttc-kiosk-locations"
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
