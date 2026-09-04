import { decodeBuild } from "@akasha/temper-build-codec/build-codec"
import type { AutomationSettings } from "@akasha/temper-build-support/automation-settings"
import {
  resolveCharacterToggles,
  resolveCompanionToggles,
} from "@akasha/temper-build-support/automation-settings"
import { decodeCompanion } from "@akasha/temper-companion-codec/companion-codec"
import { buildHash as toBuildHash } from "@akasha/temper-formula-framework/branded-id"
import {
  compileWantedCompanionEquipmentForBuild,
  compileWantedEquipmentForBuild,
} from "@akasha/temper-items-rules-core/equipment-signature-compiler"
import type {
  WantedCompanionEquipmentSignature,
  WantedEquipmentSignature,
} from "@akasha/temper-items-rules-core/inventory-rule-compiler-types"
import type {
  CharacterBuildInput,
  CompanionBuildInput,
  CompletionCharacterInput,
  CompletionCompanionInput,
} from "@akasha/temper-items-rules-core/rule-matcher-context-types"

export function compileWantedEquipment(
  characters: readonly CompletionCharacterInput[],
  buildById: Map<string, CharacterBuildInput>,
  automationSettings?: AutomationSettings
): readonly WantedEquipmentSignature[] {
  const signatures: WantedEquipmentSignature[] = []

  for (const char of characters) {
    const charToggles = resolveCharacterToggles(
      automationSettings?.characters[char.esoCharacterId],
      automationSettings?.global?.characters
    )
    if (!charToggles.equipment) continue
    if (char.targetBuildId == null) continue
    const build = buildById.get(char.targetBuildId)
    if (build?.buildHash == null) continue

    const decoded = decodeBuild(toBuildHash(build.buildHash))
    if (!decoded) continue

    signatures.push(...compileWantedEquipmentForBuild(decoded, char.esoCharacterId))
  }

  return signatures
}

export function compileWantedCompanionEquipment(
  completionCompanions: readonly CompletionCompanionInput[],
  companionBuildById: Map<string, CompanionBuildInput>,
  automationSettings?: AutomationSettings
): readonly WantedCompanionEquipmentSignature[] {
  const signatures: WantedCompanionEquipmentSignature[] = []

  for (const comp of completionCompanions) {
    const compToggles = resolveCompanionToggles(
      automationSettings?.companions[comp.companionId],
      automationSettings?.global?.companions
    )
    if (!compToggles.equipment) continue
    if (comp.targetBuildId == null) continue
    const build = companionBuildById.get(comp.targetBuildId)
    if (build?.buildHash == null) continue

    const decoded = decodeCompanion(toBuildHash(build.buildHash))
    if (!decoded) continue

    signatures.push(...compileWantedCompanionEquipmentForBuild(decoded, comp.companionId))
  }

  return signatures
}
