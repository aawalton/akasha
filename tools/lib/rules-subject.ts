import { AKASHA, rootFor } from "../../repo/roots/roots.ts"
import type { Check, CheckOutcome, RepoView } from "./check.ts"
import { judge, over, skip } from "../../outcome/outcome"
import type { RuleSet } from "./rules-engine.ts"
import { CEILING, eachCase, matches, type Case, type Matchable } from "./rules-partition.ts"

export interface Unreadable {
  readonly relPath: string
  readonly stray: number
}

export interface Group {
  readonly label: string
  readonly rules: readonly Matchable[]
  readonly unreadable: readonly Unreadable[]
}

export interface Meeting {
  readonly rule: string
  readonly other: string
  readonly at: string
  readonly count: number
}

export interface Printers {
  readonly unreadable: (one: Unreadable, root: string) => string
  readonly overlap: (meeting: Meeting, root: string) => string
  readonly unclaimed: ((at: string, group: Group, root: string) => string) | null
  readonly unbounded: (group: Group, ceiling: number, root: string) => string
}

export interface RuleSubject {
  readonly ruleSet: RuleSet
  readonly noun: string
  readonly describe: (at: Case) => string
  readonly groupsOf: (repo: RepoView) => readonly Group[]
  readonly refusals: Printers
}

interface Closing {
  readonly failures: readonly string[]
  readonly tail: string
}

interface Aspect<S> {
  readonly start: () => S
  readonly saw: (state: S, subject: RuleSubject, at: Case, matched: readonly Matchable[]) => void
  readonly close: (state: S, subject: RuleSubject, root: string, group: Group) => Closing
}

function checkOver<S>(name: string, subject: RuleSubject, absent: string, aspect: Aspect<S>): Check {
  return (repo: RepoView): CheckOutcome => {
    const root = rootFor(repo.roots, AKASHA)
    const groups = subject.groupsOf(repo)
    if (groups.length === 0) return { ...skip(name, absent), population: over(0, subject.noun) }

    const failures: string[] = []
    const readings: string[] = []
    let decided = 0

    for (const group of groups) {
      for (const one of group.unreadable) failures.push(subject.refusals.unreadable(one, root))
      if (group.unreadable.length > 0) {
        readings.push(
          `${group.label} holds ${group.rules.length} rule(s), ${group.unreadable.length} unreadable`
        )
        continue
      }

      const state = aspect.start()
      const reading = eachCase(
        subject.ruleSet,
        group.rules,
        (at, conditions) => matches(subject.ruleSet, conditions, at),
        (at, matched) => aspect.saw(state, subject, at, matched),
        CEILING
      )
      decided += reading.cases
      const closing = aspect.close(state, subject, root, group)
      failures.push(...closing.failures)
      if (reading.restricted) failures.push(subject.refusals.unbounded(group, CEILING, root))
      readings.push(
        `${group.label} holds ${group.rules.length} rule(s), decided over ${reading.cases} ` +
          `${subject.noun}${reading.restricted ? " — part of the space and not all of it" : ""}` +
          `${closing.tail}`
      )
    }

    return {
      ...judge(name, readings.join("; "), failures),
      population: over(decided, subject.noun),
    }
  }
}

interface Tallied {
  readonly rule: string
  readonly other: string
  readonly at: string
  count: number
}

const disjoint: Aspect<Map<string, Tallied>> = {
  start: (): Map<string, Tallied> => new Map<string, Tallied>(),
  saw: (met, subject, at, matched): void => {
    for (let one = 0; one < matched.length; one += 1)
      for (let other = one + 1; other < matched.length; other += 1) {
        const rule = String(matched[one]?.relPath)
        const beside = String(matched[other]?.relPath)
        const found = met.get(`${rule} ${beside}`)
        if (found === undefined)
          met.set(`${rule} ${beside}`, { rule, other: beside, at: subject.describe(at), count: 1 })
        else found.count += 1
      }
  },
  close: (met, subject, root): Closing => ({
    failures: [...met.values()]
      .sort((one, other) => other.count - one.count)
      .map((meeting) => subject.refusals.overlap({ ...meeting }, root)),
    tail: met.size > 0 ? `, ${met.size} pair(s) of them meeting` : "",
  }),
}

const NAMED = 5

interface Residual {
  unclaimed: number
  readonly named: string[]
}

const cover: Aspect<Residual> = {
  start: (): Residual => ({ unclaimed: 0, named: [] }),
  saw: (state, subject, at, matched): void => {
    if (matched.length > 0) return
    state.unclaimed += 1
    if (state.named.length < NAMED) state.named.push(subject.describe(at))
  },
  close: (state, subject, root, group): Closing => {
    const print = subject.refusals.unclaimed
    return {
      failures: print === null ? [] : state.named.map((one) => print(one, group, root)),
      tail: state.unclaimed > 0 ? `, ${state.unclaimed} of them claimed by nothing` : "",
    }
  },
}

export function disjointCheck(name: string, subject: RuleSubject, absent: string): Check {
  return checkOver(name, subject, absent, disjoint)
}

export function coverCheck(name: string, subject: RuleSubject, absent: string): Check {
  return checkOver(name, subject, absent, cover)
}
