"use client"

import {
  PageTabsTrigger,
  TabsList,
} from "akasha/design/interface/pattern/modules/tabs/tabs.module.code.tsx"
import { account } from "akasha/temper/player/progress/temper-completion-category/pages/account.temper-completion-category.ts"
import { characters } from "akasha/temper/player/progress/temper-completion-category/pages/characters.temper-completion-category.ts"
import { companions } from "akasha/temper/player/progress/temper-completion-category/pages/companions.temper-completion-category.ts"
import { usePhrase } from "akasha/temper/web/modules/use-web-phrases/use-web-phrases.module.code.tsx"
import { completionPageContentSummary } from "akasha/temper/web/phrase/pages/completion-page-content-summary.temper-web-phrase.ts"
import { Globe, Handshake, LayoutDashboard, Swords } from "lucide-react"

export function CompletionPageTabsList() {
  const phrase = usePhrase()
  return (
    <TabsList className="@[1016px]:grid grid h-18 w-full @[1016px]:grid-cols-4 grid-cols-4 rounded-none min-[584px]:flex min-[584px]:h-9 min-[584px]:rounded-lg">
      <PageTabsTrigger
        value="summary"
        icon={<LayoutDashboard />}
        label={phrase(completionPageContentSummary.slug)}
      />
      <PageTabsTrigger value="account" icon={<Globe />} label={account.title} />
      <PageTabsTrigger value="characters" icon={<Swords />} label={characters.title} />
      <PageTabsTrigger value="companions" icon={<Handshake />} label={companions.title} />
    </TabsList>
  )
}
