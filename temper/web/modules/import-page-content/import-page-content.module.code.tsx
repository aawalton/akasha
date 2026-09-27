"use client"

import {
  PageLayout,
  PageTitle,
} from "akasha/design/interface/layout/modules/page-layout/page-layout.module.code.tsx"
import { LayoutLink } from "akasha/design/interface/layout/modules/router-context/router-context.module.code.tsx"
import {
  Alert,
  AlertDescription,
  AlertTitle,
} from "akasha/design/interface/primitive/modules/alert/alert.module.code.tsx"
import { Button } from "akasha/design/interface/primitive/modules/button/button.module.code.tsx"
import {
  Card,
  CardContent,
} from "akasha/design/interface/primitive/modules/card/card.module.code.tsx"
import { cn } from "akasha/design/interface/primitive/modules/cn/cn.module.code.ts"
import { Spinner } from "akasha/design/interface/primitive/modules/spinner/spinner.module.code.tsx"
import { surfaceClass } from "akasha/design/interface/primitive/modules/surface-class/surface-class.module.code.ts"
import { useSurface } from "akasha/design/interface/primitive/modules/surface-provider/surface-provider.module.code.tsx"
import {
  ImportSummary,
  importHadCaveats,
} from "akasha/temper/web/modules/import-summaries/import-summaries.module.code.tsx"
import { useTemperImport } from "akasha/temper/web/modules/use-temper-import/use-temper-import.module.code.ts"
import {
  usePhrase,
  usePhraseDescription,
} from "akasha/temper/web/modules/use-web-phrases/use-web-phrases.module.code.tsx"
import { importPageContentAddOnsMenu } from "akasha/temper/web/phrase/pages/import-page-content-add-ons-menu.temper-web-phrase.ts"
import { importPageContentAllowOutOfDate } from "akasha/temper/web/phrase/pages/import-page-content-allow-out-of-date.temper-web-phrase.ts"
import { importPageContentBrowse } from "akasha/temper/web/phrase/pages/import-page-content-browse.temper-web-phrase.ts"
import { importPageContentComplete } from "akasha/temper/web/phrase/pages/import-page-content-complete.temper-web-phrase.ts"
import { importPageContentCompleteWithWarnings } from "akasha/temper/web/phrase/pages/import-page-content-complete-with-warnings.temper-web-phrase.ts"
import { importPageContentDefaultLocation } from "akasha/temper/web/phrase/pages/import-page-content-default-location.temper-web-phrase.ts"
import { importPageContentDownload } from "akasha/temper/web/phrase/pages/import-page-content-download.temper-web-phrase.ts"
import { importPageContentDrop } from "akasha/temper/web/phrase/pages/import-page-content-drop.temper-web-phrase.ts"
import { importPageContentFailed } from "akasha/temper/web/phrase/pages/import-page-content-failed.temper-web-phrase.ts"
import { importPageContentFromAddOn } from "akasha/temper/web/phrase/pages/import-page-content-from-add-on.temper-web-phrase.ts"
import { importPageContentImportAnother } from "akasha/temper/web/phrase/pages/import-page-content-import-another.temper-web-phrase.ts"
import { importPageContentImporting } from "akasha/temper/web/phrase/pages/import-page-content-importing.temper-web-phrase.ts"
import { importPageContentInstalling } from "akasha/temper/web/phrase/pages/import-page-content-installing.temper-web-phrase.ts"
import { importPageContentPrices } from "akasha/temper/web/phrase/pages/import-page-content-prices.temper-web-phrase.ts"
import { importPageContentPricesNeed } from "akasha/temper/web/phrase/pages/import-page-content-prices-need.temper-web-phrase.ts"
import { importPageContentReading } from "akasha/temper/web/phrase/pages/import-page-content-reading.temper-web-phrase.ts"
import { importPageContentTamrielTradeCentre } from "akasha/temper/web/phrase/pages/import-page-content-tamriel-trade-centre.temper-web-phrase.ts"
import { importPageContentTemperCharacters } from "akasha/temper/web/phrase/pages/import-page-content-temper-characters.temper-web-phrase.ts"
import { importPageContentTemperWatcher } from "akasha/temper/web/phrase/pages/import-page-content-temper-watcher.temper-web-phrase.ts"
import { importPageContentTitle } from "akasha/temper/web/phrase/pages/import-page-content-title.temper-web-phrase.ts"
import { importPageContentTryAgain } from "akasha/temper/web/phrase/pages/import-page-content-try-again.temper-web-phrase.ts"
import { importPageContentUpload } from "akasha/temper/web/phrase/pages/import-page-content-upload.temper-web-phrase.ts"
import { importPageContentWatcherNote } from "akasha/temper/web/phrase/pages/import-page-content-watcher-note.temper-web-phrase.ts"
import { importPageContentWhereFrom } from "akasha/temper/web/phrase/pages/import-page-content-where-from.temper-web-phrase.ts"
import { AlertCircle, CheckCircle2, FileUp, Upload } from "lucide-react"
import { Fragment, type ReactNode } from "react"

const SAVED_FILE = "TemperCharacters.lua"
const ADD_ONS_FOLDER = "Documents\\Elder Scrolls Online\\live\\AddOns"
const ONE_DRIVE_ADD_ONS_FOLDER = "OneDrive\\Documents\\Elder Scrolls Online\\live\\AddOns"
const SAVED_FILE_PATH = "Documents/Elder Scrolls Online/live/SavedVariables/TemperCharacters.lua"

function woven(text: string, nodes: Readonly<Record<string, ReactNode>>): ReactNode {
  return text.split(/(\{\w+\})/).map((piece, index) => {
    const name = /^\{(\w+)\}$/.exec(piece)?.[1]
    return <Fragment key={index}>{name === undefined ? piece : nodes[name]}</Fragment>
  })
}

export function ImportPageContent() {
  const phrase = usePhrase()
  const describe = usePhraseDescription()
  const surface = useSurface()
  const path = `rounded ${surfaceClass(surface + 1)} px-1.5 py-0.5 text-xs`
  const {
    state,
    dragOver,
    inputRef,
    handleFileChange,
    handleDrop,
    handleDragOver,
    handleDragLeave,
    reset,
  } = useTemperImport()

  const isProcessing = state.phase === "reading" || state.phase === "importing"
  const strong = (text: string) => <strong className="text-primary">{text}</strong>
  const addOn = strong(phrase(importPageContentTemperCharacters.slug))

  return (
    <PageLayout>
      <PageLayout.Header>
        <PageTitle>{phrase(importPageContentTitle.slug)}</PageTitle>
      </PageLayout.Header>

      <PageLayout.Content>
        <div className="flex max-w-panel flex-col gap-6">
          {}
          <Card>
            <CardContent className="space-y-2 text-secondary text-sm">
              <p>
                {woven(describe(importPageContentWhereFrom.slug), {
                  fromAddOn: strong(phrase(importPageContentFromAddOn.slug)),
                  addOn,
                })}
              </p>
              <p>
                {woven(describe(importPageContentInstalling.slug), {
                  download: (
                    <a
                      href="/api/addons/download"
                      download
                      className="text-accent underline underline-offset-4"
                    >
                      {phrase(importPageContentDownload.slug)}
                    </a>
                  ),
                  addOnsFolder: <code className={path}>{ADD_ONS_FOLDER}</code>,
                  oneDriveAddOnsFolder: <code className={path}>{ONE_DRIVE_ADD_ONS_FOLDER}</code>,
                  addOnsMenu: strong(phrase(importPageContentAddOnsMenu.slug)),
                  allowOutOfDate: strong(phrase(importPageContentAllowOutOfDate.slug)),
                })}
              </p>
              <p>
                {woven(describe(importPageContentPrices.slug), {
                  pricesNeed: strong(phrase(importPageContentPricesNeed.slug)),
                  tradeCentre: strong(phrase(importPageContentTamrielTradeCentre.slug)),
                })}
              </p>
              <p className="text-tertiary">
                {woven(phrase(importPageContentWatcherNote.slug), {
                  watcher: (
                    <LayoutLink href="/watcher" className="text-accent hover:underline">
                      {phrase(importPageContentTemperWatcher.slug)}
                    </LayoutLink>
                  ),
                })}
              </p>
            </CardContent>
          </Card>

          {}
          <Card>
            <CardContent className="space-y-2 text-secondary text-sm">
              <p>
                {woven(phrase(importPageContentUpload.slug), { file: strong(SAVED_FILE), addOn })}
              </p>
              <p className="text-tertiary">
                {woven(phrase(importPageContentDefaultLocation.slug), {
                  path: <code className={path}>{SAVED_FILE_PATH}</code>,
                })}
              </p>
            </CardContent>
          </Card>

          {state.phase === "idle" && (
            <DropZone
              label={phrase(importPageContentDrop.slug, { file: SAVED_FILE })}
              hint={phrase(importPageContentBrowse.slug)}
              dragOver={dragOver}
              inputRef={inputRef}
              onDrop={handleDrop}
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onFileChange={handleFileChange}
            />
          )}

          {state.phase === "reading" && (
            <ProcessingCard message={phrase(importPageContentReading.slug)} />
          )}
          {state.phase === "importing" && (
            <ProcessingCard message={phrase(importPageContentImporting.slug)} />
          )}

          {state.phase === "success" && (
            <>
              {}
              <Alert>
                {importHadCaveats(state.result) ? (
                  <>
                    <AlertCircle className="text-primary" />
                    <AlertTitle>{phrase(importPageContentCompleteWithWarnings.slug)}</AlertTitle>
                  </>
                ) : (
                  <>
                    <CheckCircle2 className="text-primary" />
                    <AlertTitle>{phrase(importPageContentComplete.slug)}</AlertTitle>
                  </>
                )}
                <AlertDescription>
                  <ImportSummary result={state.result} />
                </AlertDescription>
              </Alert>
              <Button variant="secondary" onClick={reset} className="w-fit">
                <FileUp className="h-4 w-4" />
                {phrase(importPageContentImportAnother.slug)}
              </Button>
            </>
          )}

          {state.phase === "error" && (
            <>
              <Alert variant="destructive">
                <AlertCircle />
                <AlertTitle>{phrase(importPageContentFailed.slug)}</AlertTitle>
                <AlertDescription>{state.message}</AlertDescription>
              </Alert>
              <Button variant="secondary" onClick={reset} className="w-fit">
                {phrase(importPageContentTryAgain.slug)}
              </Button>
            </>
          )}

          {isProcessing && <div className="sr-only pointer-events-none" />}
        </div>
      </PageLayout.Content>
    </PageLayout>
  )
}

function DropZone({
  label,
  hint,
  dragOver,
  inputRef,
  onDrop,
  onDragOver,
  onDragLeave,
  onFileChange,
}: {
  label: string
  hint: string
  dragOver: boolean
  inputRef: React.RefObject<HTMLInputElement | null>
  onDrop: (e: React.DragEvent) => void
  onDragOver: (e: React.DragEvent) => void
  onDragLeave: (e: React.DragEvent) => void
  onFileChange: (e: React.ChangeEvent<HTMLInputElement>) => void
}) {
  return (
    <button
      type="button"
      onClick={() => inputRef.current?.click()}
      onDrop={onDrop}
      onDragOver={onDragOver}
      onDragLeave={onDragLeave}
      className={cn(
        "flex cursor-pointer flex-col items-center gap-3 rounded-xl border-2 border-dashed px-6 py-12 text-center transition-colors",
        dragOver
          ? "border-accent bg-accent/5 text-accent"
          : "border-border text-tertiary hover:border-secondary hover:text-secondary"
      )}
    >
      <Upload className="h-8 w-8" />
      <div className="space-y-1">
        <p className="font-medium text-sm">{label}</p>
        <p className="text-xs">{hint}</p>
      </div>
      <input ref={inputRef} type="file" accept=".lua" onChange={onFileChange} className="hidden" />
    </button>
  )
}

function ProcessingCard({ message }: { message: string }) {
  return (
    <Card className="cursor-wait">
      <CardContent className="flex items-center gap-3 text-secondary text-sm">
        <Spinner />
        <span>{message}</span>
      </CardContent>
    </Card>
  )
}
