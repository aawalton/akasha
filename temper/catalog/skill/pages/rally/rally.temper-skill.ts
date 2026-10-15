import type { TemperSkill } from "akasha/temper/catalog/skill/temper-skill.page-type.types.ts"

export const rally = {
  id: "019e6226-0108-7262-8f47-f52e5498cffa",
  type: "page-type/temper-skill",
  slug: "rally",
  title: "Rally",
  key: "rally",
  baseName: "Momentum",
  description:
    "Focus your strength and resolve to gain Major Brutality and Sorcery, increasing your Weapon and Spell Damage by 20%, as well as gaining Minor Endurance, increasing your Stamina Recovery by 15% for 20 seconds.\n\nYou heal for 1199 Health when Rally ends. The final heal is increased by 15% every 1 second, up to a maximum of 300%.",
  icon: "/esoui/art/icons/ability_2handed_005_b.dds",
  esoSkillId: 39904,
  isMorph: true,
  learnedLevel: 38,
  lineRankNeeded: 38,
  morphIndex: 2,
  rank: 12,
  skillLineId: "temper-skill-line/weapon-two-handed",
  skillType: "temper-skill-type/active",
  hashPlace: 970,
  createdAt: "2026-05-26T02:38:38.344Z",
  updatedAt: "2026-10-15T15:44:52.958Z",
  equations: [
    "<<1>> = Major Brutality (Constant)",
    "<<2>> = Minor Endurance (Constant)",
    "<<3>> = 30 seconds (Constant)",
    "<<4>> = 20% (Constant)",
    "<<5>> = 15% (Constant)",
    "<<6>> = 0.080031675 MaxStat + 0.840333104 MaxPower (Ultimate, ratio = 10.50, RankMod(1.033), Heal, SingleTarget, Direct, R2 = 1)",
    "<<7>> = 20% (Constant)",
    "<<8>> = 2 seconds (Constant)",
  ],
} as const satisfies TemperSkill
