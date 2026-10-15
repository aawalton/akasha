import type { TemperSkill } from "akasha/temper/catalog/skill/temper-skill.page-type.types.ts"

export const sanctumOfTheAbyssalSea192372 = {
  id: "019e6f53-a6a7-7893-b5af-684a55a34648",
  type: "page-type/temper-skill",
  slug: "sanctum-of-the-abyssal-sea-192372",
  title: "Sanctum of the Abyssal Sea",
  key: "sanctum-of-the-abyssal-sea-192372",
  baseName: "Gibbering Shield",
  description:
    "Gather the true strength of Apocrypha as protective tentacles rise from the Abyssal Sea around you. The tentacles form a damage shield that absorbs |cffffff60|r% of all damage for |cffffff10|r seconds, up to a max of |cffffff53426|r damage, scaling off your Max Health.\n\nWhen the shield collapses you lash out, dealing all of the damage absorbed as Magic Damage to enemies within 5 meters over |cffffff10|r seconds.",
  icon: "/esoui/art/icons/ability_arcanist_012_a.dds",
  esoSkillId: 192372,
  isMorph: true,
  learnedLevel: 12,
  lineRankNeeded: 12,
  morphIndex: 1,
  rank: 12,
  skillLineId: "temper-skill-line/arcanist-soldier-of-apocrypha",
  skillType: "temper-skill-type/ultimate",
  hashPlace: 1123,
  createdAt: "2026-05-28T16:03:33.671Z",
  updatedAt: "2026-10-15T15:44:52.958Z",
  equations: [
    "<<1>> = 60% (Constant)",
    "<<2>> = 10 seconds (Constant)",
    "<<3>> = 2.28086 Health (Health, RankMod(1), DmgShield, SingleTarget, Direct, 10s duration, R2 = 1)",
    "<<4>> = 10 seconds (Constant)",
  ],
} as const satisfies TemperSkill
