import { z } from "zod"

type Env = Readonly<Record<string, string | undefined>>

const TOKEN_SHAPE = /^wt_[0-9a-f]{64}$/

const ABSENT =
  "resolveWatcherToken: TEMPER_WATCHER_TOKEN is not set. The token is kept encrypted in the " +
  "sops file beside its enrolment page and reaches this process through the environment. " +
  "This process mints nothing: a token it invented would not match the hash the server " +
  "verifies against."

const MALFORMED =
  "resolveWatcherToken: TEMPER_WATCHER_TOKEN is not a watcher token. A watcher token is `wt_` " +
  "followed by 64 hex characters."

export function looksLikeWatcherToken(value: string): boolean {
  return TOKEN_SHAPE.test(value)
}

export function resolveWatcherToken(env: Env = process.env): string {
  const stated = z.string().optional().parse(env.TEMPER_WATCHER_TOKEN)
  if (stated === undefined || stated === "") throw new Error(ABSENT)
  const token = stated.trim()
  if (!looksLikeWatcherToken(token)) throw new Error(MALFORMED)
  return token
}
