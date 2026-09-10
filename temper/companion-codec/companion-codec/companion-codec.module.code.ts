import {
  base64urlToBytes,
  bytesToBase64url,
} from "akasha/temper/build-hash/build-hash-base64url/build-hash-base64url.module.code.ts"
import type { CompanionState } from "akasha/temper/companions-core/companion-types/companion-types.module.code.ts"
import { registerCompanionDecoder } from "akasha/temper/companions-core/reference-build-data/reference-build-data.module.code.ts"
import type { BuildHash } from "../../formula-framework/branded-id/branded-id.module.code.ts"
import { buildHash } from "../../formula-framework/branded-id/branded-id.module.code.ts"
import {
  COMPANION_BUILD_TYPE,
  decodeV48,
  ESO_VERSION_48,
} from "../companion-codec-v48/companion-codec-v48.module.code.ts"
import {
  decodeV49,
  ESO_VERSION_49,
  encodeV49,
} from "../companion-codec-v49/companion-codec-v49.module.code.ts"

export function encodeCompanion(build: CompanionState): BuildHash {
  const bytes = encodeV49(build)
  return buildHash(bytesToBase64url(bytes))
}

export function decodeCompanion(encoded: BuildHash): CompanionState | null {
  const bytes = base64urlToBytes(encoded)
  if (!bytes || bytes.length < 2) {
    return null
  }

  const buildType = bytes[0]
  const version = bytes[1]

  if (buildType !== COMPANION_BUILD_TYPE) {
    console.warn(`Invalid companion type: ${buildType}`)
    return null
  }

  switch (version) {
    case ESO_VERSION_48:
      return decodeV48(bytes)
    case ESO_VERSION_49:
      return decodeV49(bytes)
    default:
      console.warn(`Unknown companion code version: ${version}`)
      return null
  }
}

registerCompanionDecoder(decodeCompanion)
