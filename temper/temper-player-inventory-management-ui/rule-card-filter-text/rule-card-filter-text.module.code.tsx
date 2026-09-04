"use client"

import { HoverCard, HoverCardContent, HoverCardTrigger } from "@akasha/design-primitives/hover-card"
import { Info } from "lucide-react"
import * as React from "react"

function ItemNameSyntaxHelp() {
  return (
    <HoverCard>
      <HoverCardTrigger asChild>
        <span
          role="img"
          aria-label="Item name filter syntax help"
          className="-ml-1 flex cursor-pointer items-center rounded-sm p-0.5 text-secondary"
        >
          <Info className="size-3" />
        </span>
      </HoverCardTrigger>
      <HoverCardContent align="start" className="w-72 space-y-2 text-xs">
        <p className="font-semibold text-primary text-xs">Item Name Filter</p>
        <p className="text-secondary text-xs">Matches items whose name contains the text.</p>
        <p className="font-semibold text-primary text-xs">Syntax</p>
        <table className="w-full text-xs">
          <tbody>
            <tr>
              <td className="pr-3 font-mono text-primary">word</td>
              <td className="text-secondary">contains "word"</td>
            </tr>
            <tr>
              <td className="pr-3 font-mono text-primary">-word</td>
              <td className="text-secondary">does not contain "word"</td>
            </tr>
            <tr>
              <td className="pr-3 font-mono text-primary">"two words"</td>
              <td className="text-secondary">contains exact phrase</td>
            </tr>
            <tr>
              <td className="pr-3 font-mono text-primary">-"two words"</td>
              <td className="text-secondary">excludes exact phrase</td>
            </tr>
          </tbody>
        </table>
        <p className="text-secondary text-xs">Multiple terms are AND'd (all must match).</p>
        <p className="text-secondary text-xs">
          Not a regex — <span className="font-mono text-primary">^ $ . *</span> match literally.
        </p>
        <p className="font-semibold text-primary text-xs">Examples</p>
        <div className="space-y-0.5 font-mono text-primary text-xs">
          <div>Rubedite -Ingot</div>
          <div>-"Rubedite Ingot"</div>
        </div>
      </HoverCardContent>
    </HoverCard>
  )
}

export function EditableTextValue({
  value,
  onChange,
  disabled,
}: {
  value: string
  onChange: (value: string | undefined) => void
  disabled?: boolean
}) {
  const [editing, setEditing] = React.useState(false)
  const [draft, setDraft] = React.useState("")
  const inputRef = React.useRef<HTMLInputElement>(null)

  function startEditing() {
    if (disabled) return
    setDraft(value)
    setEditing(true)
  }

  function commit() {
    setEditing(false)
    const trimmed = draft.trim()
    onChange(trimmed.length > 0 ? trimmed : undefined)
  }

  function cancel() {
    setEditing(false)
  }

  React.useEffect(() => {
    if (editing) {
      inputRef.current?.focus()
      inputRef.current?.select()
    }
  }, [editing])

  if (editing) {
    return (
      <input
        ref={inputRef}
        type="text"
        value={draft}
        placeholder="e.g. Rubedite -Ingot"
        onChange={(e) => setDraft(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            e.preventDefault()
            commit()
          } else if (e.key === "Escape") {
            e.preventDefault()
            cancel()
          }
        }}
        onBlur={commit}
        className="w-0 min-w-0 max-w-32 bg-transparent text-center font-medium text-current text-xs outline-none [outline-offset:-1px] [outline:1.5px_solid_var(--color-accent)] selection:bg-accent/15 selection:text-current"
        style={{ width: `${Math.max(draft.length, 12)}ch` }}
      />
    )
  }

  return (
    <>
      <ItemNameSyntaxHelp />
      <span
        role="button"
        tabIndex={disabled ? -1 : 0}
        className="max-w-32 cursor-pointer truncate"
        onClick={startEditing}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault()
            startEditing()
          }
        }}
      >
        {value.length > 0 ? value : "Item name..."}
      </span>
    </>
  )
}
