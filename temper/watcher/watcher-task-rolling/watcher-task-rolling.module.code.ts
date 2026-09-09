export const NEXT_CHARACTER_SCOPE = "next_character"

export const ALL_CHARACTERS_SCOPE = "all_characters"

export interface CharacterMark {
  readonly taskId: string
  readonly characterId: string
}

export interface RollableTask {
  readonly taskId: string
  readonly scope: string | undefined
  readonly effectiveCharacterId: string | undefined
}

export interface RollInputs {
  readonly tasks: readonly RollableTask[]
  readonly completed: readonly CharacterMark[]
  readonly progressed: readonly CharacterMark[]
  readonly roster: readonly string[]
}

export interface RollVerdict {
  readonly taskId: string
  readonly rolls: boolean
  readonly why: string
}

function marksByTask(marks: readonly CharacterMark[]): Map<string, Set<string>> {
  const held = new Map<string, Set<string>>()
  for (const mark of marks) {
    const one = held.get(mark.taskId) ?? new Set<string>()
    one.add(mark.characterId)
    held.set(mark.taskId, one)
  }
  return held
}

export function rollVerdicts(inputs: RollInputs): readonly RollVerdict[] {
  const completedBy = marksByTask(inputs.completed)
  const progressedBy = marksByTask(inputs.progressed)
  const verdicts: RollVerdict[] = []

  for (const task of inputs.tasks) {
    const done = completedBy.get(task.taskId) ?? new Set<string>()
    const moved = progressedBy.get(task.taskId) ?? new Set<string>()

    if (task.scope === NEXT_CHARACTER_SCOPE) {
      const next = task.effectiveCharacterId
      if (next === undefined) {
        verdicts.push({
          taskId: task.taskId,
          rolls: false,
          why: "the task falls to no character yet",
        })
        continue
      }
      const rolls = moved.has(next)
      verdicts.push({
        taskId: task.taskId,
        rolls,
        why: rolls
          ? `the character it falls to progressed at it`
          : `the character it falls to has not progressed at it`,
      })
      continue
    }

    if (task.scope === ALL_CHARACTERS_SCOPE) {
      const waiting = inputs.roster.filter((one) => !done.has(one) && !moved.has(one))
      verdicts.push({
        taskId: task.taskId,
        rolls: waiting.length === 0 && inputs.roster.length > 0,
        why:
          waiting.length === 0
            ? `every one of the ${inputs.roster.length} characters answered it`
            : `${waiting.length} of the ${inputs.roster.length} characters have neither completed nor progressed`,
      })
      continue
    }

    verdicts.push({
      taskId: task.taskId,
      rolls: false,
      why: `a task of ${task.scope ?? "no"} scope is not rolled by a character's own progress`,
    })
  }

  return verdicts
}

export function tasksThatRoll(inputs: RollInputs): readonly string[] {
  return rollVerdicts(inputs)
    .filter((one) => one.rolls)
    .map((one) => one.taskId)
}
