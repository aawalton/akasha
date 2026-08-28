import {
  answer,
  answerNamed,
  namedQuery,
  type PageQuery,
  queryNames,
  statesBoth,
  UNREACHED,
} from "./page-query.ts"
import { queryFrom } from "./page-query-fields.ts"
import { whole } from "./page-query-whole.ts"
import { absentSays, bind, composedFrom, isRefused } from "./page-query-bind.ts"
import { pagesNaming } from "./page-query-naming.ts"
import { shapeOf } from "./page-query-shape.ts"
import { asRecord, givenIn, namedSafely, type Said, said } from "./page-query-request.ts"
import type { Roots } from "../../page/page.ts"

export const READ_ROUTE = /^\/page\/([a-z0-9-]+)\/(.+)$/

export const NAMING_ROUTE = /^\/naming\/([a-z0-9-]+)\/(.+)$/

export const SHAPE_ROUTE = /^\/shape\/([a-z0-9-]+)$/

const BOTH =
  "states both a count by and a function; a page query either counts by properties or reduces one"

const COMPOSES =
  "a composed query takes a JSON object naming a `page-type`, and may state `where`, `count-by`, `keys`, `sort-by`, `descending`, `limit`, `offset`, `function` and `target`"

export function answered(roots: Roots, slug: string, params: URLSearchParams): Said {
  const query = namedQuery(roots, slug)
  if (query === null) {
    return said({ error: `no page query is named \`${slug}\``, named: queryNames(roots) }, 404)
  }
  if (statesBoth(query)) {
    return said({ error: `\`${slug}\` ${BOTH}`, slug, query }, 400)
  }
  const got = answerNamed(roots, slug, givenIn(params))
  if (got === null) {
    return said({ error: `\`${query.pageType}\` ${UNREACHED}`, slug, query }, 503)
  }
  if (isRefused(got)) return said({ error: got.refused, slug, query }, 400)
  if (got.absent.length > 0) {
    return said({ error: absentSays(query.pageType, got.absent), slug, query, absent: got.absent }, 400)
  }
  return said(
    {
      slug,
      query,
      n: got.n,
      rows: got.rows,
      groups: got.groups,
      value: got.value,
      over: got.over,
      ...(got.faults.length > 0 ? { faults: got.faults } : {}),
      ...(got.omitted.length > 0 ? { omitted: got.omitted } : {}),
      ...(got.unfound.length > 0 ? { unfound: got.unfound } : {}),
    },
    200
  )
}

function composed(roots: Roots, query: PageQuery): Said {
  if (statesBoth(query)) {
    return said({ error: `this query ${BOTH}`, query }, 400)
  }
  const bound = bind(query, {})
  if (isRefused(bound)) return said({ error: bound.refused, query }, 400)
  const got = answer(roots, bound)
  if (got === null) {
    return said({ error: `\`${query.pageType}\` ${UNREACHED}`, query }, 404)
  }
  if (got.absent.length > 0) {
    return said({ error: absentSays(query.pageType, got.absent), query, absent: got.absent }, 400)
  }
  return said(
    {
      query,
      n: got.n,
      rows: got.rows,
      groups: got.groups,
      value: got.value,
      over: got.over,
      ...(got.faults.length > 0 ? { faults: got.faults } : {}),
      ...(got.omitted.length > 0 ? { omitted: got.omitted } : {}),
      ...(got.unfound.length > 0 ? { unfound: got.unfound } : {}),
    },
    200
  )
}

export function askedFrom(roots: Roots, text: string): Said {
  let parsed: unknown
  try {
    parsed = JSON.parse(text)
  } catch {
    return said({ error: COMPOSES }, 400)
  }
  const body = asRecord(parsed)
  if (body === null) return said({ error: COMPOSES }, 400)
  const query = queryFrom(body)
  if (query === null) return said({ error: COMPOSES }, 400)
  return composed(roots, composedFrom(query, body))
}

function countAsked(params: URLSearchParams, name: string): number | null {
  const stated = params.get(name)
  if (stated === null) return null
  const value = Number(stated)
  return Number.isFinite(value) && value > 0 ? Math.floor(value) : null
}

export function naming(roots: Roots, key: string, rawName: string, params: URLSearchParams): Said {
  const name = namedSafely(rawName)
  if (name === null) {
    return said({ error: `\`${rawName}\` is not a page name this service reads` }, 400)
  }
  const stated = params.get("page-types")
  const holders = stated === null ? null : stated.split(",").filter((one) => one !== "")
  const found = pagesNaming(roots, key, name, holders, countAsked(params, "limit"))
  const n = found.reduce((total, one) => total + one.rows.length, 0)
  return said({ key, name, n, naming: found }, 200)
}

export function shaped(roots: Roots, pageType: string): Said {
  const got = shapeOf(roots, pageType)
  if (got === null) {
    return said({ error: `\`${pageType}\` names no page type any page states`, pageType }, 404)
  }
  return said(got, 200)
}

export function reported(roots: Roots, pageType: string, rawName: string): Said {
  const name = namedSafely(rawName)
  if (name === null) {
    return said({ error: `\`${rawName}\` is not a page name this service reads` }, 400)
  }
  const got = whole(roots, pageType, name)
  if (got === null) {
    return said({ error: `\`${pageType}\` names no page \`${name}\` whose pages are files`, pageType, name }, 404)
  }
  return said(got, 200)
}

