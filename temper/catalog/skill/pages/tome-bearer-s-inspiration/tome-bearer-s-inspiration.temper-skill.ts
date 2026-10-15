import type { TemperSkill } from "akasha/temper/catalog/skill/temper-skill.page-type.types.ts"

export const tomeBearerSInspiration = {
  id: "019e6f53-a847-7641-9809-d341dfa9f166",
  type: "page-type/temper-skill",
  slug: "tome-bearer-s-inspiration",
  title: "Tome-Bearer's Inspiration",
  key: "tome-bearer-s-inspiration",
  baseName: "Tome-Bearer's Inspiration",
  description:
    "Etch a series of runes onto your weapon that pulse with power once every |cffffff5|r seconds. Each pulse enhances your class abilities, and striking an enemy with one deals an additional |cffffff4036|r Magic Damage and generates Crux if you have none.\n\nWhile slotted on either ability bar, gain Major Brutality and Major Sorcery, increasing your Weapon and Spell Damage by |cffffff20|r%.",
  icon: "/esoui/art/icons/ability_arcanist_005.dds",
  esoSkillId: 186452,
  isMorph: false,
  learnedLevel: 30,
  lineRankNeeded: 30,
  morphIndex: 0,
  rank: 30,
  skillLineId: "temper-skill-line/arcanist-herald-of-the-tome",
  skillType: "temper-skill-type/active",
  hashPlace: 1351,
  createdAt: "2026-05-28T16:03:34.087Z",
  updatedAt: "2026-10-15T15:44:52.958Z",
  equations: [
    "<<1>> = 5 seconds (Constant)",
    "<<2>> = 0.0499489 MaxStat + 0.524968 MaxPower - 0.306011 (Ultimate, ratio = 10.51, Dmg, Magic, SingleTarget, Direct, Melee, R2 = 0.999999)",
    "<<3>> = 20% (Constant)",
  ],
} as const satisfies TemperSkill
