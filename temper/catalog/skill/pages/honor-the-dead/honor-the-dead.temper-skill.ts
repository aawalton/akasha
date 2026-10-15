import type { TemperSkill } from "akasha/temper/catalog/skill/temper-skill.page-type.types.ts"

export const honorTheDead = {
  id: "019e6245-a6a7-702f-9d79-0bc1dbfd5ede",
  type: "page-type/temper-skill",
  slug: "honor-the-dead",
  title: "Honor the Dead",
  key: "honor-the-dead",
  baseName: "Rushed Ceremony",
  description:
    "Beacon your inner light, healing yourself or a wounded ally in front of you for 3485 Health. \n\nHealing anyone who is below 75% Health restores 18% of the ability's cost every 2 seconds over 6 seconds as Magicka.",
  icon: "/esoui/art/icons/ability_templar_honor_the_dead.dds",
  esoSkillId: 24213,
  isMorph: true,
  learnedLevel: 1,
  lineRankNeeded: 1,
  morphIndex: 1,
  rank: 8,
  skillLineId: "temper-skill-line/templar-restoring-light",
  skillType: "temper-skill-type/active",
  hashPlace: 638,
  createdAt: "2026-05-26T03:13:12.359Z",
  updatedAt: "2026-10-15T15:44:52.958Z",
  equations: [
    "<<1>> = 0.15495 MaxStat + 1.62698 MaxPower (Ultimate, ratio = 10.50, Heal, SingleTarget, Direct, R2 = 1)",
    "<<2>> = 18% (Constant)",
    "<<3>> = 2 seconds (Constant)",
    "<<4>> = 6 seconds (Constant)",
  ],
} as const satisfies TemperSkill
