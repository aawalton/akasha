"use client"

import { PageTabsTrigger, TabsList } from "@akasha/design-patterns/tabs"
import { cn } from "@akasha/design-primitives/cn"
import { BarChart3, Info, ShieldHalf, Star, Swords, User } from "lucide-react"

interface CharacterEditorTabsListProps {
  cols: number
}

export function CharacterEditorTabsList({ cols }: CharacterEditorTabsListProps) {
  return (
    <TabsList
      className={cn(
        "grid h-18 w-full rounded-none min-[584px]:flex min-[584px]:h-9 min-[584px]:rounded-lg",
        cols >= 2 ? "grid-cols-5" : "grid-cols-6"
      )}
    >
      <PageTabsTrigger value="general" icon={<Info />} label="General" />
      <PageTabsTrigger value="character" icon={<User />} label="Character" />
      <PageTabsTrigger value="equipment" icon={<ShieldHalf />} label="Equipment" />
      <PageTabsTrigger value="skills" icon={<Swords />} label="Skills" />
      <PageTabsTrigger value="champion" icon={<Star />} label="CP" />
      <PageTabsTrigger
        value="stats"
        icon={<BarChart3 />}
        label="Stats"
        className={cols >= 2 ? "hidden" : undefined}
      />
    </TabsList>
  )
}
