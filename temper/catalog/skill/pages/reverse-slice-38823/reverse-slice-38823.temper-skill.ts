import type { TemperSkill } from "akasha/temper/catalog/skill/temper-skill.page-type.types.ts"

export const reverseSlice38823 = {
  id: "019e6f53-a64a-74d4-973b-d97a80768ac4",
  type: "page-type/temper-skill",
  slug: "reverse-slice-38823",
  title: "Reverse Slice",
  key: "reverse-slice-38823",
  baseName: "Reverse Slash",
  description:
    "Shift your grip and unleash a devastating slice, dealing |cffffff4406|r Physical Damage to your foe and all nearby enemies. Deals up to |cffffff300|r% more damage to enemies with less than |cffffff50|r% Health.",
  icon: "/esoui/art/icons/ability_2handed_004_b.dds",
  esoSkillId: 38823,
  isMorph: true,
  learnedLevel: 1,
  lineRankNeeded: 20,
  morphIndex: 1,
  rank: 20,
  skillLineId: "temper-skill-line/weapon-two-handed",
  skillType: "temper-skill-type/active",
  hashPlace: 1069,
  createdAt: "2026-05-28T16:03:33.578Z",
  updatedAt: "2026-10-15T15:44:52.958Z",
  equations: [
    "<<1>> = 0.05165 MaxStat + 0.54233 MaxPower (Ultimate, ratio = 10.50, RankMod(1), Dmg, Physical, AOE, Direct, Melee, R2 = 1)",
    "<<2>> = 300 (Constant)",
    "<<3>> = 50 (Constant)",
  ],
} as const satisfies TemperSkill
