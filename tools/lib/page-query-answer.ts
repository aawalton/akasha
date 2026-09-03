import type { Roots } from "@akasha/pages-system/markdown-page-at"
import { asRecord, givenIn, type Said, said } from "@akasha/pages-system/page-query-request"
import { type PageQuery, UNREACHED } from "@akasha/pages-system/page-query-shape"
import { answer, answerNamed, namedQuery, queryNames, statesBoth } from "./page-query.ts"
import { absentSays, bind, composedFrom, isRefused } from "./page-query-bind.ts"
import { queryFrom } from "./page-query-fields.ts"

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
    return said(
      { error: absentSays(query.pageType, got.absent), slug, query, absent: got.absent },
      400
    )
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
