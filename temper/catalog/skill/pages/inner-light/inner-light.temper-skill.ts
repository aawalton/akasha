import type { TemperSkill } from "akasha/temper/catalog/skill/temper-skill.page-type.types.ts"

export const innerLight = {
  id: "019e6238-c2cd-75da-9306-fafd7f700536",
  type: "page-type/temper-skill",
  slug: "inner-light",
  title: "Inner Light",
  key: "inner-light",
  baseName: "Magelight",
  description:
    "Summon a mote of magelight, revealing stealthed and invisible enemies around you for 5 seconds. Exposed enemies cannot return to stealth or invisibility for 4 seconds.\n\nWhile slotted you gain Major Savagery and Prophecy, increasing your Weapon and Spell Critical rating by 2629 and your Max Magicka is increased by 5%.",
  icon: "/esoui/art/icons/ability_mageguild_002_b.dds",
  esoSkillId: 42430,
  isMorph: true,
  learnedLevel: 2,
  lineRankNeeded: 2,
  morphIndex: 1,
  rank: 8,
  skillLineId: "temper-skill-line/guild-mages-guild",
  skillType: "temper-skill-type/active",
  effects: "jsonl",
  hashPlace: 687,
  createdAt: "2026-05-26T02:59:07.597Z",
  updatedAt: "2026-10-15T15:44:52.958Z",
  equations: [
    "<<1>> = 5 seconds (Constant)",
    "<<2>> = 4 seconds (Constant)",
    "<<3>> = Major Savagery (Constant)",
    "<<4>> = 12% (Constant)",
    "<<5>> = 5% (Constant)",
  ],
} as const satisfies TemperSkill
