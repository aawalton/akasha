import { readServiceDocs, serviceNamed } from "./service-project.ts"
import type { ServiceDoc } from "./service-unit.ts"

export const MANAGED_BY = "ops-service-install"

export const PORT_NAME = "http"

export class ClusterReachRefused extends Error {}

export type ClusterReach = {
  readonly slug: string
  readonly port: number
  readonly namespace: string
}

export const reachOf = (doc: ServiceDoc): ClusterReach | null => {
  if (doc.port === null && doc.namespace === null) return null
  if (doc.port === null) {
    throw new ClusterReachRefused(
      `${doc.slug}: states a namespace and no port, so nothing says where it answers`
    )
  }
  if (doc.namespace === null) {
    throw new ClusterReachRefused(
      `${doc.slug}: states a port and no namespace, so nothing says how the cluster reaches it`
    )
  }
  if (!Number.isInteger(doc.port) || doc.port <= 0) {
    throw new ClusterReachRefused(`${doc.slug}: states port \`${doc.port}\`, which is no whole port`)
  }
  return { slug: doc.slug, port: doc.port, namespace: doc.namespace }
}

export const manifestFor = (reach: ClusterReach, address: string): string =>
  [
    `apiVersion: v1`,
    `kind: Namespace`,
    `metadata:`,
    `  name: ${reach.namespace}`,
    `  labels:`,
    `    kubernetes.io/metadata.name: ${reach.namespace}`,
    `---`,
    `apiVersion: v1`,
    `kind: Service`,
    `metadata:`,
    `  name: ${reach.slug}`,
    `  namespace: ${reach.namespace}`,
    `  labels:`,
    `    app.kubernetes.io/name: ${reach.slug}`,
    `    app.kubernetes.io/managed-by: ${MANAGED_BY}`,
    `spec:`,
    `  type: ClusterIP`,
    `  ports:`,
    `    - name: ${PORT_NAME}`,
    `      port: ${reach.port}`,
    `      targetPort: ${reach.port}`,
    `      protocol: TCP`,
    `---`,
    `apiVersion: discovery.k8s.io/v1`,
    `kind: EndpointSlice`,
    `metadata:`,
    `  name: ${reach.slug}`,
    `  namespace: ${reach.namespace}`,
    `  labels:`,
    `    app.kubernetes.io/name: ${reach.slug}`,
    `    app.kubernetes.io/managed-by: ${MANAGED_BY}`,
    `    kubernetes.io/service-name: ${reach.slug}`,
    `addressType: IPv4`,
    `endpoints:`,
    `  - addresses:`,
    `      - ${address}`,
    `    conditions:`,
    `      ready: true`,
    `ports:`,
    `  - name: ${PORT_NAME}`,
    `    port: ${reach.port}`,
    `    protocol: TCP`,
    ``,
  ].join("\n")

export const addressIn = (route: string): string => {
  const found = route.match(/\bsrc\s+(\S+)/)
  if (found === null) {
    throw new ClusterReachRefused(
      "the route to the network names no source address, so nothing says where the cluster would reach this workstation"
    )
  }
  return found[1] as string
}

export const workstationAddress = (): string => {
  const got = Bun.spawnSync(["ip", "route", "get", "1.1.1.1"])
  if (!got.success) {
    throw new ClusterReachRefused("the route to the network could not be read")
  }
  return addressIn(new TextDecoder().decode(got.stdout))
}

export const applyToCluster = (yaml: string): { readonly code: number; readonly out: string } => {
  const got = Bun.spawnSync(["kubectl", "--request-timeout=30s", "apply", "-f", "-"], {
    stdin: Buffer.from(yaml),
  })
  const said = (bytes: Uint8Array): string => new TextDecoder().decode(bytes)
  return { code: got.exitCode, out: `${said(got.stdout)}${said(got.stderr)}` }
}

export const planClusterReach = (
  docs: readonly ServiceDoc[],
  address: string
): ReadonlyMap<string, string> => {
  const manifests = new Map<string, string>()
  const namespaces = new Map<string, string>()
  for (const doc of docs) {
    const reach = reachOf(doc)
    if (reach === null) continue
    const taken = namespaces.get(reach.namespace)
    if (taken !== undefined) {
      throw new ClusterReachRefused(
        `${reach.slug} and ${taken} both state namespace \`${reach.namespace}\`, so one would answer for the other`
      )
    }
    namespaces.set(reach.namespace, reach.slug)
    manifests.set(`${reach.slug}.yaml`, manifestFor(reach, address))
  }
  return manifests
}

export const clusterReachOf = (root: string, slug: string): ClusterReach => {
  const reach = reachOf(serviceNamed(root, slug))
  if (reach === null) {
    throw new ClusterReachRefused(`${slug}: states no port, so nothing says where it answers`)
  }
  return reach
}

export const clusterOriginOf = (root: string, slug: string): string => {
  const reach = clusterReachOf(root, slug)
  return `http://${reach.slug}.${reach.namespace}.svc.cluster.local:${String(reach.port)}`
}

export const reachedServices = (root: string): readonly ClusterReach[] => {
  const reached: ClusterReach[] = []
  for (const doc of readServiceDocs(root)) {
    const reach = reachOf(doc)
    if (reach !== null) reached.push(reach)
  }
  return reached
}
