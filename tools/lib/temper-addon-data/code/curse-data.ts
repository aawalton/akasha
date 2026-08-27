import { codeModuleSync } from "../../code-import.ts"

const held = codeModuleSync<{
  curses: { readonly data: Record<string, { readonly id: string; readonly name: string; readonly esoCurseIds: readonly unknown[] } | { readonly id: string; readonly name: string; readonly esoCurseIds: readonly number[] }>; readonly ids: readonly string[]; readonly list: readonly ({ readonly id: string; readonly name: string; readonly esoCurseIds: readonly unknown[] } | { readonly id: string; readonly name: string; readonly esoCurseIds: readonly number[] })[] }
}>("@temper/game-characters-character/curse-data")

export const curses = held.curses
