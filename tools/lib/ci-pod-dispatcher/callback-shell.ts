import { CALLBACK_WON_MARKER } from "./report-payload.ts"

const WON = `*'${CALLBACK_WON_MARKER}'*`

const HTTP_ERROR_RESPONSE = 8

function saidWhy(label: string): string {
  return `if [ "$cb_rc" -eq ${String(HTTP_ERROR_RESPONSE)} ]; then
    echo "[${label}] attempt $cb_attempt: the page query service answered and refused the write, so this step's page was not moved. It is absent, or its status is not what this write required." >&2
  elif [ "$cb_rc" -eq 0 ]; then
    echo "[${label}] attempt $cb_attempt: the page query service answered without recording the write: $cb_resp" >&2
  else
    echo "[${label}] attempt $cb_attempt: could not reach the page query service (wget exit $cb_rc)" >&2
  fi`
}

export interface TokenSubstitution {
  token: string
  shellValue: string
}

export function buildPageWritePostCommand(args: {
  templateEnvVar: string
  pathShellValue: string
  substitutions: readonly TokenSubstitution[]
}): string {
  const sedArgs = args.substitutions.map((s) => `-e "s|${s.token}|${s.shellValue}|"`).join(" ")
  const buildBody = `BODY=$(printf '%s' "$${args.templateEnvVar}" | sed ${sedArgs})`
  const flags = `-qO- -T 10 --header "Content-Type: application/json" --header "Accept: application/json" --post-data "$BODY" "$PAGE_QUERY_ORIGIN${args.pathShellValue}"`
  const post = `if [ -x /ci-storage/tools/busybox ]; then /ci-storage/tools/ld-musl-x86_64.so.1 /ci-storage/tools/busybox wget ${flags}; else wget ${flags}; fi`
  return `${buildBody} && ${post}`
}

export function buildCallbackRequiringWon(label: string, postCommand: string): string {
  return `# ${label} callback, retried 6 times over ~5 min; only a recorded write counts
cb_ok=0
cb_resp=""
for cb_attempt in 1 2 3 4 5 6; do
  cb_resp=$(${postCommand})
  cb_rc=$?
  case "$cb_resp" in
    ${WON}) cb_ok=1; break;;
  esac
  ${saidWhy(label)}
  case "$cb_attempt" in
    1) sleep 5;;
    2) sleep 15;;
    3) sleep 30;;
    4) sleep 60;;
    5) sleep 120;;
  esac
done`
}

export function buildCallbackRequiringWonWithFallback(
  label: string,
  primaryPost: string,
  fallbackPost: string
): string {
  return `# ${label} callback, retried 6 times over ~5 min; only a recorded write counts
cb_ok=0
cb_resp=""
for cb_attempt in 1 2 3 4 5 6; do
  cb_resp=$(${primaryPost})
  cb_rc=$?
  case "$cb_resp" in
    ${WON}) cb_ok=1; break;;
  esac
  cb_first="$cb_resp"
  cb_first_rc=$cb_rc
  cb_resp=$(${fallbackPost})
  cb_rc=$?
  case "$cb_resp" in
    ${WON}) cb_ok=1; break;;
  esac
  if [ "$cb_first_rc" -eq ${String(HTTP_ERROR_RESPONSE)} ] && [ "$cb_rc" -eq ${String(HTTP_ERROR_RESPONSE)} ]; then
    echo "[${label}] attempt $cb_attempt: the page query service refused both claims, so this step's page is absent or its status is neither launching nor dispatching." >&2
  elif [ "$cb_first_rc" -ne 0 ] && [ "$cb_rc" -ne 0 ]; then
    echo "[${label}] attempt $cb_attempt: could not reach the page query service (wget exit $cb_first_rc then $cb_rc)" >&2
  else
    echo "[${label}] attempt $cb_attempt: the page query service answered without claiming the step: $cb_first / $cb_resp" >&2
  fi
  case "$cb_attempt" in
    1) sleep 5;;
    2) sleep 15;;
    3) sleep 30;;
    4) sleep 60;;
    5) sleep 120;;
  esac
done`
}

export function refuseUnrecordedCallback(exitCode: number, what: string): string {
  return `if [ "$cb_ok" -eq 0 ]; then
  echo "ERROR: ${what} (pod=$POD_NAME workflow=$WORKFLOW_NAME step=$STEP_NAME). The last answer from the page query service was: $cb_resp" >&2
  exit ${String(exitCode)}
fi`
}
