import type { ChampionPointId } from "@temper/game-characters-champion-points/champion-points-source"
import type { CharacterState } from "@temper/game-characters-character/build-types"
import type { BitReaderState } from "../binary-utils"
import { readBits } from "../binary-utils"
import { CHAMPION_POINT_BITS, getChampionPointId } from "./build-codec-indices"

const CP_PASSIVE_COUNT_BITS = 7

export function decodeChampionPoints(reader: BitReaderState): CharacterState["championPoints"] {
  const warfare = decodeCPDiscipline(reader)
  const fitness = decodeCPDiscipline(reader)
  const craft = decodeCPDiscipline(reader)

  return { warfare, fitness, craft }
}

function decodeCPDiscipline(reader: BitReaderState): {
  slotted: readonly ChampionPointId[]
  passive: readonly ChampionPointId[]
} {
  const slotted: ChampionPointId[] = []
  for (let i = 0; i < 4; i++) {
    slotted.push(getChampionPointId(readBits(reader, CHAMPION_POINT_BITS)))
  }

  const passiveCount = readBits(reader, CP_PASSIVE_COUNT_BITS)
  const passive: ChampionPointId[] = []
  for (let i = 0; i < passiveCount; i++) {
    passive.push(getChampionPointId(readBits(reader, CHAMPION_POINT_BITS)))
  }

  return { slotted, passive }
}
