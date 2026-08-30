export const tool = {
  summary: "Print the vocabularies a seat name may be spelled from, read names back, or admit them",
  path: "seat name",
} as const

import { admitSeatName, type AdmissionVocabularies } from "./lib/admit-seat-name.ts"
import { DeadRead } from "./lib/subjects.ts"
import type { Reading, Vocabularies } from "./lib/read-seat-name.ts"
import { JOINER } from "./lib/compose-seat-name.ts"
import { readSeatName, unplaceableSegments } from "./lib/read-seat-name.ts"
import { resolveRoots, targetRoot } from "../repo/roots/roots"
import { seatNameShapes } from "./lib/seat-name-families.ts"
import { nameVocabularyOf } from "./lib/seat-name-vocabulary.ts"

function fail(message: string): never {
  process.stderr.write(`error: ${message}\n`)
  process.exit(1)
}

const HELP = [
  "bun ~/repos/akasha/tools/seat-name.ts — what a seat name may be spelled from, and what one says",
  "",
  "Three modes. Bare it prints the vocabularies; --read divides names; --admits judges them.",
  "",
  "THIS TREE DECLARES WHAT A SEAT NAME MAY BE. Nothing else does. A caller holding its own",
  "copy of a family, a shape or a token list holds a second declaration of one grammar, and no",
  "reader of both can tell which drifted. Ask here instead.",
  "",
  "VOCABULARIES (no flag). Prints JSON on stdout:",
  "  { root, vocabularies: { personas, persons, domains }, separator }",
  "",
  "`separator` is the character a name joins its segments with. It is reported rather than",
  "left for a caller to spell, because a caller building a prefix match over stored names",
  "(`owner LIKE 'amy-%'`) would otherwise hold a second copy of a grammar rule — and one that",
  "looks far too small to be a rule at all, which is exactly why it would never be revisited.",
  "",
  "ALL OF THEM COME FROM ONE READING. A name is checked against all of them together, and this",
  "tree moves several times a day, so vocabularies gathered at five moments can describe five",
  "commits — a name one admits and another refuses, with each internally consistent.",
  "",
  "READING NAMES BACK (--read). Reads a JSON payload on stdin and prints a JSON answer on",
  "stdout. Nothing else reaches stdout, so a caller can parse the whole of it.",
  "",
  "  in:   { \"names\": [ \"<seat name>\", … ] }",
  "  out:  { root, readings: [ { name, reading } | { name, unreadable, unplaceable }, … ] }",
  "",
  "Every name in goes out, in the order it arrived, so a caller may match by position.",
  "`reading` fills the slots persona, domain and flex, each a slug or null",
  "where the name spells none. An unreadable name carries BOTH of its repairs, because they",
  "want different acts and a caller holding one cannot tell them apart: `unreadable` is every",
  "division that tied, whose repair is a repository one — a slug renamed, or a vocabulary it",
  "should not have joined — and `unplaceable` is every segment the repository draws from nothing,",
  "whose repair is a typo. Either may be empty. An unreadable name is an ANSWER rather than a",
  "failure: the call still exits 0.",
  "",
  "ADMITTING NAMES (--admits). Reads the same payload and prints:",
  "",
  "  in:   { \"names\": [ \"<seat name>\", … ] }",
  "  out:  { root, admissions: [ { name, admitted, family }, … ], shapes }",
  "",
  "ADMISSIBILITY AND MEANING ARE DIFFERENT QUESTIONS, which is why this is not --read. --read",
  "answers which SLOTS a name fills; --admits answers which FAMILY admits it, and neither answer",
  "gives the other — `alan` is admitted as `person` and read as `domain=alan`, and `ki-handler`",
  "as `person` and as `domain=ki`.",
  "",
  "`family` is the family that admitted the name, or null where none did. `admitted` is false",
  "exactly when `family` is null. `shapes` is every declared shape, in declaration order, for",
  "a caller that must tell someone what it would have accepted.",
  "",
  "A NAME WHOSE DIVISION TIES IS REFUSED rather than admitted on one of its readings. A tie is",
  "a repository fault — two slugs that collide — and binding a name nobody can read back leaves a",
  "seat nothing can address by what it says.",
  "",
  "A MALFORMED PAYLOAD REFUSES AND SAYS WHICH ENTRY, rather than reading what it could and",
  "returning a short answer. A caller matching answers back to names by position would",
  "silently mis-attribute every name after the one that was dropped.",
  "",
  "Usage:",
  "  bun ~/repos/akasha/tools/seat-name.ts",
  "  echo '{\"names\":[\"amy\"]}' | bun ~/repos/akasha/tools/seat-name.ts --read",
  "  echo '{\"names\":[\"amy\"]}' | bun ~/repos/akasha/tools/seat-name.ts --admits",
  "",
  "  --read      divide the names on stdin rather than printing the vocabularies.",
  "  --admits    say whether each name on stdin is one this system may bind, and under which family.",
  "  --help      this.",
  "",
  "A vocabulary that resolves to nothing EXITS 1 and names the directory it read: an empty",
  "tree is a dead read, never a fleet with no personas. A vocabulary handed back empty",
  "would close its slot to every real value and refuse every name spelling one. That floor",
  "guards --read and --admits too, which is why both read the vocabularies through the same call.",
  "",
  "Environment:",
  "  AKASHA_ROOT  the tree to read (default: the repo this file lives in)",
  "",
  "Exit codes:",
  "  0  every vocabulary was read and printed, or every name named in was answered",
  "  1  an unreadable tree, a vocabulary that held nothing, or a malformed payload",
  "",
].join("\n")

type NameReading =
  | { readonly name: string; readonly reading: Reading }
  | {
      readonly name: string
      readonly unreadable: readonly string[]
      readonly unplaceable: readonly string[]
    }

export class BadPayload extends Error {}

function namesOf(payload: unknown): readonly string[] {
  if (payload === null || typeof payload !== "object") {
    throw new BadPayload(`the payload must be an object, and this one is ${JSON.stringify(payload)}`)
  }
  const names = (payload as { names?: unknown }).names
  if (!Array.isArray(names)) {
    throw new BadPayload(`\`names\` must be an array and is ${JSON.stringify(names)}`)
  }
  return names.map((name, at) => {
    if (typeof name !== "string") {
      throw new BadPayload(`names[${at}] must be a string and is ${JSON.stringify(name)}`)
    }
    return name
  })
}

function slotVocabulariesOf(root: string): Vocabularies {
  const named = nameVocabularyOf(root)
  return {
    personas: new Set(named.personas),
    domains: new Set(named.domains),
  }
}

function admissionVocabulariesOf(root: string): AdmissionVocabularies {
  const named = nameVocabularyOf(root)
  return {
    personas: new Set(named.personas),
    persons: new Set(named.persons),
    domains: new Set(named.domains),
  }
}

export function readPayload(payload: unknown, root: string): string {
  const names = namesOf(payload)
  const vocabularies = slotVocabulariesOf(root)
  const readings: NameReading[] = names.map((name) => {
    const found = readSeatName(name, vocabularies)
    if ("reading" in found) return { name, reading: found.reading }
    return { name, unreadable: found.unreadable, unplaceable: unplaceableSegments(name, vocabularies) }
  })
  return `${JSON.stringify({ root, readings }, null, 2)}\n`
}

export function admitsPayload(payload: unknown, root: string): string {
  const names = namesOf(payload)
  const vocabularies = admissionVocabulariesOf(root)
  const admissions = names.map((name) => ({ name, ...admitSeatName(name, vocabularies) }))
  return `${JSON.stringify({ root, admissions, shapes: seatNameShapes() }, null, 2)}\n`
}

async function payloadOn(mode: string): Promise<unknown> {
  const body = await Bun.stdin.text()
  if (body.trim() === "") {
    fail(
      `nothing arrived on stdin. ${mode} answers about names a caller hands it, so an empty payload is a caller that gathered none rather than a fleet with no seats.`
    )
  }
  try {
    return JSON.parse(body)
  } catch (err) {
    fail(`the payload is not JSON: ${err instanceof Error ? err.message : String(err)}`)
  }
}

function answer(write: () => string): void {
  try {
    process.stdout.write(write())
  } catch (err) {
    if (err instanceof BadPayload) fail(err.message)
    throw err
  }
}

async function main(): Promise<undefined> {
  const argv = process.argv.slice(2)
  if (argv.includes("--help")) {
    process.stdout.write(HELP)
    return
  }
  const root = targetRoot(resolveRoots())
  try {
    if (argv.includes("--read")) {
      const payload = await payloadOn("--read")
      answer(() => readPayload(payload, root))
      return
    }
    if (argv.includes("--admits")) {
      const payload = await payloadOn("--admits")
      answer(() => admitsPayload(payload, root))
      return
    }
    const { personas, persons, domains } = nameVocabularyOf(root)
    const out = {
      root,
      vocabularies: { personas, persons, domains },
      separator: JOINER,
    }
    process.stdout.write(`${JSON.stringify(out, null, 2)}\n`)
  } catch (err) {
    if (err instanceof DeadRead) fail(err.message)
    throw err
  }
}

if (import.meta.main) await main()
