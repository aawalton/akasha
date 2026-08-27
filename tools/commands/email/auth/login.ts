export const summary = "One-time OAuth consent flow that mints the Gmail refresh token"

import { parseOauthCallbackUrl } from "../../../../alanwalton/email-google/src/oauth-callback.ts"
import type { CommandHelp } from "../../../ops/surface.ts"
import { emailGoogle } from "../../../lib/email-code.ts"
import { googleOauthConsent } from "../../../lib/google-oauth-consent.ts"
import { parseArgs } from "../../../lib/parse-args.ts"

const REFRESH_TOKEN_VAR = "GOOGLE_GMAIL_OAUTH_REFRESH_TOKEN"

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
      description: "OAuth client ID (Desktop-app credential)",
    },
    {
      name: "GOOGLE_GMAIL_OAUTH_CLIENT_SECRET",
      required: true,
      description: "OAuth client secret",
    },
  ],
  examples: [
    "ops email auth login",
    "ops email auth login --callback-url 'http://127.0.0.1:45775/callback?code=...'",
  ],
}

export default async function emailAuthLogin(args: readonly string[]): Promise<void> {
  const parsed = parseArgs(help, args)

  const google = await emailGoogle()
  const { clientId, clientSecret } = google.readGmailOauthAppCredentials()

  await googleOauthConsent({
    callbackParser: parseOauthCallbackUrl,
    scopes: google.GMAIL_SCOPES,
    clientId,
    clientSecret,
    tokenVar: REFRESH_TOKEN_VAR,
    callbackUrl: parsed.string("--callback-url"),
  })
}
