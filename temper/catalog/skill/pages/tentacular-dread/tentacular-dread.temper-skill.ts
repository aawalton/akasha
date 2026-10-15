import type { TemperSkill } from "akasha/temper/catalog/skill/temper-skill.page-type.types.ts"

export const tentacularDread = {
  id: "019e6245-a750-74cf-919c-45d3786d3188",
  type: "page-type/temper-skill",
  slug: "tentacular-dread",
  title: "Tentacular Dread",
  key: "tentacular-dread",
  baseName: "Abyssal Impact",
  description:
    "Infuse your arm with abyssal magic to form tentacles that lash out at your foes, dealing 2002 Frost Damage. Enemies are immobilized for 3 seconds and marked with Abyssal Ink for 20 seconds.\n\nYou deal 5% increased damage to enemies drenched in Abyssal Ink.\n\nConsume all Crux and increase Tentacular Dread damage by 33% and damage to foes drenched in Abyssal Ink by 2% per Crux spent.",
  icon: "/esoui/art/icons/ability_arcanist_003_b.dds",
  esoSkillId: 40185823,
  isMorph: true,
  learnedLevel: 20,
  lineRankNeeded: 20,
  morphIndex: 2,
  rank: 12,
  skillLineId: "temper-skill-line/arcanist-herald-of-the-tome",
  skillType: "temper-skill-type/active",
  hashPlace: 1334,
  createdAt: "2026-05-26T03:13:12.528Z",
  updatedAt: "2026-10-15T15:44:52.958Z",
  equations: [
    "<<1>> = 0.08909625 MaxStat + 0.935510625 MaxPower (Ultimate, ratio = 10.50, RankMod(1.033), Dmg, Frost, AOE, Direct, Melee, 0.3s cooldown, R2 = 1)",
    "<<2>> = 3 seconds (Constant)",
    "<<3>> = 20 seconds (Constant)",
    "<<4>> = 5% (Constant)",
    "<<5>> = Abyssal Ink (Constant)",
    "<<6>> = Tentacular Dread (Constant)",
    "<<7>> = 33% (Constant)",
    "<<8>> = 2% (Constant)",
  ],
} as const satisfies TemperSkill
