import type { BuildHash } from "@akasha/temper-formula-framework/branded-id"
import { buildHash } from "@akasha/temper-formula-framework/branded-id"
import type { CompanionState } from "@akasha/temper-companions-core/companion-types"
import { computeReferenceBaseline } from "./companion-support-baseline"
import type { ReferenceBaseline } from "./companion-support-types"

const REFERENCE_BUILD_CODE = "AjADh2kaRpGkaRpGkJDw8U8AMx1p3WrQgA"

type CompanionDecoder = (hash: BuildHash) => CompanionState | null

let _decoder: CompanionDecoder | undefined

export function registerCompanionDecoder(decoder: CompanionDecoder): undefined {
  _decoder = decoder
}

function once<T>(factory: () => T): () => T {
  let cell: { value: T } | undefined
  return () => {
    if (cell === undefined) {
      cell = { value: factory() }
    }
    return cell.value
  }
}

const getReferenceBuild = once((): CompanionState => {
  if (!_decoder)
    throw new Error(
      "Companion decoder not registered — import @temper/game-codec to trigger registerCompanionDecoder()"
    )
  const decoded = _decoder(buildHash(REFERENCE_BUILD_CODE))
  if (!decoded) throw new Error("Failed to decode reference build")
  return decoded
})

export const getReferenceBaseline = once(
  (): ReferenceBaseline => computeReferenceBaseline(getReferenceBuild())
)
