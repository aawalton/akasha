import * as z from "zod"
import { companionBaseRoles } from "@akasha/temper-companions-core/companion-base-roles"
import { companions } from "@akasha/temper-companions-core/companions"
import { companionArmorSlots } from "@akasha/temper-companions-core/companion-armor-slots"
import { companionEquipmentQualities } from "@akasha/temper-companions-core/companion-equipment-qualities"
import { companionJewelrySlots } from "@akasha/temper-companions-core/companion-jewelry-slots"
import { companionTraits } from "@akasha/temper-companions-core/companion-traits"
import { companionWeaponSlots } from "@akasha/temper-companions-core/companion-weapon-slots"
import { companionWeaponTypes } from "@akasha/temper-companions-core/companion-weapon-types"
import { companionSkillSlots } from "@akasha/temper-companions-core/companion-skill-slots"
import { companionSkills } from "@akasha/temper-companions-core/companion-skills"

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
