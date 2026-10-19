import { expect, test } from "bun:test"
import { namedAs } from "akasha/page/modules/address/page-address.module.code.ts"
import { arcanist } from "akasha/temper/catalog/skill/temper-class/pages/arcanist.temper-class.ts"
import { dragonknight } from "akasha/temper/catalog/skill/temper-class/pages/dragonknight.temper-class.ts"
import { noClass } from "akasha/temper/catalog/skill/temper-class/pages/no-class.temper-class.ts"
import { templar } from "akasha/temper/catalog/skill/temper-class/pages/templar.temper-class.ts"
import { temperClass } from "akasha/temper/catalog/skill/temper-class/temper-class.page-type.ts"
import { imperial } from "akasha/temper/catalog/world/temper-race/pages/imperial.temper-race.ts"
import { noRace } from "akasha/temper/catalog/world/temper-race/pages/no-race.temper-race.ts"
import { nord } from "akasha/temper/catalog/world/temper-race/pages/nord.temper-race.ts"
import { temperRace } from "akasha/temper/catalog/world/temper-race/temper-race.page-type.ts"
import {
  raceAndClassNamed,
  raceAndClassOf,
} from "akasha/temper/player/character/temper-account-character/modules/character-race-class/character-race-class.module.code.ts"

function raceAt(slug: string): string {
  return namedAs(temperRace.slug, slug, null)
}

function classAt(slug: string): string {
  return namedAs(temperClass.slug, slug, null)
}

const NAMING = {
  raceOfEso: (esoRaceId: number) => (esoRaceId === imperial.esoRaceId ? imperial.slug : undefined),
  classOfEso: (esoClassId: number) =>
    [dragonknight, arcanist].find((one) => one.esoClassId === esoClassId)?.slug,
}

test("a capture's race and class ids name the race and class pages", () => {
  expect(
    raceAndClassOf({ raceId: imperial.esoRaceId, classId: dragonknight.esoClassId }, NAMING)
  ).toEqual({ race: raceAt(imperial.slug), class: classAt(dragonknight.slug) })
})

test("an id the catalog names no page for leaves that property unwritten", () => {
  expect(raceAndClassOf({ raceId: 99, classId: arcanist.esoClassId }, NAMING)).toEqual({
    class: classAt(arcanist.slug),
  })
})

test("a capture naming no race and no class writes neither", () => {
  expect(raceAndClassOf({}, NAMING)).toEqual({})
})

test("no character is written as having no race or no class", () => {
  expect(raceAndClassNamed(noRace.slug, noClass.slug)).toEqual({})
  expect(raceAndClassNamed(nord.slug, templar.slug)).toEqual({
    race: raceAt(nord.slug),
    class: classAt(templar.slug),
  })
})
