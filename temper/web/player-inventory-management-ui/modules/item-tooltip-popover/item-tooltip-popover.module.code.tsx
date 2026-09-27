"use client"

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "akasha/design/interface/primitive/modules/popover/popover.module.code.tsx"
import type { ItemTooltipInstance } from "akasha/temper/items/core/modules/item-tooltip-types/item-tooltip-types.module.code.ts"
import { usePhrase } from "akasha/temper/web/modules/use-web-phrases/use-web-phrases.module.code.tsx"
import { itemTooltipPopoverLoading } from "akasha/temper/web/phrase/pages/item-tooltip-popover-loading.temper-web-phrase.ts"
import { itemTooltipPopoverLookupFailed } from "akasha/temper/web/phrase/pages/item-tooltip-popover-lookup-failed.temper-web-phrase.ts"
import { itemTooltipPopoverNoReference } from "akasha/temper/web/phrase/pages/item-tooltip-popover-no-reference.temper-web-phrase.ts"
import { itemTooltipPopoverUnreadableLink } from "akasha/temper/web/phrase/pages/item-tooltip-popover-unreadable-link.temper-web-phrase.ts"
import { itemTooltipPopoverView } from "akasha/temper/web/phrase/pages/item-tooltip-popover-view.temper-web-phrase.ts"
import { ItemTooltip } from "akasha/temper/web/player-inventory-management-ui/modules/item-tooltip/item-tooltip.module.code.tsx"
import { useItemTooltipData } from "akasha/temper/web/player-inventory-management-ui/modules/use-item-tooltip-data/use-item-tooltip-data.module.code.ts"
import { useState } from "react"

interface ItemTooltipPopoverProps {
  itemLink: string
  instance?: ItemTooltipInstance
  children?: React.ReactNode
}

function ItemTooltipContent({
  itemLink,
  instance,
}: {
  itemLink: string
  instance: ItemTooltipInstance
}) {
  const { data, isLoading, lookupFailed } = useItemTooltipData(itemLink, instance)
  const phrase = usePhrase()

  if (isLoading) {
    return (
      <p style={{ color: "var(--secondary)", fontSize: "13px", margin: 0, padding: "4px" }}>
        {phrase(itemTooltipPopoverLoading.slug)}
      </p>
    )
  }

  if (!data) {
    return (
      <p style={{ color: "var(--tertiary)", fontSize: "13px", margin: 0, padding: "4px" }}>
        {phrase(itemTooltipPopoverUnreadableLink.slug)}
      </p>
    )
  }

  if (!data.referenceData) {
    return (
      <p style={{ color: "var(--tertiary)", fontSize: "13px", margin: 0, padding: "4px" }}>
        {phrase(
          lookupFailed ? itemTooltipPopoverLookupFailed.slug : itemTooltipPopoverNoReference.slug
        )}
      </p>
    )
  }

  return <ItemTooltip data={data} />
}

export function ItemTooltipPopover({ itemLink, instance, children }: ItemTooltipPopoverProps) {
  const [open, setOpen] = useState(false)
  const phrase = usePhrase()

  if (!instance) return null

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        {children != null ? (
          <span>{children}</span>
        ) : (
          <button
            type="button"
            aria-label={phrase(itemTooltipPopoverView.slug)}
            style={{
              background: "transparent",
              border: "none",
              cursor: "pointer",
              padding: "2px",
              color: "var(--secondary)",
              opacity: 0.7,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              borderRadius: "2px",
              transition: "opacity 0.15s",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.opacity = "1"
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.opacity = "0.7"
            }}
          >
            <svg
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <circle cx="12" cy="12" r="10" />
              <path d="M12 16v-4" />
              <path d="M12 8h.01" />
            </svg>
          </button>
        )}
      </PopoverTrigger>
      <PopoverContent
        side="right"
        sideOffset={8}
        collisionPadding={8}
        className="w-auto max-w-[var(--radix-popover-content-available-width)] rounded-none p-0 shadow-xl"
        style={{
          backgroundColor: "var(--surface-0)",
          border: "1px solid var(--secondary)",
        }}
      >
        {open && <ItemTooltipContent itemLink={itemLink} instance={instance} />}
      </PopoverContent>
    </Popover>
  )
}
