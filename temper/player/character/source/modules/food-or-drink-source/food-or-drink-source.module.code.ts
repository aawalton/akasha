import {
  createDataFile,
  type DataFile,
} from "akasha/code/type/narrowing/modules/create-data-file/create-data-file.module.code.ts"
import { parseString } from "akasha/code/type/narrowing/modules/parse-string/parse-string.module.code.ts"
import type { EffectSourceInterface } from "akasha/temper/player/character/formula-framework/modules/effect-source/effect-source.module.code.ts"
import {
  inHashPlaces,
  sourceEffectsOf,
} from "akasha/temper/player/character/source/modules/source-effects-reading/source-effects-reading.module.code.ts"

const CATEGORY = "food-or-drink"

const KINDS = ["food", "drink", "none"] as const

type FoodOrDrinkKind = (typeof KINDS)[number]

interface FoodOrDrinkTemplate extends EffectSourceInterface {
  categoryId: typeof CATEGORY
  subcategoryId: FoodOrDrinkKind
  name: string
  description: string
  itemId: number
  abilityId: number
  icon: string
  level: string
  seconds: number
}

export type FoodOrDrinkId = string

export type FoodOrDrinkSource = FoodOrDrinkTemplate

type FoodsAndDrinks = DataFile<FoodOrDrinkId, FoodOrDrinkSource, FoodOrDrinkKind>

type Row = Readonly<Record<string, unknown>>

const UNREAD =
  "the foods and drinks are read with the skill catalogue, and nothing has read them yet — gate the screen on `SkillCatalogGate`, or await `loadSkillCatalog()` where the work starts"

class FoodOrDrinkUnread extends Error {
  constructor() {
    super(UNREAD)
    this.name = "FoodOrDrinkUnread"
  }
}

function isKind(said: unknown): said is FoodOrDrinkKind {
  return KINDS.some((kind) => kind === said)
}

function placed(row: Row): readonly [number, FoodOrDrinkSource] {
  const at = `the food or drink page \`${String(row.slug)}\``
  if (typeof row.hashPlace !== "number") throw new Error(`${at} states no hash place`)
  if (typeof row.title !== "string") throw new Error(`${at} states no title`)
  if (!isKind(row.foodOrDrinkKind)) throw new Error(`${at} states no kind`)
  if (typeof row.itemId !== "number") throw new Error(`${at} states no item`)
  if (typeof row.abilityId !== "number") throw new Error(`${at} states no game ability`)
  if (typeof row.seconds !== "number") throw new Error(`${at} states no duration`)
  return [
    row.hashPlace,
    {
      id: String(row.slug),
      name: row.title,
      itemId: row.itemId,
      abilityId: row.abilityId,
      icon: parseString(row.icon),
      seconds: row.seconds,
      description: parseString(row.description),
      level: parseString(row.level),
      categoryId: CATEGORY,
      subcategoryId: row.foodOrDrinkKind,
      effects: sourceEffectsOf(row, at),
    },
  ]
}

export function foodOrDrinkOf(pages: Iterable<Row>): FoodsAndDrinks {
  const read = inHashPlaces([...pages].map(placed))
  return createDataFile<FoodOrDrinkSource>()(Object.fromEntries(read.map((one) => [one.id, one])))
}

let held: FoodsAndDrinks | null = null

export function holdFoodOrDrink(read: FoodsAndDrinks): FoodsAndDrinks {
  held = read
  return read
}

export function foodOrDrink(): FoodsAndDrinks {
  if (held === null) throw new FoodOrDrinkUnread()
  return held
}

export function foodOrDrinkAt(id: FoodOrDrinkId): FoodOrDrinkSource {
  const found = foodOrDrink().data[id]
  if (found === undefined) throw new Error(`no food or drink page is \`${id}\``)
  return found
}
