import { getPage } from "@shared/pages-access/get"
import { patchPageById } from "@shared/pages-access/patch"
import { z } from "zod"
import { logError } from "./logger"
import {
  mergeOperations,
  type RunOutcome,
  type StoredOperation,
  type SyncOperation,
} from "./run-outcome"
import { getSupabaseClient } from "./supabase-client"
import { WATCHER_VERSION } from "./version"

const TEMPER_WATCHER_ENROLMENT_SLUG = "temper-watcher-enrolment"

const StoredOutcomeSchema = z.object({ operations: z.array(z.unknown()).optional() }).passthrough()

const StoredOperationSchema = z.object({ name: z.string() }).passthrough()

function storedOperations(value: unknown): readonly StoredOperation[] {
  const outcome = StoredOutcomeSchema.safeParse(value)
  if (!outcome.success) return []
  return (outcome.data.operations ?? []).flatMap((entry) => {
    const parsed = StoredOperationSchema.safeParse(entry)
    return parsed.success ? [parsed.data] : []
  })
}

export async function reportRunOutcome(operations: readonly SyncOperation[]): Promise<void> {
  try {
    const supabase = getSupabaseClient()
    const { data: signedIn, error: signInError } = await supabase.auth.getUser()
    const userId = signedIn?.user?.id
    if (signInError !== null || typeof userId !== "string") {
      logError("Run outcome not reported — this session has no signed-in user to scope it to")
      return
    }
    const enrolment = await getPage({
      pageTypeSlug: TEMPER_WATCHER_ENROLMENT_SLUG,
      where: [{ key: "accountUserId", eq: userId }],
      select: ["id", "lastRunOutcome"],
    })
    if (enrolment === null || typeof enrolment.id !== "string") {
      logError("Run outcome not reported — this account has no temper-watcher-enrolment page")
      return
    }

    const lastRunOutcome: RunOutcome = {
      watcherVersion: WATCHER_VERSION,
      reportedAt: new Date().toISOString(),
      operations: mergeOperations(storedOperations(enrolment.lastRunOutcome), operations),
    }

    await patchPageById({
      pageTypeSlug: TEMPER_WATCHER_ENROLMENT_SLUG,
      id: enrolment.id,
      set: { lastRunOutcome: JSON.stringify(lastRunOutcome) },
    })
  } catch (err) {
    logError(`Run outcome not reported: ${err instanceof Error ? err.message : err}`)
  }
}
