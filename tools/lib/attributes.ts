
import { slugNamed } from "../../page/page-address.ts"
import { pageTextOf, pageValuesOf } from "./seat-page-values.ts"
import { seatPageForAgent } from "./seat-presence-read.ts"

export const ATTRIBUTES = ["persona", "domain", "role"] as const

export const ASSIGNMENTS = ["initiative", "errand", "on-call"] as const

export const CHARTER = ["flex"] as const

export const DECLARATIONS = [...ATTRIBUTES, ...ASSIGNMENTS, ...CHARTER] as const

export type AttributeKey = (typeof ATTRIBUTES)[number]

export type AssignmentKey = (typeof ASSIGNMENTS)[number]

export type Declaration = (typeof DECLARATIONS)[number]

export type Claimant = Declaration | "mode" | "principal"

export interface Attribute {
  readonly slug: string
}

export type Attributes = { readonly [K in AttributeKey]?: Attribute }

export const MODES = ["interactive", "headless"] as const

export type Mode = (typeof MODES)[number]

export interface ModeRecord {
  readonly value: Mode
}

const START_MODE_KEY = "start-mode"

function attributeOf(value: unknown): Attribute | null {
  if (value === null || typeof value !== "object" || Array.isArray(value)) return null
  const { slug } = value as { slug?: unknown }
  if (typeof slug !== "string" || slug === "") return null
  return { slug }
}

function onThePage(agent: string): Attributes {
  const values = pageValuesOf(agent)
  if (values === null) return {}
  const out: { -readonly [K in AttributeKey]?: Attribute } = {}
  for (const key of ATTRIBUTES) {
    const slug = values[`${key}-slug`]
    if (typeof slug === "string" && slug !== "") out[key] = { slug: slugNamed(slug) }
  }
  return out
}

export function attributesOf(agent: string): Attributes {
  return onThePage(agent)
}

export function ownAttributesOf(agent: string): Attributes {
  return seatPageForAgent(agent) === null ? {} : onThePage(agent)
}

export function modeOf(agent: string): Mode {
  return recordedModeOf(agent)?.value ?? "headless"
}

export function recordedModeOf(agent: string): ModeRecord | null {
  const held = pageTextOf(agent, START_MODE_KEY)
  return held !== null && MODES.includes(held as Mode) ? { value: held as Mode } : null
}
