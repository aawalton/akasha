import type { TemperSkill } from "akasha/temper/catalog/skill/temper-skill.page-type.types.ts"

export const soulTether35460 = {
  id: "019e6f53-a77d-70d1-a6de-85ca196a8994",
  type: "page-type/temper-skill",
  slug: "soul-tether-35460",
  title: "Soul Tether",
  key: "soul-tether-35460",
  baseName: "Soul Shred",
  description:
    "Ravage nearby enemies' souls with a night rune, dealing |cffffff13224|r Magic Damage, healing for half the damage, and stunning them for |cffffff4|r seconds. \n\nRavaged enemies are tethered to you for |cffffff8|r seconds, and while they remain within |cffffff10|r meters, you siphon |cffffff2056|r Health from them every second.\n\nAn ally can target a ravaged enemy and activate the Soul Leech synergy, dealing |cffffff10851|r Magic Damage to them and healing for the damage caused.",
  icon: "/esoui/art/icons/ability_nightblade_018_a.dds",
  esoSkillId: 35460,
  isMorph: true,
  learnedLevel: 12,
  lineRankNeeded: 12,
  morphIndex: 2,
  rank: 12,
  skillLineId: "temper-skill-line/nightblade-siphoning",
  skillType: "temper-skill-type/ultimate",
  hashPlace: 1239,
  createdAt: "2026-05-28T16:03:33.885Z",
  updatedAt: "2026-10-15T15:44:52.958Z",
  equations: [
    "<<1>> = 0.15495 MaxStat + 1.62698 MaxPower (Ultimate, ratio = 10.50, RankMod(1), Dmg, Magic, AOE, Direct, Melee, 0.5s cooldown, R2 = 1)",
    "<<2>> = 4 seconds (Constant)",
    "<<3>> = 8 seconds (Constant)",
    "<<4>> = 0.0270586 MaxStat + 0.283044 MaxPower - 0.776667 (Ultimate, ratio = 10.46, Dmg, Magic, SingleTarget, DOT, 7s duration, 1s tick, R2 = 0.999998)",
    "<<5>> = Soul Leech (Constant)",
    "<<6>> = 0.1388 MaxStat + 1.4571 MaxPower (Ultimate, ratio = 10.50, Dmg, Magic, SingleTarget, Direct, R2 = 1)",
  ],
} as const satisfies TemperSkill
