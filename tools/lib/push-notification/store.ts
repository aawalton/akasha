import type { Fetcher } from "@akasha/pages-system-service/calling"
import { deviceTokensFor, dropDeviceToken } from "@akasha/person-system/device-token"

/**
 * Where the pages system service answers on this workstation.
 *
 * `originOf` in `page-calling` reads `PAGES_SERVICE_ORIGIN` and then `PAGE_STORE_ORIGIN`, and where
 * neither is named falls back to the in-cluster name a pod reaches the service by. That name
 * resolves to nothing here, and the notifier's unit is generated from a page carrying no
 * environment, so the loopback the service binds is named here and reached only where the
 * environment names no origin of its own.
 */
export const ON_THE_WORKSTATION = "http://127.0.0.1:8787"

export interface DeviceToken {
  readonly deviceToken: string
  readonly bundleId: string
}

function originNamed(): boolean {
  const said = process.env.PAGES_SERVICE_ORIGIN ?? process.env.PAGE_STORE_ORIGIN
  return said !== undefined && said !== ""
}

export const onTheWorkstation: Fetcher = (url, init) => {
  if (originNamed()) return fetch(url, init)
  const at = new URL(url)
  return fetch(`${ON_THE_WORKSTATION}${at.pathname}${at.search}`, init)
}

export async function listDeviceTokens(userId: string): Promise<readonly DeviceToken[]> {
  const reached = await deviceTokensFor(userId, onTheWorkstation)
  if (!reached.ok) throw new Error(`listDeviceTokens: ${reached.why}`)
  return reached.tokens
}

export async function pruneDeviceToken(deviceToken: string): Promise<void> {
  await dropDeviceToken(deviceToken, onTheWorkstation)
}
