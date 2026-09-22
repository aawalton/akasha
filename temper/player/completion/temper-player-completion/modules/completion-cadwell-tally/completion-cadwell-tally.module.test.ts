import { expect, test } from "bun:test"
import type { CadwellProgress } from "akasha/temper/player/completion/modules/completion-progress/completion-progress.module.code.ts"
import { countCadwell } from "akasha/temper/player/completion/temper-player-completion/modules/completion-cadwell-tally/completion-cadwell-tally.module.code.ts"

function poi(name: string, completed: boolean) {
  return { name, openingText: "", closingText: "", order: 1, discovered: true, completed }
}

const CADWELL: CadwellProgress = {
  progressionLevel: 2,
  levels: {
    0: {
      zones: {
        1: {
          name: "Auridon",
          description: "",
          order: 1,
          pois: { 1: poi("Vulkhel Guard", true), 2: poi("Skywatch", false) },
        },
        2: {
          name: "Grahtwood",
          description: "",
          order: 2,
          pois: { 1: poi("Elden Root", true) },
        },
      },
    },
    1: {
      zones: {
        1: {
          name: "Deshaan",
          description: "",
          order: 1,
          pois: { 1: poi("Mournhold", true) },
        },
      },
    },
  },
}

test("a character with no almanac record is counted as nothing rather than as none done", () => {
  expect(countCadwell(undefined)).toBeUndefined()
})

test("every stop across every level is counted where no path is named", () => {
  expect(countCadwell(CADWELL)).toEqual({ current: 3, total: 4 })
})

test("a path naming a level counts the stops of that level alone", () => {
  expect(countCadwell(CADWELL, [0])).toEqual({ current: 2, total: 3 })
  expect(countCadwell(CADWELL, [1])).toEqual({ current: 1, total: 1 })
})

test("a path naming a zone counts the stops of that zone alone", () => {
  expect(countCadwell(CADWELL, [0, 1])).toEqual({ current: 1, total: 2 })
  expect(countCadwell(CADWELL, [0, 2])).toEqual({ current: 1, total: 1 })
})

test("a path naming a level or a zone that is not there is answered with nothing", () => {
  expect(countCadwell(CADWELL, [7])).toBeUndefined()
  expect(countCadwell(CADWELL, [0, 9])).toBeUndefined()
})

test("a level read by the name its path spells counts the same as by its number", () => {
  expect(countCadwell(CADWELL, ["1"])).toEqual({ current: 1, total: 1 })
})
