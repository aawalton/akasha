import { getPage } from "@akasha/pages-access/get"
import { collectPages } from "@akasha/pages-access/iterate"
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
import type { AutomationSettings } from "@temper/shared-engine/automation/automation-settings-types"
import {
  resolveCharacterToggles,
  resolveCompanionToggles,
} from "@temper/shared-engine/automation/automation-settings-types"
import { buildHash as toBuildHash } from "@akasha/temper-formula-framework/branded-id"

export async function readCharactersWithTargetBuilds(userId: string): Promise<
  Array<{
    esoCharacterId: string
    sortOrder?: number
    targetBuildHash?: string
    liveBuildHash?: string
  }>
> {
  const rows = await collectPages({
    pageTypeSlug: "temper-account-character",
    where: [{ key: "accountPage", eq: userId }],
    pageSize: 1000,
  })

  const results: Array<{
    esoCharacterId: string
    sortOrder?: number
    targetBuildHash?: string
    liveBuildHash?: string
  }> = []

  for (const row of rows) {
    const esoCharacterId = row.esoCharacterId
    if (typeof esoCharacterId !== "string") continue

    const sortOrder = typeof row.sortOrder === "number" ? row.sortOrder : undefined
    const targetBuildId = typeof row.targetBuildId === "string" ? row.targetBuildId : undefined
    const liveBuildId = typeof row.liveBuildId === "string" ? row.liveBuildId : undefined

    const result: (typeof results)[number] = { esoCharacterId, sortOrder }

    if (targetBuildId != null) {
      const build = await getPage({
        pageTypeSlug: "character-build",
        where: [{ key: "id", eq: targetBuildId }],
        select: ["buildHash"],
      })
      if (typeof build?.buildHash === "string") result.targetBuildHash = build.buildHash
    }

    if (liveBuildId != null) {
      const build = await getPage({
        pageTypeSlug: "character-build",
        where: [{ key: "id", eq: liveBuildId }],
        select: ["buildHash"],
      })
      if (typeof build?.buildHash === "string") result.liveBuildHash = build.buildHash
    }

    results.push(result)
  }

  results.sort((a, b) => (a.sortOrder ?? 999) - (b.sortOrder ?? 999))
  return results
}

async function readCompanionsWithTargetBuilds(
  userId: string
): Promise<Array<{ companionId: string; sortOrder?: number; targetBuildHash?: string }>> {
  const rows = await collectPages({
    pageTypeSlug: "temper-companion-progress",
    where: [{ key: "accountPage", eq: userId }],
    pageSize: 1000,
  })

  const results: Array<{ companionId: string; sortOrder?: number; targetBuildHash?: string }> = []

  for (const row of rows) {
    const companionId = row.companionId
    if (typeof companionId !== "string") continue

    const sortOrder = typeof row.sortOrder === "number" ? row.sortOrder : undefined
    const targetBuildId = typeof row.targetBuildId === "string" ? row.targetBuildId : undefined

    const result: (typeof results)[number] = { companionId, sortOrder }

    if (targetBuildId != null) {
      const build = await getPage({
        pageTypeSlug: "companion-build",
        where: [{ key: "id", eq: targetBuildId }],
        select: ["buildHash"],
      })
      if (typeof build?.buildHash === "string") result.targetBuildHash = build.buildHash
    }

    results.push(result)
  }

  results.sort((a, b) => (a.sortOrder ?? 999) - (b.sortOrder ?? 999))
  return results
}

export async function compileWantedEquipment(
  userId: string,
  automationSettings?: AutomationSettings
): Promise<WantedEquipmentSignature[]> {
  const characters = await readCharactersWithTargetBuilds(userId)
  if (characters.length === 0) return []

  const signatures: WantedEquipmentSignature[] = []

  for (const char of characters) {
    if (char.targetBuildHash == null || char.esoCharacterId == null) continue

    const charToggles = resolveCharacterToggles(
      automationSettings?.characters[char.esoCharacterId],
      automationSettings?.global?.characters
    )
    if (!charToggles.equipment) continue

    const decoded = decodeBuild(toBuildHash(char.targetBuildHash))
    if (!decoded) continue

    signatures.push(...compileWantedEquipmentForBuild(decoded, char.esoCharacterId))
  }

  return signatures
}

export async function compileWantedCompanionEquipment(
  userId: string,
  automationSettings?: AutomationSettings
): Promise<WantedCompanionEquipmentSignature[]> {
  const companionRows = await readCompanionsWithTargetBuilds(userId)
  if (companionRows.length === 0) return []

  const signatures: WantedCompanionEquipmentSignature[] = []

  for (const row of companionRows) {
    if (row.targetBuildHash == null) continue

    const compToggles = resolveCompanionToggles(
      automationSettings?.companions[row.companionId],
      automationSettings?.global?.companions
    )
    if (!compToggles.equipment) continue

    const decoded = decodeCompanion(toBuildHash(row.targetBuildHash))
    if (!decoded) continue

    signatures.push(...compileWantedCompanionEquipmentForBuild(decoded, row.companionId))
  }

  return signatures
}
