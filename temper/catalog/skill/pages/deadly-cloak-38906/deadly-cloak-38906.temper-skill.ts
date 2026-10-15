import type { TemperSkill } from "akasha/temper/catalog/skill/temper-skill.page-type.types.ts"

export const deadlyCloak38906 = {
  id: "019e6f53-a091-7f4d-ba38-36b24da2a394",
  type: "page-type/temper-skill",
  slug: "deadly-cloak-38906",
  title: "Deadly Cloak",
  key: "deadly-cloak-38906",
  baseName: "Blade Cloak",
  description:
    "Envelop yourself in a protective cloak of razors, gaining Major Evasion for |cffffff20|r seconds, reducing damage from area attacks by |cffffff20|r%. \n\nEvery |cffffff2|r seconds the shrapnel will pulse, dealing |cffffff1971|r Physical Damage to all enemies within |cffffff5|r meters.",
  icon: "/esoui/art/icons/ability_dualwield_004_b.dds",
  esoSkillId: 38906,
  isMorph: true,
  learnedLevel: 1,
  lineRankNeeded: 20,
  morphIndex: 2,
  rank: 20,
  skillLineId: "temper-skill-line/weapon-dual-wield",
  skillType: "temper-skill-type/active",
  hashPlace: 327,
  createdAt: "2026-05-28T16:03:32.113Z",
  updatedAt: "2026-10-15T15:44:52.958Z",
  equations: [
    "<<1>> = 20 seconds (Constant)",
    "<<2>> = 20% (Constant)",
    "<<3>> = 2 seconds (Constant)",
    "<<4>> = 0.024417 MaxStat + 0.256373 MaxPower (Ultimate, ratio = 10.50, RankMod(1), Dmg, Physical, AOE, DOT, 2s tick, R2 = 1)",
  ],
} as const satisfies TemperSkill
