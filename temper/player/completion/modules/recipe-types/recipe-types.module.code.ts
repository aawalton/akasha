export interface RecipeEntry {
  readonly itemId: number
  readonly name: string
}

export interface RecipeListEntry {
  readonly listIndex: number
  readonly name: string
  readonly recipes: readonly RecipeEntry[]
}
