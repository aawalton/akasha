"use client"

import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "akasha/design/interface/primitive/modules/command/command.module.code.tsx"
import {
  Dialog,
  DialogBody,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "akasha/design/interface/primitive/modules/dialog/dialog.module.code.tsx"
import { useDebouncedValue } from "akasha/design/interface/primitive/modules/use-debounced-value/use-debounced-value.module.code.ts"
import type { MinedItemSearchResult } from "akasha/temper/items/core/modules/item-tooltip-types/item-tooltip-types.module.code.ts"
import { usePhrase } from "akasha/temper/web/modules/use-web-phrases/use-web-phrases.module.code.tsx"
import { itemSearchDialogFailed } from "akasha/temper/web/phrase/pages/item-search-dialog-failed.temper-web-phrase.ts"
import { itemSearchDialogNone } from "akasha/temper/web/phrase/pages/item-search-dialog-none.temper-web-phrase.ts"
import { itemSearchDialogPlaceholder } from "akasha/temper/web/phrase/pages/item-search-dialog-placeholder.temper-web-phrase.ts"
import { itemSearchDialogSearching } from "akasha/temper/web/phrase/pages/item-search-dialog-searching.temper-web-phrase.ts"
import { itemSearchDialogTitle } from "akasha/temper/web/phrase/pages/item-search-dialog-title.temper-web-phrase.ts"
import { itemSearchDialogTooShort } from "akasha/temper/web/phrase/pages/item-search-dialog-too-short.temper-web-phrase.ts"
import { useEffect, useState } from "react"

interface ItemSearchDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  onSelect: (item: MinedItemSearchResult) => void
  title?: string
}

export function ItemSearchDialog({ open, onOpenChange, onSelect, title }: ItemSearchDialogProps) {
  const phrase = usePhrase()
  const [query, setQuery] = useState("")
  const [results, setResults] = useState<MinedItemSearchResult[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [failed, setFailed] = useState(false)

  const debouncedQuery = useDebouncedValue(query, 300)

  useEffect(() => {
    if (!open) {
      setQuery("")
      setResults([])
      setFailed(false)
    }
  }, [open])

  useEffect(() => {
    const trimmed = debouncedQuery.trim()

    if (trimmed.length < 2) {
      setResults([])
      setIsLoading(false)
      return
    }

    const controller = new AbortController()

    setIsLoading(true)
    setFailed(false)

    async function loadResults(): Promise<MinedItemSearchResult[]> {
      const res = await fetch(`/api/items/search?q=${encodeURIComponent(trimmed)}`, {
        signal: controller.signal,
      })
      if (!res.ok) throw new Error("Request failed")
      return res.json()
    }

    loadResults()
      .then((data) => {
        setResults(data)
        setIsLoading(false)
      })
      .catch((err) => {
        if (err instanceof Error && err.name === "AbortError") return
        setFailed(true)
        setIsLoading(false)
      })

    return () => {
      controller.abort()
    }
  }, [debouncedQuery])

  const trimmedQuery = query.trim()

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-panel">
        <DialogHeader>
          <DialogTitle>{title ?? phrase(itemSearchDialogTitle.slug)}</DialogTitle>
        </DialogHeader>
        <DialogBody>
          <Command shouldFilter={false}>
            <CommandInput
              placeholder={phrase(itemSearchDialogPlaceholder.slug)}
              value={query}
              onValueChange={setQuery}
            />
            <CommandList className="h-96">
              {isLoading && <CommandEmpty>{phrase(itemSearchDialogSearching.slug)}</CommandEmpty>}
              {!isLoading && trimmedQuery.length < 2 && (
                <CommandEmpty>{phrase(itemSearchDialogTooShort.slug)}</CommandEmpty>
              )}
              {!isLoading && failed && (
                <CommandEmpty>{phrase(itemSearchDialogFailed.slug)}</CommandEmpty>
              )}
              {!isLoading && !failed && trimmedQuery.length >= 2 && results.length === 0 && (
                <CommandEmpty>{phrase(itemSearchDialogNone.slug)}</CommandEmpty>
              )}
              {!isLoading && !failed && results.length > 0 && (
                <CommandGroup>
                  {results.map((item) => (
                    <CommandItem
                      key={item.itemId}
                      value={item.name}
                      onSelect={() => {
                        onSelect(item)
                        onOpenChange(false)
                      }}
                    >
                      <div className="flex flex-col gap-0.5">
                        <span className="font-medium">{item.name}</span>
                        {item.setName != null && (
                          <span className="text-secondary text-xs">{item.setName}</span>
                        )}
                      </div>
                    </CommandItem>
                  ))}
                </CommandGroup>
              )}
            </CommandList>
          </Command>
        </DialogBody>
      </DialogContent>
    </Dialog>
  )
}
