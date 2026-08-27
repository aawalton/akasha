import { z } from "zod"

const TOKEN_SHAPE = /^wt_[0-9a-f]{64}$/

const ABSENT =
  "resolveWatcherToken: TEMPER_WATCHER_TOKEN is not set. The token stands encrypted in the " +
  "sops file beside its enrolment page " +
  "and reaches this process through the environment. This process mints nothing: a token it " +
  "invented would not match the hash the server verifies against."

const MALFORMED =
  "resolveWatcherToken: TEMPER_WATCHER_TOKEN is not a watcher token. A watcher token is `wt_` " +
  "followed by 64 hex characters."

export function resolveWatcherToken(): string {
  const stated = z.string().optional().parse(process.env.TEMPER_WATCHER_TOKEN)
  if (stated === undefined || stated === "") throw new Error(ABSENT)
  const token = stated.trim()
  if (!TOKEN_SHAPE.test(token)) throw new Error(MALFORMED)
  return token
}
