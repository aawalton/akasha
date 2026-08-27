import { skillLines } from "./generated/temper-skill-line.generated"
import type { SkillLineCategoryId } from "./skill-line-categories"

export { skillLines } from "./generated/temper-skill-line.generated"

export interface SkillLineTemplate {
  id: string
  name: string
  subcategoryId: SkillLineCategoryId | "none"
  class?: string
  displayOrder: number
  esoSkillLineId: number
  maxRank: number
}

export type SkillLineId = (typeof skillLines.ids)[number]

function computeSkillLinesByClass(): Readonly<Record<string, readonly SkillLineId[]>> {
  const grouped: Record<string, SkillLineId[]> = {}
  for (const line of skillLines.list) {
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

const skillLinesByClass = computeSkillLinesByClass()

const EMPTY_SKILL_LINE_IDS: readonly SkillLineId[] = []

export function getSkillLineIdsForClass(classId: string): readonly SkillLineId[] {
  return skillLinesByClass[classId] ?? EMPTY_SKILL_LINE_IDS
}
