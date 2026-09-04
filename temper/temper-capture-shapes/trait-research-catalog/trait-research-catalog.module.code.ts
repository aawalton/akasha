export interface TraitResearchCatalogTrait {
  name: string
}

export interface TraitResearchCatalogLine {
  name: string
  traits: Record<number, TraitResearchCatalogTrait>
}

export interface TraitResearchCatalogCraftType {
  name: string
  lines: Record<number, TraitResearchCatalogLine>
}
