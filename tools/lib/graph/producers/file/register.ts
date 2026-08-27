import type { Engine } from "../../types.ts"
import { registerBiomeConfigFileTypes } from "./biome-config-file/register.ts"
import { registerCertificateFileTypes } from "./certificate-file/register.ts"
import { registerConfFileTypes } from "./conf-file/register.ts"
import { registerCssFileTypes } from "./css-file/register.ts"
import { registerCsvFileTypes } from "./csv-file/register.ts"
import { registerDockerfileFileTypes } from "./dockerfile-file/register.ts"
import { registerEnvFileTypes } from "./env-file/register.ts"
import { registerHtmlFileTypes } from "./html-file/register.ts"
import { registerIgnoreFileTypes } from "./ignore-file/register.ts"
import { registerImageFileTypes } from "./image-file/register.ts"
import { registerJsFileTypes } from "./js-file/register.ts"
import { registerJsonFileTypes } from "./json-file/register.ts"
import { registerLockFileTypes } from "./lock-file/register.ts"
import { registerLuaFileTypes } from "./lua-file/register.ts"
import { registerMdFileTypes } from "./md-file/register.ts"
import { registerPythonFileTypes } from "./python-file/register.ts"
import { registerRustFileTypes } from "./rust-file/register.ts"
import { registerShFileTypes } from "./sh-file/register.ts"
import { registerSopsConfigFileTypes } from "./sops-config-file/register.ts"
import { registerSqlFileTypes } from "./sql-file/register.ts"
import { registerSwiftFileTypes } from "./swift-file/register.ts"
import { registerSystemdUnitFileTypes } from "./systemd-unit-file/register.ts"
import { registerTomlFileTypes } from "./toml-file/register.ts"
import { registerTsFileTypes } from "./ts-file/register.ts"
import { registerTsconfigFileTypes } from "./tsconfig-file/register.ts"
import { registerTxtFileTypes } from "./txt-file/register.ts"
import { registerXmlFileTypes } from "./xml-file/register.ts"
import { registerYamlFileTypes } from "./yaml-file/register.ts"

export const registerFileNodeTypes = (engine: Engine): undefined => {
  registerTsFileTypes(engine)
  registerJsFileTypes(engine)
  registerCssFileTypes(engine)
  registerMdFileTypes(engine)
  registerYamlFileTypes(engine)
  registerLuaFileTypes(engine)
  registerSqlFileTypes(engine)
  registerJsonFileTypes(engine)
  registerShFileTypes(engine)
  registerRustFileTypes(engine)
  registerTomlFileTypes(engine)
  registerSwiftFileTypes(engine)
  registerDockerfileFileTypes(engine)
  registerSystemdUnitFileTypes(engine)
  registerTxtFileTypes(engine)
  registerLockFileTypes(engine)
  registerTsconfigFileTypes(engine)
  registerImageFileTypes(engine)
  registerXmlFileTypes(engine)
  registerHtmlFileTypes(engine)
  registerPythonFileTypes(engine)
  registerCsvFileTypes(engine)
  registerCertificateFileTypes(engine)
  registerEnvFileTypes(engine)
  registerConfFileTypes(engine)
  registerIgnoreFileTypes(engine)
  registerSopsConfigFileTypes(engine)
  registerBiomeConfigFileTypes(engine)
}
