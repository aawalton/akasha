import { temperAlliance } from "akasha/temper/catalog/world/temper-alliance/temper-alliance.page-type.ts"
import {
  alliancesOf,
  holdAlliances,
} from "akasha/temper/player/character/source/modules/alliances/alliances.module.code.ts"
import {
  esoPlusOf,
  holdEsoPlus,
} from "akasha/temper/player/character/source/modules/eso-plus-source/eso-plus-source.module.code.ts"
import {
  holdMundus,
  mundusOf,
} from "akasha/temper/player/character/source/modules/mundus-source/mundus-source.module.code.ts"
import { temperEsoPlus } from "akasha/temper/player/character/source/temper-eso-plus/temper-eso-plus.page-type.ts"
import { temperMundusStone } from "akasha/temper/player/character/source/temper-mundus-stone/temper-mundus-stone.page-type.ts"

type Row = Readonly<Record<string, unknown>>

type Read = readonly [string, readonly string[]]

const ESO_PLUS_FIELDS: readonly string[] = ["slug", "title", "description", "effects", "hashPlace"]

const MUNDUS_FIELDS: readonly string[] = [
  "slug",
  "title",
  "description",
  "esoMundusId",
  "esoIconName",
  "effects",
  "hashPlace",
]

export const CHARACTER_SOURCE_READS: readonly Read[] = [
  [temperEsoPlus.slug, ESO_PLUS_FIELDS],
  [temperMundusStone.slug, MUNDUS_FIELDS],
  [temperAlliance.slug, ["slug", "title", "esoAllianceId", "hashPlace"]],
]

export function holdCharacterSources(rowsOf: (pageTypeSlug: string) => Iterable<Row>): undefined {
  holdEsoPlus(esoPlusOf(rowsOf(temperEsoPlus.slug)))
  holdMundus(mundusOf(rowsOf(temperMundusStone.slug)))
  holdAlliances(alliancesOf(rowsOf(temperAlliance.slug)))
}
