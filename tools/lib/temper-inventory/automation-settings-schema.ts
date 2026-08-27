import type {
  AutomationSettings,
  CharacterAutomationToggles,
  CompanionAutomationToggles,
} from "./automation-types.ts"
import { z } from "zod"

const CharacterTogglesSchema: z.ZodType<CharacterAutomationToggles> = z
  .object({
    equipment: z.boolean().optional(),
    food: z.boolean().optional(),
    potions: z.boolean().optional(),
    skills: z.boolean().optional(),
    championPoints: z.boolean().optional(),
    attributes: z.boolean().optional(),
    soulGems: z.boolean().optional(),
    repairKits: z.boolean().optional(),
    recharge: z.boolean().optional(),
    repair: z.boolean().optional(),
    lockpicks: z.boolean().optional(),
    experienceScrolls: z.boolean().optional(),
    dailyWrits: z.boolean().optional(),
    dailyWritBlacksmithing: z.boolean().optional(),
    dailyWritClothier: z.boolean().optional(),
    dailyWritWoodworking: z.boolean().optional(),
    dailyWritJewelrycrafting: z.boolean().optional(),
    dailyWritEnchanting: z.boolean().optional(),
    dailyWritAlchemy: z.boolean().optional(),
    dailyWritProvisioning: z.boolean().optional(),
    dailyWritAutoCraft: z.boolean().optional(),
    masterWrits: z.boolean().optional(),
    masterWritBlacksmithing: z.boolean().optional(),
    masterWritClothier: z.boolean().optional(),
    masterWritWoodworking: z.boolean().optional(),
    masterWritJewelrycrafting: z.boolean().optional(),
    masterWritEnchanting: z.boolean().optional(),
    masterWritAlchemy: z.boolean().optional(),
    masterWritProvisioning: z.boolean().optional(),
  })
  .passthrough()

const CompanionTogglesSchema: z.ZodType<CompanionAutomationToggles> = z
  .object({
    equipment: z.boolean().optional(),
    skills: z.boolean().optional(),
  })
  .passthrough()

export const AutomationSettingsSchema: z.ZodType<AutomationSettings> = z
  .object({
    global: z
      .object({
        characters: CharacterTogglesSchema.optional(),
        companions: CompanionTogglesSchema.optional(),
      })
      .passthrough()
      .optional(),
    characters: z.record(z.string(), CharacterTogglesSchema),
    companions: z.record(z.string(), CompanionTogglesSchema),
  })
  .passthrough()
