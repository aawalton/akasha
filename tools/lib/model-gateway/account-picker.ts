import type { OAuthEffects } from "../oauth-effects.ts"

export type PickResult = { account: string }

export type PickAccount = (exclude?: string | ReadonlySet<string>) => Promise<PickResult | null>

export function buildAccountPicker(logPrefix: string, oauth: OAuthEffects): PickAccount {
  let pickInflight: Promise<PickResult | null> | null = null
  let lastPicked: string | null = null

  return async function pickAccount(exclude) {
    if (pickInflight != null) return pickInflight
    const excludeSet =
      exclude == null
        ? new Set<string>()
        : typeof exclude === "string"
          ? new Set([exclude])
          : exclude
    const work: Promise<PickResult | null> = (async () => {
      const picked = await oauth.getBestCredential(logPrefix, excludeSet)
      if (!picked) return null
      const account = picked.credential.account
      if (account !== lastPicked) {
        const command = lastPicked == null ? "bind" : "rebind"
        const from = lastPicked != null ? ` from=${lastPicked}` : ""
        const exc = excludeSet.size > 0 ? ` exclude=${[...excludeSet].join(",")}` : ""
        console.log(`${logPrefix} ${command} account=${account}${from}${exc}`)
        lastPicked = account
      }
      return { account }
    })().finally(() => {
      if (pickInflight === work) pickInflight = null
    })
    pickInflight = work
    return work
  }
}
