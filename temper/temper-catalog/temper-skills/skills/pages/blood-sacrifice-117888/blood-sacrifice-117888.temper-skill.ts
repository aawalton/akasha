import type { TemperSkill } from "../../temper-skill.page-type.ts"

export const bloodSacrifice117888 = {
  id: "019e6f53-9f5a-798a-a316-641499e6029e",
  pageTypeSlug: "temper-skill",
  slug: "blood-sacrifice-117888",
  title: "Blood Sacrifice",
  key: "blood-sacrifice-117888",
  baseName: "Render Flesh",
  description:
    '"Sacrifice your own power to repair damaged flesh, healing you or an ally in front of you for |cffffff11321|r Health but applying Minor Defile to yourself for |cffffff4|r seconds, reducing your healing received and damage shield strength by |cffffff6|r%.\\n\\nConsumes a corpse near you when cast to heal a second target."',
  icon: "/esoui/art/icons/ability_necromancer_013_b.dds",
  esoSkillId: 117888,
  isMorph: true,
  learnedLevel: 1,
  lineRankNeeded: 1,
  morphIndex: 2,
  rank: 1,
  skillLineId: "necromancer-living-death",
  skillType: "active",
  subcategoryId: "necromancer-living-death",
} as const satisfies TemperSkill
