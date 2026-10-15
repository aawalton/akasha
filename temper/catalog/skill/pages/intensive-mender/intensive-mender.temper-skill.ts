import type { TemperSkill } from "akasha/temper/catalog/skill/temper-skill.page-type.types.ts"

export const intensiveMender = {
  id: "019e6245-a6b4-7496-b358-ad5616f4579f",
  type: "page-type/temper-skill",
  slug: "intensive-mender",
  title: "Intensive Mender",
  key: "intensive-mender",
  baseName: "Spirit Mender",
  description:
    "Conjure a ghostly spirit to do your bidding and stay by your side for 8 seconds. The spirit heals you or lowest Health ally around you every 2 seconds, restoring 1438 Health to the target and 2 allies nearby them.\n\nCreates a corpse on death if you are in combat.",
  icon: "/esoui/art/icons/ability_necromancer_015_b.dds",
  esoSkillId: 40118840,
  isMorph: true,
  learnedLevel: 30,
  lineRankNeeded: 30,
  morphIndex: 2,
  rank: 12,
  skillLineId: "temper-skill-line/necromancer-living-death",
  skillType: "temper-skill-type/active",
  hashPlace: 693,
  createdAt: "2026-05-26T03:13:12.372Z",
  updatedAt: "2026-10-15T15:44:52.958Z",
  equations: [
    "<<1>> = 8 seconds (Constant)",
    "<<2>> = 0.06402534 MaxStat + 0.67226607 MaxPower (Ultimate, ratio = 10.50, RankMod(1.033), Heal, AOE, Direct, R2 = 1)",
  ],
} as const satisfies TemperSkill
