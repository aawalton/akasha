import type { TemperSkill } from "akasha/temper/catalog/skill/temper-skill.page-type.types.ts"

export const honorTheDead22253 = {
  id: "019e6f53-a325-773f-97b5-7bc9a041e3cf",
  type: "page-type/temper-skill",
  slug: "honor-the-dead-22253",
  title: "Honor the Dead",
  key: "honor-the-dead-22253",
  baseName: "Rushed Ceremony",
  description:
    "Beacon your inner light, healing yourself or a wounded ally in front of you for |cffffff10960|r Health. \n\nHealing anyone who is below |cffffff75|r% Health restores |cffffff18|r% of the ability's cost every |cffffff2|r seconds over |cffffff6|r seconds as Magicka.",
  icon: "/esoui/art/icons/ability_templar_honor_the_dead.dds",
  esoSkillId: 22253,
  isMorph: true,
  learnedLevel: 1,
  lineRankNeeded: 1,
  morphIndex: 1,
  rank: 1,
  skillLineId: "temper-skill-line/templar-restoring-light",
  skillType: "temper-skill-type/active",
  hashPlace: 639,
  createdAt: "2026-05-28T16:03:32.773Z",
  updatedAt: "2026-10-15T15:44:52.958Z",
  equations: [
    "<<1>> = 0.15495 MaxStat + 1.62698 MaxPower (Ultimate, ratio = 10.50, Heal, SingleTarget, Direct, R2 = 1)",
    "<<2>> = 15% (Constant)",
    "<<3>> = 2 seconds (Constant)",
    "<<4>> = 6 seconds (Constant)",
  ],
} as const satisfies TemperSkill
