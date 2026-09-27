import type { MetricEffect } from "akasha/temper/player/character/formula-framework/modules/effect/effect.module.code.ts"
import type { EffectSourceInterface } from "akasha/temper/player/character/formula-framework/modules/effect-source/effect-source.module.code.ts"

const CATEGORY = "attributes"

interface Attribute {
  id: string
  name: string
  metricId: string
  effectValuePerPoint: number
}

interface AttributeSource extends EffectSourceInterface {
  categoryId: typeof CATEGORY
  name: string
  count: number
  effects: readonly MetricEffect[]
}

type Attributes = ReadonlyMap<string, Attribute>

type Row = Readonly<Record<string, unknown>>

const UNREAD =
  "the attributes are read with the skill catalogue, and nothing has read them yet — gate the screen on `SkillCatalogGate`, or await `loadSkillCatalog()` where the work starts"

class AttributesUnread extends Error {
  constructor() {
    super(UNREAD)
    this.name = "AttributesUnread"
  }
}

function attributeOf(row: Row): Attribute {
  const at = `the attribute page \`${String(row.slug)}\``
  if (typeof row.title !== "string") throw new Error(`${at} states no title`)
  if (typeof row.metric !== "string") throw new Error(`${at} states no stat`)
  if (typeof row.value !== "number") throw new Error(`${at} states no value`)
  return {
    id: String(row.slug),
    name: row.title,
    metricId: row.metric.slice(row.metric.lastIndexOf("/") + 1),
    effectValuePerPoint: row.value,
  }
}

export function attributesOf(pages: Iterable<Row>): Attributes {
  return new Map([...pages].map(attributeOf).map((one) => [one.id, one]))
}

let held: Attributes | null = null

export function holdAttributes(read: Attributes): Attributes {
  held = read
  return read
}

function attributeAt(id: string): Attribute {
  if (held === null) throw new AttributesUnread()
  const found = held.get(id)
  if (found === undefined) throw new Error(`no attribute page is \`${id}\``)
  return found
}

export function createAttributeSource(attributeId: string, count: number): AttributeSource {
  const base = attributeAt(attributeId)
  return {
    id: base.id,
    name: base.name,
    categoryId: CATEGORY,
    count,
    effects: [
      {
        metricId: base.metricId,
        effectType: "integer",
        effectValue: base.effectValuePerPoint,
      },
    ],
  }
}
