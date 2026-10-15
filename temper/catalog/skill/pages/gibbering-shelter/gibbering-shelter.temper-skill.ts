import type { TemperSkill } from "akasha/temper/catalog/skill/temper-skill.page-type.types.ts"

export const gibberingShelter = {
  id: "019e6245-a690-7bb4-a1b3-cc5b5af7a806",
  type: "page-type/temper-skill",
  slug: "gibbering-shelter",
  title: "Gibbering Shelter",
  key: "gibbering-shelter",
  baseName: "Gibbering Shield",
  description:
    "Gather the true strength of Apocrypha, forming a tentacle damage shield that absorbs 60% of all damage for 10 seconds, up to a max of 31733 damage.\n\nWhen the shield absorbs damage, pseudopods cascade out at up to 11 allies within 15 meters, granting them a damage shield for 4 seconds that absorbs up to 5462 damage. These shields can be applied once every 4 seconds. Both shields scale off your Max Health.",
  icon: "/esoui/art/icons/ability_arcanist_012_b.dds",
  esoSkillId: 40192380,
  isMorph: true,
  learnedLevel: 12,
  lineRankNeeded: 12,
  morphIndex: 2,
  rank: 12,
  skillLineId: "temper-skill-line/arcanist-soldier-of-apocrypha",
  skillType: "temper-skill-type/ultimate",
  hashPlace: 560,
  createdAt: "2026-05-26T03:13:12.336Z",
  updatedAt: "2026-10-15T15:44:52.958Z",
  equations: [
    "<<1>> = 60% (Constant)",
    "<<2>> = 10 seconds (Constant)",
    "<<3>> = 1.98336 Health (Health, DmgShield, SingleTarget, Direct, 10s duration, R2 = 1)",
    "<<4>> = 4 seconds (Constant)",
    "<<5>> = 0.34146848 Health (Health, RankMod(1.033), DmgShield, SingleTarget, Direct, 4s duration, R2 = 1)",
    "<<6>> = 4 seconds (Constant)",
  ],
} as const satisfies TemperSkill
