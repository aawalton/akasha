import { bitsNeeded } from "akasha/code/type/narrowing/modules/bits-needed/bits-needed.module.code.ts"
import { requireFirst } from "akasha/code/type/narrowing/modules/require-first/require-first.module.code.ts"
import { skillSlots } from "akasha/temper/catalog/skill-kind/modules/skill-slots/skill-slots.module.code.ts"
import {
  characterSkillIds,
  getPassiveSkillId,
  getSkillId,
  getSkillIndex,
  passiveSkillIds,
  skillBits,
} from "akasha/temper/player/character/build/build-codec/modules/build-codec-indices/build-codec-indices.module.code.ts"
import {
  RANK_PAGES_BEFORE_MINOR_10,
  type RankPage,
} from "akasha/temper/player/character/build/build-codec/modules/build-codec-v52-rank-pages/build-codec-v52-rank-pages.data-table.code.ts"
import type { BitReaderState } from "akasha/temper/player/character/build/build-hash/modules/build-hash-bit-reader/build-hash-bit-reader.module.code.ts"
import { readBits } from "akasha/temper/player/character/build/build-hash/modules/build-hash-bit-reader/build-hash-bit-reader.module.code.ts"
import type { BitWriterState } from "akasha/temper/player/character/build/build-hash/modules/build-hash-bit-writer/build-hash-bit-writer.module.code.ts"
import { writeBits } from "akasha/temper/player/character/build/build-hash/modules/build-hash-bit-writer/build-hash-bit-writer.module.code.ts"
import { recordFromKeys } from "akasha/temper/player/character/build/build-hash/modules/record-from-keys/record-from-keys.module.code.ts"
import type { CharacterState } from "akasha/temper/player/character/build/modules/build-types/build-types.module.code.ts"
import type { SkillId } from "akasha/temper/player/character/skill/modules/character-skills/character-skills.module.code.ts"

export function encodeSkills(writer: BitWriterState, build: CharacterState): undefined {
  const bits = skillBits()
  const slotIds = skillSlots().ids
  for (const slotId of slotIds) {
    const skillId = build.skills["primary-skill-bar"][slotId]
    writeBits(writer, getSkillIndex(skillId), bits)
  }

  for (const slotId of slotIds) {
    const skillId = build.skills["backup-skill-bar"][slotId]
    writeBits(writer, getSkillIndex(skillId), bits)
  }
}

const FIRST_MINOR_WITH_PASSIVE_RANKS = 9

const PASSIVE_RANK_BITS = 4

const NO_RANK = 0

const HIGHEST_RANK = (1 << PASSIVE_RANK_BITS) - 1

export function encodePassives(writer: BitWriterState, build: CharacterState): undefined {
  const purchased = new Set(build.passives)
  const ids = passiveSkillIds()
  for (const passiveId of ids) {
    writeBits(writer, purchased.has(passiveId) ? 1 : 0, 1)
  }
  for (const passiveId of ids) {
    if (!purchased.has(passiveId)) continue
    const rank = build.passiveRanks?.[passiveId] ?? NO_RANK
    writeBits(writer, Math.min(Math.max(rank, NO_RANK), HIGHEST_RANK), PASSIVE_RANK_BITS)
  }
}

const FIRST_MINOR_WITHOUT_RANK_PAGES = 10

const RANK_PAGE_OF = new Map(RANK_PAGES_BEFORE_MINOR_10.map((page) => [page.id, page]))

function withRankPages(
  current: readonly string[],
  placeOf: (page: RankPage) => number
): readonly string[] {
  const placed = current.filter((id) => !RANK_PAGE_OF.has(id))
  const pages = [...RANK_PAGES_BEFORE_MINOR_10].sort((one, other) => placeOf(one) - placeOf(other))
  for (const page of pages) placed.splice(placeOf(page), 0, page.id)
  return placed
}

type Places = { readonly count: number; readonly idOf: (index: number) => SkillId }

function placesOf(ids: readonly string[]): Places {
  return { count: ids.length, idOf: (index) => ids[index] ?? requireFirst(ids) }
}

function skillPlacesAt(minorVersion: number): Places {
  if (minorVersion >= FIRST_MINOR_WITHOUT_RANK_PAGES) {
    return { count: characterSkillIds().length, idOf: getSkillId }
  }
  return placesOf(withRankPages(characterSkillIds(), (page) => page.skillPlace))
}

function passivePlacesAt(minorVersion: number): Places {
  if (minorVersion >= FIRST_MINOR_WITHOUT_RANK_PAGES) {
    return { count: passiveSkillIds().length, idOf: getPassiveSkillId }
  }
  return placesOf(withRankPages(passiveSkillIds(), (page) => page.passivePlace))
}

export function decodeSkills(reader: BitReaderState, minorVersion: number): CharacterState["skills"] {
  const places = skillPlacesAt(minorVersion)
  const bits = bitsNeeded(places.count)
  const slotIds = skillSlots().ids
  const read = (): SkillId => places.idOf(readBits(reader, bits))
  const primarySkillBar = recordFromKeys(slotIds, read)
  const backupSkillBar = recordFromKeys(slotIds, read)

  return {
    "primary-skill-bar": primarySkillBar,
    "backup-skill-bar": backupSkillBar,
  }
}

type DecodedPassives = Pick<CharacterState, "passives" | "passiveRanks">

export function decodePassives(reader: BitReaderState, minorVersion: number): DecodedPassives {
  const places = passivePlacesAt(minorVersion)
  const held: SkillId[] = []
  for (let place = 0; place < places.count; place++) {
    if (readBits(reader, 1) === 1) held.push(places.idOf(place))
  }
  const stated = held.map(() =>
    minorVersion < FIRST_MINOR_WITH_PASSIVE_RANKS ? NO_RANK : readBits(reader, PASSIVE_RANK_BITS)
  )
  const passives: SkillId[] = []
  const passiveRanks: Partial<Record<SkillId, number>> = {}
  for (const [at, id] of held.entries()) {
    const page = RANK_PAGE_OF.get(id)
    const passiveId = page?.base ?? id
    if (!passives.includes(passiveId)) passives.push(passiveId)
    const rank = (stated[at] ?? NO_RANK) !== NO_RANK ? stated[at] : page?.rank
    if (rank !== undefined && rank !== null && rank !== NO_RANK) passiveRanks[passiveId] = rank
  }
  return Object.keys(passiveRanks).length === 0 ? { passives } : { passives, passiveRanks }
}
