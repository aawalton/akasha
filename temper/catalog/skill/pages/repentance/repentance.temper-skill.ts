import type { TemperSkill } from "akasha/temper/catalog/skill/temper-skill.page-type.types.ts"

export const repentance = {
  id: "019e6245-a70c-7a87-a019-123628e09060",
  type: "page-type/temper-skill",
  slug: "repentance",
  title: "Repentance",
  key: "repentance",
  baseName: "Restoring Aura",
  description:
    "Consecrate the souls of the fallen, healing you and your allies for 3000 Health and restoring 3000 Stamina to you for each corpse nearby.\n\nWhile slotted on either bar, you gain Minor Fortitude, Minor Endurance, and Minor Intellect, increasing your Health, Stamina, and Magicka Recovery by 15%.",
  icon: "/esoui/art/icons/ability_templar_persistant_sigil.dds",
  esoSkillId: 27043,
  isMorph: true,
  learnedLevel: 20,
  lineRankNeeded: 20,
  morphIndex: 2,
  rank: 12,
  skillLineId: "temper-skill-line/templar-restoring-light",
  skillType: "temper-skill-type/active",
  effects: "jsonl",
  hashPlace: 1029,
  createdAt: "2026-05-26T03:13:12.460Z",
  updatedAt: "2026-10-15T15:44:52.958Z",
  equations: [
    "<<1>> = 3000 (Constant)",
    "<<2>> = 3000 (Constant)",
    "<<3>> = Minor Fortitude (Constant)",
    "<<4>> = Minor Endurance (Constant)",
    "<<5>> = Minor Intellect (Constant)",
    "<<6>> = 15% (Constant)",
  ],
} as const satisfies TemperSkill
