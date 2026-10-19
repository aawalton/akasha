import type { TemperSkill } from "akasha/temper/catalog/skill/temper-skill.page-type.types.ts"

export const slayer35803 = {
  id: "019e6f53-a73d-7025-a4ee-2e563bda65f3",
  type: "page-type/temper-skill",
  slug: "slayer-35803",
  title: "Slayer",
  key: "slayer-35803",
  baseName: "Slayer",
  description:
    "Increases your Weapon and Spell Damage by |cffffff1|r% for each Fighters Guild ability slotted.\n\nCurrent bonus: |cffffff0|r%.",
  icon: "/esoui/art/icons/ability_dragonknight_025.dds",
  esoSkillId: 35803,
  isMorph: false,
  learnedLevel: 1,
  lineRankNeeded: 3,
  morphIndex: 0,
  rank: 3,
  skillLineId: "temper-skill-line/guild-fighters-guild",
  skillType: "temper-skill-type/passive",
  effects: "jsonl",
  hashPlace: 1207,
  createdAt: "2026-05-28T16:03:33.821Z",
  updatedAt: "2026-10-19T22:59:16.876Z",
  equations: [
    "<<1>> = 1% (Constant)",
    "<<2>> = 1 FightersGuild (Fighters Guild Skills Slotted, SingleTarget, Direct, R2 = 1)",
  ],
} as const satisfies TemperSkill
