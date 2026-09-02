import type { CompanionState } from "@akasha/temper-companions-core/companion-types"
import { registerCompanionDecoder } from "@temper/game-companions-core/optimizer/reference-build-data"
import type { BuildHash } from "@akasha/temper-formula-framework/branded-id"
import { buildHash } from "@akasha/temper-formula-framework/branded-id"
import { base64urlToBytes, bytesToBase64url } from "../binary-utils"
import { COMPANION_BUILD_TYPE, decodeV48, ESO_VERSION_48 } from "./companion-codec-v48"
import { decodeV49, ESO_VERSION_49, encodeV49 } from "./companion-codec-v49"

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
