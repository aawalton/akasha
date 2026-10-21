import { emeraldMoss } from "akasha/temper/catalog/skill/pages/emerald-moss/emerald-moss.temper-skill.ts"

const SCOPED_HEALING = [{ held: emeraldMoss.slug, line: emeraldMoss.skillLineId, percentEach: 5 }]

export function healingDoneOfSkill(
  healingDone: number,
  line: string | undefined,
  slotted: readonly (string | undefined)[],
  held: ReadonlySet<string>
): number {
  return SCOPED_HEALING.filter((one) => held.has(one.held) && line === one.line).reduce(
    (sum, one) =>
      sum + (one.percentEach / 100) * slotted.filter((other) => other === one.line).length,
    healingDone
  )
}
