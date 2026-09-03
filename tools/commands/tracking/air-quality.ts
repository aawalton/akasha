export const summary =
  "Fetch current air quality (default Provo) and report a conservative outdoor-exertion verdict (EPA AQI, keyless source)"

import type { CommandHelp } from "@akasha/command-system/command-declaring"
import { parseArgs } from "@akasha/command-system/parse-args"
import {
  assessOutdoor,
  LOCATION_PRESETS,
  type ResolvedLocation,
} from "../../../akasha/alan/tracking/daily/air-quality/air-quality.module.code.ts"
import { fetchAirQuality } from "../../../akasha/alan/tracking/daily/air-quality-fetch/air-quality-fetch.module.code.ts"
import { inputError } from "../../lib/exit.ts"

export const help: CommandHelp = {
  flags: [
    {
      name: "--location",
      argLabel: "<name>",
      valueShape: "token",
      description: "Named preset (default `provo`). Or pass --lat/--lon for arbitrary coordinates.",
    },
    {
      name: "--lat",
      argLabel: "<n>",
      valueShape: "token",
      description: "Latitude (with --lon; overrides --location)",
    },
    {
      name: "--lon",
      argLabel: "<n>",
      valueShape: "token",
      description: "Longitude (with --lat; overrides --location)",
    },
    { name: "--json", description: "Emit a JSON envelope instead of TSV lines" },
  ],
  exits: [
    { code: 0, meaning: "reading fetched and verdict reported" },
    { code: 1, meaning: "bad flags, or the air-quality source was unreachable" },
  ],
  examples: [
    "ops tracking air-quality",
    "ops tracking air-quality --location provo --json",
    "ops tracking air-quality --lat 40.76 --lon -111.89",
  ],
}

async function resolveLocation(
  latRaw: string | undefined,
  lonRaw: string | undefined,
  locationRaw: string | undefined,
  presets: Readonly<Record<string, ResolvedLocation | undefined>>
): Promise<ResolvedLocation> {
  if (latRaw !== undefined || lonRaw !== undefined) {
    if (latRaw === undefined || lonRaw === undefined) {
      throw inputError("--lat and --lon must be given together")
    }
    const latitude = Number(latRaw)
    const longitude = Number(lonRaw)
    if (!Number.isFinite(latitude) || latitude < -90 || latitude > 90) {
      throw inputError(`--lat must be a number in [-90, 90] (got "${latRaw}")`)
    }
    if (!Number.isFinite(longitude) || longitude < -180 || longitude > 180) {
      throw inputError(`--lon must be a number in [-180, 180] (got "${lonRaw}")`)
    }
    return { label: `${latitude},${longitude}`, latitude, longitude }
  }

  const name = (locationRaw ?? "provo").toLowerCase()
  const preset = presets[name]
  if (preset === undefined) {
    const known = Object.keys(presets).join(", ")
    throw inputError(`unknown --location "${name}" (known presets: ${known}; or use --lat/--lon)`)
  }
  return preset
}

export default async function trackingAirQuality(args: readonly string[]): Promise<void> {
  const parsed = parseArgs(help, args)
  const json = parsed.boolean("--json")

  const location = await resolveLocation(
    parsed.string("--lat"),
    parsed.string("--lon"),
    parsed.string("--location"),
    LOCATION_PRESETS
  )

  console.error(`Fetching air quality for ${location.label}…`)
  const reading = await fetchAirQuality(location)
  const assessment = assessOutdoor(reading)

  if (json) {
    process.stdout.write(
      `${JSON.stringify({
        location: location.label,
        aqi: reading.aqi,
        category: reading.category,
        dominantPollutant: reading.dominantPollutant,
        source: reading.source,
        observedAt: reading.observedAt,
        verdict: assessment.verdict,
        indoorOnly: assessment.indoorOnly,
        pm25Driven: assessment.pm25Driven,
        headline: assessment.headline,
      })}\n`
    )
    return
  }

  process.stdout.write(
    `location\t${location.label}\n` +
      `aqi\t${reading.aqi}\n` +
      `category\t${reading.category}\n` +
      `dominantPollutant\t${reading.dominantPollutant}\n` +
      `source\t${reading.source}\n` +
      `observedAt\t${reading.observedAt}\n` +
      `verdict\t${assessment.verdict}\n` +
      `indoorOnly\t${assessment.indoorOnly}\n` +
      `headline\t${assessment.headline}\n`
  )
}
