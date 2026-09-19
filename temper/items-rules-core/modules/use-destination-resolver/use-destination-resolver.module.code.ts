import { assertNever } from "akasha/code/type/narrowing/modules/assert-never/assert-never.module.code.ts"
import type {
  CharacterId,
  ItemKey,
  UseDestinationContext,
} from "akasha/temper/items-rules-core/modules/use-destination-types/use-destination-types.module.code.ts"

export function hashItemKey(itemKey: ItemKey): string {
  switch (itemKey.kind) {
    case "recipe":
      return `recipe:${itemKey.resultItemId}`
    case "motif":
      return `motif:${itemKey.styleId}:${itemKey.chapterId === null ? "master" : itemKey.chapterId}`
    case "script":
      return `script:${itemKey.scriptId}`
    case "consumable":
      return `consumable:${itemKey.itemId}`
    default:
      return assertNever(itemKey)
  }
}

function isClaimable(itemKey: ItemKey): boolean {
  return itemKey.kind !== "consumable"
}

export function orderedForMasterMotif<T>(
  eligible: readonly T[],
  knownChapterCount: (one: T) => number
): readonly T[] {
  const decorated = eligible.map((one, index) => [one, knownChapterCount(one), index] as const)
  decorated.sort((a, b) => {
    const byCount = a[1] - b[1]
    if (byCount !== 0) return byCount
    return a[2] - b[2]
  })
  return decorated.map(([one]) => one)
}

export function planUseDestinationsForStack(
  itemKey: ItemKey,
  stackCount: number,
  ctx: UseDestinationContext,
  claims: Map<CharacterId, Set<string>>,
  eligibilityPredicate?: (charId: CharacterId) => boolean
): readonly CharacterId[] {
  if (stackCount <= 0) return []
  const claimable = isClaimable(itemKey)
  const hash = claimable ? hashItemKey(itemKey) : undefined

  const eligible: CharacterId[] = []
  for (const charId of ctx.characterPriority) {
    if (eligibilityPredicate !== undefined) {
      if (!eligibilityPredicate(charId)) continue
    } else {
      if (ctx.knowsItem(charId, itemKey)) continue
    }
    if (claimable && hash !== undefined) {
      const existing = claims.get(charId)
      if (existing?.has(hash)) continue
    }
    eligible.push(charId)
  }

  if (itemKey.kind === "motif" && itemKey.chapterId === null) {
    const styleId = itemKey.styleId
    const ordered = orderedForMasterMotif(eligible, (charId) =>
      ctx.knownChapterCountForStyle(charId, styleId)
    )
    eligible.length = 0
    for (const charId of ordered) eligible.push(charId)
  }

  const allocations: CharacterId[] = []
  for (const charId of eligible) {
    if (allocations.length >= stackCount) break
    allocations.push(charId)
    if (claimable && hash !== undefined) {
      const existing = claims.get(charId)
      if (existing === undefined) {
        claims.set(charId, new Set([hash]))
      } else {
        existing.add(hash)
      }
    }
  }
  return allocations
}
