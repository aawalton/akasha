import { codeModuleSync } from "../../code-import.ts"

const held = codeModuleSync<{
  loreLibraryData: readonly { readonly categoryIndex: number; readonly name: string; readonly collections: readonly { readonly collectionIndex: number; readonly name: string; readonly books: readonly { readonly bookIndex: number; readonly name: string }[] }[] }[]
}>("@temper/game-completion/generated/lore-library-data.generated")

export const loreLibraryData = held.loreLibraryData
