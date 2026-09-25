import {
  type AutomationSettings,
  CHARACTER_TOGGLE_NAMES,
  type CharacterAutomationToggles,
  COMPANION_TOGGLE_NAMES,
  type CompanionAutomationToggles,
} from "akasha/temper/items/inventory-automation/modules/automation-toggles/automation-toggles.module.code.ts"
import { z } from "zod"

function optionalBooleanFields(
  names: readonly string[]
): Record<string, z.ZodOptional<z.ZodBoolean>> {
  return Object.fromEntries(names.map((name) => [name, z.boolean().optional()]))
}

const CharacterTogglesShape: z.ZodType<CharacterAutomationToggles> = z
  .object(optionalBooleanFields(CHARACTER_TOGGLE_NAMES))
  .passthrough()

const CompanionTogglesShape: z.ZodType<CompanionAutomationToggles> = z
  .object(optionalBooleanFields(COMPANION_TOGGLE_NAMES))
  .passthrough()

export const AutomationSettingsShape: z.ZodType<AutomationSettings> = z
  .object({
    global: z
      .object({
        characters: CharacterTogglesShape.optional(),
        companions: CompanionTogglesShape.optional(),
      })
      .passthrough()
      .optional(),
    characters: z.record(z.string(), CharacterTogglesShape),
    companions: z.record(z.string(), CompanionTogglesShape),
  })
  .passthrough()
