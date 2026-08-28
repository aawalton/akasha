
export const summary = "Log one food entry ([--image], --title, [--plant-grams], [--estimated-calories], [--date], [--time]) — its plantGrams feeds Natalie's nutritionPoints at 1pt/gram"

import { readFile } from "node:fs/promises"
import type { CommandHelp } from "../../ops/surface.ts"
import { getEsoDayStr, nyWallToInstant } from "../../lib/eso-day.ts"
import { inputError, operationalError } from "../../lib/exit.ts"
import { type ObjectStore, seaweedFSObjectStoreFromEnv } from "../../lib/object-store.ts"
import { imageObjectKey } from "../../lib/object-store-keys"
import { askComposed, pageLanding, patchPage } from "../../lib/page-query-client.ts"
import { parseArgs } from "../../lib/parse-args.ts"
import { resolveRoots } from "../../../repo/roots/roots"
import { wakeDayOf } from "../../lib/wake-day.ts"

export const help: CommandHelp = {
  positionals: [
    {
      name: "title",
      required: false,
      aliasOfFlag: "--title",
      description: 'Short food name (e.g. "Shrimp & grits", "Broccoli")',
    },
  ],
  flags: [
    {
      name: "--image",
      argLabel: "<path>",
      valueShape: "token",
      description: "Local path to a food photo (published as the entry cover); optional",
    },
    {
      name: "--title",
      argLabel: "<name>",
      valueShape: "line",
      required: true,
      description: 'Short food name (e.g. "Shrimp & grits", "Broccoli")',
    },
    {
      name: "--plant-grams",
      argLabel: "<n>",
      valueShape: "token",
      description: "Grams of whole plants in the food — feeds nutritionPoints (1 pt/gram)",
    },
    {
      name: "--estimated-calories",
      argLabel: "<n>",
      valueShape: "token",
      description: "Estimated total calories for the food",
    },
    {
      name: "--date",
      argLabel: "<YYYY-MM-DD>",
      valueShape: "token",
      description: "New York calendar date the food was eaten on (default: now)",
    },
    {
      name: "--time",
      argLabel: "<HH:MM>",
      valueShape: "token",
      description: "New York wall clock the food was eaten at, 24-hour, read on --date",
    },
    { name: "--json", description: "Emit a JSON envelope instead of TSV lines" },
  ],
  exits: [
    {
      code: 0,
      meaning:
        "the food entry is written; `notLanded` names each step after it — `cover`, " +
        "`nutritionPoints` — that did not land, and reads `none` when both did",
    },
    { code: 1, meaning: "bad input (empty image, unreadable --time) — nothing was written" },
    {
      code: 3,
      meaning:
        "object store not configured (missing SEAWEEDFS_* env) — only with --image, and " +
        "checked before anything is written",
    },
  ],
  examples: [
    'ops food log --image ~/meal.jpg --title "Shrimp & grits" --plant-grams 120 --estimated-calories 650',
    'ops food log --title "Broccoli" --plant-grams 90',
    'ops food log --title "Gingerbread" --date 2026-06-26',
    'ops food log --title "Sweet potato sticks" --plant-grams 150 --time 14:30',
  ],
}

const FOOD_ENTRY_PAGE_TYPE_SLUG = "food-entry"
const FOOD_WRITER = "ops-food"

const COVER_STEP = "cover"
const NUTRITION_STEP = "nutritionPoints"
const NOTHING_MISSED = "none"

const STEM_CEILING = 100
const NOON = 12
const MAX_FOOD_ENTRIES = 5000
const DAY_PATTERN = /^\d{4}-\d{2}-\d{2}$/

interface NutritionPoints {
  readonly rollupNutritionForDay: (dayStr: string) => Promise<unknown>
}

function wallClockFrom(raw: string): { hh: number; mm: number } {
  const match = /^(\d{1,2}):(\d{2})$/.exec(raw)
  const hh = match === null ? Number.NaN : Number(match[1])
  const mm = match === null ? Number.NaN : Number(match[2])
  if (Number.isNaN(hh) || Number.isNaN(mm) || hh > 23 || mm > 59) {
    throw inputError(`--time must be HH:MM on a 24-hour clock, got: ${raw}`)
  }
  return { hh, mm }
}

function happenedAtFrom(dateFlag: string | undefined, timeFlag: string | undefined): Date {
  if (dateFlag === undefined && timeFlag === undefined) return new Date()
  if (dateFlag !== undefined && !DAY_PATTERN.test(dateFlag)) {
    throw inputError(`--date must be YYYY-MM-DD, got: ${dateFlag}`)
  }
  const dayStr = dateFlag ?? getEsoDayStr(new Date())
  const wall = timeFlag !== undefined ? wallClockFrom(timeFlag) : { hh: NOON, mm: 0 }
  return nyWallToInstant(dayStr, wall.hh, wall.mm)
}

function stemFor(dayStr: string, title: string): string {
  const slug = title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
  const whole = slug === "" ? dayStr : `${dayStr}-${slug}`
  return whole.length <= STEM_CEILING ? whole : whole.slice(0, STEM_CEILING).replace(/-+$/, "")
}

async function freeStemFor(dayStr: string, title: string): Promise<string> {
  const stem = stemFor(dayStr, title)
  const asked = await askComposed({
    "page-type": FOOD_ENTRY_PAGE_TYPE_SLUG,
    keys: ["slug"],
    limit: MAX_FOOD_ENTRIES,
  })
  if (!asked.ok) throw operationalError(`reading the food entries standing: ${asked.why}`)
  let taken = 0
  for (const row of asked.rows) {
    const slug = row.values.slug
    if (typeof slug !== "string") continue
    if (slug === stem || slug.startsWith(`${stem}-`)) taken += 1
  }
  return taken === 0 ? stem : `${stem}-${taken + 1}`
}

function nonNegativeNumber(name: string, raw: string): number {
  const n = Number(raw)
  if (!Number.isFinite(n) || n < 0) {
    throw inputError(`${name} must be a non-negative number, got: ${raw}`)
  }
  return n
}

export default async function foodLog(args: readonly string[]): Promise<void> {
  const parsed = parseArgs(help, args)
  const imagePath = parsed.string("--image")
  const title = parsed.requireString("--title")
  const happenedAtDate = happenedAtFrom(parsed.string("--date"), parsed.string("--time"))
  const happenedAt = happenedAtDate.toISOString()
  const dayStr = wakeDayOf(resolveRoots(), happenedAtDate)
  const plantGramsRaw = parsed.string("--plant-grams")
  const estimatedCaloriesRaw = parsed.string("--estimated-calories")
  const plantGrams =
    plantGramsRaw !== undefined ? nonNegativeNumber("--plant-grams", plantGramsRaw) : undefined
  const estimatedCalories =
    estimatedCaloriesRaw !== undefined
      ? nonNegativeNumber("--estimated-calories", estimatedCaloriesRaw)
      : undefined
  const json = parsed.boolean("--json")

  let bytes: Uint8Array | null = null
  let store: ObjectStore | null = null
  if (imagePath !== undefined) {
    bytes = await readFile(imagePath).catch(() => null)
    if (bytes === null || bytes.length === 0) {
      throw inputError(`--image not found or empty: ${imagePath}`)
    }
    store = seaweedFSObjectStoreFromEnv()
    if (store === null) {
      throw operationalError(
        "object store not configured — set SEAWEEDFS_S3_ENDPOINT / SEAWEEDFS_BUCKET / SEAWEEDFS_ACCESS_KEY / SEAWEEDFS_SECRET_KEY"
      )
    }
  }

  const stem = await freeStemFor(dayStr, title)
  const foodId = Bun.randomUUIDv7()

  console.error(`Logging food "${title}" on ${dayStr}…`)
  const written = await pageLanding(
    "write",
    FOOD_ENTRY_PAGE_TYPE_SLUG,
    stem,
    {
      id: foodId,
      title,
      slug: stem,
      "happened-at": happenedAt,
      ...(plantGrams !== undefined ? { "plant-grams": plantGrams } : {}),
      ...(estimatedCalories !== undefined ? { "estimated-calories": estimatedCalories } : {}),
    },
    FOOD_WRITER
  )
  if (!written.ok) {
    throw operationalError(`the food entry did not land as a file: ${written.why}`)
  }

  const notLanded: string[] = []
  const missed = (step: string, err: unknown, standing: string): void => {
    notLanded.push(step)
    const why = err instanceof Error ? err.message : String(err)
    console.error(
      `${step} did not land for food entry ${foodId}: ${why}\n` +
        `The entry itself is written — re-running \`ops food log\` would write a second one. ${standing}`
    )
  }

  let cover: string | null = null
  if (bytes !== null && store !== null) {
    try {
      const key = imageObjectKey(foodId)
      await store.put(key, new Uint8Array(bytes))
      cover = `/api/image/${foodId}`
      const patched = await patchPage(
        FOOD_ENTRY_PAGE_TYPE_SLUG,
        stem,
        { cover },
        FOOD_WRITER
      )
      if (!patched.ok) throw new Error(patched.why)
    } catch (err) {
      cover = null
      missed(COVER_STEP, err, `The entry carries no cover; ${imagePath} is untouched on disk.`)
    }
  }

  try {
    const nutrition: NutritionPoints = await import("../../lib/daily-tracking/nutrition-points.ts")
    await nutrition.rollupNutritionForDay(dayStr)
  } catch (err) {
    missed(
      NUTRITION_STEP,
      err,
      `The day's roll-up did not finish; \`ops tracking nutrition-sync --date ${dayStr}\` redoes the whole of it.`
    )
  }

  if (json) {
    process.stdout.write(
      `${JSON.stringify({
        id: foodId,
        title,
        happenedAt,
        day: dayStr,
        cover,
        plantGrams: plantGrams ?? null,
        estimatedCalories: estimatedCalories ?? null,
        notLanded,
      })}\n`
    )
    return
  }
  process.stdout.write(
    `id\t${foodId}\n` +
      `title\t${title}\n` +
      `happenedAt\t${happenedAt}\n` +
      `day\t${dayStr}\n` +
      `cover\t${cover ?? "-"}\n` +
      `plantGrams\t${plantGrams ?? "-"}\n` +
      `estimatedCalories\t${estimatedCalories ?? "-"}\n` +
      `notLanded\t${notLanded.length === 0 ? NOTHING_MISSED : notLanded.join(",")}\n`
  )
}
