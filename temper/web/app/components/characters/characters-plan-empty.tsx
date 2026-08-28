"use client"

import { Button, Card, CardContent, LayoutLink } from "@shared/design-system"
import { Empty, EmptyContent, EmptyDescription, EmptyHeader, EmptyMedia, EmptyTitle } from "@shared/design-patterns/components/empty"
import { assertNever } from "@shared/utils-narrow/assert-never"
import { Gamepad2, Loader2 } from "lucide-react"
import type { PlanEmptyState } from "@/components/characters/characters-plan-empty-state"

const NO_CHARACTERS_DESCRIPTION =
  "Temper has not received any characters for this account. The Temper ESO add-ons write the files the Watcher reads, so both need to be working before any characters reach Temper. Arriving does not attach a build, though, so this tab stays empty even once they land."

const UNCONFIRMED_DESCRIPTION =
  "Temper has not finished loading this account's characters, so this tab is not showing a final answer yet. Reload if it does not settle shortly."

function noBuildsDescription(count: number): string {
  const noun = count === 1 ? "character" : "characters"
  return `Temper has ${count} ${noun} for this account. Planning compares a character's current build against a target, and none of them has a build attached yet — importing characters does not attach one, so importing again will not change this.`
}

interface CharactersPlanEmptyProps {
  state: PlanEmptyState
}

function planEmptyCopy(state: PlanEmptyState): { title: string; description: string } {
  switch (state.kind) {
    case "unconfirmed":
      return { title: "Still loading your characters", description: UNCONFIRMED_DESCRIPTION }
    case "no-characters":
      return { title: "No characters yet", description: NO_CHARACTERS_DESCRIPTION }
    case "no-builds":
      return {
        title: "No builds attached to your characters",
        description: noBuildsDescription(state.importedCharacterCount),
      }
    default:
      return assertNever(state)
  }
}

export function CharactersPlanEmpty({ state }: CharactersPlanEmptyProps) {
  const { title, description } = planEmptyCopy(state)

  return (
    <Card>
      <CardContent>
        <Empty>
          <EmptyHeader>
            <EmptyMedia variant="icon">
              {state.kind === "unconfirmed" ? <Loader2 /> : <Gamepad2 />}
            </EmptyMedia>
            <EmptyTitle>{title}</EmptyTitle>
            <EmptyDescription>{description}</EmptyDescription>
          </EmptyHeader>
          <EmptyContent>
            <Button variant="secondary" asChild>
              <LayoutLink href="/watcher">Check sync status</LayoutLink>
            </Button>
          </EmptyContent>
        </Empty>
      </CardContent>
    </Card>
  )
}
