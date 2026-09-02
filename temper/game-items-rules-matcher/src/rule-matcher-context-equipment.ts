import { decodeBuild } from "@temper/game-codec/character/build-codec"
import { decodeCompanion } from "@temper/game-codec/companions/companion-codec"
import {
  compileWantedCompanionEquipmentForBuild,
  compileWantedEquipmentForBuild,
} from "@temper/game-items-rules-core/equipment-signature-compiler"
import type {
  WantedCompanionEquipmentSignature,
  WantedEquipmentSignature,
} from "@temper/game-items-rules-core/inventory-rule-compiler-types"
import type {
  CharacterBuildInput,
  CompanionBuildInput,
  CompletionCharacterInput,
  CompletionCompanionInput,
} from "@temper/game-items-rules-core/rule-matcher-context-types"
import type { AutomationSettings } from "@temper/shared-engine/automation/automation-settings-types"
import {
  resolveCharacterToggles,
  resolveCompanionToggles,
} from "@temper/shared-engine/automation/automation-settings-types"
import { buildHash as toBuildHash } from "@akasha/temper-formula-framework/branded-id"

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
