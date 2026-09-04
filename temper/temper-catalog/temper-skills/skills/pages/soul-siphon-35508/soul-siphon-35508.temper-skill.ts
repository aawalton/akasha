import type { TemperSkill } from "../../temper-skill.page-type.ts"

export const soulSiphon35508 = {
  id: "019e6f53-a76f-740a-8f32-330f03bb26ad",
  pageTypeSlug: "temper-skill",
  slug: "soul-siphon-35508",
  title: "Soul Siphon",
  key: "soul-siphon-35508",
  baseName: "Soul Shred",
  description:
    '"Sanctify your soul and the souls of nearby allies with a night rune, healing for |cffffff11321|r Health and an additional |cffffff29504|r Health over |cffffff4|r seconds.\\n\\nYou and your allies will also receive Major Vitality, increasing your healing received and damage shield strength by |cffffff12|r% for |cffffff4|r seconds.\\n\\nAn ally can target a nearby enemy and activate the Soul Leech synergy, dealing |cffffff10851|r Magic Damage to them and healing for the damage caused."',
  icon: "/esoui/art/icons/ability_nightblade_018_b.dds",
  esoSkillId: 35508,
  isMorph: true,
  learnedLevel: 12,
  lineRankNeeded: 12,
  morphIndex: 1,
  rank: 12,
  skillLineId: "nightblade-siphoning",
  skillType: "ultimate",
  subcategoryId: "nightblade-siphoning",
} as const satisfies TemperSkill
