export interface TributePatronCatalogCard {
  baseCardName: string
  upgradeCardName: string
}

export interface TributePatronCatalogEntry {
  name: string
  categoryName: string
  collectibleId: number
  cards: Record<number, TributePatronCatalogCard>
}
