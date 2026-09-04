import type { TemperSkill } from "../../temper-skill.page-type.ts"

export const carve38745 = {
  id: "019e6f53-9fb9-7aac-a861-ef2b52754b07",
  pageTypeSlug: "temper-skill",
  slug: "carve-38745",
  title: "Carve",
  key: "carve-38745",
  baseName: "Cleave",
  description:
    '"Focus your strength into a mighty swing, dealing |cffffff6401|r Bleed Damage to enemies in front of you, and causing them to bleed for an additional |cffffff9438|r Bleed Damage over |cffffff12|r seconds.  \\n\\nHitting a target that is already bleeding from this ability extends the duration by |cffffff10|r seconds, up to a maximum of |cffffff32|r.\\n\\nYou also gain a damage shield that absorbs |cffffff6178|r damage for |cffffff6|r seconds."',
  icon: "/esoui/art/icons/ability_2handed_002_a.dds",
  esoSkillId: 38745,
  isMorph: true,
  learnedLevel: 1,
  lineRankNeeded: 14,
  morphIndex: 1,
  rank: 14,
  skillLineId: "weapon-two-handed",
  skillType: "active",
  subcategoryId: "weapon-two-handed",
} as const satisfies TemperSkill
