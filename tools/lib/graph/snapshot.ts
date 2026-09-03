import { oldGraphGone } from "./graph-gone.ts"
import type { Engine, Graph } from "./types.ts"

export const applyRegistrars: (engine: Engine, paths: readonly string[]) => Promise<undefined> =
  () => oldGraphGone("applyRegistrars")
export const assembleEngine: (root?: string) => Promise<Engine> = () =>
  oldGraphGone("assembleEngine")
export const buildSnapshot: (commit: string) => Promise<Graph> = () => oldGraphGone("buildSnapshot")
export const producerPaths: (root: string) => readonly string[] = () =>
  oldGraphGone("producerPaths")
export const registerProducers: (engine: Engine, paths: readonly string[]) => Promise<undefined> =
  () => oldGraphGone("registerProducers")
export const registrarPaths: (root: string) => readonly string[] = () =>
  oldGraphGone("registrarPaths")
