import { posix } from "node:path"
import ts from "typescript"
import type { Repo } from "../../../../../page/document/types.ts"
import { readRepoFile } from "../../repos.ts"
import type { BuildContext } from "../../types.ts"
import { extractPackageName } from "./scanner-helpers.ts"

type ConfigScanResult = { specifiers: readonly string[]; protocols: readonly string[] }

export const scanConfigFile = (
  ctx: BuildContext,
  repo: Repo,
  relPath: string
): ConfigScanResult => {
  const text = readRepoFile(ctx, repo, relPath)
  if (text === null) return { specifiers: [], protocols: [] }
  const sf = ts.createSourceFile(relPath, text, ts.ScriptTarget.ESNext, true)
  const pkgs: string[] = []
  const protocols: string[] = []

  const STRING_ARRAY_FIELDS: ReadonlySet<string> = new Set([
    "transpilePackages",
    "serverExternalPackages",
    "externalPackages",
  ])

  const pushSpec = (spec: string): undefined => {
    if (spec.startsWith("bun:") || spec.startsWith("node:")) {
      protocols.push(spec)
      return
    }
    const name = extractPackageName(spec)
    if (name !== null) pkgs.push(name)
  }

  const visit = (node: ts.Node): undefined => {
    if (ts.isImportDeclaration(node) && ts.isStringLiteral(node.moduleSpecifier)) {
      pushSpec(node.moduleSpecifier.text)
    } else if (
      ts.isExportDeclaration(node) &&
      node.moduleSpecifier !== undefined &&
      ts.isStringLiteral(node.moduleSpecifier)
    ) {
      pushSpec(node.moduleSpecifier.text)
    } else if (
      ts.isCallExpression(node) &&
      node.expression.kind === ts.SyntaxKind.ImportKeyword &&
      node.arguments[0] !== undefined &&
      ts.isStringLiteral(node.arguments[0])
    ) {
      pushSpec(node.arguments[0].text)
    } else if (
      ts.isCallExpression(node) &&
      ts.isIdentifier(node.expression) &&
      node.expression.text === "require" &&
      node.arguments[0] !== undefined &&
      ts.isStringLiteral(node.arguments[0])
    ) {
      pushSpec(node.arguments[0].text)
    } else if (ts.isObjectLiteralExpression(node)) {
      for (const prop of node.properties) {
        if (ts.isPropertyAssignment(prop) && ts.isStringLiteral(prop.name)) {
          let parent: ts.Node | undefined = prop.parent
          while (parent) {
            if (ts.isPropertyAssignment(parent)) {
              const key = parent.name
              const keyText = ts.isIdentifier(key) || ts.isStringLiteral(key) ? key.text : undefined
              if (keyText === "plugins") {
                const name = extractPackageName(prop.name.text)
                if (name !== null) pkgs.push(name)
              }
              break
            }
            parent = parent.parent
          }
        }
        if (
          ts.isPropertyAssignment(prop) &&
          (ts.isIdentifier(prop.name) || ts.isStringLiteral(prop.name))
        ) {
          const key = prop.name.text
          if (STRING_ARRAY_FIELDS.has(key) && ts.isArrayLiteralExpression(prop.initializer)) {
            for (const el of prop.initializer.elements) {
              if (ts.isStringLiteral(el)) {
                const name = extractPackageName(el.text)
                if (name !== null) pkgs.push(name)
              }
            }
          }
        }
      }
    }
    ts.forEachChild(node, visit)
  }
  ts.forEachChild(sf, visit)

  for (const m of text.matchAll(/@type\s*\{\s*import\(\s*["']([^"']+)["']\s*\)/g)) {
    if (m[1] !== undefined) pushSpec(m[1])
  }
  for (const m of text.matchAll(/\/\/\/\s*<reference\s+types\s*=\s*["']([^"']+)["']/g)) {
    if (m[1] !== undefined) pushSpec(m[1])
  }

  return { specifiers: pkgs, protocols }
}

export const readTsconfigTypeRefs = (
  ctx: BuildContext,
  repo: Repo,
  tsconfigRelPath: string
): { types: readonly string[]; plugins: readonly string[]; luaPlugins: readonly string[] } => {
  const readRel = (relPath: string): string | undefined =>
    readRepoFile(ctx, repo, relPath) ?? undefined
  const configFile = ts.readConfigFile(tsconfigRelPath, readRel)
  if (configFile.error !== undefined || configFile.config === undefined) {
    return { types: [], plugins: [], luaPlugins: [] }
  }
  const seen = new Set<string>()
  const types = new Set<string>()
  const plugins = new Set<string>()
  const luaPlugins: string[] = []
  const isPlainObject = (x: unknown): x is Record<string, unknown> =>
    typeof x === "object" && x !== null
  const walk = (cfg: unknown, configDir: string, depth: number): undefined => {
    if (depth > 10) return
    if (!isPlainObject(cfg)) return
    const compilerOpts = cfg.compilerOptions
    if (isPlainObject(compilerOpts)) {
      const rawTypes = compilerOpts.types
      if (Array.isArray(rawTypes)) {
        for (const t of rawTypes) {
          if (typeof t === "string") types.add(t)
        }
      }
      const rawPlugins = compilerOpts.plugins
      if (Array.isArray(rawPlugins)) {
        for (const p of rawPlugins) {
          if (isPlainObject(p) && typeof p.name === "string") plugins.add(p.name)
        }
      }
    }
    const tstlOpts = cfg.tstl
    if (isPlainObject(tstlOpts) && luaPlugins.length === 0) {
      const rawLuaPlugins = tstlOpts.luaPlugins
      if (Array.isArray(rawLuaPlugins)) {
        for (const p of rawLuaPlugins) {
          if (isPlainObject(p) && typeof p.name === "string") luaPlugins.push(p.name)
        }
      }
    }
    const ext = cfg.extends
    const extArr = Array.isArray(ext) ? ext : ext !== undefined && ext !== null ? [ext] : []
    for (const e of extArr) {
      if (typeof e !== "string") continue
      if (!e.startsWith(".") && !e.startsWith("/")) continue
      const resolvedPath = posix.normalize(posix.join(configDir, e))
      if (seen.has(resolvedPath)) continue
      seen.add(resolvedPath)
      const nested = ts.readConfigFile(resolvedPath, readRel)
      if (nested.error === undefined && nested.config !== undefined) {
        walk(nested.config, posix.dirname(resolvedPath), depth + 1)
      }
    }
  }
  walk(configFile.config, posix.dirname(tsconfigRelPath), 0)
  return { types: [...types], plugins: [...plugins], luaPlugins }
}
