import * as z from "zod"
import { companionBaseRoles } from "./companion-base-roles-data"
import { companions } from "./companions-data"
import { companionArmorSlots } from "./equipment/companion-armor-slots-data"
import { companionEquipmentQualities } from "./generated/temper-companion-equipment-quality.generated"
import { companionJewelrySlots } from "./generated/temper-companion-jewelry-slot.generated"
import { companionTraits } from "./equipment/companion-traits-data"
import { companionWeaponSlots } from "./equipment/companion-weapon-slots-data"
import { companionWeaponTypes } from "./generated/temper-companion-weapon-type.generated"
import { companionSkillSlots } from "./skills/companion-skill-slots-data"
import { companionSkills } from "./skills/companion-skills-data"

const companionArmorWeightSchema = z.enum(["no-weight", "light", "medium", "heavy"])

const companionArmorItemSchema = z.object({
  type: z.enum(companionArmorSlots.ids),
  weight: companionArmorWeightSchema,
  trait: z.enum(companionTraits.ids),
  quality: z.enum(companionEquipmentQualities.ids),
})

const companionArmorSlotItemSchema = z.discriminatedUnion("itemType", [
  z.object({ itemType: z.literal("armor"), data: companionArmorItemSchema }),
  z.object({ itemType: z.literal("empty"), data: z.null() }),
])

const companionJewelryItemSchema = z.object({
  type: z.enum(companionJewelrySlots.ids),
  trait: z.enum(companionTraits.ids),
  quality: z.enum(companionEquipmentQualities.ids),
})

const companionJewelrySlotItemSchema = z.discriminatedUnion("itemType", [
  z.object({ itemType: z.literal("jewelry"), data: companionJewelryItemSchema }),
  z.object({ itemType: z.literal("empty"), data: z.null() }),
])

const companionWeaponItemSchema = z.object({
  slot: z.enum(companionWeaponSlots.ids),
  type: z.enum(companionWeaponTypes.ids),
  trait: z.enum(companionTraits.ids),
  quality: z.enum(companionEquipmentQualities.ids),
})

const companionWeaponSlotItemSchema = z.discriminatedUnion("itemType", [
  z.object({ itemType: z.literal("weapon"), data: companionWeaponItemSchema }),
  z.object({ itemType: z.literal("empty"), data: z.null() }),
])

const companionEquipmentSchema = z.object({
  armor: z.record(z.enum(companionArmorSlots.ids), companionArmorSlotItemSchema),
  jewelry: z.record(z.enum(companionJewelrySlots.ids), companionJewelrySlotItemSchema),
  weapons: z.record(z.enum(companionWeaponSlots.ids), companionWeaponSlotItemSchema),
})

const companionSkillBarRecordSchema = z.record(
  z.enum(companionSkillSlots.ids),
  z.enum(companionSkills.ids)
)

const companionSkillsSchema = z.object({
  "skill-bar": companionSkillBarRecordSchema,
})

const baseRoleValueSchema = z
  .union([
    z.enum(companionBaseRoles.ids),
    z.literal("damage-support"),
    z.literal("toughness-support"),
  ])
  .transform((v) =>
    v === "damage-support" || v === "toughness-support" ? ("support" as const) : v
  )

const companionSchema = z
  .object({
    id: z.enum(companions.ids),
    baseRoles: z.array(baseRoleValueSchema).optional(),
    roles: z.array(baseRoleValueSchema).optional(),
  })
  .transform((data) => ({
    id: data.id,
    baseRoles: [...new Set(data.baseRoles ?? data.roles ?? [])],
  }))

const companionTargetSchema = z.object({
  armor: z.enum(["overland", "dungeon"]),
  targetCount: z.number().min(1).max(6).default(1),
  targetHealth: z.enum(["full", "execute"]).default("full"),
})

export const companionStateSchema = z.object({
  id: z.string(),
  name: z.string(),
  description: z.string(),
  isTestBuild: z.boolean().optional(),
  testCategory: z.enum(["class-skills", "shared-skills"]).optional(),
  companion: companionSchema,
  equipment: companionEquipmentSchema,
  skills: companionSkillsSchema,
  target: companionTargetSchema,
})
