import type { TemperSkill } from "akasha/temper/catalog/skill/temper-skill.page-type.types.ts"

export const rally38802 = {
  id: "019e6f53-a597-7931-a571-e80a9832b322",
  type: "page-type/temper-skill",
  slug: "rally-38802",
  title: "Rally",
  key: "rally-38802",
  baseName: "Momentum",
  description:
    "Focus your strength and resolve to gain Major Brutality and Sorcery, increasing your Weapon and Spell Damage by |cffffff20|r%, as well as gaining Minor Endurance, increasing your Stamina Recovery by |cffffff15|r% for |cffffff30|r seconds.\n\nYou heal for |cffffff5660|r Health when Rally ends. The final heal is increased by |cffffff20|r% every |cffffff2|r seconds, up to a maximum of |cffffff200|r%.",
  icon: "/esoui/art/icons/ability_2handed_005_b.dds",
  esoSkillId: 38802,
  isMorph: true,
  learnedLevel: 1,
  lineRankNeeded: 38,
  morphIndex: 2,
  rank: 38,
  skillLineId: "temper-skill-line/weapon-two-handed",
  skillType: "temper-skill-type/active",
  hashPlace: 971,
  createdAt: "2026-05-28T16:03:33.399Z",
  updatedAt: "2026-10-15T15:44:52.958Z",
  equations: [
    "<<1>> = Major Brutality (Constant)",
    "<<2>> = Minor Endurance (Constant)",
    "<<3>> = 30 seconds (Constant)",
    "<<4>> = 20% (Constant)",
    "<<5>> = 15% (Constant)",
    "<<6>> = 0.077475 MaxStat + 0.813488 MaxPower (Ultimate, ratio = 10.50, RankMod(1), Heal, SingleTarget, Direct, R2 = 1)",
    "<<7>> = 20% (Constant)",
    "<<8>> = 2 seconds (Constant)",
  ],
} as const satisfies TemperSkill
