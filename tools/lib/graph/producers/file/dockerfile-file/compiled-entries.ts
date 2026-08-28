import { oldGraphGone } from "../../../graph-gone.ts"

export const compiledEntries: (text: string) => readonly string[] = () =>
  oldGraphGone("compiledEntries")
