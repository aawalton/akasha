export type DurSource = "tick" | "channel" | "filter" | "priority" | "self" | "description" | "none"

export const LEVEL_EXACT = 1
export const LEVEL_STACK = 2
export const LEVEL_STACK_LOW = 3
export const LEVEL_ROLE = 4
export const LEVEL_DURATION_MATCH = 5
export const LEVEL_DURATION_LONGER = 6
export const LEVEL_TAIL = 7
export const LEVEL_SIDE_BUFF = 8
export const LEVEL_CRUX = 9

export const LEVEL_LOW_THRESHOLD = LEVEL_TAIL

export const MIN_USABLE_DURATION_MS = 1000

export const STRICT_WINDOW_MS = 2000

export const EFFECT_FOLLOW_TOLERANCE_MS = 500
