import { describe, expect, test } from "bun:test"
import { appDirectoryStated, BUILD_CONFIG_FILES, buildConfigsFor } from "./build-config.ts"

const PACKAGE_DIR = "packages/audhdalan/web"

const APP_DIR = `${PACKAGE_DIR}/app`

const standingWith = (...paths: readonly string[]): ReadonlySet<string> => new Set(paths)

const reading = (text: string) => (): string => text

const DEFAULTED = "export default { ssr: true } satisfies Config"

const AT_ITS_OWN_DIRECTORY = 'export default { ssr: false, appDirectory: "." } satisfies Config'

describe("which directory a react-router configuration states as the app's", () => {
  test("a configuration stating none is read as the conventional one", () => {
    expect(appDirectoryStated(DEFAULTED)).toBe("app")
  })

  test("a configuration stating its own directory is read as that", () => {
    expect(appDirectoryStated(AT_ITS_OWN_DIRECTORY)).toBe(".")
  })
})

describe("which build configuration a web app's build loads", () => {
  test("a configuration beside the app directory is taken", () => {
    const standing = standingWith(
      `${PACKAGE_DIR}/react-router.config.ts`,
      `${PACKAGE_DIR}/vite.config.ts`
    )
    expect(buildConfigsFor([APP_DIR], standing, reading(DEFAULTED))).toEqual([
      `${PACKAGE_DIR}/react-router.config.ts`,
      `${PACKAGE_DIR}/vite.config.ts`,
    ])
  })

  test("a configuration naming its own directory as the app's is taken there", () => {
    const at = "packages/alanwalton/web/app-capacitor"
    const standing = standingWith(`${at}/react-router.config.ts`, `${at}/vite.config.ts`)
    expect(buildConfigsFor([at], standing, reading(AT_ITS_OWN_DIRECTORY))).toEqual([
      `${at}/react-router.config.ts`,
      `${at}/vite.config.ts`,
    ])
  })

  test("a configuration standing inside the app directory without saying so is left alone", () => {
    const standing = standingWith(
      `${APP_DIR}/react-router.config.ts`,
      `${APP_DIR}/vite.config.ts`
    )
    expect(buildConfigsFor([APP_DIR], standing, reading(DEFAULTED))).toEqual([])
  })

  test("a name the build never loads is left alone, however close it stands", () => {
    const standing = standingWith(
      `${PACKAGE_DIR}/react-router.config.ts`,
      `${PACKAGE_DIR}/vitest.config.ts`,
      `${PACKAGE_DIR}/tsconfig.json`
    )
    expect(buildConfigsFor([APP_DIR], standing, reading(DEFAULTED))).toEqual([
      `${PACKAGE_DIR}/react-router.config.ts`,
    ])
  })

  test("two app directories under one package answer with that package's pair once", () => {
    const at = "packages/alanwalton/web"
    const standing = standingWith(`${at}/react-router.config.ts`, `${at}/vite.config.ts`)
    const dirs = [`${at}/app`, `${at}/app-capacitor`]
    expect(buildConfigsFor(dirs, standing, reading(DEFAULTED))).toEqual([
      `${at}/react-router.config.ts`,
      `${at}/vite.config.ts`,
    ])
  })

  test("a vite configuration with no react-router configuration beside it is left alone", () => {
    expect(
      buildConfigsFor([APP_DIR], standingWith(`${PACKAGE_DIR}/vite.config.ts`), reading(DEFAULTED))
    ).toEqual([])
  })

  test("a configuration whose stated directory is no app directory is left alone", () => {
    const standing = standingWith(`${PACKAGE_DIR}/react-router.config.ts`)
    expect(buildConfigsFor(["packages/elsewhere/app"], standing, reading(DEFAULTED))).toEqual([])
  })

  test("the names looked for are the ones the build loads and no others", () => {
    expect([...BUILD_CONFIG_FILES].sort()).toEqual([
      "package.json",
      "react-router.config.ts",
      "vite.config.ts",
    ])
  })

  test("the manifest pinning the app root is taken beside the configuration", () => {
    const at = "packages/alanwalton/web/app-capacitor"
    const standing = standingWith(
      `${at}/react-router.config.ts`,
      `${at}/vite.config.ts`,
      `${at}/package.json`
    )
    expect(buildConfigsFor([at], standing, reading(AT_ITS_OWN_DIRECTORY))).toEqual([
      `${at}/package.json`,
      `${at}/react-router.config.ts`,
      `${at}/vite.config.ts`,
    ])
  })
})
