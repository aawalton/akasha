
import { type Manifest, manifestOf } from "./manifest.ts"

export const SEQUENCE_KEY = "sequence-slugs"

const NOUN = "member"

export const sequenceManifestOf = (body: string): Manifest => manifestOf(body, SEQUENCE_KEY, NOUN)
