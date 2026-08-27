import type { CharacterState } from "@temper/game-characters-character/build-types"
import { BuildHash } from "@temper/shared-formula-framework/branded"
import { base64urlToBytes, bytesToBase64url } from "../binary-utils"
import { CHARACTER_BUILD_TYPE, decodeV48, ESO_VERSION_48 } from "./build-codec-v48"
import { decodeV49, ESO_VERSION_49 } from "./build-codec-v49"
import { decodeV50, ESO_VERSION_50 } from "./build-codec-v50"
import { decodeV51, ESO_VERSION_51 } from "./build-codec-v51"
import { decodeV52, ESO_VERSION_52, encodeV52 } from "./build-codec-v52"

export function encodeBuild(build: CharacterState): BuildHash {
  const bytes = encodeV52(build)
  return BuildHash(bytesToBase64url(bytes))
}

export function decodeBuild(encoded: BuildHash): CharacterState | null {
  const bytes = base64urlToBytes(encoded)
  if (!bytes || bytes.length === 0) {
    return null
  }

  const firstByte = bytes[0]

  if (firstByte !== CHARACTER_BUILD_TYPE) {
    console.warn(`Unknown build code type: ${firstByte}`)
    return null
  }

  const version = bytes[1]
  let build: CharacterState | null
  switch (version) {
    case ESO_VERSION_48:
      build = decodeV48(bytes)
      break
    case ESO_VERSION_49:
      build = decodeV49(bytes)
      break
    case ESO_VERSION_50:
      build = decodeV50(bytes)
      break
    case ESO_VERSION_51:
      build = decodeV51(bytes)
      break
    case ESO_VERSION_52:
      build = decodeV52(bytes)
      break
    default:
      console.warn(`Unknown build code version: ${version}`)
      return null
  }

  return build
}
