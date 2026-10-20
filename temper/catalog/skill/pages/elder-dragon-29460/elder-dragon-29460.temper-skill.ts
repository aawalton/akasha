import type { TemperSkill } from "akasha/temper/catalog/skill/temper-skill.page-type.types.ts"

export const elderDragon29460 = {
  id: "019e6f53-a10c-7208-8334-79f279a7d48a",
  type: "page-type/temper-skill",
  slug: "elder-dragon-29460",
  title: "Elder Dragon",
  key: "elder-dragon-29460",
  baseName: "Elder Dragon",
  description:
    "The eldest Dragons are forces of nature. As are you.\n\nActivating a Draconic Power ability grants you and group members Minor Brutality for |cffffff20|r seconds, increasing Weapon and Spell Damage by |cffffff10|r%.\n\nIncreases your Health Recovery by up to |cffffff700|r, based on your missing Health.\nCurrent amount: |cffffff0|r",
  icon: "/esoui/art/icons/ability_dragonknight_025.dds",
  esoSkillId: 29460,
  isMorph: false,
  learnedLevel: 22,
  lineRankNeeded: 22,
  morphIndex: 0,
  rank: 22,
  skillLineId: "temper-skill-line/dragonknight-draconic-power",
  skillType: "temper-skill-type/passive",
  effects: "jsonl",
  hashPlace: 398,
  createdAt: "2026-05-28T16:03:32.236Z",
  updatedAt: "2026-10-20T17:27:15.270Z",
  equations: [
    "<<1>> = Minor Brutality (Constant)",
    "<<2>> = 20 seconds (Constant)",
    "<<3>> = 10% (Constant)",
    "<<4>> = 350 (Constant)",
    "<<5>> = 20 DraconicPower (Draconic Power Skills Slotted, Dmg, Generic, SingleTarget, Direct, Melee, R2 = 1)",
  ],
} as const satisfies TemperSkill
