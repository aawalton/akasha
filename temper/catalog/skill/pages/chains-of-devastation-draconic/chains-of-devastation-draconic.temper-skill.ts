import type { TemperSkill } from "akasha/temper/catalog/skill/temper-skill.page-type.types.ts"

export const chainsOfDevastationDraconic = {
  id: "019e6245-a616-77c6-a84d-1f83eb12fbc3",
  type: "page-type/temper-skill",
  slug: "chains-of-devastation-draconic",
  title: "Chains of Devastation",
  key: "chains-of-devastation-draconic",
  baseName: "Chains of Flame",
  description:
    "Lash out with a chain bound in jagged links, pulling yourself to an enemy. The searing metal deals 5412 Flame Damage and applies the Burning status effect.\n\nThis attack cannot be dodged or reflected.\n\nHitting the target grants you Major Berserk for 6 seconds and Major Evasion for 10 seconds, increasing damage done by 10% reducing damage taken from area attacks by 20%.",
  icon: "/esoui/art/icons/ability_dragonknight_005_b.dds",
  esoSkillId: 20499,
  isMorph: true,
  learnedLevel: 42,
  lineRankNeeded: 42,
  morphIndex: 1,
  rank: 8,
  skillLineId: "temper-skill-line/dragonknight-draconic-power",
  skillType: "temper-skill-type/active",
  hashPlace: 196,
  createdAt: "2026-05-26T03:13:12.214Z",
  updatedAt: "2026-10-15T15:44:52.958Z",
  equations: [
    "<<1>> = 0.06198 MaxStat + 0.65079 MaxPower (Ultimate, ratio = 10.50, RankMod(1), Dmg, Flame, SingleTarget, Direct, R2 = 1)",
    "<<2>> = Burning (Constant)",
    "<<3>> = Major Berserk (Constant)",
    "<<4>> = 6 seconds (Constant)",
    "<<5>> = Major Evasion (Constant)",
    "<<6>> = 10 seconds (Constant)",
    "<<7>> = 10% (Constant)",
    "<<8>> = 20% (Constant)",
  ],
} as const satisfies TemperSkill
