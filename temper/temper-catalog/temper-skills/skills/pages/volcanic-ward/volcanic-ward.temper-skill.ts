import type { TemperSkill } from "../../temper-skill.page-type.ts"

export const volcanicWard = {
  id: "019e6245-a766-73e5-834e-a9a10a99f219",
  pageTypeSlug: "temper-skill",
  slug: "volcanic-ward",
  title: "Volcanic Ward",
  key: "volcanic-ward",
  baseName: "Superheated Ward",
  description:
    '"Roil the air around you or an ally, granting a damage shield that absorbs up to 8980 for 6 seconds and reducing the next instance of damage taken by 10%. When the shield ends the latent heat warms the target, healing them for 3923 Health.\\n\\nThis ability scales off the higher of your Max Magicka or Stamina and the shield is capped at 50% of the target\'s Max Health."',
  icon: "/esoui/art/icons/ability_dragonknight_013_b.dds",
  esoSkillId: 31820,
  isMorph: true,
  learnedLevel: 1,
  lineRankNeeded: 1,
  morphIndex: 1,
  rank: 8,
  skillLineId: "dragonknight-earthen-heart",
  skillType: "active",
  subcategoryId: "dragonknight-earthen-heart",
} as const satisfies TemperSkill
