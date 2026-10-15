import type { TemperSkill } from "akasha/temper/catalog/skill/temper-skill.page-type.types.ts"

export const swarmingScion = {
  id: "019e6251-4cf6-7ed0-8b93-85b7c967fb95",
  type: "page-type/temper-skill",
  slug: "swarming-scion",
  title: "Swarming Scion",
  key: "swarming-scion",
  baseName: "Blood Scion",
  description:
    "Transform into a monstrous creature of the night, instantly healing to full Health.\n\nWhile transformed, your Max Health, Magicka, and Stamina are increased by 10000, you heal for 15% of all damage you deal, and you can see enemies through walls. \n\nBats also swarm around you and shred enemies that come close, dealing 870 Magic Damage every 1 second.",
  icon: "/esoui/art/icons/ability_u26_vampire_06_a.dds",
  esoSkillId: 41926,
  isMorph: true,
  learnedLevel: 5,
  lineRankNeeded: 5,
  morphIndex: 1,
  rank: 8,
  skillLineId: "temper-skill-line/world-vampire",
  skillType: "temper-skill-type/ultimate",
  hashPlace: 1314,
  createdAt: "2026-05-26T03:25:55.830Z",
  updatedAt: "2026-10-15T15:44:52.958Z",
  equations: [
    "<<1>> = 10000 (Constant)",
    "<<2>> = 15% (Constant)",
    "<<3>> = 0.0387375 MaxStat + 0.40674375 MaxPower (Ultimate, ratio = 10.50, RankMod(1.033), Dmg, Magic, AOE, DOT, 1s tick, R2 = 1)",
    "<<4>> = 1 second (Constant)",
  ],
} as const satisfies TemperSkill
