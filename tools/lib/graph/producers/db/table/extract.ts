import { z } from "zod"

const IDENT_RE = "[A-Za-z_][A-Za-z0-9_]*"

const CREATE_TABLE_RE = new RegExp(`CREATE TABLE\\s+(${IDENT_RE})\\.(${IDENT_RE})\\b`)

const ALTER_TABLE_RE = new RegExp(`^\\s*ALTER TABLE ONLY\\s+(${IDENT_RE})\\.(${IDENT_RE})\\s*$`)

const ADD_CONSTRAINT_FK_RE = new RegExp(
  `^\\s*ADD CONSTRAINT\\s+(${IDENT_RE})` +
    `\\s+FOREIGN KEY\\s*\\(([^)]+)\\)` +
    `\\s+REFERENCES\\s+(${IDENT_RE})\\.(${IDENT_RE})\\s*\\(([^)]+)\\)` +
    `(?:\\s+ON DELETE\\s+(CASCADE|RESTRICT|NO ACTION|SET NULL|SET DEFAULT))?` +
    `\\s*;\\s*$`
)

const CREATE_TABLE_MATCH_SCHEMA = z.unknown().transform((v) => {
  if (!Array.isArray(v)) return null
  const schema = typeof v[1] === "string" ? v[1] : null
  const table = typeof v[2] === "string" ? v[2] : null
  if (schema === null || table === null) return null
  return { schema, table }
})

const ALTER_TABLE_MATCH_SCHEMA = z.unknown().transform((v) => {
  if (!Array.isArray(v)) return null
  const ownerSchema = typeof v[1] === "string" ? v[1] : null
  const ownerTable = typeof v[2] === "string" ? v[2] : null
  if (ownerSchema === null || ownerTable === null) return null
  return { ownerSchema, ownerTable }
})

const ADD_CONSTRAINT_FK_MATCH_SCHEMA = z.unknown().transform((v) => {
  if (!Array.isArray(v)) return null
  const constraintName = typeof v[1] === "string" ? v[1] : null
  const fromColsRaw = typeof v[2] === "string" ? v[2] : null
  const targetSchema = typeof v[3] === "string" ? v[3] : null
  const targetTable = typeof v[4] === "string" ? v[4] : null
  const toColsRaw = typeof v[5] === "string" ? v[5] : null
  const onDelete = typeof v[6] === "string" ? v[6] : null
  if (
    constraintName === null ||
    fromColsRaw === null ||
    targetSchema === null ||
    targetTable === null ||
    toColsRaw === null
  ) {
    return null
  }
  return { constraintName, fromColsRaw, targetSchema, targetTable, toColsRaw, onDelete }
})

export type TableIdentifier = {
  readonly schema: string
  readonly table: string
}

export type ForeignKeyConstraint = {
  readonly ownerSchema: string
  readonly ownerTable: string
  readonly constraintName: string
  readonly fromColumns: readonly string[]
  readonly targetSchema: string
  readonly targetTable: string
  readonly toColumns: readonly string[]
  readonly onDelete: string | null
  readonly line: number
}

export const extractTableIdentifier = (sql: string): TableIdentifier | null => {
  const lines = sql.split("\n")
  for (const raw of lines) {
    const parsed = CREATE_TABLE_MATCH_SCHEMA.parse(CREATE_TABLE_RE.exec(raw))
    if (parsed === null) continue
    return parsed
  }
  return null
}

const splitColumns = (raw: string): readonly string[] =>
  raw
    .split(",")
    .map((c) => c.trim())
    .filter((c) => c.length > 0)

export const extractForeignKeyConstraints = (sql: string): readonly ForeignKeyConstraint[] => {
  const lines = sql.split("\n")
  const out: ForeignKeyConstraint[] = []
  for (let i = 0; i < lines.length; i += 1) {
    const altRaw = lines[i] ?? ""
    const altParsed = ALTER_TABLE_MATCH_SCHEMA.parse(ALTER_TABLE_RE.exec(altRaw))
    if (altParsed === null) continue

    let j = i + 1
    while (j < lines.length) {
      const peek = lines[j] ?? ""
      const trimmed = peek.trim()
      if (trimmed.length === 0 || trimmed.startsWith("--")) {
        j += 1
        continue
      }
      break
    }
    if (j >= lines.length) continue

    const fkRaw = lines[j] ?? ""
    const fkParsed = ADD_CONSTRAINT_FK_MATCH_SCHEMA.parse(ADD_CONSTRAINT_FK_RE.exec(fkRaw))
    if (fkParsed === null) continue
    out.push({
      ownerSchema: altParsed.ownerSchema,
      ownerTable: altParsed.ownerTable,
      constraintName: fkParsed.constraintName,
      fromColumns: splitColumns(fkParsed.fromColsRaw),
      targetSchema: fkParsed.targetSchema,
      targetTable: fkParsed.targetTable,
      toColumns: splitColumns(fkParsed.toColsRaw),
      onDelete: fkParsed.onDelete,
      line: j + 1,
    })
  }
  return out
}
