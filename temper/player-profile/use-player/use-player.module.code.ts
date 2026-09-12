"use client"

import { patchPage } from "akasha/pages/access/patch/patch.module.code.ts"
import { NEVER_MATCH_VALUE } from "akasha/pages/access/sentinels/sentinels.module.code.ts"
import { upsertPage } from "akasha/pages/access/upsert/upsert.module.code.ts"
import { useOptimisticPatchPage } from "akasha/pages/ui/supabase/mutations/use-optimistic-patch-page/use-optimistic-patch-page.module.code.ts"
import { useOptimisticUpsertPage } from "akasha/pages/ui/supabase/mutations/use-optimistic-upsert-page/use-optimistic-upsert-page.module.code.ts"
import { usePages } from "akasha/pages/ui/supabase/use-pages/use-pages.module.code.ts"
import { useUserId } from "akasha/pages/ui/use-user-id/use-user-id.module.code.tsx"
import type { ProfileMetadata } from "akasha/temper/build-metadata/modules/build-metadata/build-metadata.module.code.ts"
import { parseString } from "akasha/utils/narrow/parse-string/parse-string.module.code.ts"
import { stringIn } from "akasha/utils/narrow/string-in/string-in.module.code.ts"
import { useCallback, useMemo } from "react"

const PLAYER_PAGE_TYPE_SLUG = "temper-player"

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
    userId: parseString(row.title),
    handle: stringIn(row.handle),
    profileMetadata: parseProfileMetadata(row),
  }
}

export function usePlayer() {
  const userId = useUserId()
  const { rows, isLoading } = usePages({
    pageTypeSlug: PLAYER_PAGE_TYPE_SLUG,
    where:
      userId != null ? [{ key: "title", eq: userId }] : [{ key: "title", eq: NEVER_MATCH_VALUE }],
    limit: 1,
  })
  const runUpsert = useOptimisticUpsertPage((args) => upsertPage(args))
  const runPatch = useOptimisticPatchPage((args) => patchPage(args))

  const player = useMemo(() => mapPlayerRow(rows[0]), [rows])
  const handle = player?.handle ?? null
  const profileMetadata: ProfileMetadata = player?.profileMetadata ?? {}

  const setHandle = useCallback(
    async (newHandle: string | null) => {
      if (userId == null) return
      await runUpsert({
        pageTypeSlug: PLAYER_PAGE_TYPE_SLUG,
        where: [{ key: "title", eq: userId }],
        set: {
          title: userId,
          handle: newHandle,
        },
      })
    },
    [runUpsert, userId]
  )

  const updateProfileMeta = useCallback(
    async (meta: Partial<ProfileMetadata>) => {
      if (userId == null) return
      const next = { ...profileMetadata, ...meta }
      if (player) {
        await runPatch({
          pageTypeSlug: PLAYER_PAGE_TYPE_SLUG,
          where: [{ key: "title", eq: userId }],
          set: pricingValues(next),
        })
      } else {
        await runUpsert({
          pageTypeSlug: PLAYER_PAGE_TYPE_SLUG,
          where: [{ key: "title", eq: userId }],
          set: {
            title: userId,
            handle,
            ...pricingValues(next),
          },
        })
      }
    },
    [runPatch, runUpsert, userId, player, handle, profileMetadata]
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
    pageTypeSlug: PLAYER_PAGE_TYPE_SLUG,
    where: [{ key: "title", eq: userId }],
    limit: 1,
  })
  const player = useMemo(() => mapPlayerRow(rows[0]), [rows])
  return {
    player,
    handle: player?.handle ?? null,
  }
}
