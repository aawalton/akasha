
import { appendFileSync, mkdirSync, readFileSync, writeFileSync } from "node:fs"
import { personOr } from "./akasha-people.ts"
import { forwardOf } from "./email-forward.ts"
import { decide, rulesOf } from "./email-rules.ts"
import type { Rule } from "./email-rules.ts"
import type { Mailbox, Message } from "./gmail.ts"

const STATE_DIR = `${process.env.HOME ?? "/nonexistent"}/.local/state/alan-email`
const STATE_FILE = `${STATE_DIR}/state.json`
const ACTION_LOG = `${STATE_DIR}/actions.jsonl`

interface Claim {
  readonly messageId: string
  readonly rule: string
  readonly actAt?: string
  readonly told?: boolean
  readonly why?: "agent" | "notify"
  readonly from?: string
  readonly subject?: string
}

interface State {
  readonly historyId: string
  readonly claims: readonly Claim[]
}

const EMPTY: State = { historyId: "", claims: [] }

export function readState(): State {
  try {
    return { ...EMPTY, ...(JSON.parse(readFileSync(STATE_FILE, "utf8")) as Partial<State>) }
  } catch {
    return EMPTY
  }
}

function writeState(state: State): void {
  mkdirSync(STATE_DIR, { recursive: true })
  writeFileSync(STATE_FILE, `${JSON.stringify(state, null, 2)}\n`)
}

function record(entry: Record<string, unknown>): void {
  mkdirSync(STATE_DIR, { recursive: true })
  appendFileSync(ACTION_LOG, `${JSON.stringify({ at: new Date().toISOString(), by: "email-worker", ...entry })}\n`)
}

function addressOfPerson(slug: string, root: string): string {
  const person = personOr(root, slug)
  if (person.emailAddress === null) {
    throw new Error(`${slug} carries no email address on ${person.path}`)
  }
  return person.emailAddress
}

export function untoldClaims(): readonly Claim[] {
  return readState().claims.filter((one) => one.actAt === undefined && one.told !== true)
}

export function markTold(messageIds: readonly string[]): void {
  const state = readState()
  writeState({
    ...state,
    claims: state.claims.map((one) => (messageIds.includes(one.messageId) ? { ...one, told: true } : one)),
  })
}

export interface PassReport {
  readonly examined: number
  readonly decisions: readonly string[]
  readonly acted: number
  readonly waiting: number
  readonly unclaimed: number
}

function spelt(rule: Rule): string {
  const forward = rule.forwardToSlug === null ? [] : ["forward"]
  return [...(rule.filing === null ? [] : [rule.filing]), ...forward, ...rule.actions].join("+")
}

export async function carry(rule: Rule, message: Message, box: Mailbox, root: string): Promise<void> {
  if (rule.forwardToSlug !== null) {
    const to = addressOfPerson(rule.forwardToSlug, root)
    await box.send(forwardOf(await box.rawOf(message.id), to, message))
    record({ message: message.id, rule: rule.slug, action: "forward", to })
  }
  if (rule.actions.includes("unsubscribe")) {
    if (message.oneClickUnsubscribe) {
      const url = /<(https?:[^>]+)>/.exec(message.unsubscribe)
      if (url !== null) {
        await fetch(url[1], {
          method: "POST",
          headers: { "Content-Type": "application/x-www-form-urlencoded" },
          body: "List-Unsubscribe=One-Click",
        })
        record({ message: message.id, rule: rule.slug, action: "unsubscribe", url: url[1] })
      }
    } else record({ message: message.id, rule: rule.slug, action: "unsubscribe", taken: false, reason: "no one-click route" })
  }
  if (rule.filing === "archive") {
    await box.modify(message.id, { remove: ["INBOX"] })
    record({ message: message.id, rule: rule.slug, action: "archive" })
  }
  if (rule.filing === "skip") record({ message: message.id, rule: rule.slug, action: "skip" })
}

async function population(box: Mailbox, state: State): Promise<{ ids: readonly string[]; historyId: string }> {
  const profile = await box.profile()
  if (state.historyId !== "") {
    const since = await box.addedSince(state.historyId)
    if (since !== null) return { ids: since.ids, historyId: since.historyId }
  }
  return { ids: await box.inboxIds(), historyId: profile.historyId }
}

export async function onePass(
  person: string,
  root: string,
  box: Mailbox,
  options: { readonly dryRun: boolean }
): Promise<PassReport> {
  const rules = rulesOf(person, root)
  const state = readState()
  const claimed = new Set(state.claims.map((one) => one.messageId))
  const found = await population(box, state)
  const decisions: string[] = []
  const claims: Claim[] = [...state.claims]
  let acted = 0
  let unclaimed = 0
  const now = Date.now()

  for (const claim of state.claims.filter((one) => one.actAt === undefined)) {
    let stillIn = false
    try {
      stillIn = (await box.message(claim.messageId)).labelIds.includes("INBOX")
    } catch {
      stillIn = false
    }
    if (stillIn) continue
    const at = claims.findIndex((one) => one.messageId === claim.messageId)
    if (at !== -1) claims.splice(at, 1)
    if (!options.dryRun) record({ message: claim.messageId, rule: claim.rule, action: "claim-cleared" })
  }

  for (const claim of state.claims) {
    if (claim.actAt === undefined || Date.parse(claim.actAt) > now) continue
    const rule = rules.find((one) => one.slug === claim.rule)
    if (rule === undefined) continue
    if (options.dryRun) {
      decisions.push(`${claim.messageId} → ${rule.slug} (delayed, now due)`)
      continue
    }
    try {
      await carry(rule, await box.message(claim.messageId), box, root)
      acted += 1
      claims.splice(
        claims.findIndex((one) => one.messageId === claim.messageId),
        1
      )
    } catch (error) {
      record({ message: claim.messageId, rule: rule.slug, action: "failed", error: String(error) })
    }
  }

  for (const id of found.ids) {
    if (claimed.has(id)) continue
    let message: Message
    try {
      message = await box.message(id)
    } catch {
      continue
    }
    const rule = decide(rules, message)
    if (rule === null) {
      unclaimed += 1
      decisions.push(`${id} → nothing matched | ${message.from} | ${message.subject.slice(0, 60)}`)
      if (!options.dryRun) record({ message: id, action: "unclaimed", from: message.fromAddress, subject: message.subject })
      continue
    }
    const due = new Date(message.arrivedAt.getTime() + rule.delayMinutes * 60_000)
    const shape =
      rule.kind === "agent" ? "agent" : rule.delayMinutes > 0 && due.getTime() > now ? `waits until ${due.toISOString()}` : spelt(rule)
    decisions.push(`${id} → ${rule.slug} (${shape}) | ${message.from} | ${message.subject.slice(0, 60)}`)
    if (options.dryRun) continue

    if (rule.kind === "agent") {
      claims.push({ messageId: id, rule: rule.slug, from: message.from, subject: message.subject, why: "agent" })
      record({ message: id, rule: rule.slug, action: "claimed", forKind: "agent" })
      continue
    }
    if (rule.actions.includes("notify")) {
      claims.push({ messageId: id, rule: rule.slug, from: message.from, subject: message.subject, why: "notify" })
      record({ message: id, rule: rule.slug, action: "claimed", forKind: "notify" })
    }
    if (due.getTime() > now) {
      claims.push({ messageId: id, rule: rule.slug, actAt: due.toISOString() })
      record({ message: id, rule: rule.slug, action: "claimed", actAt: due.toISOString() })
      continue
    }
    try {
      await carry(rule, message, box, root)
      acted += 1
    } catch (error) {
      record({ message: id, rule: rule.slug, action: "failed", error: String(error) })
    }
  }

  const waiting = claims.filter((one) => one.actAt === undefined)
  if (!options.dryRun) writeState({ historyId: found.historyId, claims })
  return { examined: found.ids.length, decisions, acted, waiting: waiting.length, unclaimed }
}
