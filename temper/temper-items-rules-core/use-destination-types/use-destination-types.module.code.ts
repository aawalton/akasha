export type CharacterId = string & { readonly __brand: "CharacterId" }

export function characterId(id: string): CharacterId {
  return id as CharacterId
}

export type ItemKey =
  | { kind: "recipe"; resultItemId: number }
  | { kind: "motif"; styleId: number; chapterId: number | null }
  | { kind: "script"; scriptId: number }
  | { kind: "consumable"; itemId: number }

export interface UseDestinationContext {
  readonly characterPriority: ReadonlyArray<CharacterId>
  readonly knowsItem: (charId: CharacterId, itemKey: ItemKey) => boolean
  readonly knownChapterCountForStyle: (charId: CharacterId, styleId: number) => number
}
