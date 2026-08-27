import { z } from "zod"
import { REPOS, resolveRoots } from "../../../repo/roots/roots"
import { createGraph } from "./graph.ts"
import { type Fetcher, graphOrigin } from "./origin.ts"
import type { Edge, Graph, Node } from "./types.ts"

export const ASK_CEILING_MS = 300_000

export const ASK_ATTEMPTS = 4

const IdentitySchema = z.object({
  commit: z.string(),
  repos: z.record(z.string(), z.string()),
})

type AskedIdentity = z.infer<typeof IdentitySchema>

const NodeSchema = z.object({
  type: z.string(),
  repo: z.enum([...REPOS] as [string, ...string[]]),
  key: z.string(),
  id: z.string(),
  attrs: z.record(z.string(), z.unknown()),
  derived: z.record(z.string(), z.unknown()),
})

const EdgeSchema = z.object({
  type: z.string(),
  from: z.string(),
  to: z.string(),
  attrs: z.record(z.string(), z.unknown()),
  derived: z.record(z.string(), z.unknown()),
})

const NodesSchema = z.object({
  identity: IdentitySchema,
  n: z.number(),
  nodes: z.array(NodeSchema),
})

const EdgesSchema = z.object({
  identity: IdentitySchema,
  n: z.number(),
  edges: z.array(EdgeSchema),
})

export type Asked<T> =
  | { readonly ok: true; readonly held: T }
  | { readonly ok: false; readonly why: string }

type Got<T> =
  | { readonly ok: true; readonly identity: AskedIdentity; readonly held: T }
  | { readonly ok: false; readonly why: string }

type Read =
  | { readonly ok: true; readonly body: unknown }
  | { readonly ok: false; readonly why: string }

const refusalIn = async (response: Response): Promise<string> => {
  try {
    const body: unknown = await response.json()
    if (typeof body !== "object" || body === null || !("error" in body)) return ""
    return `: ${String(body.error)}`
  } catch {
    return ""
  }
}

const read = async (url: string, what: string, fetcher: Fetcher): Promise<Read> => {
  let response: Response
  try {
    response = await fetcher(url, {
      headers: { accept: "application/json" },
      signal: AbortSignal.timeout(ASK_CEILING_MS),
    })
  } catch (cause) {
    return {
      ok: false,
      why:
        `\`${what}\` went unasked: ${url} gave no answer within ${ASK_CEILING_MS}ms, which is ` +
        `long enough for the service to build a whole snapshot from cold (${String(cause)})`,
    }
  }
  if (!response.ok) {
    return {
      ok: false,
      why:
        `\`${what}\` went unanswered: the graph service replied ${response.status}` +
        `${await refusalIn(response)}`,
    }
  }
  try {
    return { ok: true, body: await response.json() }
  } catch (cause) {
    return { ok: false, why: `\`${what}\` replied with what is not JSON (${String(cause)})` }
  }
}

const askedUrl = (origin: string, path: string, commit: string): string => {
  const params = new URLSearchParams()
  params.append("commit", commit)
  return `${origin}${path}?${params.toString()}`
}

const unreadable = (what: string, error: z.ZodError): string =>
  `\`${what}\` replied in a shape this reader cannot read: ${error.message}`

const askNodes = async (
  origin: string,
  commit: string,
  fetcher: Fetcher
): Promise<Got<readonly Node[]>> => {
  const what = `nodes at ${commit}`
  const got = await read(askedUrl(origin, "/nodes", commit), what, fetcher)
  if (!got.ok) return got
  const parsed = NodesSchema.safeParse(got.body)
  if (!parsed.success) return { ok: false, why: unreadable(what, parsed.error) }
  return { ok: true, identity: parsed.data.identity, held: parsed.data.nodes }
}

const askEdges = async (
  origin: string,
  commit: string,
  fetcher: Fetcher
): Promise<Got<readonly Edge[]>> => {
  const what = `edges at ${commit}`
  const got = await read(askedUrl(origin, "/edges", commit), what, fetcher)
  if (!got.ok) return got
  const parsed = EdgesSchema.safeParse(got.body)
  if (!parsed.success) return { ok: false, why: unreadable(what, parsed.error) }
  return { ok: true, identity: parsed.data.identity, held: parsed.data.edges }
}

const spellIdentity = (identity: AskedIdentity): string =>
  Object.keys(identity.repos)
    .sort()
    .map((repo) => `${repo}=${identity.repos[repo]}`)
    .join(" ")

export const askGraph = async (commit: string, fetcher: Fetcher = fetch): Promise<Asked<Graph>> => {
  const origin = graphOrigin(resolveRoots().akasha)
  let torn = ""
  for (let attempt = 0; attempt < ASK_ATTEMPTS; attempt += 1) {
    const nodes = await askNodes(origin, commit, fetcher)
    if (!nodes.ok) return nodes
    const edges = await askEdges(origin, commit, fetcher)
    if (!edges.ok) return edges
    const atNodes = spellIdentity(nodes.identity)
    const atEdges = spellIdentity(edges.identity)
    if (atNodes === atEdges) return { ok: true, held: createGraph(nodes.held, edges.held) }
    torn = `nodes stand at ${atNodes} and its edges at ${atEdges}`
  }
  return {
    ok: false,
    why:
      `the graph rebuilt between the two asks on each of ${String(ASK_ATTEMPTS)} attempts, so its ` +
      `${torn}; a graph made of both would hold edges reaching nodes that never stood together`,
  }
}
