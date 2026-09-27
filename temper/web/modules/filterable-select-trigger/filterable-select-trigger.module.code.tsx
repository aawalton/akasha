import { cn } from "akasha/design/interface/primitive/modules/cn/cn.module.code.ts"
import { surfaceClass } from "akasha/design/interface/primitive/modules/surface-class/surface-class.module.code.ts"
import { useSurface } from "akasha/design/interface/primitive/modules/surface-provider/surface-provider.module.code.tsx"
import { ChevronDown } from "lucide-react"
import type * as React from "react"

export function FilterableSelectTrigger({
  className,
  size = "default",
  children,
  ...props
}: React.ComponentProps<"button"> & {
  size?: "sm" | "default"
}) {
  const surface = useSurface()
  return (
    <button
      type="button"
      data-slot="filterable-select-trigger"
      data-size={size}
      className={cn(
        "flex w-fit items-center justify-between gap-2 whitespace-nowrap rounded-md px-3 py-2 text-sm shadow-xs outline-none transition-[color,box-shadow] disabled:cursor-not-allowed disabled:opacity-[0.38] data-[size=default]:h-9 data-[size=sm]:h-8 focus-visible:[outline-offset:-1px] focus-visible:[outline:1.5px_solid_var(--color-accent)] [&_svg:not([class*='size-'])]:size-4 [&_svg:not([class*='text-'])]:text-tertiary [&_svg]:pointer-events-none [&_svg]:shrink-0",
        surfaceClass(surface + 1),
        className
      )}
      {...props}
    >
      {children}
      {!props.disabled && <ChevronDown className="size-4 opacity-50" />}
    </button>
  )
}
