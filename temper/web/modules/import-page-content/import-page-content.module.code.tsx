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
import { AlertCircle, CheckCircle2, FileUp, Upload } from "lucide-react"

export function ImportPageContent() {
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

  return (
    <PageLayout>
      <PageLayout.Header>
        <PageTitle>Import</PageTitle>
      </PageLayout.Header>

      <PageLayout.Content>
        <div className="flex max-w-panel flex-col gap-6">
          {}
          <Card>
            <CardContent className="space-y-2 text-secondary text-sm">
              <p>
                <strong className="text-primary">This file comes from a Temper ESO add-on.</strong>{" "}
                ESO does not write it on its own —{" "}
                <strong className="text-primary">TemperCharacters</strong> creates it while you
                play. If that add-on is not installed in your game, the file below will not exist on
                your computer and there is nothing to upload.
              </p>
              <p>
                <a
                  href="/api/addons/download"
                  download
                  className="text-accent underline underline-offset-4"
                >
                  Download the Temper add-ons
                </a>{" "}
                and extract the zip into{" "}
                <code className={path}>Documents\Elder Scrolls Online\live\AddOns</code> — or{" "}
                <code className={path}>OneDrive\Documents\Elder Scrolls Online\live\AddOns</code>,
                if your Documents folder syncs to OneDrive. Add Tamriel Trade Centre alongside them,
                as below. Then turn everything on at{" "}
                <strong className="text-primary">Main Menu → Add-Ons</strong>, ticking{" "}
                <strong className="text-primary">Allow out of date AddOns</strong> if ours are
                listed as out of date, and log in to a character once. An add-on that is installed
                but not enabled writes nothing.
              </p>
              <p>
                <strong className="text-primary">Item prices need one more add-on.</strong>{" "}
                <strong className="text-primary">Tamriel Trade Centre</strong> is a separate
                community add-on, not one of ours, and its terms do not allow anyone else to
                redistribute it — so it is not in that download, and you install it yourself from
                Minion or esoui.com. It is where Temper gets guild-store prices. TemperInventory
                records whatever prices it finds at scan time, so an inventory captured without it
                syncs fine and then values your items at vendor prices only — a small fraction of
                what they are worth.
              </p>
              <p className="text-tertiary">
                Manual upload and the add-ons themselves work on any operating system. The{" "}
                <LayoutLink href="/watcher" className="text-accent hover:underline">
                  Temper Watcher
                </LayoutLink>{" "}
                does this automatically, on Windows only, and is the only way your inventory reaches
                Temper.
              </p>
            </CardContent>
          </Card>

          {}
          <Card>
            <CardContent className="space-y-2 text-secondary text-sm">
              <p>
                Upload your <strong className="text-primary">TemperCharacters.lua</strong> saved
                variables file to import your characters, companions, and completion tracking data.
                It is written by the <strong className="text-primary">TemperCharacters</strong>{" "}
                add-on.
              </p>
              <p className="text-tertiary">
                Default location:{" "}
                <code className={path}>
                  Documents/Elder Scrolls Online/live/SavedVariables/TemperCharacters.lua
                </code>
              </p>
            </CardContent>
          </Card>

          {state.phase === "idle" && (
            <DropZone
              label="Drop your TemperCharacters.lua file here"
              dragOver={dragOver}
              inputRef={inputRef}
              onDrop={handleDrop}
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onFileChange={handleFileChange}
            />
          )}

          {state.phase === "reading" && <ProcessingCard message="Reading file..." />}
          {state.phase === "importing" && <ProcessingCard message="Importing data..." />}

          {state.phase === "success" && (
            <>
              {}
              <Alert>
                {importHadCaveats(state.result) ? (
                  <>
                    <AlertCircle className="text-primary" />
                    <AlertTitle>Import complete — with warnings</AlertTitle>
                  </>
                ) : (
                  <>
                    <CheckCircle2 className="text-primary" />
                    <AlertTitle>Import complete</AlertTitle>
                  </>
                )}
                <AlertDescription>
                  <ImportSummary result={state.result} />
                </AlertDescription>
              </Alert>
              <Button variant="secondary" onClick={reset} className="w-fit">
                <FileUp className="h-4 w-4" />
                Import Another File
              </Button>
            </>
          )}

          {state.phase === "error" && (
            <>
              <Alert variant="destructive">
                <AlertCircle />
                <AlertTitle>Import failed</AlertTitle>
                <AlertDescription>{state.message}</AlertDescription>
              </Alert>
              <Button variant="secondary" onClick={reset} className="w-fit">
                Try Again
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
  dragOver,
  inputRef,
  onDrop,
  onDragOver,
  onDragLeave,
  onFileChange,
}: {
  label: string
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
        <p className="text-xs">or click to browse</p>
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
