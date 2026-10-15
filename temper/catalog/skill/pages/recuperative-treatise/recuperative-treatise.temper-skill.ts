import type { TemperSkill } from "akasha/temper/catalog/skill/temper-skill.page-type.types.ts"

export const recuperativeTreatise = {
  id: "019e6245-a702-7256-b44b-300648742341",
  type: "page-type/temper-skill",
  slug: "recuperative-treatise",
  title: "Recuperative Treatise",
  key: "recuperative-treatise",
  baseName: "Tome-Bearer's Inspiration",
  description:
    "Etch a series of runes onto your weapon that pulse with power once every 5 seconds. Each pulse enhances your class abilities, and striking an enemy with one deals an additional 1161 Magic Damage, restores 600 Magicka and Stamina, and generates Crux if you have none.\n\nWhile slotted on either ability bar, gain Major Brutality and Major Sorcery, increasing your Weapon and Spell Damage by 20%.",
  icon: "/esoui/art/icons/ability_arcanist_005_b.dds",
  esoSkillId: 40183047,
  isMorph: true,
  learnedLevel: 30,
  lineRankNeeded: 30,
  morphIndex: 2,
  rank: 12,
  skillLineId: "temper-skill-line/arcanist-herald-of-the-tome",
  skillType: "temper-skill-type/active",
  hashPlace: 1000,
  createdAt: "2026-05-26T03:13:12.450Z",
  updatedAt: "2026-10-15T15:44:52.958Z",
  equations: [
    "<<1>> = 5 seconds (Constant)",
    "<<2>> = 0.0517266 MaxStat + 0.542407 MaxPower - 2.07263 (Ultimate, ratio = 10.49, Dmg, Magic, SingleTarget, Direct, Melee, R2 = 1)",
    "<<3>> = 600 (Constant)",
    "<<4>> = 20% (Constant)",
  ],
} as const satisfies TemperSkill
