import type { TemperSkill } from "../../temper-skill.page-type.ts"

export const ferociousLeap32715 = {
  id: "019e6f53-a1f1-796c-b40b-1c908527d684",
  pageTypeSlug: "temper-skill",
  slug: "ferocious-leap-32715",
  title: "Ferocious Leap",
  key: "ferocious-leap-32715",
  baseName: "Dragon Leap",
  description:
    '"Launch yourself at an enemy, dealing |cffffff13129|r Flame Damage to all enemies in the area, knocking players back |cffffff4|r meters and stunning them for |cffffff2|r seconds. If the target is a monster they are instead knocked into the air and stunned for |cffffff3|r seconds.\\n\\nUpon activation you gain a damage shield that absorbs |cffffff24338|r damage for |cffffff10|r seconds. This portion of the ability scales with your Max Health."',
  icon: "/esoui/art/icons/ability_dragonknight_009_a.dds",
  esoSkillId: 32715,
  isMorph: true,
  learnedLevel: 12,
  lineRankNeeded: 12,
  morphIndex: 2,
  rank: 12,
  skillLineId: "dragonknight-draconic-power",
  skillType: "ultimate",
  subcategoryId: "dragonknight-draconic-power",
} as const satisfies TemperSkill
