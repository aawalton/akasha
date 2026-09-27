"use client"

import type { LoreLibrary } from "akasha/temper/player/completion/modules/held-lore-library/held-lore-library.module.code.ts"
import {
  loreLibraryContext,
  useLoreLibrary,
} from "akasha/temper/web/modules/use-lore-library/use-lore-library.module.code.tsx"
import type { ReactNode } from "react"

export function LoreLibraryGate({
  children,
  fallback,
}: {
  children: (library: LoreLibrary) => ReactNode
  fallback: ReactNode
}) {
  const library = useLoreLibrary()
  if (library === null) return <>{fallback}</>
  return (
    <loreLibraryContext.Provider value={library}>{children(library)}</loreLibraryContext.Provider>
  )
}
