import { AGENT_LAUNCH_OPENED, AGENT_LAUNCH_SPAWNED } from "@akasha/seat-system/supervisor-env"

export const SEAT_MODE_INTERACTIVE = "interactive"

export const SEAT_MODE_HEADLESS = "headless"

export const SEAT_MODES: readonly string[] = [SEAT_MODE_INTERACTIVE, SEAT_MODE_HEADLESS]

export function isSeatMode(value: string): boolean {
  return value === SEAT_MODE_INTERACTIVE || value === SEAT_MODE_HEADLESS
}

export function rowLaunchOf(startMode: string): string {
  return startMode === SEAT_MODE_HEADLESS ? AGENT_LAUNCH_SPAWNED : AGENT_LAUNCH_OPENED
}

export function startModeOfRowLaunch(launch: string | null): string | null {
  if (launch === AGENT_LAUNCH_SPAWNED) return SEAT_MODE_HEADLESS
  if (launch === AGENT_LAUNCH_OPENED) return SEAT_MODE_INTERACTIVE
  return null
}
