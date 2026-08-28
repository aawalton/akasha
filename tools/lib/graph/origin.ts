// The old graph is gone. This module is a stub so its callers still resolve.
// Every value here refuses; the callers are waiting to be migrated onto `graph/ask.ts`.
import { oldGraphGone } from "./graph-gone.ts"

export type Fetcher = (url: string, init: RequestInit) => Promise<Response>
export const askingAt: (origin: string) => Fetcher = () => oldGraphGone("askingAt")
export const graphOrigin: (root: string) => string = () => oldGraphGone("graphOrigin")
