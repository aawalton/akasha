
export const summary = "Add a custom exercise to the catalog (source=aelwyn-custom) — validated select/multi-select fields, the ergonomic alternative to a raw page create"

import { parseDecimalFlag } from "@collections/exercises/cli/fields"
import {
  normalizeMultiSelect,
  normalizeSelectValue,
} from "@collections/exercises/cli/select-values"
import type { CustomExerciseInput } from "@collections/exercises/free-exercise-db/custom-features"
import { deriveCustomExerciseFeatures } from "@collections/exercises/free-exercise-db/custom-features"
import { slugifyOptionId } from "@collections/exercises/free-exercise-db/map"
import { selectionFeatureProps } from "@collections/exercises/free-exercise-db/selection-features"
import { createPage } from "@collections/exercises/pages/access"
import type { Json } from "@collections/exercises/pages/page"
import type { CommandHelp } from "../../ops/surface.ts"
import { parseArgs } from "../../lib/parse-args.ts"
import {
  CATEGORY_OPTIONS,
  EQUIPMENT_OPTIONS,
  FORCE_OPTIONS,
  LEVEL_OPTIONS,
  MECHANIC_OPTIONS,
  MUSCLE_OPTIONS,
} from "../../lib/exercise-vocabularies.ts"

const CUSTOM_SOURCE = "aelwyn-custom"

export const help: CommandHelp = {
  flags: [
    {
      name: "--title",
      argLabel: "<title>",
      valueShape: "prose",
      required: true,
      description: "Exercise name",
    },
    {
      name: "--slug",
      argLabel: "<slug>",
      valueShape: "token",
      description: "URL slug (default: slugified title)",
    },
    {
      name: "--category",
      argLabel: "<value>",
      valueShape: "token",
      description: `Category select — one of: ${CATEGORY_OPTIONS.join(", ")}`,
    },
    {
      name: "--equipment",
      argLabel: "<value>",
      valueShape: "token",
      description: `Equipment select — one of: ${EQUIPMENT_OPTIONS.join(", ")}`,
    },
    {
      name: "--force",
      argLabel: "<value>",
      valueShape: "token",
      description: `Force select — one of: ${FORCE_OPTIONS.join(", ")}`,
    },
    {
      name: "--level",
      argLabel: "<value>",
      valueShape: "token",
      description: `Level select — one of: ${LEVEL_OPTIONS.join(", ")}`,
    },
    {
      name: "--mechanic",
      argLabel: "<value>",
      valueShape: "token",
      description: `Mechanic select — one of: ${MECHANIC_OPTIONS.join(", ")}`,
    },
    {
      name: "--primary-muscles",
      argLabel: "<csv>",
      valueShape: "token",
      description: `Comma-separated primary muscles from: ${MUSCLE_OPTIONS.join(", ")}`,
    },
    {
      name: "--secondary-muscles",
      argLabel: "<csv>",
      valueShape: "token",
      description: "Comma-separated secondary muscles (same vocabulary as --primary-muscles)",
    },
    {
      name: "--load-factor",
      argLabel: "<n>",
      valueShape: "token",
      description: "Bodyweight fraction loaded per rep (default 0)",
    },
    {
      name: "--implement-count",
      argLabel: "<n>",
      valueShape: "token",
      description: "Implements the logged weight represents (default 1)",
    },
    { name: "--json", description: "Emit a JSON envelope instead of TSV lines" },
  ],
  positionals: [
    { name: "title", required: false, aliasOfFlag: "--title", description: "Exercise name" },
  ],
  exits: [
    { code: 0, meaning: "exercise created" },
    { code: 1, meaning: "input validation or create failure" },
  ],
  examples: [
    'ops exercise add "Goblet Reverse Lunge" --category strength --equipment dumbbell ' +
      "--force push --level beginner --mechanic compound " +
      '--primary-muscles "quadriceps,glutes" --secondary-muscles "hamstrings,calves,abductors" ' +
      "--implement-count 1",
    "ops exercise add --title-file ./title.txt --category strongman --equipment other --force push",
  ],
}

export default async function addCommand(args: readonly string[]): Promise<void> {
  const parsed = parseArgs(help, args)

  const title = parsed.requireString("--title")
  const slug = parsed.string("--slug") ?? slugifyOptionId(title)
  const json = parsed.boolean("--json")

  const category = parsed.string("--category")
  const equipment = parsed.string("--equipment")
  const force = parsed.string("--force")
  const level = parsed.string("--level")
  const mechanic = parsed.string("--mechanic")
  const primaryMuscles = parsed.string("--primary-muscles")
  const secondaryMuscles = parsed.string("--secondary-muscles")
  const loadFactor = parseDecimalFlag("--load-factor", parsed.string("--load-factor")) ?? 0
  const implementCount = parsed.nonNegativeInt("--implement-count") ?? 1

  const classification: CustomExerciseInput = {
    title,
    ...(category !== undefined
      ? { category: normalizeSelectValue(category, CATEGORY_OPTIONS, "category") }
      : {}),
    ...(equipment !== undefined
      ? { equipment: normalizeSelectValue(equipment, EQUIPMENT_OPTIONS, "equipment") }
      : {}),
    ...(force !== undefined ? { force: normalizeSelectValue(force, FORCE_OPTIONS, "force") } : {}),
    ...(level !== undefined ? { level: normalizeSelectValue(level, LEVEL_OPTIONS, "level") } : {}),
    ...(mechanic !== undefined
      ? { mechanic: normalizeSelectValue(mechanic, MECHANIC_OPTIONS, "mechanic") }
      : {}),
    ...(primaryMuscles !== undefined
      ? { primaryMuscles: normalizeMultiSelect(primaryMuscles, MUSCLE_OPTIONS, "primaryMuscles") }
      : {}),
    ...(secondaryMuscles !== undefined
      ? {
          secondaryMuscles: normalizeMultiSelect(
            secondaryMuscles,
            MUSCLE_OPTIONS,
            "secondaryMuscles"
          ),
        }
      : {}),
  }

  const properties: Record<string, Json> = {
    title,
    slug,
    source: CUSTOM_SOURCE,
    loadFactor,
    implementCount,
    ...(classification.category !== undefined ? { category: classification.category } : {}),
    ...(classification.equipment !== undefined ? { equipment: classification.equipment } : {}),
    ...(classification.force !== undefined ? { force: classification.force } : {}),
    ...(classification.level !== undefined ? { level: classification.level } : {}),
    ...(classification.mechanic !== undefined ? { mechanic: classification.mechanic } : {}),
    ...(classification.primaryMuscles !== undefined
      ? { primaryMuscles: [...classification.primaryMuscles] }
      : {}),
    ...(classification.secondaryMuscles !== undefined
      ? { secondaryMuscles: [...classification.secondaryMuscles] }
      : {}),
    ...selectionFeatureProps(deriveCustomExerciseFeatures(classification)),
  }

  console.error(`Creating custom exercise "${title}"…`)
  const exercise = await createPage("exercise", slug, properties)

  if (json) {
    process.stdout.write(
      `${JSON.stringify({
        id: exercise.id,
        seq: exercise.seq,
        title,
        slug,
        source: CUSTOM_SOURCE,
        category: properties.category ?? null,
        loadFactor,
        implementCount,
      })}\n`
    )
    return
  }
  process.stdout.write(
    `id\t${exercise.id}\n` +
      `seq\t${exercise.seq}\n` +
      `title\t${title}\n` +
      `slug\t${slug}\n` +
      `category\t${properties.category ?? "-"}\n`
  )
}
