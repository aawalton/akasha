// The old graph is gone. This module is a stub so its callers still resolve.
// Every value here refuses; the callers are waiting to be migrated onto `graph/ask.ts`.
import { oldGraphGone } from "../../../graph-gone.ts"

export const extractSynthManifests = ((...a: readonly unknown[]) => oldGraphGone("extractSynthManifests")) as never
export const extractSynthManifestsForService = ((...a: readonly unknown[]) => oldGraphGone("extractSynthManifestsForService")) as never
