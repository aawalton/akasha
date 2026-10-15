import type { TemperSkill } from "akasha/temper/catalog/skill/temper-skill.page-type.types.ts"

export const lingeringFlare = {
  id: "019e6251-4cce-7085-8eff-321285c698da",
  type: "page-type/temper-skill",
  slug: "lingering-flare",
  title: "Lingering Flare",
  key: "lingering-flare",
  baseName: "Revealing Flare",
  description:
    "Launch a blinding flare, revealing stealthed and invisible enemies in the target area for 10 seconds. Exposed enemies cannot return to stealth or invisibility for 4 seconds.\n\nWhile slotted you gain Major Protection, reducing your damage taken by 10%.",
  icon: "/esoui/art/icons/ability_ava_lingering_flare.dds",
  esoSkillId: 63391,
  isMorph: true,
  learnedLevel: 7,
  lineRankNeeded: 7,
  morphIndex: 1,
  rank: 8,
  skillLineId: "temper-skill-line/alliance-war-support",
  skillType: "temper-skill-type/active",
  effects: "jsonl",
  hashPlace: 756,
  createdAt: "2026-05-26T03:25:55.790Z",
  updatedAt: "2026-10-15T15:44:52.958Z",
  equations: [
    "<<1>> = 10 seconds (Constant)",
    "<<2>> = 4 seconds (Constant)",
    "<<3>> = Major Protection (Constant)",
    "<<4>> = 10% (Constant)",
  ],
} as const satisfies TemperSkill
