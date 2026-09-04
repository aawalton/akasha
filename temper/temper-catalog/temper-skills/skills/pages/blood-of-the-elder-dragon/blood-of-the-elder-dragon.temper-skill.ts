import type { TemperSkill } from "../../temper-skill.page-type.ts"

export const bloodOfTheElderDragon = {
  id: "019e6f53-9f51-7a68-a844-7586ca379ab3",
  pageTypeSlug: "temper-skill",
  slug: "blood-of-the-elder-dragon",
  title: "Blood of the Elder Dragon",
  key: "blood-of-the-elder-dragon",
  baseName: "Dragon Blood",
  description:
    '"Draw on your draconic blood to heal yourself for |cffffff9434|r and nearby allies for |cffffff6288|r Health, increasing by up to |cffffff50|r% additional healing based on missing Health. \\n\\nHealed targets gain Major Fortitude and Minor Courage, increasing Health Recovery by |cffffff30|r% and Weapon and Spell Damage by |cffffff215|r for |cffffff20|r seconds."',
  icon: "/esoui/art/icons/ability_dragonknight_011_a.dds",
  esoSkillId: 32722,
  isMorph: true,
  learnedLevel: 20,
  lineRankNeeded: 20,
  morphIndex: 2,
  rank: 20,
  skillLineId: "dragonknight-draconic-power",
  skillType: "active",
  subcategoryId: "dragonknight-draconic-power",
} as const satisfies TemperSkill
