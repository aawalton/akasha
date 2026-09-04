import { z } from "zod"

const RawMatchSchema = z.array(z.string()).min(1)

function parseMatch1(input: string, re: RegExp): readonly [string] | null {
  const raw = input.match(re)
  const rawResult = RawMatchSchema.safeParse(raw)
  if (!rawResult.success) return null
  const tupleResult = z.tuple([z.string()]).safeParse(rawResult.data.slice(1))
  return tupleResult.success ? tupleResult.data : null
}

function parseMatch2(input: string, re: RegExp): readonly [string, string] | null {
  const raw = input.match(re)
  const rawResult = RawMatchSchema.safeParse(raw)
  if (!rawResult.success) return null
  const tupleResult = z.tuple([z.string(), z.string()]).safeParse(rawResult.data.slice(1))
  return tupleResult.success ? tupleResult.data : null
}

const RawMatchOptionalSchema = z.array(z.string().optional()).min(1)

function parseMatch2Optional(
  input: string,
  re: RegExp
): readonly [string, string | undefined] | null {
  const raw = input.match(re)
  const rawResult = RawMatchOptionalSchema.safeParse(raw)
  if (!rawResult.success) return null
  const tupleResult = z
    .tuple([z.string(), z.string().optional()])
    .safeParse(rawResult.data.slice(1))
  if (!tupleResult.success) return null
  const [first, second] = tupleResult.data
  return [first, second]
}

function isMatch(input: string, re: RegExp): boolean {
  const raw = input.match(re)
  return RawMatchSchema.safeParse(raw).success
}

const CapturedOneSchema = z.tuple([z.string()])

const CapturedPairSchema = z.tuple([z.string(), z.string()])

function capturedOne(input: string, re: RegExp): readonly string[] {
  const found: string[] = []
  for (const raw of input.matchAll(re)) {
    const said = CapturedOneSchema.safeParse(raw.slice(1))
    if (said.success) found.push(said.data[0])
  }
  return found
}

function capturedPairs(input: string, re: RegExp): readonly (readonly [string, string])[] {
  const found: (readonly [string, string])[] = []
  for (const raw of input.matchAll(re)) {
    const said = CapturedPairSchema.safeParse(raw.slice(1))
    if (said.success) found.push(said.data)
  }
  return found
}

const TYPE_MAP: Record<string, string> = {
  string: "string",
  "string:nilable": "string | undefined",
  integer: "number",
  "integer:nilable": "number | undefined",
  integer53: "number",
  "integer53:nilable": "number | undefined",
  number: "number",
  "number:nilable": "number | undefined",
  bool: "boolean",
  "bool:nilable": "boolean | undefined",
  luaindex: "number",
  "luaindex:nilable": "number | undefined",
  id64: "Id64",
  "id64:nilable": "Id64 | undefined",
  table: "Record<string, unknown>",
  "table:nilable": "Record<string, unknown> | undefined",
  object: "unknown",
  "object:nilable": "unknown | undefined",
  function: "(...args: unknown[]) => unknown",
  "function:nilable": "((...args: unknown[]) => unknown) | undefined",
  textureName: "string",
  "textureName:nilable": "string | undefined",
  type: "unknown",
  types: "unknown[]",
  layout_measurement: "number",
  "layout_measurement:nilable": "number | undefined",
  color: "number",
  "color:nilable": "number | undefined",
}

export interface ParsedEnum {
  name: string
  values: string[]
}

export interface ParsedFunction {
  name: string
  params: Array<{ name: string; type: string; isOptional: boolean }>
  returns: Array<{ name: string; type: string }>
  hasVariableReturns: boolean
}

export interface ParsedEvent {
  name: string
  params: Array<{ name: string; type: string }>
}

interface ParsedObjectMethod {
  name: string
  params: Array<{ name: string; type: string; isOptional: boolean }>
  returns: Array<{ name: string; type: string }>
  hasVariableReturns: boolean
}

export interface ParsedObject {
  name: string
  inheritsFrom: string[]
  methods: ParsedObjectMethod[]
}

function parseType(typeStr: string): string {
  const nilableEnumMatch = parseMatch1(typeStr, /\[(\w+)\|#\w+\]:nilable/)
  if (nilableEnumMatch) {
    return `${nilableEnumMatch[0]} | undefined`
  }

  const enumMatch = parseMatch1(typeStr, /\[(\w+)\|#\w+\]/)
  if (enumMatch) {
    return enumMatch[0]
  }

  const mapped = TYPE_MAP[typeStr] ?? TYPE_MAP[typeStr.toLowerCase()]
  if (mapped != null) {
    return mapped
  }

  return typeStr
}

export function parseEnums(content: string): ParsedEnum[] {
  const enums: ParsedEnum[] = []
  const lines = content.split("\n")

  let currentEnum: ParsedEnum | null = null

  for (const line of lines) {
    const enumMatch = parseMatch1(line, /^h5\.\s+(\w+)/)
    if (enumMatch) {
      if (currentEnum && currentEnum.values.length > 0) {
        enums.push(currentEnum)
      }
      currentEnum = { name: enumMatch[0], values: [] }
      continue
    }

    if (currentEnum) {
      const valueMatch = parseMatch1(line, /^\*\s+([A-Z][A-Z0-9_]+)$/)
      if (valueMatch) {
        currentEnum.values.push(valueMatch[0])
      }
    }

    if (isMatch(line, /^h[234]\./)) {
      if (currentEnum && currentEnum.values.length > 0) {
        enums.push(currentEnum)
      }
      currentEnum = null
    }
  }

  if (currentEnum && currentEnum.values.length > 0) {
    enums.push(currentEnum)
  }

  return enums
}

export function parseFunctions(content: string): ParsedFunction[] {
  const functions: ParsedFunction[] = []

  const gameApiStart = content.indexOf("h2. Game API")
  const objectApiStart = content.indexOf("h2. Object API")

  if (gameApiStart === -1) return functions

  const gameApiSection = content.substring(
    gameApiStart,
    objectApiStart !== -1 ? objectApiStart : content.length
  )

  const sectionLines = gameApiSection.split("\n")

  let currentFunc: ParsedFunction | null = null
  let hasVariableReturns = false

  for (const line of sectionLines) {
    const funcMatch = parseMatch2(line, /^\*\s+(\w+)\((.*)\)$/)
    if (funcMatch) {
      if (currentFunc) {
        currentFunc.hasVariableReturns = hasVariableReturns
        functions.push(currentFunc)
      }

      const funcName = funcMatch[0]
      const paramsStr = funcMatch[1]

      currentFunc = {
        name: funcName,
        params: [],
        returns: [],
        hasVariableReturns: false,
      }
      hasVariableReturns = false

      if (paramsStr.trim() !== "") {
        for (const [type, name] of capturedPairs(paramsStr, /\*([^*]+)\*\s+_(\w+)_/g)) {
          currentFunc.params.push({
            name,
            type: parseType(type),
            isOptional: false,
          })
        }
      }
      continue
    }

    if (line.includes("_Uses variable returns..._")) {
      hasVariableReturns = true
      continue
    }

    const returnMatch = parseMatch1(line, /^\*\*\s+_Returns:_\s+(.+)$/)
    if (returnMatch && currentFunc) {
      const returnsStr = returnMatch[0]

      for (const [type, name] of capturedPairs(returnsStr, /\*([^*]+)\*\s+_(\w+)_/g)) {
        currentFunc.returns.push({
          name,
          type: parseType(type),
        })
      }
    }

    if (line.trim() === "" || isMatch(line, /^h[234]\./)) {
      if (currentFunc) {
        currentFunc.hasVariableReturns = hasVariableReturns
        functions.push(currentFunc)
        currentFunc = null
      }
      hasVariableReturns = false
    }
  }

  if (currentFunc) {
    currentFunc.hasVariableReturns = hasVariableReturns
    functions.push(currentFunc)
  }

  return functions
}

export function parseEvents(content: string): ParsedEvent[] {
  const events: ParsedEvent[] = []

  const eventsStart = content.indexOf("h2. Events")
  const xmlLayoutStart = content.indexOf("h2. UI XML Layout")

  if (eventsStart === -1) return events

  const eventsSection = content.substring(
    eventsStart,
    xmlLayoutStart !== -1 ? xmlLayoutStart : content.length
  )

  const sectionLines = eventsSection.split("\n")

  for (const line of sectionLines) {
    const eventMatch = parseMatch2Optional(line, /^\*\s+(EVENT_\w+)(?:\s+\((.+)\))?$/)
    if (eventMatch) {
      const event: ParsedEvent = {
        name: eventMatch[0],
        params: [],
      }

      if (eventMatch[1] != null) {
        for (const [type, name] of capturedPairs(eventMatch[1], /\*([^*]+)\*\s+_(\w+)_/g)) {
          event.params.push({
            name,
            type: parseType(type),
          })
        }
      }

      events.push(event)
    }
  }

  return events
}

export function parseObjects(content: string): ParsedObject[] {
  const objects: ParsedObject[] = []

  const objectApiStart = content.indexOf("h2. Object API")
  const eventsStart = content.indexOf("h2. Events")

  if (objectApiStart === -1) return objects

  const objectSection = content.substring(
    objectApiStart,
    eventsStart !== -1 ? eventsStart : content.length
  )

  const lines = objectSection.split("\n")

  let currentObject: ParsedObject | null = null
  let currentMethod: ParsedObjectMethod | null = null
  const childToParent = new Map<string, string>()
  let expectingChildList = false

  for (const line of lines) {
    const objectMatch = parseMatch1(line, /^h3\.\s+(\w+)/)
    if (objectMatch) {
      if (currentObject) {
        if (currentMethod) {
          currentObject.methods.push(currentMethod)
          currentMethod = null
        }
        objects.push(currentObject)
      }

      currentObject = {
        name: objectMatch[0],
        inheritsFrom: [],
        methods: [],
      }
      expectingChildList = false
      continue
    }

    if (currentObject && line.includes("Objects that inherit behavior from")) {
      expectingChildList = true
      continue
    }

    if (currentObject && expectingChildList && isMatch(line, /^\[[\w|#,\s[\]]+\]$/)) {
      for (const child of capturedOne(line, /\[(\w+)\|#\w+\]/g)) {
        childToParent.set(child, currentObject.name)
      }
      expectingChildList = false
      continue
    }

    const methodMatch = parseMatch2(line, /^\*\s+(\w+)\s*(?:\*[^*]+\*\s*)*\((.*)\)$/)
    if (methodMatch && currentObject) {
      if (currentMethod) {
        currentObject.methods.push(currentMethod)
      }

      currentMethod = {
        name: methodMatch[0],
        params: [],
        returns: [],
        hasVariableReturns: false,
      }

      const paramsStr = methodMatch[1]
      if (paramsStr.trim() !== "") {
        for (const [type, name] of capturedPairs(paramsStr, /\*([^*]+)\*\s+_(\w+)_/g)) {
          currentMethod.params.push({
            name,
            type: parseType(type),
            isOptional: false,
          })
        }
      }
      continue
    }

    if (currentMethod && line.includes("_Uses variable returns..._")) {
      currentMethod.hasVariableReturns = true
      continue
    }

    const returnMatch = parseMatch1(line, /^\*\*\s+_Returns:_\s+(.+)$/)
    if (returnMatch && currentMethod) {
      const returnsStr = returnMatch[0]
      for (const [type, name] of capturedPairs(returnsStr, /\*([^*]+)\*\s+_(\w+)_/g)) {
        currentMethod.returns.push({
          name,
          type: parseType(type),
        })
      }
    }
  }

  if (currentObject) {
    if (currentMethod) {
      currentObject.methods.push(currentMethod)
    }
    objects.push(currentObject)
  }

  for (const o of objects) {
    const parent = childToParent.get(o.name)
    if (parent !== undefined && parent !== o.name && !o.inheritsFrom.includes(parent)) {
      o.inheritsFrom.push(parent)
    }
  }

  return objects
}
