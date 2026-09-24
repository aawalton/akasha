"use client"

import { parseString } from "akasha/code/type/narrowing/modules/parse-string/parse-string.module.code.ts"
import { stringIn } from "akasha/code/type/narrowing/modules/string-in/string-in.module.code.ts"
import { patchPage } from "akasha/page/access/modules/patch/patch.module.code.ts"
import { NEVER_MATCH_VALUE } from "akasha/page/access/modules/sentinels/sentinels.module.code.ts"
import { useUserId } from "akasha/page/ui/modules/use-user-id/use-user-id.module.code.tsx"
import { usePages } from "akasha/page/ui/supabase/modules/use-pages/use-pages.module.code.ts"
import { useOptimisticPatchPage } from "akasha/page/ui/supabase/mutation/modules/use-optimistic-patch-page/use-optimistic-patch-page.module.code.ts"
import { ACCOUNT_PAGE_TYPE } from "akasha/temper/player/character/temper-account/modules/account-address/account-address.module.code.ts"
import type { ProfileMetadata } from "akasha/temper/web/modules/build-metadata/build-metadata.module.code.ts"
import { useCallback, useMemo } from "react"

interface PlayerRow {
  id: string
  userId: string
  handle: string | null
  profileMetadata: ProfileMetadata
}

function parseProfileMetadata(row: Record<string, unknown>): ProfileMetadata {
  const platform =
    row.platform === "PC" || row.platform === "Xbox" || row.platform === "PlayStation"
      ? row.platform
      : undefined
  const server = row.server === "NA" || row.server === "EU" ? row.server : undefined
  return {
    ...(platform != null ? { platform } : {}),
    ...(server != null ? { server } : {}),
  }
}

function pricingValues(meta: ProfileMetadata): Record<string, string> {
  return {
    ...(meta.platform != null ? { platform: meta.platform } : {}),
    ...(meta.server != null ? { server: meta.server } : {}),
  }
}

function mapPlayerRow(row: Record<string, unknown> | undefined): PlayerRow | undefined {
  if (!row) return undefined
  return {
    id: parseString(row.id),
    userId: parseString(row.key),
    handle: stringIn(row.handle),
    profileMetadata: parseProfileMetadata(row),
  }
}

export function usePlayer() {
  const userId = useUserId()
  const { rows, isLoading } = usePages({
    pageTypeSlug: ACCOUNT_PAGE_TYPE,
    where: userId != null ? [{ key: "key", eq: userId }] : [{ key: "key", eq: NEVER_MATCH_VALUE }],
    limit: 1,
  })
  const runPatch = useOptimisticPatchPage((args) => patchPage(args))

  const player = useMemo(() => mapPlayerRow(rows[0]), [rows])
  const handle = player?.handle ?? null
  const profileMetadata: ProfileMetadata = player?.profileMetadata ?? {}

  const setHandle = useCallback(
    async (newHandle: string | null) => {
      if (userId == null) return
      await runPatch({
        pageTypeSlug: ACCOUNT_PAGE_TYPE,
        where: [{ key: "key", eq: userId }],
        set: { handle: newHandle },
      })
    },
    [runPatch, userId]
  )

  const updateProfileMeta = useCallback(
    async (meta: Partial<ProfileMetadata>) => {
      if (userId == null) return
      const next = { ...profileMetadata, ...meta }
      await runPatch({
        pageTypeSlug: ACCOUNT_PAGE_TYPE,
        where: [{ key: "key", eq: userId }],
        set: pricingValues(next),
      })
    },
    [runPatch, userId, profileMetadata]
  )

  return {
    player,
    isLoading,
    isAuthenticated: userId !== null,
    handle,
    setHandle,
    profileMetadata,
    updateProfileMeta,
  }
}

export function usePlayerByUserId(userId: string) {
  const { rows } = usePages({
    pageTypeSlug: ACCOUNT_PAGE_TYPE,
    where: [{ key: "key", eq: userId }],
    limit: 1,
  })
  const player = useMemo(() => mapPlayerRow(rows[0]), [rows])
  return {
    player,
    handle: player?.handle ?? null,
  }
}
