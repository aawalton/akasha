import { fileStemOf } from "@akasha/file-page-identity"
import { isAddressable } from "@akasha/pages-system/checkout-roots"
import type { Roots } from "@akasha/pages-system/markdown-page-at"
import {
  type Carries,
  type Deriver,
  type Row,
  WALK_BOUND,
} from "@akasha/pages-system/page-derive-shape"
import { keptIn, narrowing } from "@akasha/pages-system/page-narrow"
import { diskFileTree } from "../../page/file-tree.ts"
import { slugNamed } from "../../page/page-address.ts"
import { placeOf, scanIn } from "../../page/page-types.ts"
import { declarationsFromFiles } from "../../page/property/declarations.ts"
import type { Property } from "../../page/property/property.ts"
import { NONE, textAt } from "../../page/text/text.ts"
import { akashaValuesAt, isAkashaPage } from "./akasha-page-values.ts"
import { codeValueFor } from "./page-code-values.ts"
import {
  BACK,
  EXPRESSION,
  FROM,
  fallbackOf,
  type Kind,
  kindsIn,
  ROWS,
  TARGET,
} from "./page-declared.ts"
import { backingOver } from "./page-derive-backing.ts"
import { formulasOver } from "./page-derive-formula.ts"
import { foundIn, indexingOver } from "./page-derive-index.ts"
import { noteUnreadable } from "./page-fault.ts"
import {
  BODY,
  type Held,
  type Read,
  valuesIn,
  withLarge,
  withUncommitted,
} from "./page-file-values.ts"
import {
  along,
  listing,
  type Reached as Page,
  type Reaching,
  reducedFrom,
  underivable,
} from "./page-reach.ts"
import { rowsPagesIn } from "./page-rows.ts"

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
  /**
   * Every key some property declares `rows:` on, which is the one kind of key whose written value is
   * not its value.
   *
   * A page with rows beside it states the extension of the file they are in — `sessions: "jsonl"` —
   * because that is what names the file, and never the rows themselves. So a page stating one of
   * these keys has said where to look rather than what was found, and `valueOf` looks rather than
   * answering with the file name. Held as names alone, so the shortcut every other key takes is one
   * `Set.has` and no declaration lookup.
   */
  const rowsNamed = new Set<string>()
  for (const one of bySlug.values()) {
    if (one.rows === null) continue
    rowsNamed.add(one.name)
    if (one.target === null) continue
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
      (why) => faults.add(why)
    ).map((one) => ({ ...one, kind: target }))
  }

  /**
   * One page file read, whichever of the two kinds of page file it is.
   *
   * Nothing else in this deriver asks what a page file is made of. A markdown page is frontmatter and
   * an akasha page is a declared object, and both answer with the same kebab-keyed `Values`, so every
   * reach past this line — the tests, the derived properties, the rows beside a page — is written
   * once and reads both halves.
   */
  const readValuesAt = (root: string, relPath: string): Read | null => {
    if (isAkashaPage(relPath)) {
      const values = akashaValuesAt(root, relPath)
      return values === null ? null : { values }
    }
    const text = textAt(root, relPath)
    return text === null ? null : valuesIn(text, carryBody)
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
        const read = readValuesAt(root, relPath)
        if (read === null) {
          noteUnreadable(faults, repo, relPath, kind)
          continue
        }
        // An akasha page keeps its uncommitted values in a `.uncommitted.ts` beside it and
        // `akashaValuesAt` has already put them back through akasha's own reader. The yaml sidecar
        // `withUncommitted` reads is the markdown half's, and it refuses a path that is not `.md`.
        const held = withLarge(
          isAkashaPage(relPath) ? read : withUncommitted(`${root}/${relPath}`, read),
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

  function* walkPages(kind: string, through: readonly string[]): Generator<Page> {
    if (through.includes(kind)) return
    const chain = [...through, kind]
    yield* filedPagesOf(kind)
    for (const declaration of carriers.get(kind) ?? [])
      for (const parentKind of beneath(declaration.on))
        for (const parent of walkPages(parentKind, chain)) yield* rowsPagesFor(parent, declaration)
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

  const namersFor = (
    declaration: Property,
    depth: number
  ): ReadonlyMap<string, readonly string[]> => {
    const held = namers.get(declaration.slug)
    if (held !== undefined) return held
    const source = declaration.back === null ? undefined : bySlug.get(declaration.back)
    if (source === undefined) {
      faults.add(
        `\`${BACK}\` on \`${declaration.slug}\` names \`${declaration.back}\`, which no property declares`
      )
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
    const stated = written !== undefined && listing(written).length > 0
    // A page states what it holds, and the rows beside it are the one thing it does not: what it
    // states for a `rows:` key is the extension of the file they are in, so answering with it would
    // hand every reader the string `jsonl` where the rows belong. A markdown day states no such key
    // and reaches the rows below; a landed day states `sessions: "jsonl"` and would have stopped
    // here, which is why a landed day rolled up nothing from the nine rows filed beside it.
    if (stated && !rowsNamed.has(key)) return written
    const declaration = declarationFor(page.kind, key)
    if (declaration === null) {
      if (stated) return written
      faults.add(`\`${key}\` is declared by no property on \`${page.kind}\``)
      return null
    }
    if (stated && declaration.rows === null) return written
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
        faults.add(
          `\`${declaration.slug}\` states both \`${FROM}\` and \`${BACK}\`, and a property states one or the other`
        )
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

  /**
   * The keys a page states that name a file of rows rather than hold a value.
   *
   * Reading the rows is asked for — `carryRows` names them, or `carryPages` asks for all of them —
   * because it opens a file for every page. Where they are not asked for, a page that states one
   * answers nothing, the same as a page with no rows beside it: `sessions: "jsonl"` is the name of
   * the file the sessions are in, and handing that out as the sessions gives every reader the string
   * `jsonl` where a list of pages belongs. Nothing is the honest answer to a question not asked.
   */
  const namesRowsFile = (page: Page, key: string): boolean =>
    rowsNamed.has(key) && declarationFor(page.kind, key)?.rows !== null

  const rowOf = (page: Page, derived: ReadonlyMap<string, Property>): Row => {
    const values: Record<string, Held> = { ...page.values }
    for (const key of derived.keys()) values[key] = valueOf(page, key, 0)
    for (const key of Object.keys(page.values)) {
      if (!derived.has(key) && namesRowsFile(page, key)) delete values[key]
    }
    return { at: page.at, values }
  }

  const { isFiled, isHeld, relations, backed } = backingOver(
    kinds,
    declared,
    carriers,
    chainOf,
    (why) => faults.add(why)
  )

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

  return {
    rows,
    one,
    relations,
    backed,
    typeOf,
    attachmentKeys: largeKeys,
    faults: () => [...faults].sort(),
  }
}
