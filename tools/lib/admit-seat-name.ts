
import { JOINER } from "./compose-seat-name.ts"
import { readSeatName, type Vocabularies } from "./read-seat-name.ts"
import type { SeatNameFamily } from "./seat-name-families.ts"

export interface AdmissionVocabularies {
  readonly personas: ReadonlySet<string>
  readonly persons: ReadonlySet<string>
  readonly domains: ReadonlySet<string>
  readonly roles: ReadonlySet<string>
  readonly rolesLongestFirst: readonly string[]
  readonly tasks: ReadonlySet<string>
}

export interface Admission {
  readonly admitted: boolean
  readonly family: SeatNameFamily | null
}

const REFUSED: Admission = { admitted: false, family: null }

function admit(family: SeatNameFamily): Admission {
  return { admitted: true, family }
}

interface SeatedName {
  readonly persona: string
  readonly role: string
}

function splitSeatedName(
  vocabularies: AdmissionVocabularies,
  name: string
): SeatedName | null {
  for (const role of vocabularies.rolesLongestFirst) {
    const suffix = `${JOINER}${role}`
    if (!name.endsWith(suffix)) continue
    const persona = name.slice(0, -suffix.length)
    if (persona === "") continue
    return { persona, role }
  }
  return null
}

function isPerson(vocabularies: AdmissionVocabularies, name: string): boolean {
  if (vocabularies.persons.has(name)) return true
  const led = [...vocabularies.persons].some((person) => name.startsWith(`${person}${JOINER}`))
  if (!led) return false
  const seated = splitSeatedName(vocabularies, name)
  return seated !== null && vocabularies.persons.has(seated.persona)
}

const UNREADABLE = Symbol("unreadable-seat-name")

function slotVocabulariesOf(vocabularies: AdmissionVocabularies): Vocabularies {
  return {
    personas: vocabularies.personas,
    domains: vocabularies.domains,
    roles: vocabularies.roles,
    tasks: vocabularies.tasks,
  }
}

function composedIdentity(
  vocabularies: AdmissionVocabularies,
  name: string
): boolean | typeof UNREADABLE {
  if (name.split(JOINER).length < 2) return false
  const read = readSeatName(name, slotVocabulariesOf(vocabularies))
  if ("unreadable" in read) return read.unreadable.length === 0 ? false : UNREADABLE
  const { persona, domain, role, flex } = read.reading
  const stated = [persona, domain, role, flex].filter((slot) => slot !== null).length
  if (stated === 0) return false
  if (stated === 1 && persona !== null) return false
  return true
}

export function admitSeatName(name: string, vocabularies: AdmissionVocabularies): Admission {
  if (name === "") return REFUSED
  if (isPerson(vocabularies, name)) return admit("person")
  if (vocabularies.personas.has(name)) return admit("bare-persona")
  const composed = composedIdentity(vocabularies, name)
  if (composed === UNREADABLE || composed === false) return REFUSED
  return admit("composed-identity")
}
