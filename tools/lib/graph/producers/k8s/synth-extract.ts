// The old graph is gone. This module is a stub so its callers still resolve.
// Every value here refuses; the callers are waiting to be migrated onto `graph/ask.ts`.

import { oldGraphGone } from "../../graph-gone.ts"
import type { SynthDiscoveredManifest } from "./synth-types.ts"

export const extractSynthManifests: (
  sourcePath: string,
  sourceText: string
) => readonly SynthDiscoveredManifest[] = () => oldGraphGone("extractSynthManifests")
export const extractSynthManifestsForService: (
  sources: readonly { readonly sourcePath: string; readonly text: string }[]
) => readonly SynthDiscoveredManifest[] = () => oldGraphGone("extractSynthManifestsForService")
