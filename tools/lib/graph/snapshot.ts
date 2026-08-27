// The old graph is gone. This module is a stub so its callers still resolve.
// Every value here refuses; the callers are waiting to be migrated onto `graph/ask.ts`.
import { dirname, join } from "node:path"
import { fileURLToPath } from "node:url"
import { oldGraphGone } from "./graph-gone.ts"

export const PRODUCERS_DIR = join(dirname(fileURLToPath(import.meta.url)), "producers")
export const applyRegistrars = ((...a: readonly unknown[]) => oldGraphGone("applyRegistrars")) as never
export const assembleEngine = ((...a: readonly unknown[]) => oldGraphGone("assembleEngine")) as never
export const buildSnapshot = ((...a: readonly unknown[]) => oldGraphGone("buildSnapshot")) as never
export const producerPaths = ((...a: readonly unknown[]) => oldGraphGone("producerPaths")) as never
export const registerProducers = ((...a: readonly unknown[]) => oldGraphGone("registerProducers")) as never
export const registrarPaths = ((...a: readonly unknown[]) => oldGraphGone("registrarPaths")) as never
