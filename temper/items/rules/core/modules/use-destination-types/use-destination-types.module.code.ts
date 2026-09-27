export type CharacterId = string & { readonly __brand: "CharacterId" }

export function characterId(id: string): CharacterId {
  return id as CharacterId
}

export type ItemKey =
  | { kind: "recipe"; resultItemId: number }
  | { kind: "motif"; styleId: number; chapterId: number | null }
  | { kind: "script"; scriptId: number }
  | { kind: "consumable"; itemId: number }

interface UseCopiesHeld {
  readonly holder: CharacterId | undefined
  readonly count: number
}

export interface UseStackHolding {
  readonly holder: CharacterId | undefined
  readonly elsewhere: readonly UseCopiesHeld[]
}

export interface UseDestinationContext {
  readonly characterPriority: ReadonlyArray<CharacterId>
  readonly knowsItem: (charId: CharacterId, itemKey: ItemKey) => boolean
  readonly knownChapterCountForStyle: (charId: CharacterId, styleId: number) => number
}
