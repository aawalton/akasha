export const summary = "One-time OAuth consent that mints the read-only Drive refresh token"

import { DRIVE_SCOPES, readDriveOauthAppCredentials } from "@alanwalton/drive-google/env"
import { parseOauthCallbackUrl } from "@alanwalton/drive-google/oauth-callback"
import type { CommandHelp } from "../../../ops/surface.ts"
import { googleOauthConsent } from "../../../lib/google-oauth-consent.ts"
import { parseArgs } from "../../../lib/parse-args.ts"

const REFRESH_TOKEN_VAR = "GOOGLE_DRIVE_OAUTH_REFRESH_TOKEN"

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
    "ops drive auth login",
    "ops drive auth login --callback-url 'http://127.0.0.1:45775/callback?code=...'",
  ],
}

export default async function driveAuthLogin(args: readonly string[]): Promise<void> {
  const parsed = parseArgs(help, args)

  const { clientId, clientSecret } = readDriveOauthAppCredentials()

  await googleOauthConsent({
    callbackParser: parseOauthCallbackUrl,
    scopes: DRIVE_SCOPES,
    clientId,
    clientSecret,
    tokenVar: REFRESH_TOKEN_VAR,
    callbackUrl: parsed.string("--callback-url"),
  })
}
