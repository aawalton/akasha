import { codeValueFor } from "./page-code-values.ts"
import { rowsPagesIn } from "./page-rows.ts"
import {
  BACK,
  ROWS,
  fallbackOf,
  EXPRESSION,
  FROM,
  type Kind,
  kindsIn,
  TARGET,
} from "./page-declared.ts"
import type { Property } from "../../page/property/property.ts"
import { declarationsFromFiles } from "../../page/property/declarations.ts"
import { diskFileTree } from "../../page/file-tree.ts"
import {
  along,
  listing,
  type Reached as Page,
  type Reaching,
  reducedFrom,
  underivable,
} from "./page-reach.ts"
import { noteUnreadable } from "./page-fault.ts"
import { BODY, type Held, valuesIn, withUncommitted, withLarge } from "./page-file-values.ts"
import { placeOf } from "../../page/page-types.ts"
import { NONE, textAt } from "../../page/text/text.ts"
import { fileStemOf } from "../../page/name/name.ts"
import { scanIn } from "../../page/page-types.ts"
import { foundIn, indexingOver } from "./page-derive-index.ts"
import { keptIn, narrowing } from "./page-narrow.ts"
import { slugNamed } from "../../page/page-address.ts"
import { type Roots } from "../../page/page.ts"
import { isAddressable } from "../../repo/roots/roots.ts"
import { backingOver } from "./page-derive-backing.ts"
import { formulasOver } from "./page-derive-formula.ts"
import { type Carries, type Deriver, type Row, WALK_BOUND } from "./page-derive-shape.ts"

const NAMES_NOBODY: ReadonlyMap<string, readonly string[]> = new Map()

export function deriver(roots: Roots, carries: Carries = {}): Deriver {
  const carryBody = carries.body === true
  const carryAttachments = carries.attachment ?? []
  const carryRows = carries.rows ?? []
  const carryPages = carries.pages === true
  const only = narrowing(carries.only)
  const kinds = kindsIn(roots)
  const chains = new Map<string, readonly string[]>()
  const loaded = new Map<string, readonly Page[]>()
  const faults = new Set<string>()

  // THE DECLARATIONS THE WRITE PATH READS, read here too. A second reader of the same property
  // pages stood in this file until it was taken away: it built a record of its own, called the
  // result `Declarations` as this one does, and keyed it by the property's slug where this one
  // keys by the page type. Neither name warned of the other, and which answer a caller got
  // turned on which door it came in by.
  //
  // A FAULT IS A READING THAT DID NOT HAPPEN, never a set that came back empty, so it is raised
  // here rather than left to a caller reading past it.
  const read = declarationsFromFiles(diskFileTree(roots))
  if (read.fault !== null) faults.add(read.fault)
  const declared = new Map<string, Map<string, Property>>()
  const bySlug = new Map<string, Property>()
  for (const [on, standing] of read.bySlug) {
    const held = new Map<string, Property>()
    for (const one of standing) {
      if (!held.has(one.name)) held.set(one.name, one)
      if (!bySlug.has(one.slug)) bySlug.set(one.slug, one)
    }
    declared.set(on, held)
  }

  const carriers = new Map<string, Property[]>()
  for (const one of bySlug.values()) {
    if (one.rows === null || one.target === null) continue
    const held = carriers.get(one.target) ?? []
    held.push(one)
    carriers.set(one.target, held)
  }

  const settled = new Map<string, Held>()
  const namers = new Map<string, ReadonlyMap<string, readonly string[]>>()
  const walking = new Set<string>()
  const naming = new Set<string>()

  const chainOf = (kind: string): readonly string[] => {
    const held = chains.get(kind)
    if (held !== undefined) return held
    const chain: string[] = []
    const seen = new Set<string>()
    let at: string | null = kind
    while (at !== null && at !== NONE && !seen.has(at)) {
      seen.add(at)
      chain.push(at)
      at = kinds.get(at)?.above ?? null
    }
    chains.set(kind, chain)
    return chain
  }

  const workedOut = formulasOver(declared, chainOf, (why) => faults.add(why))

  const declarationFor = (kind: string, key: string): Property | null => {
    for (const one of chainOf(kind)) {
      const found = declared.get(one)?.get(key)
      if (found !== undefined) return found
    }
    return null
  }

  const typeOf = (kind: string, key: string): string | null => {
    const declaration = declarationFor(kind, key)
    if (declaration === null) return null
    return declaration.type === "" ? null : declaration.type
  }

  const largeKeys = (kind: string): readonly string[] => {
    const found = new Set<string>()
    for (const one of chainOf(kind))
      for (const [key, declaration] of declared.get(one) ?? [])
        if (declaration.attachment !== null) found.add(key)
    return [...found].sort()
  }

  const derivedOn = (kind: string): ReadonlyMap<string, Property> => {
    const found = new Map<string, Property>()
    for (const one of chainOf(kind))
      for (const [key, declaration] of declared.get(one) ?? [])
        if (
          !found.has(key) &&
          (declaration.from.length > 0 ||
            declaration.back !== null ||
            fallbackOf(declaration) !== null ||
            declaration.expression !== null ||
            declaration.relation !== null ||
            declaration.reduction !== null ||
            codeValueFor(declaration.slug) !== undefined ||
            (declaration.rows !== null && (carryPages || carryRows.includes(key))))
        )
          found.set(key, declaration)
    return found
  }

  // ONE HOLDER'S ROWS AT A TIME, held no longer than the walk that asked for them. `log-line`
  // keeps three and a half million rows across eleven thousand sidecars, so a map of them keyed by
  // holder would carry every one for as long as the deriver stood. `page-rows.ts` holds the
  // sidecars it has parsed under a bound of its own, so a second walk costs the parse and no more.
  const rowsPagesFor = (parent: Page, declaration: Property): readonly Page[] => {
    const target = declaration.target
    if (target === null) {
      faults.add(
        `\`${declaration.slug}\` states \`${ROWS}: ${declaration.rows}\` and no \`${TARGET}\`, so nothing says what its pages are`
      )
      return []
    }
    return rowsPagesIn(
      roots,
      parent.at,
      parent.named,
      declaration.on,
      declaration.name,
      declaration.uncommitted,
      (why) =>
      faults.add(why)
    ).map((one) => ({ ...one, kind: target }))
  }

  const filedPagesOf = (kind: string): readonly Page[] => {
    const held = loaded.get(kind)
    if (held !== undefined) return held
    const one: Kind | undefined = kinds.get(kind)
    const pages: Page[] = []
    for (const each of one?.filed ?? []) {
      const repo = each.repo
      if (repo === null || !isAddressable(repo)) continue
      const root = roots[repo]
      if (root === undefined) continue
      for (const relPath of scanIn(root, [each.place ?? placeOf(kind)], repo)) {
        const text = textAt(root, relPath)
        const read = text === null ? null : valuesIn(text, carryBody)
        if (read === null) {
          noteUnreadable(faults, repo, relPath, kind)
          continue
        }
        const held = withLarge(
          withUncommitted(`${root}/${relPath}`, read),
          carryAttachments,
          root,
          relPath,
          (key) => declarationFor(kind, key)?.attachment ?? null,
          (key) => declarationFor(kind, key)?.uncommitted ?? false
        )
        const named = typeof held.values.slug === "string" ? held.values.slug : fileStemOf(relPath)
        pages.push({ kind, at: `${repo}:${relPath}`, named, values: held.values })
      }
    }
    loaded.set(kind, pages)
    return pages
  }

  // A PAGE TYPE'S PAGES ARE WALKED, NEVER GATHERED. `log-line` has three and a half million of
  // them, so an array holding them all is gigabytes where a walk holds one sidecar and one page.
  //
  // `through` IS THE CHAIN THIS WALK CAME DOWN, and a page type standing on it already yields
  // nothing: that is how a page type whose rows are held by one beneath it stops rather than
  // recurring. It is passed rather than kept beside the deriver because two walks may be open at
  // once, and a chain kept beside the deriver would read the other walk's steps as its own cycle.
  function* walkPages(kind: string, through: readonly string[]): Generator<Page> {
    if (through.includes(kind)) return
    const chain = [...through, kind]
    yield* filedPagesOf(kind)
    for (const declaration of carriers.get(kind) ?? [])
      for (const parentKind of beneath(declaration.on))
        for (const parent of walkPages(parentKind, chain))
          yield* rowsPagesFor(parent, declaration)
  }

  const pagesOf = (kind: string): Iterable<Page> => ({
    [Symbol.iterator]: () => walkPages(kind, []),
  })

  const beneath = (target: string): readonly string[] => [
    target,
    ...[...kinds.keys()].filter((slug) => slug !== target && chainOf(slug).includes(target)).sort(),
  ]

  const indexFor = indexingOver(beneath, pagesOf)

  const reach: Reaching = {
    declarationFor,
    indexFor,
    valueOf: (page, key, depth) => valueOf(page, key, depth),
    fault: (why) => faults.add(why),
    walking,
    bound: WALK_BOUND,
  }

  const namersFor = (declaration: Property, depth: number): ReadonlyMap<string, readonly string[]> => {
    const held = namers.get(declaration.slug)
    if (held !== undefined) return held
    const source = declaration.back === null ? undefined : bySlug.get(declaration.back)
    if (source === undefined) {
      faults.add(`\`${BACK}\` on \`${declaration.slug}\` names \`${declaration.back}\`, which no property declares`)
      namers.set(declaration.slug, NAMES_NOBODY)
      return NAMES_NOBODY
    }
    if (naming.has(declaration.slug)) return NAMES_NOBODY
    naming.add(declaration.slug)
    const made = new Map<string, string[]>()
    for (const kind of beneath(source.on))
      for (const page of pagesOf(kind))
        for (const named of listing(valueOf(page, source.name, depth + 1))) {
          const at = slugNamed(named)
          const names = made.get(at) ?? []
          names.push(page.named)
          made.set(at, names)
        }
    naming.delete(declaration.slug)
    for (const names of made.values()) names.sort()
    namers.set(declaration.slug, made)
    return made
  }

  const valueOf = (page: Page, key: string, depth: number): Held => {
    const written = page.values[key]
    if (written !== undefined && listing(written).length > 0) return written
    const declaration = declarationFor(page.kind, key)
    if (declaration === null) {
      faults.add(`\`${key}\` is declared by no property on \`${page.kind}\``)
      return null
    }
    const cannot = underivable(declaration, declarationFor)
    if (cannot !== null) {
      faults.add(`\`${declaration.slug}\` ${cannot}`)
      return null
    }
    if (declaration.relation !== null) return reducedFrom(page, declaration, depth, reach)
    if (declaration.expression !== null) {
      const also = [
        ...(declaration.from.length > 0 ? [`\`${FROM}\``] : []),
        ...(declaration.back === null ? [] : [`\`${BACK}\``]),
        ...(codeValueFor(declaration.slug) === undefined ? [] : ["a computation in code"]),
      ]
      if (also.length > 0) {
        faults.add(
          `\`${declaration.slug}\` states an \`${EXPRESSION}\` and ${also.join(" and ")}, and a property is worked out one way or another`
        )
        return null
      }
      const at = `${page.at}#${key}`
      if (walking.has(at) || depth >= WALK_BOUND) return null
      walking.add(at)
      try {
        return workedOut(page.kind, key, declaration, (named) => valueOf(page, named, depth + 1))
      } finally {
        walking.delete(at)
      }
    }
    if (declaration.back !== null) {
      if (declaration.from.length > 0) {
        faults.add(`\`${declaration.slug}\` states both \`${FROM}\` and \`${BACK}\`, and a property states one or the other`)
        return null
      }
      if (depth >= WALK_BOUND) return null
      return namersFor(declaration, depth).get(page.named) ?? fallbackOf(declaration)
    }
    if (declaration.rows !== null) return rowsPagesFor(page, declaration).map((one) => one.named)
    const computed = codeValueFor(declaration.slug)
    if (computed !== undefined) return computed(page, { declared, chainOf })
    if (declaration.from.length === 0) return fallbackOf(declaration)
    const mark = `${page.at}#${key}`
    const answered = settled.get(mark)
    if (answered !== undefined) return answered
    if (walking.has(mark) || depth >= WALK_BOUND) return null
    walking.add(mark)
    let answer: Held = null
    for (const path of declaration.from) {
      answer = along(page, path.split("."), depth + 1, reach)
      if (answer !== null) break
    }
    walking.delete(mark)
    if (answer === null) answer = fallbackOf(declaration)
    settled.set(mark, answer)
    return answer
  }

  const rowOf = (page: Page, derived: ReadonlyMap<string, Property>): Row => {
    if (derived.size === 0) return { at: page.at, values: page.values }
    const values: Record<string, Held> = { ...page.values }
    for (const key of derived.keys()) values[key] = valueOf(page, key, 0)
    return { at: page.at, values }
  }

  const { isFiled, isHeld, relations, backed } = backingOver(kinds, declared, carriers, chainOf, (why) =>
    faults.add(why)
  )

  // WALKING WHAT COMES BACK TWICE WALKS THE PAGES TWICE. A generator handed back bare is walked
  // once and reads as empty ever after, with nothing saying so, which is why this answers an
  // iterable: each time it is asked for a walk it starts a fresh one.
  const rows = (pageType: string): Iterable<Row> | null => {
    if (!isFiled(pageType) && !isHeld(pageType)) return null
    const derived = keptIn(derivedOn(pageType), only)
    return {
      *[Symbol.iterator]() {
        for (const page of pagesOf(pageType)) yield rowOf(page, derived)
      },
    }
  }

  const one = (pageType: string, name: string, slugProperty: string | null = null): Row | null => {
    if (!isFiled(pageType) && !isHeld(pageType)) return null
    const page = foundIn(indexFor(pageType, slugProperty), name)
    return page === undefined ? null : rowOf(page, derivedOn(page.kind))
  }

  return { rows, one, relations, backed, typeOf, attachmentKeys: largeKeys, faults: () => [...faults].sort() }
}
