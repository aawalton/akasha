import { oldGraphGone } from "./graph-gone.ts"

export type Fetcher = (url: string, init: RequestInit) => Promise<Response>
export const askingAt: (origin: string) => Fetcher = () => oldGraphGone("askingAt")
export const graphOrigin: (root: string) => string = () => oldGraphGone("graphOrigin")
