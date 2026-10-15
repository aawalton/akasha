import type { TemperSkill } from "akasha/temper/catalog/skill/temper-skill.page-type.types.ts"

export const tentacularDread185823 = {
  id: "019e6f53-a82c-7f48-a67e-43f76182dd1c",
  type: "page-type/temper-skill",
  slug: "tentacular-dread-185823",
  title: "Tentacular Dread",
  key: "tentacular-dread-185823",
  baseName: "Abyssal Impact",
  description:
    "Infuse your arm with abyssal magic to form tentacles that lash out at your foes, dealing |cffffff7360|r Frost Damage. Enemies are immobilized for |cffffff3|r seconds and marked with Abyssal Ink for |cffffff20|r seconds.\n\nYou deal |cffffff5|r% increased damage to enemies drenched in Abyssal Ink.\n\nConsume all Crux and increase Tentacular Dread damage by |cffffff33|r% and damage to foes drenched in Abyssal Ink by |cffffff2|r% per Crux spent.",
  icon: "/esoui/art/icons/ability_arcanist_003_b.dds",
  esoSkillId: 185823,
  isMorph: true,
  learnedLevel: 20,
  lineRankNeeded: 20,
  morphIndex: 2,
  rank: 20,
  skillLineId: "temper-skill-line/arcanist-herald-of-the-tome",
  skillType: "temper-skill-type/active",
  hashPlace: 1335,
  createdAt: "2026-05-28T16:03:34.060Z",
  updatedAt: "2026-10-15T15:44:52.958Z",
  equations: [
    "<<1>> = 0.08625 MaxStat + 0.905625 MaxPower (Ultimate, ratio = 10.50, RankMod(1), Dmg, Frost, AOE, Direct, Melee, 0.3s cooldown, R2 = 1)",
    "<<2>> = 3 seconds (Constant)",
    "<<3>> = 20 seconds (Constant)",
    "<<4>> = 5% (Constant)",
    "<<5>> = Abyssal Ink (Constant)",
    "<<6>> = Tentacular Dread (Constant)",
    "<<7>> = 33% (Constant)",
    "<<8>> = 2% (Constant)",
  ],
} as const satisfies TemperSkill
