import { slugStem } from "akasha/page/url/modules/page-href/page-href.module.code.ts"

const TAG_LENGTH = 12
const STEM_LENGTH = 80
const FALLBACK_STEM = "build"
const FNV_OFFSET = 0xcbf29ce484222325n
const FNV_PRIME = 0x100000001b3n
const WORD = 0xffffffffffffffffn

function tagOf(key: string): string {
  let hash = FNV_OFFSET
  for (const byte of new TextEncoder().encode(key)) {
    hash = ((hash ^ BigInt(byte)) * FNV_PRIME) & WORD
  }
  return hash.toString(16).padStart(16, "0").slice(0, TAG_LENGTH)
}

export function buildSlug(name: string, key: string): string {
  const stem = slugStem(name).slice(0, STEM_LENGTH).replace(/-+$/, "")
  const start = /^[a-z]/.test(stem) ? stem : FALLBACK_STEM
  return `${start}-${tagOf(key)}`
}
