import type { TemperSkill } from "akasha/temper/catalog/skill/temper-skill.page-type.types.ts"

export const unbreakableFate186477 = {
  id: "019e6f53-a875-71d9-937f-310c10bd1bb0",
  type: "page-type/temper-skill",
  slug: "unbreakable-fate-186477",
  title: "Unbreakable Fate",
  key: "unbreakable-fate-186477",
  baseName: "Fatewoven Armor",
  description:
    "Forge defiant runic armor around you, granting |cffffff5|r% Block Mitigation and Major Resolve for |cffffff20|r seconds, increasing your Armor by |cffffff5948|r for |cffffff20|r seconds.\n\nConsume Crux to gain |cffffff5|r% additional Block Mitigation per Crux spent.\n\nWhile the armor persists, taking damage applies Minor Breach, reducing the Armor of your attacker by |cffffff2974|r for |cffffff6|r seconds.",
  icon: "/esoui/art/icons/ability_arcanist_009_b.dds",
  esoSkillId: 186477,
  isMorph: true,
  learnedLevel: 20,
  lineRankNeeded: 20,
  morphIndex: 2,
  rank: 20,
  skillLineId: "temper-skill-line/arcanist-soldier-of-apocrypha",
  skillType: "temper-skill-type/active",
  hashPlace: 1377,
  createdAt: "2026-05-28T16:03:34.133Z",
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
