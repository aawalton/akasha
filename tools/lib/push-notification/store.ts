import { askComposed, pageLanding } from "../page-query-client.ts"

export const PAGE_TYPE = "device-token"

const WRITER = "apns-push-notifier"

export interface DeviceToken {
  readonly deviceToken: string
  readonly bundleId: string
}

export async function listDeviceTokens(userId: string): Promise<readonly DeviceToken[]> {
  const asked = await askComposed({
    "page-type": PAGE_TYPE,
    where: { "user-id": { is: userId } },
    keys: ["token", "bundle-id"],
  })
  if (!asked.ok) throw new Error(`listDeviceTokens: ${asked.why}`)
  const tokens: DeviceToken[] = []
  for (const row of asked.rows) {
    const token = row.values.token
    const bundleId = row.values["bundle-id"]
    if (typeof token !== "string" || typeof bundleId !== "string") continue
    tokens.push({ deviceToken: token, bundleId })
  }
  return tokens
}

export async function pruneDeviceToken(deviceToken: string): Promise<void> {
  const gone = await pageLanding("remove", PAGE_TYPE, deviceToken, {}, WRITER)
  if (!gone.ok) throw new Error(`pruneDeviceToken: ${gone.why}`)
}
