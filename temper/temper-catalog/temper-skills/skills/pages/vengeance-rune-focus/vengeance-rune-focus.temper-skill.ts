import type { TemperSkill } from "../../temper-skill.page-type.ts"

export const vengeanceRuneFocus = {
  id: "019e6f53-a96c-7782-8942-a68dbc71904f",
  pageTypeSlug: "temper-skill",
  slug: "vengeance-rune-focus",
  title: "Vengeance Rune Focus",
  key: "vengeance-rune-focus",
  baseName: "Vengeance Rune Focus",
  description:
    '"Create a rune of celestial protection and gain Major Resolve for |cffffff20|r seconds, increasing your Physical Resistance and Spell Resistance by |cffffff5948|r."',
  icon: "/esoui/art/icons/ability_templar_rune_focus.dds",
  esoSkillId: 238041,
  isMorph: false,
  learnedLevel: 0,
  lineRankNeeded: 1,
  morphIndex: 0,
  rank: 1,
  skillLineId: "vengeance-templar-restoring-light",
  skillType: "active",
  subcategoryId: "vengeance-templar-restoring-light",
} as const satisfies TemperSkill
