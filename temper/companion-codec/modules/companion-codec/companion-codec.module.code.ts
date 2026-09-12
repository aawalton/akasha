import {
  base64urlToBytes,
  bytesToBase64url,
} from "akasha/temper/build-hash/modules/build-hash-base64url/build-hash-base64url.module.code.ts"
import {
  COMPANION_BUILD_TYPE,
  decodeV49,
  ESO_VERSION_49,
  encodeV49,
} from "akasha/temper/companion-codec/modules/companion-codec-v49/companion-codec-v49.module.code.ts"
import type { CompanionState } from "akasha/temper/companions-core/companion-types/companion-types.module.code.ts"
import { registerCompanionDecoder } from "akasha/temper/companions-core/reference-build-data/reference-build-data.module.code.ts"
import type { BuildHash } from "akasha/temper/formula-framework/modules/branded-id/branded-id.module.code.ts"
import { buildHash } from "akasha/temper/formula-framework/modules/branded-id/branded-id.module.code.ts"

export const ESO_VERSION_48 = 48

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
    case ESO_VERSION_49:
      return decodeV49(bytes)
    default:
      console.warn(`Unknown companion code version: ${version}`)
      return null
  }
}

registerCompanionDecoder(decodeCompanion)
