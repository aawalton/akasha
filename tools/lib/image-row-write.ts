import { coverUrl } from "@shared/pages-url/cover"
import { resolveRoots } from "../../repo/roots/roots"
import { operationalError } from "./exit.ts"
import { seaweedFSObjectStoreFromEnv } from "./object-store.ts"
import { imageObjectKey } from "./object-store-keys"
import { patchRow, writeRow } from "./page-rows-write.ts"

export const GENERATION_LOG = "alan"

export function rowValuesOf(
  properties: Readonly<Record<string, unknown>>
): Record<string, unknown> {
  const values: Record<string, unknown> = {}
  for (const [key, value] of Object.entries(properties)) {
    if (key === "userId") continue
    values[key.replace(/([a-z0-9])([A-Z])/g, "$1-$2").toLowerCase()] = value
  }
  return values
}

export async function createMediaRow(
  pageTypeSlug: string,
  properties: Readonly<Record<string, unknown>>,
  writer: string
): Promise<{ readonly id: string }> {
  const id = Bun.randomUUIDv7()
  const landed = writeRow(
    resolveRoots(),
    pageTypeSlug,
    GENERATION_LOG,
    { id, ...rowValuesOf(properties) },
    writer
  )
  if (landed === null) {
    throw operationalError(`\`${pageTypeSlug}\` names no page type another page holds in rows`)
  }
  return { id }
}

export async function publishRowCover(
  args: {
    readonly pageId: string
    readonly pageTypeSlug: string
    readonly bytes: Uint8Array
  },
  writer: string
): Promise<{ readonly page: string; readonly key: string; readonly cover: string }> {
  const store = seaweedFSObjectStoreFromEnv()
  if (store === null) {
    throw operationalError(
      "object store not configured — set SEAWEEDFS_S3_ENDPOINT / SEAWEEDFS_BUCKET / SEAWEEDFS_ACCESS_KEY / SEAWEEDFS_SECRET_KEY"
    )
  }
  const key = imageObjectKey(args.pageId)
  const cover = coverUrl(args.pageId)
  await store.put(key, new Uint8Array(args.bytes))
  const patched = patchRow(
    resolveRoots(),
    args.pageTypeSlug,
    GENERATION_LOG,
    { id: args.pageId, cover },
    writer
  )
  if (patched === null) {
    throw operationalError(`\`${args.pageTypeSlug}\` names no page type another page holds in rows`)
  }
  return { page: args.pageId, key, cover }
}
