import { AKASHA, rootFor } from "@akasha/pages-system/checkout-roots"
import type { Roots } from "@akasha/pages-system/markdown-page-at"
import { isRowAct, type WriteAct } from "@akasha/pages-system/page-landing-judge"
import { dropDerivers } from "./deriver-hold.ts"
import { refuseALiveTestWriteIn } from "./live-store-write-guard.ts"
import { reaching, revived } from "./message-reach-write.ts"
import { comparedResponse } from "./page-compare.ts"
import { dropAnswers } from "./page-query-hold.ts"
import { asRecord, isValue, namedSafely, type Said, said } from "./page-query-request.ts"
import { patchRows, removeRow, writeRows } from "./page-rows-write.ts"
import { patchPage, patchState, removePage, type Written, writePage } from "./page-write.ts"
import type { Value } from "./page-write-values.ts"

export const WRITE_ROUTE =
  /^\/(write-row|patch-row|remove-row|write|patch-if|patch-state|patch|remove)\/([a-z0-9-]+)\/(.+)$/

const SLOW_WRITE_MS = 2_000

function landedFor(
  roots: Roots,
  act: WriteAct,
  pageType: string,
  name: string,
  values: Record<string, unknown>,
  writer: string,
  named: string,
  rows: readonly Record<string, unknown>[]
): Written | null {
  if (act === "write")
    return writePage(roots, pageType, name, values as Record<string, Value>, writer)
  if (act === "patch")
    return patchPage(roots, pageType, name, values as Record<string, Value>, writer)
  if (act === "remove") return removePage(roots, pageType, name, writer)
  if (act === "write-row") return writeRows(roots, pageType, name, rows, writer)
  if (act === "patch-row") return patchRows(roots, pageType, name, rows, writer)
  if (act === "remove-row") return removeRow(roots, pageType, name, named, writer)
  const at = patchState(roots, pageType, name, values)
  return at === null ? null : { ...at, commitError: null }
}

export async function written(
  roots: Roots,
  act: WriteAct,
  pageType: string,
  rawName: string,
  request: Request,
  says: string
): Promise<Said> {
  refuseALiveTestWriteIn(roots, `${act} ${pageType}/${rawName}`, "`written`")
  const began = Date.now()
  const spent: string[] = []
  let mark = began
  const stage = (what: string): undefined => {
    const now = Date.now()
    spent.push(`${what} ${now - mark}ms`)
    mark = now
  }
  try {
    return await writing(roots, act, pageType, rawName, request, says, stage)
  } finally {
    const took = Date.now() - began
    if (took >= SLOW_WRITE_MS) {
      console.error(`${says} slow ${act} ${pageType}/${rawName} ${took}ms — ${spent.join(" ")}`)
    }
  }
}

async function writing(
  roots: Roots,
  act: WriteAct,
  pageType: string,
  rawName: string,
  request: Request,
  says: string,
  stage: (what: string) => undefined
): Promise<Said> {
  const asked = namedSafely(rawName)
  if (asked === null) {
    return said({ error: `\`${rawName}\` is not a page name this service writes` }, 400)
  }
  let name = asked
  let parsed: unknown
  try {
    parsed = await request.json()
  } catch {
    return said(
      { error: "a write takes a JSON body naming a `writer` and, except for remove, `values`" },
      400
    )
  }
  stage("parse")
  const body = asRecord(parsed)
  const writer = body?.["writer"]
  if (typeof writer !== "string" || writer.trim() === "") {
    return said(
      { error: "a write names its `writer`, which lands in the commit that records it" },
      400
    )
  }
  const values = asRecord(body?.["values"] ?? null) ?? {}
  const listed = body?.["rows"]
  const rows = Array.isArray(listed)
    ? listed
        .map((one) => asRecord(one))
        .filter((one): one is Record<string, unknown> => one !== null)
    : null
  const namedRow = body?.["named"]
  if (act === "remove-row") {
    if (typeof namedRow !== "string" || namedRow.trim() === "") {
      return said(
        {
          error:
            "`remove-row` names the row it takes away in `named`, which is that row's own `slug` or `id`",
        },
        400
      )
    }
  } else if (isRowAct(act)) {
    if (rows === null && asRecord(body?.["values"] ?? null) === null) {
      return said(
        {
          error: `\`${act}\` takes \`values\`, one row to land, or \`rows\`, a list of them landed in one pass`,
        },
        400
      )
    }
    if (rows !== null && Array.isArray(listed) && rows.length !== listed.length) {
      return said({ error: `\`rows\` holds what is not an object, so it names no row` }, 400)
    }
  } else if (act !== "remove") {
    if (asRecord(body?.["values"] ?? null) === null) {
      return said({ error: `\`${act}\` takes \`values\`, an object of properties to land` }, 400)
    }
    if (act !== "patch-state" && !isRowAct(act)) {
      const badKey = Object.keys(values).find((key) => !isValue(values[key]))
      if (badKey !== undefined) {
        return said(
          {
            error: `\`${badKey}\` holds what no frontmatter value can: a string, number, boolean, or array of strings`,
          },
          400
        )
      }
    }
  }
  const reached = await reaching(rootFor(roots, AKASHA), act, pageType, name, values)
  stage("reach")
  if (reached.kind === "refused") {
    return said({ error: reached.reason, pageType, name }, reached.status)
  }
  if (reached.kind === "reached") {
    name = reached.at.name
    values.to = reached.at.to
  }
  if (act === "patch-if") {
    const answer = comparedResponse(roots, pageType, name, body, values, writer.trim())
    return said(answer.body, answer.status)
  }
  const named = typeof namedRow === "string" ? namedRow.trim() : ""
  const landed = landedFor(
    roots,
    act,
    pageType,
    name,
    values,
    writer.trim(),
    named,
    rows ?? [values]
  )
  stage("land")
  if (landed === null) {
    const why = isRowAct(act)
      ? `\`${pageType}\` is no page type this service holds in another page's rows`
      : `\`${pageType}\` is not a page type this service writes`
    return said({ error: why }, 404)
  }
  if (landed.refused !== undefined) {
    return said(
      {
        error: `the gates refused what this \`${act}\` would land:\n${landed.refused}`,
        pageType,
        name,
      },
      400
    )
  }
  if (landed.absent !== undefined) {
    return said({ error: landed.absent, pageType, name, at: landed.relPath }, 404)
  }
  if (landed.commitError !== null) {
    return said(
      {
        error: `the write landed at ${landed.relPath} but its commit did not: ${landed.commitError}`,
        at: landed.relPath,
      },
      500
    )
  }
  const unwoken = await revived(reached, landed.relPath)
  stage("revive")
  if (unwoken !== null) console.error(`${says} ${unwoken}`)
  const took = landed.took === undefined ? {} : { took: landed.took }
  dropDerivers()
  dropAnswers()
  return said({ ok: true, act, pageType, name, at: landed.relPath, ...took }, 200)
}
