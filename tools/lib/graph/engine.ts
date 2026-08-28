import { oldGraphGone } from "./graph-gone.ts"
import type { Engine } from "./types.ts"

export const createEngine: () => Engine = () => oldGraphGone("createEngine")
