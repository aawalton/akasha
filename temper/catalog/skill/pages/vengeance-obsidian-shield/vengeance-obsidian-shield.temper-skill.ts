import type { TemperSkill } from "akasha/temper/catalog/skill/temper-skill.page-type.types.ts"

export const vengeanceObsidianShield = {
  id: "019e6f53-a947-7403-ab57-50503d247a5b",
  type: "page-type/temper-skill",
  slug: "vengeance-obsidian-shield",
  title: "Vengeance Obsidian Shield",
  key: "vengeance-obsidian-shield",
  baseName: "Vengeance Obsidian Shield",
  description:
    "Call the earth to your defense, granting a damage shield to up to 3 of you and your allies that absorbs |cffffff13584|r damage.",
  icon: "/esoui/art/icons/ability_dragonknight_017.dds",
  esoSkillId: 237785,
  isMorph: false,
  learnedLevel: 0,
  lineRankNeeded: 1,
  morphIndex: 0,
  rank: 1,
  skillLineId: "temper-skill-line/vengeance-dragonknight-earthen-heart",
  skillType: "temper-skill-type/active",
  hashPlace: 1514,
  createdAt: "2026-05-28T16:03:34.343Z",
  updatedAt: "2026-10-15T15:44:52.958Z",
  equations: ["<<1>> = 11812 (Constant)"],
} as const satisfies TemperSkill
