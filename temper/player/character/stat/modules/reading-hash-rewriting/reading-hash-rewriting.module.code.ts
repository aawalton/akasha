import { isRecord } from "akasha/code/type/narrowing/modules/is-record/is-record.module.code.ts"
import { decodeBuild } from "akasha/temper/player/character/build/build-codec/modules/build-codec/build-codec.module.code.ts"
import type { CharacterState } from "akasha/temper/player/character/build/modules/build-types/build-types.module.code.ts"
import { buildHash } from "akasha/temper/player/character/formula-framework/modules/branded-id/branded-id.module.code.ts"

export const CHARACTERS = "temper/player/character/temper-account-character/pages/"

export const READINGS = ".temper-account-character.readings.jsonl"

function canonical(value: unknown): unknown {
  if (Array.isArray(value)) return value.map(canonical)
  if (!isRecord(value)) return value
  const sorted: Record<string, unknown> = {}
  for (const key of Object.keys(value).sort()) {
    if (value[key] !== undefined) sorted[key] = canonical(value[key])
  }
  return sorted
}

export function readsBackAs(written: string, build: CharacterState): boolean {
  return (
    JSON.stringify(canonical(decodeBuild(buildHash(written)))) === JSON.stringify(canonical(build))
  )
}

export function characterOf(path: string): string {
  return path.slice(CHARACTERS.length).split("/")[0] ?? path
}
