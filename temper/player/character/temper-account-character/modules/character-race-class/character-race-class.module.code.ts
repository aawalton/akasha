import { namedAs } from "akasha/page/modules/address/page-address.module.code.ts"
import { noClass } from "akasha/temper/catalog/skill/temper-class/pages/no-class.temper-class.ts"
import { temperClass } from "akasha/temper/catalog/skill/temper-class/temper-class.page-type.ts"
import { noRace } from "akasha/temper/catalog/world/temper-race/pages/no-race.temper-race.ts"
import { temperRace } from "akasha/temper/catalog/world/temper-race/temper-race.page-type.ts"
import {
  classIdOfEso,
  raceIdOfEso,
} from "akasha/temper/player/skill-morph/access/modules/eso-id-helpers/eso-id-helpers.module.code.ts"

interface EsoRaceAndClass {
  readonly raceId?: number | undefined
  readonly classId?: number | undefined
}

export interface RaceAndClassNaming {
  readonly raceOfEso: (esoRaceId: number) => string | undefined
  readonly classOfEso: (esoClassId: number) => string | undefined
}

export interface RaceAndClass {
  readonly race?: string
  readonly class?: string
}

const CATALOG_NAMING: RaceAndClassNaming = { raceOfEso: raceIdOfEso, classOfEso: classIdOfEso }

function slugOf(esoId: number | undefined, named: (esoId: number) => string | undefined) {
  return esoId === undefined ? undefined : named(esoId)
}

export function raceAndClassNamed(
  race: string | undefined,
  klass: string | undefined
): RaceAndClass {
  return {
    ...(race === undefined || race === noRace.slug
      ? {}
      : { race: namedAs(temperRace.slug, race, null) }),
    ...(klass === undefined || klass === noClass.slug
      ? {}
      : { class: namedAs(temperClass.slug, klass, null) }),
  }
}

export function raceAndClassOf(
  capture: EsoRaceAndClass,
  naming: RaceAndClassNaming = CATALOG_NAMING
): RaceAndClass {
  return raceAndClassNamed(
    slugOf(capture.raceId, naming.raceOfEso),
    slugOf(capture.classId, naming.classOfEso)
  )
}
