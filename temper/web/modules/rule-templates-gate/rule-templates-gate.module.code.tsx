"use client"

import { useRuleTemplates } from "akasha/temper/web/modules/use-rule-templates/use-rule-templates.module.code.tsx"
import type { ReactNode } from "react"

export function RuleTemplatesGate({
  children,
  fallback,
}: {
  children: ReactNode
  fallback: ReactNode
}) {
  return <>{useRuleTemplates() === null ? fallback : children}</>
}
