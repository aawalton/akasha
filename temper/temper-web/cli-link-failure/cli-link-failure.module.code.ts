import { assertNever } from "@akasha/utils-narrow/assert-never"

export type CliLinkFailure =
  | { kind: "unreachable" }
  | { kind: "unreadable-response"; status: number }
  | { kind: "rejected"; serverError: string }
  | { kind: "no-session"; status: number }

export function describeCliLinkFailure(failure: CliLinkFailure): string {
  switch (failure.kind) {
    case "unreachable":
      return "The request never got a response, so nothing was sent to the CLI. That is usually this computer's network connection, though it can also mean Temper itself is unreachable. Try again."
    case "unreadable-response":
      return `Temper answered (HTTP ${failure.status}), but the response was not readable as the JSON this page expects, so no session reached the CLI. That usually means an error page came back instead of data — a problem on Temper's side that retrying is unlikely to fix.`
    case "rejected":
      return `Temper could not mint a session — ${failure.serverError}`
    case "no-session":
      return `Temper answered (HTTP ${failure.status}) without a session and without saying why, so nothing was sent to the CLI. The problem is not your setup.`
    default:
      return assertNever(failure)
  }
}
