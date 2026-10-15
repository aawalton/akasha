import type { TemperSkill } from "akasha/temper/catalog/skill/temper-skill.page-type.types.ts"

export const soulSiphon = {
  id: "019e6245-a73a-7ff5-910f-8bb8cb978e38",
  type: "page-type/temper-skill",
  slug: "soul-siphon",
  title: "Soul Siphon",
  key: "soul-siphon",
  baseName: "Soul Shred",
  description:
    "Sanctify your soul and the souls of nearby allies with a night rune, healing for 3600 Health and an additional 9384 Health over 4 seconds.\n\nYou and your allies will also receive Major Vitality, increasing your healing received and damage shield strength by 12% for 4 seconds.\n\nAn ally can target a nearby enemy and activate the Soul Leech synergy, dealing 3122 Magic Damage to them and healing for the damage caused.",
  icon: "/esoui/art/icons/ability_nightblade_018_b.dds",
  esoSkillId: 36186,
  isMorph: true,
  learnedLevel: 12,
  lineRankNeeded: 12,
  morphIndex: 1,
  rank: 8,
  skillLineId: "temper-skill-line/nightblade-siphoning",
  skillType: "temper-skill-type/ultimate",
  hashPlace: 1230,
  createdAt: "2026-05-26T03:13:12.506Z",
  updatedAt: "2026-10-15T15:44:52.958Z",
  equations: [
    "<<1>> = 0.160029 MaxStat + 1.68063 MaxPower - 1.23465 (Ultimate, ratio = 10.50, Heal, AOE, Direct, R2 = 1)",
    "<<2>> = 0.0521665 MaxStat + 0.54774825 MaxPower (Ultimate, ratio = 10.50, RankMod(1.033), Heal, SingleTarget, DOT, 3.5s duration, 0.5s tick, R2 = 1)",
    "<<3>> = 4 seconds (Constant)",
    "<<4>> = 12% (Constant)",
    "<<5>> = 4 seconds (Constant)",
    "<<6>> = Soul Leech (Constant)",
    "<<7>> = 0.1388 MaxStat + 1.4571 MaxPower (Ultimate, ratio = 10.50, Dmg, Magic, SingleTarget, Direct, R2 = 1)",
  ],
} as const satisfies TemperSkill
