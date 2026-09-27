"use client"

import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "akasha/design/interface/primitive/modules/hover-card/hover-card.module.code.tsx"
import { titleIn } from "akasha/temper/items/core/modules/keyed-titles/keyed-titles.module.code.ts"
import { useRuleCardPhrases } from "akasha/temper/web/player-inventory-management-ui/modules/rule-card-phrase/rule-card-phrase.module.code.tsx"
import { ruleCardFilterTextAndNote } from "akasha/temper/web/player-inventory-management-ui/temper-rule-card-phrase/pages/rule-card-filter-text-and-note.temper-rule-card-phrase.ts"
import { ruleCardFilterTextEmpty } from "akasha/temper/web/player-inventory-management-ui/temper-rule-card-phrase/pages/rule-card-filter-text-empty.temper-rule-card-phrase.ts"
import { ruleCardFilterTextExampleExclude } from "akasha/temper/web/player-inventory-management-ui/temper-rule-card-phrase/pages/rule-card-filter-text-example-exclude.temper-rule-card-phrase.ts"
import { ruleCardFilterTextExampleInclude } from "akasha/temper/web/player-inventory-management-ui/temper-rule-card-phrase/pages/rule-card-filter-text-example-include.temper-rule-card-phrase.ts"
import { ruleCardFilterTextExamplesHeading } from "akasha/temper/web/player-inventory-management-ui/temper-rule-card-phrase/pages/rule-card-filter-text-examples-heading.temper-rule-card-phrase.ts"
import { ruleCardFilterTextHelpLabel } from "akasha/temper/web/player-inventory-management-ui/temper-rule-card-phrase/pages/rule-card-filter-text-help-label.temper-rule-card-phrase.ts"
import { ruleCardFilterTextHelpSummary } from "akasha/temper/web/player-inventory-management-ui/temper-rule-card-phrase/pages/rule-card-filter-text-help-summary.temper-rule-card-phrase.ts"
import { ruleCardFilterTextHelpTitle } from "akasha/temper/web/player-inventory-management-ui/temper-rule-card-phrase/pages/rule-card-filter-text-help-title.temper-rule-card-phrase.ts"
import { ruleCardFilterTextPlaceholder } from "akasha/temper/web/player-inventory-management-ui/temper-rule-card-phrase/pages/rule-card-filter-text-placeholder.temper-rule-card-phrase.ts"
import { ruleCardFilterTextRegexNoteEnd } from "akasha/temper/web/player-inventory-management-ui/temper-rule-card-phrase/pages/rule-card-filter-text-regex-note-end.temper-rule-card-phrase.ts"
import { ruleCardFilterTextRegexNoteStart } from "akasha/temper/web/player-inventory-management-ui/temper-rule-card-phrase/pages/rule-card-filter-text-regex-note-start.temper-rule-card-phrase.ts"
import { ruleCardFilterTextSyntaxHeading } from "akasha/temper/web/player-inventory-management-ui/temper-rule-card-phrase/pages/rule-card-filter-text-syntax-heading.temper-rule-card-phrase.ts"
import { ruleCardFilterTextSyntaxNotPhrase } from "akasha/temper/web/player-inventory-management-ui/temper-rule-card-phrase/pages/rule-card-filter-text-syntax-not-phrase.temper-rule-card-phrase.ts"
import { ruleCardFilterTextSyntaxNotPhraseMeaning } from "akasha/temper/web/player-inventory-management-ui/temper-rule-card-phrase/pages/rule-card-filter-text-syntax-not-phrase-meaning.temper-rule-card-phrase.ts"
import { ruleCardFilterTextSyntaxNotWord } from "akasha/temper/web/player-inventory-management-ui/temper-rule-card-phrase/pages/rule-card-filter-text-syntax-not-word.temper-rule-card-phrase.ts"
import { ruleCardFilterTextSyntaxNotWordMeaning } from "akasha/temper/web/player-inventory-management-ui/temper-rule-card-phrase/pages/rule-card-filter-text-syntax-not-word-meaning.temper-rule-card-phrase.ts"
import { ruleCardFilterTextSyntaxPhrase } from "akasha/temper/web/player-inventory-management-ui/temper-rule-card-phrase/pages/rule-card-filter-text-syntax-phrase.temper-rule-card-phrase.ts"
import { ruleCardFilterTextSyntaxPhraseMeaning } from "akasha/temper/web/player-inventory-management-ui/temper-rule-card-phrase/pages/rule-card-filter-text-syntax-phrase-meaning.temper-rule-card-phrase.ts"
import { ruleCardFilterTextSyntaxWord } from "akasha/temper/web/player-inventory-management-ui/temper-rule-card-phrase/pages/rule-card-filter-text-syntax-word.temper-rule-card-phrase.ts"
import { ruleCardFilterTextSyntaxWordMeaning } from "akasha/temper/web/player-inventory-management-ui/temper-rule-card-phrase/pages/rule-card-filter-text-syntax-word-meaning.temper-rule-card-phrase.ts"
import { Info } from "lucide-react"
import * as React from "react"

const SYNTAX_ROWS: readonly { readonly syntax: string; readonly meaning: string }[] = [
  { syntax: ruleCardFilterTextSyntaxWord.key, meaning: ruleCardFilterTextSyntaxWordMeaning.key },
  {
    syntax: ruleCardFilterTextSyntaxNotWord.key,
    meaning: ruleCardFilterTextSyntaxNotWordMeaning.key,
  },
  {
    syntax: ruleCardFilterTextSyntaxPhrase.key,
    meaning: ruleCardFilterTextSyntaxPhraseMeaning.key,
  },
  {
    syntax: ruleCardFilterTextSyntaxNotPhrase.key,
    meaning: ruleCardFilterTextSyntaxNotPhraseMeaning.key,
  },
]

const EXAMPLES: readonly string[] = [
  ruleCardFilterTextExampleInclude.key,
  ruleCardFilterTextExampleExclude.key,
]

function ItemNameSyntaxHelp() {
  const phrases = useRuleCardPhrases()
  const said = (key: string): string => titleIn(phrases, key)
  return (
    <HoverCard>
      <HoverCardTrigger asChild>
        <span
          role="img"
          aria-label={said(ruleCardFilterTextHelpLabel.key)}
          className="-ml-1 flex cursor-pointer items-center rounded-sm p-0.5 text-secondary"
        >
          <Info className="size-3" />
        </span>
      </HoverCardTrigger>
      <HoverCardContent align="start" className="w-72 space-y-2 text-xs">
        <p className="font-semibold text-primary text-xs">
          {said(ruleCardFilterTextHelpTitle.key)}
        </p>
        <p className="text-secondary text-xs">{said(ruleCardFilterTextHelpSummary.key)}</p>
        <p className="font-semibold text-primary text-xs">
          {said(ruleCardFilterTextSyntaxHeading.key)}
        </p>
        <table className="w-full text-xs">
          <tbody>
            {SYNTAX_ROWS.map((row) => (
              <tr key={row.syntax}>
                <td className="pr-3 font-mono text-primary">{said(row.syntax)}</td>
                <td className="text-secondary">{said(row.meaning)}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <p className="text-secondary text-xs">{said(ruleCardFilterTextAndNote.key)}</p>
        <p className="text-secondary text-xs">
          {said(ruleCardFilterTextRegexNoteStart.key)}{" "}
          <span className="font-mono text-primary">^ $ . *</span>{" "}
          {said(ruleCardFilterTextRegexNoteEnd.key)}
        </p>
        <p className="font-semibold text-primary text-xs">
          {said(ruleCardFilterTextExamplesHeading.key)}
        </p>
        <div className="space-y-0.5 font-mono text-primary text-xs">
          {EXAMPLES.map((key) => (
            <div key={key}>{said(key)}</div>
          ))}
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
  const phrases = useRuleCardPhrases()
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
        placeholder={titleIn(phrases, ruleCardFilterTextPlaceholder.key)}
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
        {value.length > 0 ? value : titleIn(phrases, ruleCardFilterTextEmpty.key)}
      </span>
    </>
  )
}
