import type { TemperSkill } from "akasha/temper/catalog/skill/temper-skill.page-type.types.ts"

export const corrosiveArmor17878 = {
  id: "019e6f53-a028-761e-a9fa-32a564b36db0",
  type: "page-type/temper-skill",
  slug: "corrosive-armor-17878",
  title: "Corrosive Armor",
  key: "corrosive-armor-17878",
  baseName: "Magma Armor",
  description:
    "Ignite the molten lava in your veins, limiting incoming damage to |cffffff6|r% of your Max Health and dealing |cffffff5632|r Flame Damage to nearby enemies each second for |cffffff10|r seconds. \n\nWhile active your direct damage attacks ignore enemy Physical and Spell Resistance but you cannot generate Ultimate.",
  icon: "/esoui/art/icons/ability_dragonknight_018_b.dds",
  esoSkillId: 17878,
  isMorph: true,
  learnedLevel: 12,
  lineRankNeeded: 12,
  morphIndex: 2,
  rank: 12,
  skillLineId: "temper-skill-line/dragonknight-earthen-heart",
  skillType: "temper-skill-type/ultimate",
  hashPlace: 253,
  createdAt: "2026-05-28T16:03:32.008Z",
  updatedAt: "2026-10-15T15:44:52.958Z",
  equations: [
    "<<1>> = 6 (Constant)",
    "<<2>> = 0.069728 MaxStat + 0.732139 MaxPower (Ultimate, ratio = 10.50, RankMod(1), Dmg, Flame, AOE, DOT, 1s tick, R2 = 1)",
    "<<3>> = 10 seconds (Constant)",
  ],
} as const satisfies TemperSkill
