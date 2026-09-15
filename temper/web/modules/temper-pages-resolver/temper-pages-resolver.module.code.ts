"use client"

import { useAllPages } from "akasha/page/ui/supabase/modules/hooks/hooks.module.code.ts"
import type { PageWithProperties } from "akasha/page/ui/supabase/modules/page-with-properties/page-with-properties.module.code.ts"
import { useMemo } from "react"

const PAGE_TYPE_SLUG = "page-type"

interface TemperPagesResolverData {
  pages: readonly PageWithProperties[]
  pageTypes: readonly PageWithProperties[]
  isLoading: boolean
}

export function useTemperPagesResolver(): TemperPagesResolverData {
  const pageTypes = useAllPages({ pageTypeSlug: PAGE_TYPE_SLUG })
  const account = useAllPages({ pageTypeSlug: "temper-account" })
  const buildVersion = useAllPages({ pageTypeSlug: "temper-build-version" })
  const character = useAllPages({ pageTypeSlug: "temper-account-character" })
  const companion = useAllPages({ pageTypeSlug: "temper-companion-progress" })
  const completedTask = useAllPages({ pageTypeSlug: "temper-completed-task" })
  const player = useAllPages({ pageTypeSlug: "temper-player" })
  const task = useAllPages({ pageTypeSlug: "temper-task" })

  const pages = useMemo(
    () => [
      ...account.pages,
      ...buildVersion.pages,
      ...character.pages,
      ...companion.pages,
      ...completedTask.pages,
      ...player.pages,
      ...task.pages,
    ],
    [
      account.pages,
      buildVersion.pages,
      character.pages,
      companion.pages,
      completedTask.pages,
      player.pages,
      task.pages,
    ]
  )

  const isLoading =
    pageTypes.isLoading ||
    account.isLoading ||
    buildVersion.isLoading ||
    character.isLoading ||
    companion.isLoading ||
    completedTask.isLoading ||
    player.isLoading ||
    task.isLoading

  return { pages, pageTypes: pageTypes.pages, isLoading }
}
