import { AKASHA, rootFor } from "../../repo/roots/roots.ts"
import type { Check } from "../lib/check.ts"
import { advise, judge, over } from "../../outcome/outcome"
import { diskFileTree, type FileTree } from "../../page/file-tree.ts"
import { PROPERTY_GLOBS, PROPERTY_KINDS } from "../../page/page-types.ts"
import { PROPERTY_ROOTS, vocabularyFor } from "../../page/property/frontmatter.ts"
import { indexedPaths } from "../../page/property/registry.ts"
import {
  namesIn,
  backReference,
  ruleFor,
  TYPE,
  TYPE_VOCABULARY,
} from "../../page/property/value.ts"
import { blockOf, stringAt } from "../../page/text/text.ts"
import { refusalText } from "../../refusal/refusal.ts"

const NAME = "property-types-bind"

const SHOWN = 12

const ENGINE = "akasha/page/property/frontmatter.ts"

export interface Unbound {
  readonly name: string
  readonly on: readonly string[]
}

export interface Undeclared {
  readonly name: string
  readonly on: string
}

export interface Unread {
  readonly relPath: string
  readonly why: string
}

export interface Bindings {
  readonly names: readonly string[]
  readonly bound: readonly string[]
  readonly unbound: readonly Unbound[]
  readonly undeclared: readonly Undeclared[]
  readonly unread: readonly Unread[]
  readonly properties: number
  readonly why: string | null
}

/**
 * The first few of one list, saying what the rest were.
 *
 * A TRUNCATION NOTICE NAMES ITS OWN LIST. This emitted a bare "… and N more", and a check that
 * shows two lists in one report emitted two of them, so a reader met two unlabelled tails and
 * could not tell which belonged to what. Worse, the summary above counts pages while a refusal
 * list counts lines — several per page — so the two numbers are true of one run and cannot be
 * reconciled. A seat read 373 failures off such a pair on 2026-08-27 and dispatched an agent
 * against them; the real figure was 3.
 */
function first(lines: readonly string[], noun: string): readonly string[] {
  return lines.length > SHOWN
    ? [...lines.slice(0, SHOWN), `… and ${lines.length - SHOWN} more ${noun}`]
    : lines
}

function typed(tree: FileTree): {
  on: ReadonlyMap<string, string[]>
  unread: readonly Unread[]
  properties: number
} {
  const on = new Map<string, string[]>()
  const unread: Unread[] = []
  let properties = 0
  // A PROPERTY DEFINITION STANDS WHERE ITS DOMAIN DOES, NOT UNDER ONE FOLDER. `page-type` says
  // a page type and its property definitions live where their domain lives, and 57 of them do —
  // 41 under `readouts/` and 16 under `graph/`. Globbing the place folder found 2231 of 2288 and
  // reported nothing about the rest, so no `type:` they state was ever checked for binding a
  // rule. The index knows them by kind; the globs are the fallback for a tree with no index.
  for (const relPath of indexedPaths(tree, PROPERTY_KINDS, PROPERTY_GLOBS)) {
    properties += 1
    const text = tree.open(relPath)
    if (text === null) {
      unread.push({ relPath, why: "it could not be read" })
      continue
    }
    const { fm, why } = blockOf(text)
    if (why !== null) {
      unread.push({ relPath, why })
      continue
    }
    const stated = stringAt(fm, TYPE)
    if (stated === null) {
      unread.push({
        relPath,
        why: `it states no \`${TYPE}:\`, so nothing says what its values are`,
      })
      continue
    }
    for (const name of namesIn(stated)) {
      if (backReference(name) !== null) continue
      const leaning = on.get(name)
      if (leaning === undefined) on.set(name, [relPath])
      else leaning.push(relPath)
    }
  }
  return { on, unread, properties }
}

export function bindings(tree: FileTree): Bindings {
  const vocabulary = vocabularyFor(tree)
  const { on, unread, properties } = typed(tree)
  const empty = { names: [], bound: [], unbound: [], undeclared: [], unread, properties }
  if (vocabulary.names === null) return { ...empty, why: vocabulary.why }

  const declared = vocabulary.names
  const names = [...new Set([...declared, ...on.keys()])].sort()
  const bound: string[] = []
  const unbound: Unbound[] = []
  const undeclared: Undeclared[] = []

  for (const name of names) {
    const leaning = on.get(name) ?? []
    if (!declared.has(name)) {
      for (const relPath of leaning) undeclared.push({ name, on: relPath })
      continue
    }
    if (ruleFor(name, vocabulary).rule === null) unbound.push({ name, on: leaning })
    else bound.push(name)
  }
  return { names, bound, unbound, undeclared, unread, properties, why: null }
}

export const propertyTypesBind: Check = (repo) => {
  const measured = bindings(diskFileTree(repo.roots))
  const { names, bound, unbound, undeclared, unread, properties, why } = measured

  if (why !== null) {
    return {
      ...judge(NAME, `no type name could be read — ${why}`, [
        refusalText(
          "property-type-vocabulary-unread",
          {
            vocabulary: TYPE_VOCABULARY,
            why,
            count: String(properties),
            root: PROPERTY_ROOTS.join("` or `"),
          },
          rootFor(repo.roots, AKASHA)
        ),
      ]),
      population: over(0, "type name(s)"),
    }
  }

  const bare =
    properties === 0
      ? [
          refusalText(
            "property-definitions-absent",
            { glob: PROPERTY_GLOBS.join("` or `"), count: String(names.length) },
            rootFor(repo.roots, AKASHA)
          ),
        ]
      : []

  const stateTwo = unbound.map((one) =>
    one.on.length === 0
      ? refusalText(
          "property-type-name-unbound-unused",
          { name: one.name, vocabulary: TYPE_VOCABULARY, engine: ENGINE },
          rootFor(repo.roots, AKASHA)
        )
      : refusalText(
          "property-type-name-unbound-used",
          {
            name: one.name,
            vocabulary: TYPE_VOCABULARY,
            engine: ENGINE,
            count: String(one.on.length),
            on: one.on.join(", "),
          },
          rootFor(repo.roots, AKASHA)
        )
  )

  const stateOne = undeclared.map((one) =>
    refusalText(
      "property-type-name-undeclared",
      { path: one.on, name: one.name, vocabulary: TYPE_VOCABULARY },
      rootFor(repo.roots, AKASHA)
    )
  )

  const detail =
    `${bound.length} of ${names.length} type name(s) bind a rule; ` +
    `${unbound.length} \`${TYPE_VOCABULARY}\` declares and ${ENGINE} states no rule for, ` +
    `${undeclared.length} propert(ies) typed against a name \`${TYPE_VOCABULARY}\` declares nowhere — ` +
    `over ${properties} property definition(s), ${unread.length} of which state no type this could read`

  const landable = [
    ...bare,
    ...first(stateOne, "typed against an undeclared name"),
    ...first(
      unread.map((one) => `${one.relPath} — ${one.why}`),
      "unreadable"
    ),
  ]
  const blocked = first(stateTwo, "name(s) binding no rule")

  return {
    ...(landable.length > 0
      ? judge(NAME, detail, [...landable, ...blocked])
      : advise(NAME, detail, blocked)),
    population: over(names.length, "type name(s)"),
  }
}
