"use client"

import { PanelCard, type PanelCardProps } from "@shared/design-layout/components/panel-card"
import { Textarea } from "@shared/design-primitives/components/textarea"
import { cn } from "@shared/design-primitives/utils/cn"
import { type ChangeEvent, useEffect, useState } from "react"

interface TextAreaPanelCardProps extends Pick<PanelCardProps, "id" | "collapsible" | "className"> {
  title: string
  placeholder?: string
  value: string
  onChange: (value: string) => void
  textareaClassName?: string
  readOnly?: boolean
}

export function TextAreaPanelCard({
  id,
  title,
  placeholder,
  value,
  onChange,
  collapsible,
  className,
  textareaClassName,
  readOnly,
}: TextAreaPanelCardProps) {
  const [draft, setDraft] = useState(value)

  useEffect(() => {
    setDraft(value)
  }, [value])

  const handleBlur = () => {
    if (draft !== value) {
      onChange(draft)
    }
  }

  return (
    <PanelCard id={id} collapsible={collapsible} title={title} className={className}>
      <Textarea
        placeholder={placeholder}
        value={draft}
        onChange={(e: ChangeEvent<HTMLTextAreaElement>) => setDraft(e.target.value)}
        onBlur={handleBlur}
        className={cn("h-[140px] resize-none [field-sizing:fixed]", textareaClassName)}
        readOnly={readOnly}
      />
    </PanelCard>
  )
}
