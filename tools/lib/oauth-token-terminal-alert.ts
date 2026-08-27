
export type TokenTerminalAlertAction = "alert" | "clear-latch" | "none"

export type TokenTerminalAlertInput = {
  readonly refreshTerminal: boolean
  readonly refreshOk: boolean
  readonly accessTokenExpiresAtMs: number | null
  readonly alreadyAlertedAtMs: number | null
  readonly nowMs: number
}

export function decideTokenTerminalAlert(input: TokenTerminalAlertInput): TokenTerminalAlertAction {
  const tokenTerminal =
    input.refreshTerminal &&
    input.accessTokenExpiresAtMs != null &&
    input.accessTokenExpiresAtMs <= input.nowMs
  if (tokenTerminal) {
    return input.alreadyAlertedAtMs == null ? "alert" : "none"
  }
  if (input.refreshOk && input.alreadyAlertedAtMs != null) return "clear-latch"
  return "none"
}
