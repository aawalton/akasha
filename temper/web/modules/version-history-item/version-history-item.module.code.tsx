import { Badge } from "akasha/design/interface/badge/modules/badge/badge.module.code.tsx"
import { Button } from "akasha/design/interface/primitive/modules/button/button.module.code.tsx"
import { cn } from "akasha/design/interface/primitive/modules/cn/cn.module.code.ts"
import { surfaceClass } from "akasha/design/interface/primitive/modules/surface-class/surface-class.module.code.ts"
import { useSurface } from "akasha/design/interface/primitive/modules/surface-provider/surface-provider.module.code.tsx"
import { formatTimeAgo } from "akasha/temper/web/modules/format-time-ago/format-time-ago.module.code.ts"
import {
  usePhrase,
  useWebPhrases,
} from "akasha/temper/web/modules/use-web-phrases/use-web-phrases.module.code.tsx"
import { versionHistoryDialogCheckpoint } from "akasha/temper/web/phrase/pages/version-history-dialog-checkpoint.temper-web-phrase.ts"
import { versionHistoryDialogRestore } from "akasha/temper/web/phrase/pages/version-history-dialog-restore.temper-web-phrase.ts"
import { versionHistoryDialogVersion } from "akasha/temper/web/phrase/pages/version-history-dialog-version.temper-web-phrase.ts"

export interface BuildVersion {
  id: string
  versionNumber: number
  isCheckpoint: boolean
  checkpointName: string | null
  createdAt: string | null
  buildHash: string
  buildMetadata: Record<string, unknown>
}

interface VersionItemProps {
  version: BuildVersion
  onRestore: () => void
}

export function VersionItem({ version, onRestore }: VersionItemProps) {
  const surface = useSurface()
  const phrase = usePhrase()
  const phrases = useWebPhrases()
  return (
    <div
      className={cn(
        "flex items-center justify-between gap-3 rounded-lg px-3 py-2",
        surfaceClass(surface + 1)
      )}
    >
      <div className="flex flex-col gap-1">
        <div className="flex items-center gap-2">
          {version.isCheckpoint ? (
            <Badge variant="accent">
              {version.checkpointName ?? phrase(versionHistoryDialogCheckpoint.slug)}
            </Badge>
          ) : (
            <Badge variant="elevation">
              {phrase(versionHistoryDialogVersion.slug, { number: version.versionNumber })}
            </Badge>
          )}
        </div>
        <span className="text-tertiary text-xs">
          {formatTimeAgo(version.createdAt, new Date(), phrases)}
        </span>
      </div>
      <Button variant="tertiary" size="sm" onClick={onRestore}>
        {phrase(versionHistoryDialogRestore.slug)}
      </Button>
    </div>
  )
}
