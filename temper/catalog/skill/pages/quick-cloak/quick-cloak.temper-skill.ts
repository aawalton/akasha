import type { TemperSkill } from "akasha/temper/catalog/skill/temper-skill.page-type.types.ts"

export const quickCloak = {
  id: "019e6226-0105-7985-a6c9-27273030d371",
  type: "page-type/temper-skill",
  slug: "quick-cloak",
  title: "Quick Cloak",
  key: "quick-cloak",
  baseName: "Blade Cloak",
  description:
    "Envelop yourself in a protective cloak of razors, gaining Major Evasion for 30 seconds, reducing damage from area attacks by 20%. \n\nEvery 2 seconds the shrapnel will pulse, dealing 422 Physical Damage to all enemies within 5 meters.\n\nYou also gain Major Expedition for 4 seconds, increasing your Movement Speed by 30%.",
  icon: "/esoui/art/icons/ability_dualwield_004_a.dds",
  esoSkillId: 40642,
  isMorph: true,
  learnedLevel: 20,
  lineRankNeeded: 20,
  morphIndex: 1,
  rank: 8,
  skillLineId: "temper-skill-line/weapon-dual-wield",
  skillType: "temper-skill-type/active",
  hashPlace: 950,
  createdAt: "2026-05-26T02:38:38.341Z",
  updatedAt: "2026-10-15T15:44:52.958Z",
  equations: [
    "<<1>> = 30 seconds (Constant)",
    "<<2>> = 20% (Constant)",
    "<<3>> = 2 seconds (Constant)",
    "<<4>> = 0.018782 MaxStat + 0.19721 MaxPower (Ultimate, ratio = 10.50, Dmg, Physical, AOE, DOT, 2s tick, R2 = 1)",
    "<<5>> = 4 seconds (Constant)",
    "<<6>> = 30% (Constant)",
  ],
} as const satisfies TemperSkill
