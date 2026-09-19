import type { HandoverSite } from "akasha/alan/harness/handover-rr/modules/handover-site/handover-site.module.code.ts"

export const TEMPER_SITE: HandoverSite = {
  name: "temper",
  origin: "https://tempereso.com",
  sessionKeyEnv: "TEMPER_SESSION_KEY",
  landingPath: "/handover",
  signInPath: "/sign-in",
  homePath: "/home",
}

const CANONICAL_HOST = new URL(TEMPER_SITE.origin).host

export function canonicalUrlFor(request: Request): string | null {
  const asked = new URL(request.url)
  if (asked.host === CANONICAL_HOST) return null
  if (!asked.host.endsWith(`.${CANONICAL_HOST}`)) return null
  return `${TEMPER_SITE.origin}${asked.pathname}${asked.search}`
}
