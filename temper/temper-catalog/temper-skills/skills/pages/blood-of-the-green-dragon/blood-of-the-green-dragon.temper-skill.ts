import type { TemperSkill } from "../../temper-skill.page-type.ts"

export const bloodOfTheGreenDragon = {
  id: "019e6f53-9f52-7e02-8f76-43a6a09197e4",
  pageTypeSlug: "temper-skill",
  slug: "blood-of-the-green-dragon",
  title: "Blood of the Green Dragon",
  key: "blood-of-the-green-dragon",
  baseName: "Dragon Blood",
  description:
    '"Draw on your draconic blood to heal for |cffffff5194|r Health, increasing by up to |cffffff50|r% additional healing based on your missing Health. Heals for an additional |cffffff3220|r Health over |cffffff5|r seconds. This ability scales off your Max Health.\\n\\nYou also gain Major Endurance and Fortitude and Minor Vitality, increasing Health and Stamina Recovery by |cffffff30|r% and increasing healing received and damage shield strength by |cffffff6|r% for |cffffff20|r seconds."',
  icon: "/esoui/art/icons/ability_dragonknight_011_b.dds",
  esoSkillId: 32744,
  isMorph: true,
  learnedLevel: 20,
  lineRankNeeded: 20,
  morphIndex: 1,
  rank: 20,
  skillLineId: "dragonknight-draconic-power",
  skillType: "active",
  subcategoryId: "dragonknight-draconic-power",
} as const satisfies TemperSkill
