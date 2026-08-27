import { durationSeconds } from "./format.ts"

export function buildDeleteEcho(input: {
  readonly startTime: string | undefined
  readonly endTime: string | undefined
}): { readonly wasOpen: boolean; readonly durationSeconds: number | undefined } {
  return {
    wasOpen: input.endTime === undefined,
    durationSeconds: durationSeconds(input.startTime, input.endTime),
  }
}

export function resolveEchoedDay(input: {
  readonly relinkedDay: string | undefined
  readonly existingLinkedDay: string | undefined
  readonly startDerivedDay: string | undefined
}): string | undefined {
  return input.relinkedDay ?? input.existingLinkedDay ?? input.startDerivedDay
}
