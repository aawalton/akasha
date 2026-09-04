export interface ScribingCatalogGrimoire {
  name: string
}

export interface ScribingCatalogScript {
  name: string
  slot: number
}

export interface ScribingCatalogData {
  grimoires: Record<number, ScribingCatalogGrimoire>
  scripts: Record<number, ScribingCatalogScript>
}
