import { USER_ID } from "@akasha/supabase-auth/user-id"
import type { ApnsPayload, ApnsSender } from "./apns.ts"
import { type Notification, newestNotificationAt, readNotificationsAfter } from "./feed.ts"
import {
  buildApnsPayload,
  buildSharedApnsPayload,
  notificationFeedRoute,
  type Recipient,
  recipientsFor,
} from "./payload.ts"
import { listDeviceTokens, pruneDeviceToken } from "./store.ts"

export const WORKER_NAME = "apns-push-notifier"

export const LOG = `${WORKER_NAME}:`

export const TICK_MS = 15_000

export const TICK_CEILING_MS = 120_000

export interface NotifierState {
  sentThrough: string
}

export function say(line: string): undefined {
  console.log(`${LOG} ${line}`)
  return undefined
}

function complain(line: string, err: unknown): undefined {
  console.error(`${LOG} ${line}`, err)
  return undefined
}

export async function openState(): Promise<NotifierState> {
  const newest = await newestNotificationAt()
  return { sentThrough: newest ?? new Date().toISOString() }
}

async function fanOut(args: {
  readonly sender: ApnsSender
  readonly recipients: readonly Recipient[]
  readonly payloadFor: (recipient: Recipient) => ApnsPayload
  readonly what: string
  readonly signal: AbortSignal
}): Promise<void> {
  for (const recipient of args.recipients) {
    args.signal.throwIfAborted()
    const tokens = await listDeviceTokens(recipient.userId)
    if (tokens.length === 0) {
      say(`${args.what}: ${recipient.userId} has no device registered; nothing to push`)
      continue
    }
    const payload = args.payloadFor(recipient)
    for (const token of tokens) {
      args.signal.throwIfAborted()
      try {
        const said = await args.sender.send(token.deviceToken, payload, token.bundleId)
        if (said.kind === "prune") {
          await pruneDeviceToken(token.deviceToken)
          say(
            `${args.what}: dropped a dead token on ${token.bundleId} (${said.status} ${said.reason})`
          )
        } else if (said.kind === "error") {
          complain(`${args.what}: ${token.bundleId} refused it (${said.status})`, said.reason)
        } else {
          say(`${args.what}: delivered on ${token.bundleId} (${said.apnsId ?? "no id"})`)
        }
      } catch (err) {
        complain(`${args.what}: the send to ${token.bundleId} threw:`, err)
      }
    }
  }
}

// NO PUSH CARRIES A BADGE, AND NONE REFRESHES ONE. The app-icon badge counted open questions and
// counted nothing else, so with the questions system gone the only number it could carry is zero.
// A counter that can answer nothing but zero is worse than no counter: it reads as a live fact.
// The badge-refresh leg that ran at the end of every tick went with it.
export async function pushNotification(args: {
  readonly notification: Notification
  readonly sender: ApnsSender
  readonly alanUserId: string
  readonly signal: AbortSignal
}): Promise<void> {
  const one = args.notification
  const what = `notification ${one.id}`
  const route = notificationFeedRoute(one.feed)
  await fanOut({
    sender: args.sender,
    recipients: recipientsFor({ ownerUserId: args.alanUserId, kind: one.kind }),
    payloadFor: (recipient) =>
      recipient.ownsNotification
        ? buildApnsPayload({ title: one.title, body: one.body, route })
        : buildSharedApnsPayload({ title: one.title, body: one.body }),
    what,
    signal: args.signal,
  })
}

export interface TickDeps {
  readonly sender: ApnsSender | null
  readonly writer: string
  readonly alanUserId?: string
}

export async function runPushNotifierTick(
  state: NotifierState,
  deps: TickDeps,
  signal: AbortSignal
): Promise<void> {
  const alanUserId = deps.alanUserId ?? USER_ID

  const waiting = await readNotificationsAfter(state.sentThrough)
  const fresh = waiting.filter((one) => one.sentAt > state.sentThrough)
  const sender = deps.sender
  if (sender === null) {
    if (fresh.length > 0) {
      say(`${fresh.length} notification(s) went unpushed: APNs is unprovisioned here`)
    }
    for (const one of fresh) state.sentThrough = one.sentAt
    return
  }
  for (const one of fresh) {
    signal.throwIfAborted()
    try {
      await pushNotification({ notification: one, sender, alanUserId, signal })
    } catch (err) {
      complain(`notification ${one.id}: the push leg threw:`, err)
    }
    state.sentThrough = one.sentAt
  }
}

export async function runBoundedPushNotifierTick(
  state: NotifierState,
  deps: TickDeps,
  signal: AbortSignal
): Promise<void> {
  let timer: ReturnType<typeof setTimeout> | undefined
  const ceiling = new Promise<never>((_resolve, reject) => {
    timer = setTimeout(
      () =>
        reject(
          new Error(
            `${LOG} a tick has not answered inside ${TICK_CEILING_MS}ms while pushing; ending ` +
              "rather than starting a second tick beside it"
          )
        ),
      TICK_CEILING_MS
    )
  })
  try {
    await Promise.race([runPushNotifierTick(state, deps, signal), ceiling])
  } finally {
    if (timer !== undefined) clearTimeout(timer)
  }
}
