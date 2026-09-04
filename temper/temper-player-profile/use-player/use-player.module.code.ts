"use client"

import { patchPage } from "@akasha/pages-access/patch"
import { NEVER_MATCH_VALUE } from "@akasha/pages-access/sentinels"
import { upsertPage } from "@akasha/pages-access/upsert"
import { useOptimisticPatchPage } from "@akasha/pages-ui/supabase/mutations/use-optimistic-patch-page"
import { useOptimisticUpsertPage } from "@akasha/pages-ui/supabase/mutations/use-optimistic-upsert-page"
import { usePagesSupabase } from "@akasha/pages-ui/supabase/use-pages"
import { useUserId } from "@akasha/pages-ui/use-user-id"
import type { ProfileMetadata } from "@akasha/temper-build-metadata/build-metadata"
import { useCallback, useMemo } from "react"

const PLAYER_PAGE_TYPE_SLUG = "temper-player"

interface PlayerRow {
  id: string
  userId: string
  handle: string | null
  profileMetadata: ProfileMetadata
}

function parseString(value: unknown, fallback = ""): string {
  return typeof value === "string" ? value : fallback
}

function parseStringOrNull(value: unknown): string | null {
  return typeof value === "string" ? value : null
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
    handle: parseStringOrNull(row.handle),
    profileMetadata: parseProfileMetadata(row),
  }
}

export function usePlayer() {
  const userId = useUserId()
  const { rows, isLoading } = usePagesSupabase({
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
  const { rows } = usePagesSupabase({
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
