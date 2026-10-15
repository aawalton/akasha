import type { TemperSkill } from "akasha/temper/catalog/skill/temper-skill.page-type.types.ts"

export const lingeringFlare61519 = {
  id: "019e6f53-a409-7649-b291-e386b447a092",
  type: "page-type/temper-skill",
  slug: "lingering-flare-61519",
  title: "Lingering Flare",
  key: "lingering-flare-61519",
  baseName: "Revealing Flare",
  description:
    "Launch a blinding flare, revealing stealthed and invisible enemies in the target area for |cffffff10|r seconds. Exposed enemies cannot return to stealth or invisibility for |cffffff4|r seconds.\n\nWhile slotted you gain Major Protection, reducing your damage taken by |cffffff10|r%.",
  icon: "/esoui/art/icons/ability_ava_lingering_flare.dds",
  esoSkillId: 61519,
  isMorph: true,
  learnedLevel: 1,
  lineRankNeeded: 7,
  morphIndex: 1,
  rank: 7,
  skillLineId: "temper-skill-line/alliance-war-support",
  skillType: "temper-skill-type/active",
  hashPlace: 757,
  createdAt: "2026-05-28T16:03:33.001Z",
  updatedAt: "2026-10-15T15:44:52.958Z",
  equations: [
    "<<1>> = 7 seconds (Constant)",
    "<<2>> = 4 seconds (Constant)",
    "<<3>> = Major Protection (Constant)",
    "<<4>> = 10% (Constant)",
  ],
} as const satisfies TemperSkill
