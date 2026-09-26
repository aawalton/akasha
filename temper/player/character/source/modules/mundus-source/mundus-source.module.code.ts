import {
  createDataFile,
  type DataFile,
} from "akasha/code/type/narrowing/modules/create-data-file/create-data-file.module.code.ts"
import { calculateDivinesValue } from "akasha/temper/player/character/characters-equipment/modules/armor-trait-effects/armor-trait-effects.module.code.ts"
import type { ArmorItem } from "akasha/temper/player/character/characters-equipment/modules/item-composites/item-composites.module.code.ts"
import type { MetricEffect } from "akasha/temper/player/character/formula-framework/modules/effect/effect.module.code.ts"
import type { EffectSourceInterface } from "akasha/temper/player/character/formula-framework/modules/effect-source/effect-source.module.code.ts"
import { mapOf } from "akasha/temper/player/character/formula-framework/modules/map-of/map-of.module.code.ts"
import {
  inHashPlaces,
  sourceEffectsOf,
} from "akasha/temper/player/character/source/modules/source-effects-reading/source-effects-reading.module.code.ts"

const CATEGORY = "mundus"

const ICON_FOLDER = "https://esoicons.uesp.net/esoui/art/icons/"

type MundusMetricEffect = MetricEffect & {
  effectType: "integer" | "fractional-change"
}

interface MundusTemplate extends EffectSourceInterface {
  categoryId: typeof CATEGORY
  name: string
  description: string
  esoMundusId: number
  effects: readonly MundusMetricEffect[]
}

export type MundusId = string

export type MundusSource = MundusTemplate

type Mundus = DataFile<MundusId, MundusSource>

type HeldMundus = { readonly stones: Mundus; readonly icons: ReadonlyMap<MundusId, string> }

type Row = Readonly<Record<string, unknown>>

const UNREAD =
  "the mundus stones are read with the skill catalogue, and nothing has read them yet — gate the screen on `SkillCatalogGate`, or await `loadSkillCatalog()` where the work starts"

class MundusUnread extends Error {
  constructor() {
    super(UNREAD)
    this.name = "MundusUnread"
  }
}

function isMundusEffect(effect: unknown): effect is MundusMetricEffect {
  const { effectType } = effect as { effectType?: unknown }
  return effectType === "integer" || effectType === "fractional-change"
}

function placed(row: Row): readonly [number, readonly [MundusSource, string | null]] {
  const at = `the mundus stone page \`${String(row.slug)}\``
  if (typeof row.hashPlace !== "number") throw new Error(`${at} states no hash place`)
  if (typeof row.title !== "string") throw new Error(`${at} states no title`)
  if (typeof row.description !== "string") throw new Error(`${at} states no description`)
  if (typeof row.esoMundusId !== "number") throw new Error(`${at} states no game ability`)
  const effects = sourceEffectsOf(row, at)
  if (!effects.every(isMundusEffect)) throw new Error(`${at} states an effect no stone sums`)
  const stone: MundusSource = {
    id: String(row.slug),
    name: row.title,
    description: row.description,
    categoryId: CATEGORY,
    esoMundusId: row.esoMundusId,
    effects,
  }
  return [row.hashPlace, [stone, typeof row.esoIconName === "string" ? row.esoIconName : null]]
}

export function mundusOf(pages: Iterable<Row>): HeldMundus {
  const read = inHashPlaces([...pages].map(placed))
  const icons = new Map<MundusId, string>()
  for (const [stone, icon] of read) if (icon !== null) icons.set(stone.id, icon)
  return {
    stones: createDataFile<MundusSource>()(Object.fromEntries(read.map(([one]) => [one.id, one]))),
    icons,
  }
}

let held: HeldMundus | null = null

export function holdMundus(read: HeldMundus): HeldMundus {
  held = read
  return read
}

function heldMundus(): HeldMundus {
  if (held === null) throw new MundusUnread()
  return held
}

export function mundus(): Mundus {
  return heldMundus().stones
}

export function mundusAt(id: MundusId): MundusSource {
  const found = mundus().data[id]
  if (found === undefined) throw new Error(`no mundus stone page is \`${id}\``)
  return found
}

export function createMundusSource(
  mundusId: MundusId,
  armorItems: readonly ArmorItem[]
): MundusSource {
  const baseMundus = mundusAt(mundusId)

  const divinesCount = armorItems.filter((piece) => piece.trait === "divines").length

  if (divinesCount === 0) {
    return baseMundus
  }

  const boostedEffects = mapOf(baseMundus.effects, (effect) => {
    const baseValue = effect.effectValue
    return {
      metricId: effect.metricId,
      effectType: effect.effectType,
      effectValue: calculateDivinesValue(baseValue, armorItems),
    } satisfies MundusMetricEffect
  })

  return {
    ...baseMundus,
    effects: boostedEffects,
  }
}

export function getMundusIconUrl(mundusId: MundusId): string | null {
  const filename = heldMundus().icons.get(mundusId)
  if (filename === undefined) return null
  return `${ICON_FOLDER}${filename}.png`
}
