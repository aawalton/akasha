import type { Roots } from "../../page/page.ts"
import { resolveRoots } from "../../repo/roots/roots.ts"
import type { Fetcher } from "@shared/pages-query"
import type { WriteAct } from "./page-landing-judge.ts"
import { backedTypes } from "./page-query.ts"
import {
  answered,
  askedFrom,
  naming,
  NAMING_ROUTE,
  READ_ROUTE,
  reported,
  SHAPE_ROUTE,
  shaped,
} from "./page-query-answer.ts"
import { written, WRITE_ROUTE } from "./page-query-landing.ts"
import { said, type Said } from "./page-query-request.ts"

const SAYS = "[page-query-in-process]"

const ANSWERS =
  "this answers `/q/<name>?<argument>=<value>`, POST `/q` with a composed query, `/page-types`, " +
  "`/page/<page-type>/<name>`, `/naming/<relation-key>/<name>`, `/shape/<page-type>`, and " +
  "POST `/write|patch|patch-if|patch-state|remove/<page-type>/<name>` and " +
  "`/write-row|patch-row|remove-row/<page-type>/<parent-name>`"

let held: Roots | null = null

function roots(): Roots {
  held ??= resolveRoots()
  return held
}

function sent(answer: Said): Response {
  return new Response(`${JSON.stringify(answer.body)}\n`, {
    status: answer.status,
    headers: { "content-type": "application/json" },
  })
}

function read(at: URL): Said {
  if (at.pathname === "/page-types") return said({ types: backedTypes(roots()) }, 200)
  const named = /^\/q\/([a-z0-9-]+)$/.exec(at.pathname)
  if (named !== null) return answered(roots(), named[1] as string, at.searchParams)
  const namers = NAMING_ROUTE.exec(at.pathname)
  if (namers !== null) {
    return naming(roots(), namers[1] as string, namers[2] as string, at.searchParams)
  }
  const shape = SHAPE_ROUTE.exec(at.pathname)
  if (shape !== null) return shaped(roots(), shape[1] as string)
  const whole = READ_ROUTE.exec(at.pathname)
  if (whole !== null) return reported(roots(), whole[1] as string, whole[2] as string)
  return said({ error: ANSWERS }, 404)
}

async function posted(at: URL, url: string, init: RequestInit): Promise<Said> {
  if (at.pathname === "/q") return askedFrom(roots(), await new Request(url, init).text())
  const wrote = WRITE_ROUTE.exec(at.pathname)
  if (wrote === null) return said({ error: ANSWERS }, 404)
  return written(
    roots(),
    wrote[1] as WriteAct,
    wrote[2] as string,
    wrote[3] as string,
    new Request(url, init),
    SAYS
  )
}

export const pageQueryInProcess: Fetcher = async (url, init) => {
  const at = new URL(url)
  const method = (init.method ?? "GET").toUpperCase()
  return sent(method === "POST" ? await posted(at, url, init) : read(at))
}
