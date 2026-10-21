import {
  type BitReaderState,
  readBits,
} from "akasha/temper/player/character/build/build-hash/modules/build-hash-bit-reader/build-hash-bit-reader.module.code.ts"
import {
  type BitWriterState,
  writeBits,
} from "akasha/temper/player/character/build/build-hash/modules/build-hash-bit-writer/build-hash-bit-writer.module.code.ts"
import type { CharacterState } from "akasha/temper/player/character/build/modules/build-types/build-types.module.code.ts"
import { skillCatalog } from "akasha/temper/player/character/skill/modules/held-skill-catalog/held-skill-catalog.module.code.ts"

export function encodeMasteries(writer: BitWriterState, build: CharacterState): undefined {
  const ids = skillCatalog().classMasteries.ids
  const chosen = build.masteries ?? []
  for (const mastery of chosen) {
    if (!ids.includes(mastery)) {
      throw new Error(`encodeMasteries: \`${mastery}\` is no class mastery the catalogue holds`)
    }
  }
  for (const id of ids) writeBits(writer, chosen.includes(id) ? 1 : 0, 1)
}

export function decodeMasteries(reader: BitReaderState): Pick<CharacterState, "masteries"> {
  const masteries = skillCatalog().classMasteries.ids.filter(() => readBits(reader, 1) === 1)
  return masteries.length > 0 ? { masteries } : {}
}
