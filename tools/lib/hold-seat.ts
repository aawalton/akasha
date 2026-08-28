import { documentsOnDemand } from "./documents-on-demand.ts"
import { slugNamed } from "../../page/page-address.ts"
import { epochOf } from "./epoch.ts"
import { onceInCall } from "../../during-call/during-call.ts"
import { verdictOn } from "./hold-seat-verdict.ts"
import { claimText, listed, movedLead, unreadLead } from "./hold-seat-words.ts"
import {
  ATTRIBUTES,
  type Attribute,
  type Attributes,
  type Claimant,
  type Mode,
  attributesOf,
  modeOf,
} from "./attributes.ts"
import { recordStands } from "./read-record.ts"
import { refusalText } from "../../refusal/refusal.ts"
import { type Roots } from "../../page/page"
import { resolveRoots } from "../../repo/roots/roots"
import { pageTextOf } from "./seat-page-values.ts"
import { defaultFor } from "./seat-resolve.ts"
import { seatAbove } from "./subagent.ts"
import { declaredSeatReading } from "./declared-seat-reading.ts"
import { isMortalPage } from "../page/mortal-page.ts"
import { type SeatDocument, documentNamed } from "./seat-attribute.ts"
import { INITIATIVE_SLUG_KEY } from "./seat-initiative.ts"
import { onCallOf } from "./seat-on-call.ts"
import { principalOf } from "./seat-principal.ts"
import { taskOf } from "./seat-task.ts"

export interface Request {
  readonly agent: string | null
  readonly root: string
}

export type Kind = "unstated" | "read" | "unrecorded" | "unattributed" | "unresolvable" | "missing"

export interface Standing {
  readonly kind: Kind
  readonly detail: string
  readonly refusals: readonly string[]
  readonly notices: readonly string[]
  readonly owed: readonly string[]
}

export function refuses(standing: Standing): boolean {
  return standing.refusals.length > 0
}

export function stoodAside(standing: Standing): boolean {
  return standing.kind === "unattributed" || standing.kind === "unresolvable"
}

function outcome(
  kind: Kind,
  detail: string,
  refusals: readonly string[] = [],
  notices: readonly string[] = [],
  owed: readonly string[] = []
): Standing {
  return { kind, detail, refusals, notices, owed }
}

const DOMAIN_PAGE_KEY = "domain-slug"

interface Needed {
  readonly document: SeatDocument
  readonly claims: { readonly slot: Claimant; readonly slug: string }[]
}

export function subagentStated(agent: string, root: string): Attributes | null {
  if (seatAbove(agent) === null) return null
  const domain = pageTextOf(agent, DOMAIN_PAGE_KEY)
  if (domain === null) return null
  const persona = defaultFor("persona", root)
  const role = defaultFor("role", root)
  if (persona === null || role === null) return null
  return { persona: { slug: persona }, domain: { slug: slugNamed(domain) }, role: { slug: role } }
}

export function seatStanding(request: Request): Standing {
  return onceInCall(`seat:${request.agent ?? ""}:${request.root}`, () => readSeatStanding(request))
}

function readSeatStanding(request: Request): Standing {
  if (request.agent === null) {
    return outcome(
      "unattributed",
      "nothing identifies who is acting — neither AGENT_ID nor a session id is set, so nothing it states can be " +
        "looked up and THIS GUARANTEE IS ABSENT for this agent"
    )
  }
  const docs = documentsOnDemand(request.root)
  const inherited = subagentStated(request.agent, request.root)
  const held = inherited ?? attributesOf(request.agent)
  const attributes = ATTRIBUTES.filter((key) => held[key] !== undefined)
  const task = inherited === null ? taskOf(request.agent) : null
  const initiative = inherited === null ? pageTextOf(request.agent, INITIATIVE_SLUG_KEY) : null
  const slots = attributes.length + (task === null ? 0 : 1) + (initiative === null ? 0 : 1)
  if (slots === 0) {
    return outcome(
      "unstated",
      "this seat states nothing, so there is nothing to read — " +
        "`ops seat set` is what records what a seat is, and its `--help` says what it takes"
    )
  }
  if (!recordStands(request.agent)) {
    return outcome(
      "unrecorded",
      `this seat states ${slots} statement(s) and no page carries a read record for ${request.agent}`,
      [
        refusalText(
          "agent-page-absent",
          {
            agent: request.agent,
            lapsed:
              "nothing can say whether you have read what this seat states it is, and an agent could act as " +
              "something it never read",
          },
          request.root
        ),
      ]
    )
  }

  const needed = new Map<string, Needed>()
  const above = new Map<string, number>()
  const unnamed: string[] = []
  const mode: Mode | null = inherited === null ? modeOf(request.agent) : null
  const take = (
    slot: Claimant,
    slug: string,
    chain: readonly SeatDocument[] | null,
    mustName: boolean
  ): void => {
    if (chain === null) {
      if (mustName) unnamed.push(`no document stands for the ${slot} \`${slug}\``)
      return
    }
    chain.forEach((document, distance) => {
      const at = `${document.root}/${document.relPath}`
      const standing = needed.get(at)
      if (standing === undefined) needed.set(at, { document, claims: [{ slot, slug }] })
      else standing.claims.push({ slot, slug })
      above.set(at, Math.max(above.get(at) ?? 0, distance))
    })
  }
  const roots: Roots = { ...resolveRoots(), akasha: request.root }
  const stated = {
    attributes: held,
    task: task === null ? null : task.value,
    initiative,
    mode,
    onCall: inherited === null && onCallOf(request.agent),
    principal: inherited === null ? (principalOf(request.agent)?.value ?? null) : null,
  }
  for (const one of declaredSeatReading(stated, roots, docs)) {
    take(one.claimant, one.slug, one.documents, ATTRIBUTES.includes(one.claimant as never))
  }
  const ordered = [...needed].sort(
    ([left], [right]) => (above.get(right) ?? 0) - (above.get(left) ?? 0)
  )

  const unread: string[] = []
  const moved: string[] = []
  const gone: string[] = [...unnamed]
  const owed: string[] = []
  let dropped = 0
  for (const [absolute, standing] of ordered) {
    const named = documentNamed(standing.document, request.root)
    const claimed = claimText(standing.claims)
    const verdict = verdictOn(request.agent, claimed, named, absolute)
    if ("gone" in verdict) {
      if (isMortalPage(absolute, roots)) dropped += 1
      else gone.push(`${named} (${claimed})`)
    } else if ("remedy" in verdict) {
      ;(verdict.seen ? moved : unread).push(verdict.remedy)
      owed.push(absolute)
    }
  }
  const documents = needed.size - dropped

  if (gone.length > 0) {
    return outcome(
      "unresolvable",
      `this seat states ${slots} statement(s) and ${gone.length} of the document(s) they name are ` +
        `no longer there (${gone.join("; ")}) — nothing this agent may do while refused would restore them, ` +
        `so THIS GUARANTEE IS ABSENT for it until they are stated again with \`ops seat set\``
    )
  }
  if (unread.length === 0 && moved.length === 0) {
    return outcome(
      "read",
      `${slots} statement(s) over ${documents} document(s); all read in full since each last changed`
    )
  }
  const short = unread.length + moved.length
  return outcome(
    "missing",
    `${slots} statement(s) over ${documents} document(s); ${documents - short} read in full, ` +
      `${unread.length} never read, ${moved.length} moved since`,
    unread.length === 0
      ? []
      : [
          unreadLead(
            request.agent,
            held,
            task,
            epochOf(request.agent),
            unread.length,
            request.root
          ),
          ...listed(unread),
        ],
    moved.length === 0 ? [] : [movedLead(held, task, moved.length, request.root), ...listed(moved)],
    owed
  )
}
