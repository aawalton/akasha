
export const ZOD_NO_RULE_KEY = `[
  {
    "expected": "object",
    "code": "invalid_type",
    "path": [
      "deferredRestartRule"
    ],
    "message": "Invalid input: expected object, received undefined"
  }
]`

export const HERE_NO_RULE_KEY = `ShapeError: [
  {
    "code": "invalid_type",
    "path": [
      "deferredRestartRule"
    ],
    "message": "Invalid input: expected object, received undefined"
  }
]`

export const ZOD_NO_DECIDE_KEY = `[
  {
    "expected": "object",
    "code": "invalid_type",
    "path": [
      "deferredRestartRule",
      "decideDeferredRestart"
    ],
    "message": "Invalid input: expected object, received undefined"
  }
]`

export const HERE_NO_DECIDE_KEY = `ShapeError: [
  {
    "code": "invalid_type",
    "path": [
      "deferredRestartRule",
      "decideDeferredRestart"
    ],
    "message": "Invalid input: expected object, received undefined"
  }
]`

export const ZOD_STRAY_FIRE_REASON = `[
  {
    "code": "invalid_value",
    "values": [
      "idle",
      "stale-wedge",
      "ceiling"
    ],
    "path": [
      "deferredRestartRule",
      "decideDeferredRestart",
      "fireReason"
    ],
    "message": "Invalid option: expected one of \\"idle\\"|\\"stale-wedge\\"|\\"ceiling\\""
  }
]`

export const HERE_STRAY_FIRE_REASON = `ShapeError: [
  {
    "code": "invalid_value",
    "path": [
      "deferredRestartRule",
      "decideDeferredRestart",
      "fireReason"
    ],
    "message": "Invalid option: expected one of \\"idle\\"|\\"stale-wedge\\"|\\"ceiling\\""
  }
]`

export const ZOD_TEXT_WINDOW = `[
  {
    "expected": "number",
    "code": "invalid_type",
    "path": [
      "deferredRestartRule",
      "resolveMaxDeferMs"
    ],
    "message": "Invalid input: expected number, received string"
  }
]`

export const HERE_TEXT_WINDOW = `ShapeError: [
  {
    "code": "invalid_type",
    "path": [
      "deferredRestartRule",
      "resolveMaxDeferMs"
    ],
    "message": "Invalid input: expected number, received string"
  }
]`
