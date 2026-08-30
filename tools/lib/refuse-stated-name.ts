import { readSeatName, SLOTS, type Vocabularies } from "./read-seat-name.ts"
import { resolveRoots, targetRoot } from "../../repo/roots/roots"
import { nameVocabularyOf } from "./seat-name-vocabulary.ts"

const ROUTE = "State what this seat is with --persona, --domain, --role and --flex."

function slotsSpelling(name: string): string | null {
  let vocabularies: Vocabularies
  try {
    const named = nameVocabularyOf(targetRoot(resolveRoots()))
    vocabularies = {
      personas: new Set(named.personas),
      domains: new Set(named.domains),
      roles: new Set(named.roles),
      tasks: new Set(named.tasks),
    }
  } catch {
    return null
  }
  const read = readSeatName(name, vocabularies)
  if (!("reading" in read)) return null
  const stated = SLOTS.filter((slot) => read.reading[slot] !== null).map(
    (slot) => `--${slot} ${read.reading[slot] as string}`
  )
  return stated.length === 0 ? null : stated.join(" ")
}

export function refuseStatedName(args: readonly string[]): string | null {
  const first = args[0]
  if (first === undefined || first === "" || first.startsWith("-")) return null
  const spelled = slotsSpelling(first)
  return (
    `this command takes no name: a seat's name SPELLS what the seat is, so it is composed from ` +
    `the attributes rather than typed beside them, and a name that disagrees with them would be ` +
    `two claims about one seat. ` +
    (spelled === null
      ? `'${first}' spells no attributes this tree declares. ${ROUTE}`
      : `'${first}' spells \`${spelled}\` — state that instead, and the name follows.`)
  )
}
