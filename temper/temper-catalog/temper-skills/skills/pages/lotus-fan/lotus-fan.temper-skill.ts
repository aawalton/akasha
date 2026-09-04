import type { TemperSkill } from "../../temper-skill.page-type.ts"

export const lotusFan = {
  id: "019e6245-a6c1-7f60-b263-e4f51d36adda",
  pageTypeSlug: "temper-skill",
  slug: "lotus-fan",
  title: "Lotus Fan",
  key: "lotus-fan",
  baseName: "Teleport Strike",
  description:
    '"Flash through the shadows and ambush an enemy while unleashing a fan of knives, dealing 1603 Magic Damage to them and enemies around you.\\n\\nAll enemies hit take an additional 2050 Magic Damage over 5 seconds and are afflicted with Minor Vulnerability for 10 seconds, increasing their damage taken by 5%."',
  icon: "/esoui/art/icons/ability_nightblade_008_a.dds",
  esoSkillId: 35882,
  isMorph: true,
  learnedLevel: 4,
  lineRankNeeded: 4,
  morphIndex: 1,
  rank: 8,
  skillLineId: "nightblade-assassination",
  skillType: "active",
  subcategoryId: "nightblade-assassination",
} as const satisfies TemperSkill
