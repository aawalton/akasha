export interface ItemSetCatalogPiece {
  name: string
}

export interface ItemSetCatalogEntry {
  name: string
  categoryName?: string
  subcategoryName?: string
  totalSlots: number
  pieces: readonly ItemSetCatalogPiece[]
}
