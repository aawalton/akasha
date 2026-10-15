import type { TemperSkill } from "akasha/temper/catalog/skill/temper-skill.page-type.types.ts"

export const spiritGuardian118912 = {
  id: "019e6f53-a7a0-7f20-bace-0bc7d04ade0c",
  type: "page-type/temper-skill",
  slug: "spirit-guardian-118912",
  title: "Spirit Guardian",
  key: "spirit-guardian-118912",
  baseName: "Spirit Mender",
  description:
    "Conjure a ghostly spirit to do your bidding and stay by your side for |cffffff16|r seconds. The spirit heals you or the lowest Health ally around you every |cffffff2|r seconds, restoring |cffffff2262|r Health.\n\nWhile active, |cffffff10|r% of the damage you take is transferred to the spirit instead.\n\nCreates a corpse on death if you are in combat.",
  icon: "/esoui/art/icons/ability_necromancer_015_a.dds",
  esoSkillId: 118912,
  isMorph: true,
  learnedLevel: 30,
  lineRankNeeded: 30,
  morphIndex: 1,
  rank: 30,
  skillLineId: "temper-skill-line/necromancer-living-death",
  skillType: "temper-skill-type/active",
  hashPlace: 1258,
  createdAt: "2026-05-28T16:03:33.920Z",
  updatedAt: "2026-10-15T15:44:52.958Z",
  equations: [
    "<<1>> = 16 seconds (Constant)",
    "<<2>> = 0.03099 MaxStat + 0.325395 MaxPower (Ultimate, ratio = 10.50, RankMod(1), Heal, SingleTarget, Direct, R2 = 1)",
  ],
} as const satisfies TemperSkill
