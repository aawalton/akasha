
import { existsSync, readFileSync } from "node:fs"
import { answeredByOf, peopleStanding } from "./akasha-people.ts"
import { CHAMPIONED_DOMAIN_KEY } from "./domain.ts"
import { parseFrontmatter, textField } from "../../page/frontmatter.ts"
import { pageRelIn } from "../../page/page-types.ts"
import { documentFor, personaIsDefault } from "./seat-resolve.ts"

export const JOINER = "-"

const DEFAULT_ROLE_KEY = "role-slug"

export const FLEX = /^flex-(?:0|[1-9]\d*)$/

export const HANDLER = "handler"

export interface SeatAttributes {
  readonly persona: string | null
  readonly domain: string | null
  readonly role: string | null
}

export const FLEET = "agent"

export function personPrincipals(root: string): readonly string[] {
  return peopleStanding(root).map((one) => one.slug)
}

export function principalsFrom(persons: readonly string[]): readonly string[] {
  return [...persons, FLEET]
}

export function principals(root: string): readonly string[] {
  return principalsFrom(personPrincipals(root))
}

export type Principal = string

export interface NameableSeat {
  readonly attributes: SeatAttributes
  readonly flex: string | null
  readonly principal: Principal | null
}

export interface PersonaDefaults {
  readonly domain: string | null
  readonly role: string | null
}

export function personaDefaultsOf(root: string, persona: string): PersonaDefaults | null {
  const named = documentFor("persona", persona, root)
  const at =
    named === null
      ? `${root}/${pageRelIn(root, "persona", persona)}`
      : `${root}/${named}`
  if (!existsSync(at)) return null
  const frontmatter = parseFrontmatter(readFileSync(at, "utf8"))
  return {
    domain: textField(frontmatter, CHAMPIONED_DOMAIN_KEY),
    role: textField(frontmatter, DEFAULT_ROLE_KEY),
  }
}

export function identityHeardFrom(root: string, person: string): string | null {
  return answeredByOf(root, person)
}

function stated(value: string | null): string | null {
  return value === "" ? null : value
}

function spelling(seat: NameableSeat, root: string): readonly (string | null)[] {
  const persona = stated(seat.attributes.persona)
  const domain = stated(seat.attributes.domain)
  const role = stated(seat.attributes.role)
  if (role === HANDLER) {
    return [domain]
  }
  if (seat.principal === "alan" && persona !== null && !personaIsDefault(root, persona)) {
    return [persona]
  }
  return [domain, role, stated(seat.flex)]
}

export function composeSeatName(seat: NameableSeat, root: string): string | null {
  const { flex } = seat
  if (flex !== null && flex !== "" && !FLEX.test(flex)) return null
  const kept = spelling(seat, root).filter((segment): segment is string => segment !== null)
  return kept.length === 0 ? null : kept.join(JOINER)
}

export function handlerSeatName(person: string, root: string): string {
  const name = composeSeatName(
    {
      attributes: { persona: null, domain: person, role: HANDLER },
      flex: null,
      principal: null,
    },
    root
  )
  if (name === null) throw new Error(`nothing spells the ${HANDLER} seat for '${person}'`)
  return name
}
