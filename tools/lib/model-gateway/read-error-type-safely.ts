import { parseErrorType } from "./parse-error-type.ts"

export type Peeked429 = {
  readonly errorType: string | null
  readonly bodyText: string
  readonly rebuild: () => Response
}

export async function peek429(res: Response): Promise<Peeked429> {
  const { status, statusText, headers } = res
  let bodyText = ""
  try {
    bodyText = await res.text()
  } catch {
    bodyText = ""
  }
  let errorType: string | null = null
  try {
    errorType = parseErrorType(bodyText)
  } catch {
    errorType = null
  }
  return {
    errorType,
    bodyText,
    rebuild: () => new Response(bodyText, { status, statusText, headers }),
  }
}
