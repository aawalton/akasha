import type { TemperSkill } from "akasha/temper/catalog/skill/temper-skill.page-type.types.ts"

export const unbreakableFate = {
  id: "019e6245-a757-7c82-9d63-8177beb7664f",
  type: "page-type/temper-skill",
  slug: "unbreakable-fate",
  title: "Unbreakable Fate",
  key: "unbreakable-fate",
  baseName: "Fatewoven Armor",
  description:
    "Forge defiant runic armor around you, granting 5% Block Mitigation and Major Resolve for 20 seconds, increasing your Armor by 5948 for 20 seconds.\n\nConsume Crux to gain 5% additional Block Mitigation per Crux spent.\n\nWhile the armor persists, taking damage applies Minor Breach, reducing the Armor of your attacker by 2974 for 6 seconds.",
  icon: "/esoui/art/icons/ability_arcanist_009_b.dds",
  esoSkillId: 40186477,
  isMorph: true,
  learnedLevel: 20,
  lineRankNeeded: 20,
  morphIndex: 2,
  rank: 12,
  skillLineId: "temper-skill-line/arcanist-soldier-of-apocrypha",
  skillType: "temper-skill-type/active",
  hashPlace: 1376,
  createdAt: "2026-05-26T03:13:12.535Z",
  updatedAt: "2026-10-15T15:44:52.958Z",
  equations: [
    "<<1>> = 5% (Constant)",
    "<<2>> = Major Resolve (Constant)",
    "<<3>> = 20 seconds (Constant)",
    "<<4>> = 5948 (Constant)",
    "<<5>> = 20 seconds (Constant)",
    "<<6>> = 2974 (Constant)",
    "<<7>> = 6 seconds (Constant)",
  ],
} as const satisfies TemperSkill
