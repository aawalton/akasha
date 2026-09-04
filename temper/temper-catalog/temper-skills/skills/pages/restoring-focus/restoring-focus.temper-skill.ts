import type { TemperSkill } from "../../temper-skill.page-type.ts"

export const restoringFocus = {
  id: "019e6245-a70f-7ebe-9bca-f7264db1654b",
  pageTypeSlug: "temper-skill",
  slug: "restoring-focus",
  title: "Restoring Focus",
  key: "restoring-focus",
  baseName: "Rune Focus",
  description:
    '"Create a rune of celestial protection and gain Major Resolve for 20 seconds, increasing your Physical Resistance and Spell Resistance by 5948. You also recover 242 Stamina every 1 second over the duration.\\n\\nWhile the rune is active you heal for 413 Health every 1 second, scaling off your Max Health. Standing within the rune increases the healing done by 200%."',
  icon: "/esoui/art/icons/ability_templar_uninterrupted_focus.dds",
  esoSkillId: 23985,
  isMorph: true,
  learnedLevel: 42,
  lineRankNeeded: 42,
  morphIndex: 2,
  rank: 12,
  skillLineId: "templar-restoring-light",
  skillType: "active",
  subcategoryId: "templar-restoring-light",
} as const satisfies TemperSkill
