import { createHash } from "node:crypto"
import { commitSha40, toShortSha7 } from "../workflow-dsl/ci-identifiers.ts"

export const POD_NAME_MAX_LEN = 63

const POD_NAME_DIGEST_LEN = 8

const SHORT_SHA_LEN = 7

export function sanitizeDnsName(input: string, maxLen: number = POD_NAME_MAX_LEN): string {
  return input
    .toLowerCase()
    .replace(/[^a-z0-9-]/g, "-")
    .replace(/-+/g, "-")
    .slice(0, maxLen)
    .replace(/^-|-$/g, "")
}

export function toShortShaTolerant(sha: string): string {
  try {
    return toShortSha7(commitSha40(sha))
  } catch {
    return sha.slice(0, SHORT_SHA_LEN)
  }
}

export function buildPodName(seq: number, stepName: string, sha: string): string {
  const composed = `pe-${seq}-${stepName}-${toShortShaTolerant(sha)}`
  const full = sanitizeDnsName(composed, composed.length)
  if (full.length <= POD_NAME_MAX_LEN) return full
  const digest = createHash("sha256")
    .update(full)
    .digest("hex")
    .slice(0, POD_NAME_DIGEST_LEN - 1)
  const head = full.slice(0, POD_NAME_MAX_LEN - POD_NAME_DIGEST_LEN).replace(/-$/, "")
  return `${head}-${digest}`
}
