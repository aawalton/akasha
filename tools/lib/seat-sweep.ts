
import { existsSync } from "node:fs"
import { initiativesIn } from "./seat-initiative.ts"
import type { Stated } from "./seat-stated.ts"

export function initiativeFinishedIn(memory: string): (slug: string) => boolean {
  const byStem = initiativesIn(memory)
  const answered = new Map<string, boolean>()
  return (slug: string): boolean => {
    const already = answered.get(slug)
    if (already !== undefined) return already
    const at = byStem.get(slug) ?? []
    const one = at.length === 1 ? `${memory}/${at[0] as string}` : null
    const finished = one === null ? at.length === 0 : !existsSync(one)
    answered.set(slug, finished)
    return finished
  }
}

export interface Sources {
  readonly initiativeFinished: (slug: string) => boolean
}

export interface Reading {
  readonly held: readonly string[]
}

export function readSeat(stated: Stated, from: Sources): Reading {
  const held: string[] = []
  if (stated.onCall) held.push("on-call")
  const initiative = stated.initiative
  if (initiative !== null && !from.initiativeFinished(initiative.value)) {
    held.push(`initiative:${initiative.value}`)
  }
  return { held }
}

export function unfinishedOf(stated: Stated, from: Sources): readonly string[] {
  return readSeat(stated, from).held
}
