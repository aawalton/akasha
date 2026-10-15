import type { TemperSkill } from "akasha/temper/catalog/skill/temper-skill.page-type.types.ts"

export const shadowImage = {
  id: "019e6245-a729-7b57-ab5c-b359e3c26280",
  type: "page-type/temper-skill",
  slug: "shadow-image",
  title: "Shadow Image",
  key: "shadow-image",
  baseName: "Summon Shade",
  description:
    "Summon a shade version of yourself to stay in place and attack an enemy from range for 20 seconds. \n\nThe shade shoots at an enemy, dealing 478 Magic Damage every 2 seconds, and inflicts Minor Maim for 4 seconds, reducing the enemy's damage done by 5%.\n\nWhile the shade is summoned, you can activate this ability again for no cost to teleport to the shade's location.",
  icon: "/esoui/art/icons/ability_nightblade_001_b.dds",
  esoSkillId: 36298,
  isMorph: true,
  learnedLevel: 42,
  lineRankNeeded: 42,
  morphIndex: 2,
  rank: 12,
  skillLineId: "temper-skill-line/nightblade-shadow",
  skillType: "temper-skill-type/active",
  hashPlace: 1151,
  createdAt: "2026-05-26T03:13:12.489Z",
  updatedAt: "2026-10-15T15:44:52.958Z",
  equations: [
    "<<1>> = 20 seconds (Constant)",
    "<<2>> = 0.02134178 MaxStat + 0.22408869 MaxPower (Ultimate, ratio = 10.50, RankMod(1.033), Dmg, Magic, SingleTarget, Direct, R2 = 1)",
    "<<3>> = 2 seconds (Constant)",
    "<<4>> = Minor Maim (Constant)",
    "<<5>> = 4 seconds (Constant)",
    "<<6>> = 5% (Constant)",
  ],
} as const satisfies TemperSkill
