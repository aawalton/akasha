import type { TemperSkill } from "akasha/temper/catalog/skill/temper-skill.page-type.types.ts"

export const soulTether = {
  id: "019e6245-a73d-7239-a2ab-bb07746f5871",
  type: "page-type/temper-skill",
  slug: "soul-tether",
  title: "Soul Tether",
  key: "soul-tether",
  baseName: "Soul Shred",
  description:
    "Ravage nearby enemies' souls with a night rune, dealing 3600 Magic Damage, healing for half the damage, and stunning them for 4 seconds. \n\nRavaged enemies are tethered to you for 8 seconds, and while they remain within 10 meters, you siphon 627 Health from them every second.\n\nAn ally can target a ravaged enemy and activate the Soul Leech synergy, dealing 3122 Magic Damage to them and healing for the damage caused.",
  icon: "/esoui/art/icons/ability_nightblade_018_a.dds",
  esoSkillId: 36207,
  isMorph: true,
  learnedLevel: 12,
  lineRankNeeded: 12,
  morphIndex: 2,
  rank: 12,
  skillLineId: "temper-skill-line/nightblade-siphoning",
  skillType: "temper-skill-type/ultimate",
  hashPlace: 1238,
  createdAt: "2026-05-26T03:13:12.509Z",
  updatedAt: "2026-10-15T15:44:52.958Z",
  equations: [
    "<<1>> = 0.16006335 MaxStat + 1.68067034 MaxPower (Ultimate, ratio = 10.50, RankMod(1.033), Dmg, Magic, AOE, Direct, Melee, 0.5s cooldown, R2 = 1)",
    "<<2>> = 4 seconds (Constant)",
    "<<3>> = 8 seconds (Constant)",
    "<<4>> = 0.0279759 MaxStat + 0.292231 MaxPower - 1.14756 (Ultimate, ratio = 10.45, Dmg, Magic, SingleTarget, DOT, 7s duration, 1s tick, R2 = 0.999997)",
    "<<5>> = Soul Leech (Constant)",
    "<<6>> = 0.1388 MaxStat + 1.4571 MaxPower (Ultimate, ratio = 10.50, Dmg, Magic, SingleTarget, Direct, R2 = 1)",
  ],
} as const satisfies TemperSkill
