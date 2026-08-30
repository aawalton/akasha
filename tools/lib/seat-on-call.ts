
import { pageFlagOf } from "./seat-page-values.ts"

const ON_CALL_PAGE_KEY = "on-call"

export function onCallOf(agent: string): boolean {
  return pageFlagOf(agent, ON_CALL_PAGE_KEY)
}

export function onCallLine(recorded: boolean): string {
  return `  ${"on-call".padEnd(8)} ${recorded ? "stated" : "— none stated"}`
}
