export const ESO_STRIPPED_GLOBALS = [
  "dofile",
  "load",
  "loadfile",
  "module",
  "rawlen",
  "require",
] as const

export const ESO_AVAILABLE_DEBUG = ["traceback"] as const

export const ESO_AVAILABLE_OS = [
  "clock",
  "clockpersecond",
  "date",
  "difftime",
  "rawclock",
  "time",
] as const

export const ESO_AVAILABLE_COROUTINE = [
  "create",
  "getname",
  "resume",
  "running",
  "setname",
  "status",
  "wrap",
  "yield",
] as const

export const ESO_WHOLLY_STRIPPED_NAMESPACES = ["io", "package"] as const

export const ESO_AVAILABLE_MATH = [
  "abs",
  "acos",
  "asin",
  "atan",
  "atan2",
  "ceil",
  "cos",
  "cosh",
  "deg",
  "exp",
  "floor",
  "fmod",
  "frexp",
  "huge",
  "ldexp",
  "log",
  "log10",
  "max",
  "min",
  "modf",
  "pi",
  "pow",
  "rad",
  "random",
  "randomseed",
  "sin",
  "sinh",
  "sqrt",
  "tan",
  "tanh",
] as const

export const ESO_AVAILABLE_STRING = [
  "byte",
  "char",
  "find",
  "format",
  "gmatch",
  "gsub",
  "len",
  "lower",
  "match",
  "rep",
  "reverse",
  "sub",
  "upper",
] as const

export const ESO_AVAILABLE_TABLE = ["concat", "insert", "maxn", "remove", "sort", "unpack"] as const

export const ESO_AVAILABLE_UTF8 = [
  "char",
  "charpattern",
  "codepoint",
  "codes",
  "len",
  "offset",
] as const
