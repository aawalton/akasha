import { Button } from "akasha/design/interface/primitive/modules/button/button.module.code.tsx"
import { cn } from "akasha/design/interface/primitive/modules/cn/cn.module.code.ts"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "akasha/design/interface/primitive/modules/dropdown-menu/dropdown-menu.module.code.tsx"
import { surfaceClass } from "akasha/design/interface/primitive/modules/surface-class/surface-class.module.code.ts"
import { PagesUILink as Link } from "akasha/page/ui/modules/navigation-context/navigation-context.module.code.tsx"
import { usePhrase } from "akasha/temper/web/modules/use-web-phrases/use-web-phrases.module.code.tsx"
import { buildActionButtonsBrowse } from "akasha/temper/web/phrase/pages/build-action-buttons-browse.temper-web-phrase.ts"
import { buildActionButtonsRemix } from "akasha/temper/web/phrase/pages/build-action-buttons-remix.temper-web-phrase.ts"
import { buildActionButtonsSetTarget } from "akasha/temper/web/phrase/pages/build-action-buttons-set-target.temper-web-phrase.ts"
import { Copy, Menu, Search, Target } from "lucide-react"

interface BuildActionButtonsProps {
  onRemix: () => void
  onSetTarget?: () => void
  browseHref?: string
  remixDisabled?: boolean
}

export function BuildActionButtons({
  onRemix,
  onSetTarget,
  browseHref,
  remixDisabled,
}: BuildActionButtonsProps) {
  const phrase = usePhrase()
  const browse = phrase(buildActionButtonsBrowse.slug)
  const actions = [
    ...(onSetTarget
      ? [
          {
            key: "setTarget",
            label: phrase(buildActionButtonsSetTarget.slug),
            icon: Target,
            handler: onSetTarget,
          },
        ]
      : []),
    { key: "remix", label: phrase(buildActionButtonsRemix.slug), icon: Copy, handler: onRemix },
  ]

  return (
    <div className="flex shrink-0 items-center gap-2">
      {}
      <div className="@[640px]:flex hidden items-center gap-2">
        {browseHref != null && (
          <Button variant="secondary" size="sm" className={cn("gap-2", surfaceClass(1))} asChild>
            <Link href={browseHref}>
              <Search className="h-4 w-4" />
              <span className="@[1016px]:inline hidden">{browse}</span>
            </Link>
          </Button>
        )}
        {actions.map(({ key, label, icon: Icon, handler }) => (
          <Button
            key={key}
            variant="secondary"
            size="sm"
            className={cn("gap-2", surfaceClass(1))}
            disabled={key === "remix" ? remixDisabled : undefined}
            onClick={handler}
          >
            <Icon className="h-4 w-4" />
            <span className="@[1016px]:inline hidden">{label}</span>
          </Button>
        ))}
      </div>

      {}
      <div className="@[640px]:hidden">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="secondary" size="sm" className={surfaceClass(1)}>
              <Menu className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            {browseHref != null && (
              <DropdownMenuItem asChild>
                <Link href={browseHref}>
                  <Search className="h-4 w-4" />
                  {browse}
                </Link>
              </DropdownMenuItem>
            )}
            {actions.map(({ key, label, icon: Icon, handler }) => (
              <DropdownMenuItem
                key={key}
                onClick={handler}
                disabled={key === "remix" ? remixDisabled : undefined}
              >
                <Icon className="h-4 w-4" />
                {label}
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  )
}
