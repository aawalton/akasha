
export const summary = "One-time OAuth consent that mints the calendar RSVP refresh token"

import {
  CALENDAR_OAUTH_SCOPE,
  readCalendarOauthAppCredentials,
} from "../../../../alanwalton/calendar-google/src/env.ts"
import { parseOauthCallbackUrl } from "../../../../alanwalton/calendar-google/src/oauth-callback.ts"
import type { CommandHelp } from "../../../ops/surface.ts"
import { parseArgs } from "../../../lib/parse-args.ts"
import { googleOauthConsent } from "../../../lib/google-oauth-consent.ts"

const REFRESH_TOKEN_VAR = "GOOGLE_CALENDAR_OAUTH_REFRESH_TOKEN"

export const help: CommandHelp = {
  flags: [
    {
      name: "--callback-url",
      argLabel: "<url>",
      valueShape: "token",
      description:
        "OOB fallback: the full callback URL pasted from the browser when the loopback listener " +
        "isn't reachable. Skips the listener and exchanges the authorization code straight from " +
        "the pasted URL (which carries the exact port, so the redirect_uri matches).",
    },
  ],
  envVars: [
    {
      name: "GOOGLE_GMAIL_OAUTH_CLIENT_ID",
      required: true,
      description: "OAuth client ID (Desktop-app credential, shared with the Gmail OAuth app)",
    },
    {
      name: "GOOGLE_GMAIL_OAUTH_CLIENT_SECRET",
      required: true,
      description: "OAuth client secret (shared with the Gmail OAuth app)",
    },
  ],
  examples: [
    "ops calendar auth login",
    "ops calendar auth login --callback-url 'http://127.0.0.1:45775/callback?code=...'",
  ],
}

export default async function calendarAuthLogin(args: readonly string[]): Promise<void> {
  const parsed = parseArgs(help, args)

  const { clientId, clientSecret } = readCalendarOauthAppCredentials()

  await googleOauthConsent({
    callbackParser: parseOauthCallbackUrl,
    scopes: [CALENDAR_OAUTH_SCOPE],
    clientId,
    clientSecret,
    tokenVar: REFRESH_TOKEN_VAR,
    callbackUrl: parsed.string("--callback-url"),
  })
}
