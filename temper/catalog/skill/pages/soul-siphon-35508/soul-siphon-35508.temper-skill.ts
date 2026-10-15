import type { TemperSkill } from "akasha/temper/catalog/skill/temper-skill.page-type.types.ts"

export const soulSiphon35508 = {
  id: "019e6f53-a76f-740a-8f32-330f03bb26ad",
  type: "page-type/temper-skill",
  slug: "soul-siphon-35508",
  title: "Soul Siphon",
  key: "soul-siphon-35508",
  baseName: "Soul Shred",
  description:
    "Sanctify your soul and the souls of nearby allies with a night rune, healing for |cffffff11321|r Health and an additional |cffffff29504|r Health over |cffffff4|r seconds.\n\nYou and your allies will also receive Major Vitality, increasing your healing received and damage shield strength by |cffffff12|r% for |cffffff4|r seconds.\n\nAn ally can target a nearby enemy and activate the Soul Leech synergy, dealing |cffffff10851|r Magic Damage to them and healing for the damage caused.",
  icon: "/esoui/art/icons/ability_nightblade_018_b.dds",
  esoSkillId: 35508,
  isMorph: true,
  learnedLevel: 12,
  lineRankNeeded: 12,
  morphIndex: 1,
  rank: 12,
  skillLineId: "temper-skill-line/nightblade-siphoning",
  skillType: "temper-skill-type/ultimate",
  hashPlace: 1231,
  createdAt: "2026-05-28T16:03:33.871Z",
  updatedAt: "2026-10-15T15:44:52.958Z",
  equations: [
    "<<1>> = 0.154901 MaxStat + 1.62725 MaxPower - 1.10979 (Ultimate, ratio = 10.51, Heal, AOE, Direct, R2 = 1)",
    "<<2>> = 0.0505 MaxStat + 0.53025 MaxPower (Ultimate, ratio = 10.50, RankMod(1), Heal, SingleTarget, DOT, 3.5s duration, 0.5s tick, R2 = 1)",
    "<<3>> = 4 seconds (Constant)",
    "<<4>> = 12% (Constant)",
    "<<5>> = 4 seconds (Constant)",
    "<<6>> = Soul Leech (Constant)",
    "<<7>> = 0.1388 MaxStat + 1.4571 MaxPower (Ultimate, ratio = 10.50, Dmg, Magic, SingleTarget, Direct, R2 = 1)",
  ],
} as const satisfies TemperSkill
