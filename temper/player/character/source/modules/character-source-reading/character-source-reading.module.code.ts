import {
  esoPlusOf,
  holdEsoPlus,
} from "akasha/temper/player/character/source/modules/eso-plus-source/eso-plus-source.module.code.ts"
import { temperEsoPlus } from "akasha/temper/player/character/source/temper-eso-plus/temper-eso-plus.page-type.ts"

type Row = Readonly<Record<string, unknown>>

type Read = readonly [string, readonly string[]]

const ESO_PLUS_FIELDS: readonly string[] = ["slug", "title", "description", "effects", "hashPlace"]

export const CHARACTER_SOURCE_READS: readonly Read[] = [[temperEsoPlus.slug, ESO_PLUS_FIELDS]]

export function holdCharacterSources(rowsOf: (pageTypeSlug: string) => Iterable<Row>): undefined {
  holdEsoPlus(esoPlusOf(rowsOf(temperEsoPlus.slug)))
}
