import { oldGraphGone } from "./graph-gone.ts"
import type { Fetcher } from "./origin.ts"
import type { Graph } from "./types.ts"

export type Asked<T> =
  | { readonly ok: true; readonly held: T }
  | { readonly ok: false; readonly why: string }
export const askGraph: (commit: string, fetcher?: Fetcher) => Promise<Asked<Graph>> = () =>
  oldGraphGone("askGraph")
