declare global {
  var TemperHud:
    | {
        registerCommand: (
          this: void,
          command: {
            name: string
            description: string
            addon: string
            handler?: (this: void, args: string) => undefined
          }
        ) => undefined
      }
    | undefined
}

function ww_str(key: string): string {
  const str = TemperWrit.Str
  return (str !== undefined ? str(key) : undefined) ?? key
}

export function forget(this: void): undefined {
  const sc = TemperWrit.savedChariables
  if (sc !== undefined) {
    sc.writ_unique_id = {}
  }
}

export function serverName(this: void): string {
  let name = TemperWrit.server_name
  if (name === undefined) {
    name = "NA"
    const plat = GetCVar("LastPlatform")
    if (plat === "Live-EU") {
      name = "EU"
    }
    TemperWrit.server_name = name
  }
  return name
}

export function port(this: void): undefined {
  let owner = "@ziggr"
  let house_id = 46
  if (serverName() === "NA") {
  } else {
    owner = "@PhnxZ"
    house_id = 80
  }

  const house_collectible_id = GetCollectibleIdForHouse(house_id)
  const house_name = zo_strformat("<<1>>", GetCollectibleName(house_collectible_id))
  const fmt = ww_str("msg_port_house")
  TemperWrit.Log?.Info(fmt, owner, house_id)

  if (owner === GetDisplayName()) {
    RequestJumpToHouse(house_id)
  } else {
    JumpToSpecificHouse(owner, house_id)
  }
}

export function slashCommand(this: void, arg1: string): undefined {
  arg1 = string.lower(arg1)
  if (arg1 === string.lower(ww_str("slash_discover"))) {
    d("|c999999TemperWrit: " + ww_str("status_discover") + "|r")
    TemperWrit.Smithing?.Discover()
    TemperWrit.DiscoverI18N?.()
  } else if (arg1 === string.lower(ww_str("slash_forget"))) {
    d("|c999999TemperWrit: " + ww_str("status_forget") + "|r")
    TemperWrit.Forget?.()
  } else if (arg1 === string.lower(ww_str("slash_port"))) {
    TemperWrit.Port?.()
  } else if (arg1 === string.lower(ww_str("slash_count"))) {
    const mwlist = TemperWrit.ScanInventoryForMasterWrits?.() ?? []
    const mw_ct = mwlist.length
    let voucher_ct = 0
    for (const mw of mwlist) {
      const vc = TemperWrit.ToVoucherCount?.(mw.item_link) ?? 0
      voucher_ct = voucher_ct + vc
    }
    d(
      string.format(
        "|c999999TemperWrit: " + ww_str("count_writs_vouchers") + "|r",
        mw_ct,
        TemperWrit.Util?.ToMoney(voucher_ct) ?? ""
      )
    )
  } else if (arg1 === string.lower(ww_str("slash_auto"))) {
    if (TemperWrit_AutoQuest !== undefined) {
      TemperWrit_AutoQuest()
    }
  } else {
    slashCommand(ww_str("slash_count"))
  }
}

export function registerSlashCommands(this: void): undefined {
  const lsc = LibSlashCommander
  if (lsc !== undefined) {
    const cmd = lsc.Register(
      "/temperwrit",
      (arg: string) => {
        slashCommand(arg)
      },
      ww_str("slash_writworthy_desc")
    )

    const sub_forget = cmd.RegisterSubCommand()
    sub_forget.AddAlias(ww_str("slash_forget"))
    sub_forget.SetCallback(() => {
      slashCommand(ww_str("slash_forget"))
    })
    sub_forget.SetDescription(ww_str("slash_forget_desc"))

    const sub_count = cmd.RegisterSubCommand()
    sub_count.AddAlias(ww_str("slash_count"))
    sub_count.SetCallback(() => {
      slashCommand(ww_str("slash_count"))
    })
    sub_count.SetDescription(ww_str("slash_count_desc"))

    const sub_port = cmd.RegisterSubCommand()
    sub_port.AddAlias(ww_str("slash_port"))
    sub_port.SetCallback(() => {
      slashCommand(ww_str("slash_port"))
    })
    sub_port.SetDescription(ww_str("slash_port_desc"))

    if (GetDisplayName() === "@ziggr") {
      const sub_discover = cmd.RegisterSubCommand()
      sub_discover.AddAlias(ww_str("slash_discover"))
      sub_discover.SetCallback(() => {
        slashCommand(ww_str("slash_discover"))
      })
      sub_discover.SetDescription(ww_str("slash_discover_desc"))
    }

    if (TemperWrit.AQAddKeyBind !== undefined) {
      const sub_auto = cmd.RegisterSubCommand()
      sub_auto.AddAlias(ww_str("slash_auto"))
      sub_auto.SetCallback(() => {
        slashCommand(ww_str("slash_auto"))
      })
      sub_auto.SetDescription(ww_str("slash_auto_desc"))
    }
  } else {
    SLASH_COMMANDS["/temperwrit"] = slashCommand
  }

  globalThis.TemperHud?.registerCommand({
    name: "/temperwrit",
    description: "Master-writ crafting helper",
    addon: "TemperCrafting",
  })
}

TemperWrit.Forget = forget
TemperWrit.ServerName = serverName
TemperWrit.Port = port
TemperWrit.SlashCommand = slashCommand
TemperWrit.RegisterSlashCommands = registerSlashCommands
