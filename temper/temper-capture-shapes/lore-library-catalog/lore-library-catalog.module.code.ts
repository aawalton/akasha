export interface LoreLibraryCatalogBook {
  name: string
}

export interface LoreLibraryCatalogCollection {
  name: string
  books: Record<number, LoreLibraryCatalogBook>
}

export interface LoreLibraryCatalogCategory {
  name: string
  collections: Record<number, LoreLibraryCatalogCollection>
}
