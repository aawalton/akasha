"use client"

import { parsePageTypeData } from "@akasha/pages-core/schema/pages"
import type { PropertyDefinition } from "@akasha/pages-core/types"
import { useAllPages } from "@akasha/pages-ui/supabase/hooks"
import type { PageWithProperties } from "@akasha/pages-ui/supabase/page-with-properties"
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

export function useTemperPropertyDef(
  pageTypeSlug: string,
  propertyId: string
): PropertyDefinition | null {
  const { pages: pageTypes } = useAllPages({ pageTypeSlug: PAGE_TYPE_SLUG })
  return useMemo(() => {
    const pageType = pageTypes.find((pt) => pt.properties.slug === pageTypeSlug)
    if (!pageType) return null
    const { propertyDefinitions } = parsePageTypeData(pageType.properties)
    return propertyDefinitions.find((d) => d.id === propertyId) ?? null
  }, [pageTypes, pageTypeSlug, propertyId])
}
