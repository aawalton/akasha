interface SelectLivePodConfig {
  fnLabel: string
  namespace: string
  deployment: string
}

export function selectLivePodCommands(config: SelectLivePodConfig): readonly string[] {
  const { fnLabel, namespace, deployment } = config
  const label = `app.kubernetes.io/name=${deployment}`
  return [
    `POD_RS=$(kubectl get pods -n ${namespace} -l ${label} --field-selector=status.phase=Running -o jsonpath='{range .items[*]}{.metadata.name}{"\\t"}{.metadata.ownerReferences[?(@.kind=="ReplicaSet")].name}{"\\n"}{end}' 2>/dev/null || echo "")`,
    `POD_RS=$(printf '%s\\n' "$POD_RS" | sed '/^[[:space:]]*$/d')`,
    `POD_COUNT=$(printf '%s\\n' "$POD_RS" | grep -c . || true)`,
    `POD=""`,
    `if [ "$POD_COUNT" -eq 1 ]; then`,
    `  POD=$(printf '%s\\n' "$POD_RS" | head -n 1 | cut -f1)`,
    `elif [ "$POD_COUNT" -gt 1 ]; then`,
    `  EMPTY_OWNERS=$(printf '%s\\n' "$POD_RS" | cut -f2 | grep -c '^$' || true)`,
    `  if [ "$EMPTY_OWNERS" -gt 0 ]; then`,
    `    echo "${fnLabel}: ambiguous pod selection (app-name label collision) for ${label} in ${namespace} -- a Running pod has no ReplicaSet owner, cannot prove a single-Deployment rollout, refusing to act on a possibly-wrong pod" >&2`,
    `    exit 1`,
    `  fi`,
    `  RUNNING_RS=$(printf '%s\\n' "$POD_RS" | cut -f2 | sort -u)`,
    `  for rs in $RUNNING_RS; do`,
    `    OWNER=""`,
    `    for attempt in 1 2 3 4 5; do`,
    `      OWNER=$(kubectl get rs "$rs" -n ${namespace} -o jsonpath='{.metadata.ownerReferences[?(@.kind=="Deployment")].name}' 2>/dev/null || echo "")`,
    `      if [ -n "$OWNER" ]; then break; fi`,
    `      sleep 1`,
    `    done`,
    `    if [ -z "$OWNER" ]; then`,
    `      if kubectl get deployment ${deployment} -n ${namespace} >/dev/null 2>&1; then`,
    `        echo "${fnLabel}: ReplicaSet $rs ownerReference not yet propagated for ${label} in ${namespace} -- Deployment ${deployment} exists, tolerating in-flight adoption"`,
    `        OWNER="${deployment}"`,
    `      else`,
    `        echo "${fnLabel}: ambiguous pod selection (app-name label collision) for ${label} in ${namespace} -- ReplicaSet $rs rolls up to Deployment [], and no Deployment ${deployment} exists, refusing to act on a possibly-wrong pod" >&2`,
    `        exit 1`,
    `      fi`,
    `    fi`,
    `    if [ "$OWNER" != "${deployment}" ]; then`,
    `      echo "${fnLabel}: ambiguous pod selection (app-name label collision) for ${label} in ${namespace} -- ReplicaSet $rs rolls up to Deployment [$OWNER], not ${deployment}, refusing to act on a possibly-wrong pod" >&2`,
    `      exit 1`,
    `    fi`,
    `  done`,
    `  NEWEST_RS=$(kubectl get rs $RUNNING_RS -n ${namespace} --sort-by=.metadata.creationTimestamp -o jsonpath='{.items[-1:].metadata.name}' 2>/dev/null || echo "")`,
    `  if [ -n "$NEWEST_RS" ]; then`,
    `    POD=$(printf '%s\\n' "$POD_RS" | awk -F'\\t' -v rs="$NEWEST_RS" '$2==rs{print $1; exit}')`,
    `  fi`,
    `  if [ -z "$POD" ]; then`,
    `    POD=$(printf '%s\\n' "$POD_RS" | head -n 1 | cut -f1)`,
    `  fi`,
    `  echo "${fnLabel}: mid-rollout surge tolerated -- selected newest-ReplicaSet pod [$POD] (ReplicaSet $NEWEST_RS) for ${label} in ${namespace}"`,
    `fi`,
  ]
}
