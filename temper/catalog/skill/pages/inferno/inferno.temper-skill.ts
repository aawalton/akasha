import type { TemperSkill } from "akasha/temper/catalog/skill/temper-skill.page-type.types.ts"

export const inferno = {
  id: "019e6f53-a373-7abe-9260-8139aab72cb2",
  type: "page-type/temper-skill",
  slug: "inferno",
  title: "Inferno",
  key: "inferno",
  baseName: "Inferno",
  description:
    "Activate an aura of flames which launches a wave of flame around you every |cffffff5|r seconds, dealing |cffffff6400|r Flame Damage to enemies inside.\n\nWhile slotted on either bar, you gain Major Prophecy and Savagery, increasing your Spell and Weapon Critical rating by |cffffff2629|r.",
  icon: "/esoui/art/icons/ability_dragonknight_002.dds",
  esoSkillId: 28967,
  isMorph: false,
  learnedLevel: 42,
  lineRankNeeded: 42,
  morphIndex: 0,
  rank: 42,
  skillLineId: "temper-skill-line/dragonknight-ardent-flame",
  skillType: "temper-skill-type/active",
  hashPlace: 683,
  createdAt: "2026-05-28T16:03:32.851Z",
  updatedAt: "2026-10-15T15:44:52.958Z",
  equations: [
    "<<1>> = 5 seconds (Constant)",
    "<<2>> = 0.075 MaxStat + 0.7875 MaxPower (Ultimate, ratio = 10.50, RankMod(1), Dmg, Flame, AOE, Direct, Melee, R2 = 1)",
    "<<3>> = Major Savagery (Constant)",
    "<<4>> = 12% (Constant)",
  ],
} as const satisfies TemperSkill
