"use client"

import { clampSurfaceLevel } from "@shared/design-primitives/components/surface-class"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@shared/design-primitives/components/collapsible"
import { HorizontalScrollFade } from "@shared/design-primitives/components/horizontal-scroll-fade"
import { SurfaceProvider, useSurface } from "@shared/design-primitives/components/surface-provider"
import { surfaceClass } from "@shared/design-primitives/components/surface-class"
import { cn } from "@shared/design-primitives/utils/cn"
import { ChevronDown } from "lucide-react"
import { type ReactNode, useState } from "react"

interface CollapsibleSkillCardProps {
  iconUrl: string | null
  name: string
  subtitle?: string
  subtitleTrailing?: ReactNode
  collapsible?: boolean
  open?: boolean
  defaultOpen?: boolean
  onOpenChange?: (open: boolean) => void
  children: ReactNode
  renderAction?: () => ReactNode
  reserveActionSpace?: boolean
  className?: string
}

export function CollapsibleSkillCard({
  iconUrl,
  name,
  subtitle,
  subtitleTrailing,
  collapsible = true,
  open,
  defaultOpen = false,
  onOpenChange,
  children,
  renderAction,
  reserveActionSpace,
  className,
}: CollapsibleSkillCardProps) {
  const surface = useSurface()
  const nestedLevel = clampSurfaceLevel(surface + 1)
  const [internalOpen, setInternalOpen] = useState(defaultOpen)

  const isOpen = collapsible ? (open !== undefined ? open : internalOpen) : true
  const handleOpenChange = (newOpen: boolean) => {
    if (!collapsible) return
    if (open === undefined) {
      setInternalOpen(newOpen)
    }
    onOpenChange?.(newOpen)
  }

  const headerContent = (
    <div className="flex items-center gap-3 p-3 pr-5">
      {}
      <div
        className={cn(
          "flex size-10 shrink-0 items-center justify-center overflow-hidden rounded",
          surfaceClass(3)
        )}
      >
        {iconUrl != null ? (
          <img
            src={iconUrl}
            alt={name}
            width={40}
            height={40}
            className="h-full w-full object-cover"
          />
        ) : null}
      </div>

      {}
      <div className="min-w-0 flex-1 justify-between">
        <div className="truncate pb-1 font-medium text-sm">{name}</div>
        {(subtitle != null || subtitleTrailing != null) && (
          <div className="flex items-center gap-2 text-secondary text-xs">
            {subtitle != null && <span className="shrink-0">{subtitle}</span>}
            {subtitleTrailing != null && (
              <HorizontalScrollFade className="min-w-0 flex-1">
                <div className="flex gap-1">{subtitleTrailing}</div>
              </HorizontalScrollFade>
            )}
          </div>
        )}
      </div>

      {}
      {renderAction?.() ?? (reserveActionSpace ? <div className="h-9 w-9 shrink-0" /> : null)}

      {}
      {collapsible && (
        <ChevronDown
          className={cn(
            "h-4 w-4 shrink-0 text-tertiary transition-transform duration-200",
            isOpen && "rotate-180"
          )}
        />
      )}
    </div>
  )

  if (!collapsible) {
    return (
      <SurfaceProvider level={nestedLevel} background={false}>
        <div className={cn("rounded-lg", surfaceClass(nestedLevel), className)}>
          {headerContent}
          <div className="flex flex-col gap-3 px-3 pb-3">{children}</div>
        </div>
      </SurfaceProvider>
    )
  }

  return (
    <SurfaceProvider level={nestedLevel} background={false}>
      <Collapsible open={isOpen} onOpenChange={handleOpenChange}>
        <CollapsibleTrigger asChild>
          <div
            className={cn(
              "cursor-pointer transition-colors hover:bg-primary/8",
              surfaceClass(nestedLevel),
              isOpen ? "rounded-t-lg" : "rounded-lg",
              className
            )}
          >
            {headerContent}
          </div>
        </CollapsibleTrigger>

        <CollapsibleContent>
          <div
            className={cn("flex flex-col gap-3 rounded-b-lg px-3 pb-3", surfaceClass(nestedLevel))}
          >
            {children}
          </div>
        </CollapsibleContent>
      </Collapsible>
    </SurfaceProvider>
  )
}
