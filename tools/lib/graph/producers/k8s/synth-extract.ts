import { oldGraphGone } from "../../graph-gone.ts"
import type { SynthDiscoveredManifest } from "./synth-types.ts"

export const extractSynthManifests: (
  sourcePath: string,
  sourceText: string
) => readonly SynthDiscoveredManifest[] = () => oldGraphGone("extractSynthManifests")
export const extractSynthManifestsForService: (
  sources: readonly { readonly sourcePath: string; readonly text: string }[]
) => readonly SynthDiscoveredManifest[] = () => oldGraphGone("extractSynthManifestsForService")
