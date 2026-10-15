import type { TemperSkill } from "akasha/temper/catalog/skill/temper-skill.page-type.types.ts"

export const intensiveMender118840 = {
  id: "019e6f53-a385-777a-bbbc-d8686ec03e7a",
  type: "page-type/temper-skill",
  slug: "intensive-mender-118840",
  title: "Intensive Mender",
  key: "intensive-mender-118840",
  baseName: "Spirit Mender",
  description:
    "Conjure a ghostly spirit to do your bidding and stay by your side for |cffffff8|r seconds. The spirit heals you or lowest Health ally around you every |cffffff2|r seconds, restoring |cffffff4527|r Health to the target and |cffffff2|r allies nearby them.\n\nCreates a corpse on death if you are in combat.",
  icon: "/esoui/art/icons/ability_necromancer_015_b.dds",
  esoSkillId: 118840,
  isMorph: true,
  learnedLevel: 30,
  lineRankNeeded: 30,
  morphIndex: 2,
  rank: 30,
  skillLineId: "temper-skill-line/necromancer-living-death",
  skillType: "temper-skill-type/active",
  hashPlace: 694,
  createdAt: "2026-05-28T16:03:32.869Z",
  updatedAt: "2026-10-15T15:44:52.958Z",
  equations: [
    "<<1>> = 8 seconds (Constant)",
    "<<2>> = 0.06198 MaxStat + 0.65079 MaxPower (Ultimate, ratio = 10.50, RankMod(1), Heal, AOE, Direct, R2 = 1)",
  ],
} as const satisfies TemperSkill
