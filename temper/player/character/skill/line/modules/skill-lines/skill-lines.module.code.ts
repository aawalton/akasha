import type { SkillLineId as SkillLinePageSlug } from "akasha/temper/catalog/skill/line/modules/skill-line-ids/skill-line-ids.data-table.code.ts"
import {
  skillCatalog,
  tableView,
} from "akasha/temper/player/character/skill/modules/held-skill-catalog/held-skill-catalog.module.code.ts"

export const skillLines = tableView(() => skillCatalog().skillLines)

export type SkillLineId = SkillLinePageSlug

type ByClass = Readonly<Record<string, readonly SkillLineId[]>>

function computeSkillLinesByClass(lines: typeof skillLines.list): ByClass {
  const grouped: Record<string, SkillLineId[]> = {}
  for (const line of lines) {
    if (!("class" in line) || line.class === undefined) continue
    const classId: string = line.class
    const existing = grouped[classId]
    if (existing) {
      existing.push(line.id)
    } else {
      grouped[classId] = [line.id]
    }
  }
  return grouped
}

let byClass: { readonly from: typeof skillLines.list; readonly grouped: ByClass } | null = null

const EMPTY_SKILL_LINE_IDS: readonly SkillLineId[] = []

export function getSkillLineIdsForClass(classId: string): readonly SkillLineId[] {
  const from = skillLines.list
  if (byClass?.from !== from) byClass = { from, grouped: computeSkillLinesByClass(from) }
  return byClass.grouped[classId] ?? EMPTY_SKILL_LINE_IDS
}
