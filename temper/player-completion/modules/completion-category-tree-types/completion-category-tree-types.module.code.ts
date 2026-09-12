export type CompletionTab = "account" | "characters" | "companions"

export interface CompletionCategoryNode {
  id: string
  name: string
  pickerLabel?: string
  children?: readonly CompletionCategoryNode[]
}

export type CompletionCategoryTree = Record<CompletionTab, readonly CompletionCategoryNode[]>
