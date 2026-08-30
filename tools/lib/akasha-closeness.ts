import {
  numberAt,
  textAt,
  valueAt,
} from "../../akasha/pages-system/indexes/index-entries/index-entries.module.code.ts"
import { everyOfTypeAnswered } from "../../akasha/pages-system/indexes/index-reading/index-reading.module.code.ts"

const PAGE_TYPE = "closeness-level"

export interface ClosenessLevel {
  readonly level: number
  readonly stage: string
  readonly closeness: string
  readonly wardrobe: string
  readonly pose: string
}

function levelFrom(root: string, path: string): ClosenessLevel {
  const value = valueAt(path, root)
  if (value === null) {
    throw new Error(`${path} is a closeness level and answers to nothing a reader can take it from`)
  }
  const level = numberAt(value, "level")
  const stage = textAt(value, "stage")
  const closeness = textAt(value, "definition")
  const wardrobe = textAt(value, "wardrobe")
  const pose = textAt(value, "pose")
  if (
    level === null ||
    stage === null ||
    closeness === null ||
    wardrobe === null ||
    pose === null
  ) {
    throw new Error(`${path} is a closeness level and does not state all of what a rung holds`)
  }
  return { level, stage, closeness, wardrobe, pose }
}

export function closenessLevels(root: string): readonly ClosenessLevel[] {
  const found = everyOfTypeAnswered(root, PAGE_TYPE).map((standing) =>
    levelFrom(root, standing.path)
  )
  if (found.length === 0) {
    throw new Error(
      "no closeness level stands, so the ladder would read as having no rungs rather than as unread"
    )
  }
  return [...found].sort((one, two) => one.level - two.level)
}

export function closenessLevelAt(root: string, level: number): ClosenessLevel | null {
  return closenessLevels(root).find((one) => one.level === level) ?? null
}

export function stageForLevel(root: string, level: number): string {
  const rungs = closenessLevels(root)
  const held = rungs.find((one) => one.level === level)
  if (held !== undefined) return held.stage
  const last = rungs[rungs.length - 1]
  const first = rungs[0]
  if (last === undefined || first === undefined) {
    throw new Error("the closeness ladder answered with rungs and then with none")
  }
  return level > last.level ? last.stage : first.stage
}
