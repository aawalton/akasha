import { PanelCard } from "akasha/design/interface/layout/modules/panel-card/panel-card.module.code.tsx"
import {
  CardContent,
  CardHeader,
  CardTitle,
} from "akasha/design/interface/primitive/modules/card/card.module.code.tsx"
import { Heading } from "akasha/design/interface/primitive/modules/heading/heading.module.code.tsx"
import { surfaceClass } from "akasha/design/interface/primitive/modules/surface-class/surface-class.module.code.ts"
import { useSurface } from "akasha/design/interface/primitive/modules/surface-provider/surface-provider.module.code.tsx"
import type { DrawnSection } from "akasha/infrastructure/service/akasha-service/web-app/site-document/modules/reading/site-document-reading.module.code.ts"
import { MarkdownRenderer } from "akasha/page/ui/markdown/modules/markdown-renderer/markdown-renderer.module.code.tsx"
import type { ReactNode } from "react"
import type { Components } from "react-markdown"

function Coded({ className, children }: { className?: string; children?: ReactNode }) {
  const surface = useSurface()
  if (className?.includes("language-") === true) return <code>{children}</code>
  return (
    <code className={`rounded ${surfaceClass(surface + 1)} px-1.5 py-0.5 font-mono text-xs`}>
      {children}
    </code>
  )
}

function Formula({ children }: { children?: ReactNode }) {
  const surface = useSurface()
  return (
    <pre
      className={`whitespace-pre-wrap rounded-lg ${surfaceClass(surface + 1)} p-3 font-mono text-xs`}
    >
      {children}
    </pre>
  )
}

const LISTED = "space-y-1 pl-5 text-secondary text-sm/relaxed"

const PANELLED: Components = {
  h3: ({ children }) => <Heading>{children}</Heading>,
  p: ({ children }) => <p className="text-secondary text-sm leading-relaxed">{children}</p>,
  ol: ({ children }) => <ol className={`list-decimal ${LISTED}`}>{children}</ol>,
  ul: ({ children }) => <ul className={`list-disc ${LISTED}`}>{children}</ul>,
  li: ({ children }) => <li>{children}</li>,
  strong: ({ children }) => <strong className="text-primary">{children}</strong>,
  code: Coded,
  pre: Formula,
}

export function methodologyPanels(sections: readonly DrawnSection[]): ReactNode[] {
  return sections.map((section) => (
    <PanelCard key={section.anchor} id={section.anchor}>
      <CardHeader>
        <CardTitle className="text-lg">{section.title}</CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col gap-4">
        {section.text === null ? null : (
          <MarkdownRenderer content={section.text} components={PANELLED} className="space-y-4" />
        )}
      </CardContent>
    </PanelCard>
  ))
}
