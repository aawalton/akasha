export interface LoreBookEntry {
  readonly bookIndex: number
  readonly name: string
}

export interface LoreCollectionEntry {
  readonly collectionIndex: number
  readonly name: string
  readonly books: readonly LoreBookEntry[]
}

export interface LoreCategoryEntry {
  readonly categoryIndex: number
  readonly name: string
  readonly collections: readonly LoreCollectionEntry[]
}
