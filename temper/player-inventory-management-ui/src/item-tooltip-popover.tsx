"use client"

import { Popover, PopoverContent, PopoverTrigger } from "@shared/design-primitives/components/popover"
import type { ItemTooltipInstance } from "@temper/game-items-core/item-tooltip-types"
import { useState } from "react"
import { ItemTooltip } from "./item-tooltip"
import { useItemTooltipData } from "./use-item-tooltip-data"

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

  if (isLoading) {
    return (
      <p style={{ color: "var(--secondary)", fontSize: "13px", margin: 0, padding: "4px" }}>
        Loading...
      </p>
    )
  }

  if (!data) {
    return (
      <p style={{ color: "var(--tertiary)", fontSize: "13px", margin: 0, padding: "4px" }}>
        Temper could not read this item's link, so it cannot look up any details.
      </p>
    )
  }

  if (!data.referenceData) {
    return (
      <p style={{ color: "var(--tertiary)", fontSize: "13px", margin: 0, padding: "4px" }}>
        {lookupFailed
          ? "Temper's item lookup did not answer, so these details are missing right now rather than absent. Reopening the tooltip will try again."
          : "Temper has no reference entry for this item yet."}
      </p>
    )
  }

  return <ItemTooltip data={data} />
}

export function ItemTooltipPopover({ itemLink, instance, children }: ItemTooltipPopoverProps) {
  const [open, setOpen] = useState(false)

  if (!instance) return null

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        {children != null ? (
          <span>{children}</span>
        ) : (
          <button
            type="button"
            aria-label="View item tooltip"
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
