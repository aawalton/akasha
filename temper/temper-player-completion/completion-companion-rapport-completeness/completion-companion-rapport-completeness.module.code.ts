import { companions } from "@akasha/temper-companions-core/companions"
import { MAX_COMPANION_RAPPORT } from "../companion-rapport/companion-rapport.module.code.ts"

const RAPPORT_COMPANION_DEF_IDS: readonly number[] = companions.list
  .filter((c) => c.esoCompanionId !== 0)
  .map((c) => c.esoCompanionId)

export function isCompanionRapportPathComplete(
  rapport: Record<number, number> | undefined,
  itemPath?: readonly (string | number)[] | null
): boolean {
  if (itemPath !== undefined && itemPath !== null && itemPath.length > 0) {
    const companionId = Number(itemPath[0])
    return (rapport?.[companionId] ?? 0) >= MAX_COMPANION_RAPPORT
  }
  if (rapport === undefined) return false
  for (const id of RAPPORT_COMPANION_DEF_IDS) {
    if ((rapport[id] ?? 0) < MAX_COMPANION_RAPPORT) return false
  }
  return true
}
