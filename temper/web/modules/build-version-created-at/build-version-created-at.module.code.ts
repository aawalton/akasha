import { momentOfVersionSeven } from "akasha/page/id/modules/uuid-version-7/uuid-version-7.module.code.ts"

const EARLIEST = Date.UTC(2000, 0, 1)

const DAY = 86_400_000

export function buildVersionCreatedAt(
  id: string,
  versionNumber: number,
  now: number = Date.now()
): string | null {
  const stamped = momentOfVersionSeven(id)
  if (stamped !== null) return new Date(stamped).toISOString()
  const plausible =
    Number.isInteger(versionNumber) && versionNumber >= EARLIEST && versionNumber <= now + DAY
  return plausible ? new Date(versionNumber).toISOString() : null
}

function since(version: { createdAt: string | null }): number {
  return version.createdAt === null ? Number.NEGATIVE_INFINITY : Date.parse(version.createdAt)
}

export function newestCreatedFirst(
  a: { createdAt: string | null },
  b: { createdAt: string | null }
): number {
  const left = since(a)
  const right = since(b)
  if (left === right) return 0
  return right > left ? 1 : -1
}
