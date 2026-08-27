import type { OAuthEffects } from "../oauth-effects.ts"
import type { OAuthCredential } from "../oauth-types.ts"
import type { PickAccount } from "./account-picker.ts"
import type { Forward } from "./forward.ts"

export type PickPipelineDeps = {
  logPrefix: string
  pickAccount: PickAccount
  getFreshToken: (account: string) => Promise<OAuthCredential | null>
  forward: Forward
  oauth: OAuthEffects
}

export type PickPipelineOutcome =
  | { kind: "served"; response: Response }
  | { kind: "empty-pool"; reason: string; trailDisplay: string }
