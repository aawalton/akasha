import "akasha/temper/eso-types/eso-extra/eso-extra.type-declaration.d.ts"
import "akasha/temper/eso-types/eso-functions-01/eso-functions-01.type-declaration.d.ts"
import "akasha/temper/eso-types/eso-functions-02/eso-functions-02.type-declaration.d.ts"
import "akasha/temper/eso-types/eso-functions-08/eso-functions-08.type-declaration.d.ts"
import "akasha/temper/eso-types/eso-objects-01/eso-objects-01.type-declaration.d.ts"
import "akasha/temper/eso-types/eso-ui-2/eso-ui-2.type-declaration.d.ts"
import "akasha/temper/eso-types/eso-lua-sandbox/eso-lua-sandbox.type-declaration.d.ts"
import "akasha/temper/eso-types/lua-language-extensions/lua-language-extensions.type-declaration.d.ts"
import { portToFriend } from "../housing-state/housing-state.module.code.ts"

interface HouseControls {
  editbox: EditControl
}
function asHouseControls(value: unknown): HouseControls {
  return value as HouseControls
}

function parseCmd(this: void, cmd: string, param: string): LuaMultiReturn<[string, string]> {
  param = zo_strtrim(param)
  cmd = zo_strtrim(cmd)

  const [cmdIndex] = string.find(param, " ")
  if (cmdIndex !== undefined) {
    cmd = zo_strtrim(string.sub(param, 1, cmdIndex))
    param = zo_strtrim(string.sub(param, cmdIndex + 1))
  } else {
    cmd = param
    param = ""
  }
  return $multi(cmd, param)
}
portToFriend.ParseCmd = parseCmd

function portToMainResidence(this: void): undefined {
  const house = asHouseControls(portToFriend.controls.house)
  let name = house.editbox.GetText()
  if (
    string.lower(name) === string.lower(GetUnitName("player")) ||
    string.lower(name) === string.lower(GetDisplayName()) ||
    name === undefined ||
    zo_strtrim(name) === ""
  ) {
    name = GetDisplayName()
  }
  portToFriend.JumpToDefaultHouse(name)
}
portToFriend.PortToMainResidence = portToMainResidence

function jumpToDefaultHouse(this: void, player: string): undefined {
  if (player !== undefined && player !== "") {
    if (player === GetDisplayName() || player === undefined || zo_strtrim(player) === "") {
    } else {
      JumpToHouse(player)
    }
  }
}
portToFriend.JumpToDefaultHouse = jumpToDefaultHouse
