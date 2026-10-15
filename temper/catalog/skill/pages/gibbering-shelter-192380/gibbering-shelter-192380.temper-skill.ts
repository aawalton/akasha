import type { TemperSkill } from "akasha/temper/catalog/skill/temper-skill.page-type.types.ts"

export const gibberingShelter192380 = {
  id: "019e6f53-a27b-778d-8b57-bb0d07c90fa5",
  type: "page-type/temper-skill",
  slug: "gibbering-shelter-192380",
  title: "Gibbering Shelter",
  key: "gibbering-shelter-192380",
  baseName: "Gibbering Shield",
  description:
    "Gather the true strength of Apocrypha, forming a tentacle damage shield that absorbs |cffffff60|r% of all damage for |cffffff10|r seconds, up to a max of |cffffff44973|r damage.\n\nWhen the shield absorbs damage, pseudopods cascade out at up to 11 allies within 15 meters, granting them a damage shield for |cffffff4|r seconds that absorbs up to |cffffff7742|r damage. These shields can be applied once every |cffffff4|r seconds. Both shields scale off your Max Health.",
  icon: "/esoui/art/icons/ability_arcanist_012_b.dds",
  esoSkillId: 192380,
  isMorph: true,
  learnedLevel: 12,
  lineRankNeeded: 12,
  morphIndex: 2,
  rank: 12,
  skillLineId: "temper-skill-line/arcanist-soldier-of-apocrypha",
  skillType: "temper-skill-type/ultimate",
  hashPlace: 561,
  createdAt: "2026-05-28T16:03:32.603Z",
  updatedAt: "2026-10-15T15:44:52.958Z",
  equations: [
    "<<1>> = 60% (Constant)",
    "<<2>> = 10 seconds (Constant)",
    "<<3>> = 1.98336 Health (Health, DmgShield, SingleTarget, Direct, 10s duration, R2 = 1)",
    "<<4>> = 4 seconds (Constant)",
    "<<5>> = 0.33056 Health (Health, RankMod(1), DmgShield, SingleTarget, Direct, 4s duration, R2 = 1)",
    "<<6>> = 4 seconds (Constant)",
  ],
} as const satisfies TemperSkill
