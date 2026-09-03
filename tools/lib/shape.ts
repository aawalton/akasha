import {
  array,
  discriminatedUnion,
  looseObject,
  object,
  record,
  tuple,
  union,
} from "@akasha/utils-narrow/shape-object"
import {
  booleanShape,
  coerceNumber,
  enumOf,
  json,
  literal,
  numberShape,
  stringShape,
  unknownShape,
} from "@akasha/utils-narrow/shape-scalar"

export const shape = {
  string: stringShape,
  number: numberShape,
  boolean: booleanShape,
  unknown: unknownShape,
  literal,
  enum: enumOf,
  object,
  looseObject,
  array,
  tuple,
  record,
  union,
  discriminatedUnion,
  json,
  coerce: { number: coerceNumber },
} as const
