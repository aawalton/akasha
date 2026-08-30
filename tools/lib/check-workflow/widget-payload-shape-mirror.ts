import { readWidgetPayloads, type SwiftStruct } from "./widget-payloads.ts"
import { type CanonicalRef, readWireVocabulary } from "./widget-wire-vocabulary.ts"

export interface PayloadShapeViolation {
  readonly member: string
  readonly message: string
}

export interface PayloadMirror {
  readonly struct: string
  readonly canonical: CanonicalRef
  readonly unit: string
}

const READOUTS = "../akasha/readouts"
const ROUTES = "alanwalton/web/app/routes"

const RESPONSE_BODY = "return Response.json("

const bodyOf = (route: string): CanonicalRef => ({
  file: `${ROUTES}/${route}`,
  anchor: RESPONSE_BODY,
  kind: "body",
})

export const PAYLOAD_MIRRORS: readonly PayloadMirror[] = [
  {
    struct: "Categorization",
    canonical: {
      file: "akasha/alan-harness/monarch-unreviewed-transactions/monarch-unreviewed-transactions.readout.code.ts",
      anchor: "export type RingCounts = {",
      kind: "members",
    },
    unit: "key",
  },
  {
    struct: "BacklogScale",
    canonical: {
      file: "akasha/alan-harness/monarch-unreviewed-transactions/monarch-unreviewed-transactions.readout.code.ts",
      anchor: "export type RingScale = {",
      kind: "members",
    },
    unit: "key",
  },
  {
    struct: "ClaudeUsage",
    canonical: {
      file: `${ROUTES}/api.claude-usage.ts`,
      anchor: "export type UsageWidgetPayload = {",
      kind: "members",
    },
    unit: "key",
  },
  { struct: "InboxStoplightsResponse", canonical: bodyOf("api.inbox-stoplights.ts"), unit: "key" },
  {
    struct: "InboxStoplight",
    canonical: {
      file: `${READOUTS}/inbox-stoplights.ts`,
      anchor: "export interface InboxStoplight extends StoplightRing {",
      kind: "members",
    },
    unit: "key",
  },
  {
    struct: "PersonaStoplightsResponse",
    canonical: bodyOf("api.persona-stoplights.ts"),
    unit: "key",
  },
  {
    struct: "PersonaStoplight",
    canonical: {
      file: `${READOUTS}/persona-stoplights.ts`,
      anchor: "export interface PersonaStoplight extends StoplightRing {",
      kind: "members",
    },
    unit: "key",
  },
  { struct: "SafetyLevelResponse", canonical: bodyOf("api.safety-level.ts"), unit: "key" },
  {
    struct: "HabitStoplight",
    canonical: {
      file: `${READOUTS}/upkeep-stoplights.ts`,
      anchor: "export interface UpkeepStoplight extends StoplightRing {",
      kind: "members",
    },
    unit: "key",
  },
  { struct: "SurplusResponse", canonical: bodyOf("api.surplus.ts"), unit: "key" },
  { struct: "UpkeepStoplightsResponse", canonical: bodyOf("api.habit-stoplights.ts"), unit: "key" },
  {
    struct: "UpkeepStoplight",
    canonical: {
      file: `${READOUTS}/upkeep-stoplights.ts`,
      anchor: "export interface UpkeepStoplight extends StoplightRing {",
      kind: "members",
    },
    unit: "key",
  },
  {
    struct: "ValuesStoplightsResponse",
    canonical: bodyOf("api.values-stoplights.ts"),
    unit: "key",
  },
  {
    struct: "ValueStoplight",
    canonical: {
      file: `${READOUTS}/daily-stoplights.ts`,
      anchor: "export interface ValueStoplightFace extends ValueStoplight {",
      kind: "members",
    },
    unit: "key",
  },
]

const BY_STRUCT = new Map(PAYLOAD_MIRRORS.map((mirror) => [mirror.struct, mirror]))

export function payloadMirrorFor(struct: string): PayloadMirror | undefined {
  return BY_STRUCT.get(struct)
}

export function findPayloadShapeViolations(args: {
  readonly struct: SwiftStruct
  readonly canonical: readonly string[]
  readonly canonicalAnchor: string
  readonly unit: string
}): readonly PayloadShapeViolation[] {
  const { struct, canonical, canonicalAnchor, unit } = args
  if (canonical.length === 0) {
    return [
      {
        member: canonicalAnchor,
        message: `the canonical declaration yielded no ${unit} names. Either the wire carries none — which no surface could render — or this parse no longer reads the declaration`,
      },
    ]
  }

  const declared = new Set(struct.fields.map((field) => field.name))
  const violations: PayloadShapeViolation[] = []

  for (const name of canonical) {
    if (declared.has(name)) continue
    violations.push({
      member: name,
      message: `\`struct ${struct.name}\` declares no \`${name}\` field, so its synthesized Decodable ignores that key and the tile renders with the whole ${name} ${unit} absent — a wrong reading nothing on the surface reports`,
    })
  }

  for (const field of declared) {
    if (canonical.includes(field)) continue
    violations.push({
      member: field,
      message: `\`struct ${struct.name}\` declares a \`${field}\` field, which is not a ${unit} the wire vocabulary names — so nothing ever fills it and the tile draws a line of dashes no data can reach`,
    })
  }

  return violations
}

export interface ShapeMirrorMember {
  readonly label: string
  readonly path: string
  readonly against: string
  readonly subject: string
  readonly examine: () => readonly PayloadShapeViolation[]
}

const MIRRORS_FILE = "tools/lib/check-workflow/widget-payload-shape-mirror.ts"

export function shapeMirrorMembers(args: {
  readonly swiftSources: ReadonlyMap<string, string>
  readonly readCanonical: (file: string) => string
  readonly siblings: (file: string) => ReadonlyMap<string, string>
  readonly widgetDir: string
}): readonly ShapeMirrorMember[] {
  const payloads = readWidgetPayloads(args.swiftSources)
  const reached = new Set(payloads.payloadStructs.map((struct) => struct.name))

  const judged = payloads.payloadStructs.map((struct): ShapeMirrorMember => {
    const mirror = payloadMirrorFor(struct.name)
    if (mirror === undefined) {
      return {
        label: `shape: ${struct.name} in ${struct.file} against nothing`,
        path: struct.file,
        against: MIRRORS_FILE,
        subject: struct.name,
        examine: () => [
          {
            member: struct.name,
            message: `this payload struct is decoded from a widget feed and no wire vocabulary is declared for it in \`PAYLOAD_MIRRORS\`, so nothing holds its fields to what the endpoint sends — a key added upstream would be dropped by its synthesized Decodable in silence`,
          },
        ],
      }
    }
    return {
      label: `shape: ${struct.name} in ${struct.file} against ${mirror.canonical.anchor}`,
      path: struct.file,
      against: mirror.canonical.file,
      subject: struct.name,
      examine: () => {
        const vocabulary = readWireVocabulary({
          ref: mirror.canonical,
          read: args.readCanonical,
          siblings: args.siblings,
        })
        if (!vocabulary.ok) {
          return [
            {
              member: struct.name,
              message: `${vocabulary.reason}. Nothing was compared, which is not the same as nothing disagreeing`,
            },
          ]
        }
        return findPayloadShapeViolations({
          struct,
          canonical: vocabulary.names,
          canonicalAnchor: mirror.canonical.anchor,
          unit: mirror.unit,
        })
      },
    }
  })

  const stranded = PAYLOAD_MIRRORS.filter((mirror) => !reached.has(mirror.struct)).map(
    (mirror): ShapeMirrorMember => ({
      label: `shape: ${mirror.struct} against ${mirror.canonical.file}, with no struct in ${args.widgetDir}`,
      path: args.widgetDir,
      against: MIRRORS_FILE,
      subject: mirror.struct,
      examine: () => [
        {
          member: mirror.struct,
          message: `\`PAYLOAD_MIRRORS\` holds a wire vocabulary for \`struct ${mirror.struct}\` and no widget feed in ${args.widgetDir} reaches one — so either the struct was removed and this entry outlived it, or the directory read came back short of the payloads it holds`,
        },
      ],
    })
  )

  return [...judged, ...stranded]
}
