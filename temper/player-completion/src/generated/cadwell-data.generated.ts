/**
 * Cadwell's Almanac Static Data (Generated)
 *
 * 3 levels, 15 zones, 78 POIs
 *
 * apiVersion: eso.live.12.0.6.3274791
 * DO NOT EDIT — regenerate with: ops temper catalog generate cadwell
 */

interface CadwellPOIData {
  poiIndex: number
  name: string
}

interface CadwellZoneData {
  zoneIndex: number
  name: string
  pois: readonly CadwellPOIData[]
}

interface CadwellLevelData {
  level: number
  label: string
  zones: readonly CadwellZoneData[]
}

export const cadwellData: CadwellLevelData[] = [
  {
    "level": 0,
    "label": "Level 0",
    "zones": [
      {
        "zoneIndex": 1,
        "name": "Auridon",
        "pois": [
          {
            "poiIndex": 4,
            "name": "Vulkhel Guard"
          },
          {
            "poiIndex": 1,
            "name": "Tanzelwil"
          },
          {
            "poiIndex": 5,
            "name": "Mathiisen"
          },
          {
            "poiIndex": 3,
            "name": "Skywatch"
          },
          {
            "poiIndex": 2,
            "name": "Firsthold"
          }
        ]
      },
      {
        "zoneIndex": 2,
        "name": "Grahtwood",
        "pois": [
          {
            "poiIndex": 2,
            "name": "Southpoint"
          },
          {
            "poiIndex": 1,
            "name": "Reliquary of Stars"
          },
          {
            "poiIndex": 3,
            "name": "Falinesti Winter Site"
          },
          {
            "poiIndex": 4,
            "name": "Elden Root"
          }
        ]
      },
      {
        "zoneIndex": 3,
        "name": "Greenshade",
        "pois": [
          {
            "poiIndex": 4,
            "name": "Bramblebreach"
          },
          {
            "poiIndex": 3,
            "name": "Greenheart"
          },
          {
            "poiIndex": 5,
            "name": "Woodhearth"
          },
          {
            "poiIndex": 1,
            "name": "Seaside Sanctuary"
          },
          {
            "poiIndex": 6,
            "name": "Dread Vullain"
          },
          {
            "poiIndex": 7,
            "name": "Verrant Morass"
          },
          {
            "poiIndex": 8,
            "name": "Driladan Pass"
          },
          {
            "poiIndex": 2,
            "name": "Hectahame"
          }
        ]
      },
      {
        "zoneIndex": 4,
        "name": "Malabal Tor",
        "pois": [
          {
            "poiIndex": 4,
            "name": "Velyn Harbor"
          },
          {
            "poiIndex": 2,
            "name": "Dra'bul"
          },
          {
            "poiIndex": 3,
            "name": "Jathsogur"
          },
          {
            "poiIndex": 1,
            "name": "Silvenar"
          }
        ]
      },
      {
        "zoneIndex": 5,
        "name": "Reaper's March",
        "pois": [
          {
            "poiIndex": 4,
            "name": "Fort Grimwatch"
          },
          {
            "poiIndex": 5,
            "name": "Arenthia"
          },
          {
            "poiIndex": 2,
            "name": "Rawl'kha"
          },
          {
            "poiIndex": 1,
            "name": "Moonmont"
          },
          {
            "poiIndex": 6,
            "name": "Dune"
          },
          {
            "poiIndex": 3,
            "name": "Two Moons Path"
          }
        ]
      }
    ]
  },
  {
    "level": 1,
    "label": "Silver",
    "zones": [
      {
        "zoneIndex": 4,
        "name": "Stonefalls",
        "pois": [
          {
            "poiIndex": 4,
            "name": "Davon's Watch"
          },
          {
            "poiIndex": 5,
            "name": "Othrenis"
          },
          {
            "poiIndex": 2,
            "name": "Ash Mountain"
          },
          {
            "poiIndex": 6,
            "name": "Vivec's Antlers"
          },
          {
            "poiIndex": 1,
            "name": "Fort Virak"
          },
          {
            "poiIndex": 7,
            "name": "Kragenmoor"
          },
          {
            "poiIndex": 3,
            "name": "Tormented Spire"
          }
        ]
      },
      {
        "zoneIndex": 1,
        "name": "Deshaan",
        "pois": [
          {
            "poiIndex": 1,
            "name": "Obsidian Gorge"
          },
          {
            "poiIndex": 4,
            "name": "Mournhold"
          },
          {
            "poiIndex": 3,
            "name": "Tribunal Temple"
          },
          {
            "poiIndex": 5,
            "name": "Shrine of Saint Veloth"
          },
          {
            "poiIndex": 2,
            "name": "Eidolon's Hollow"
          }
        ]
      },
      {
        "zoneIndex": 3,
        "name": "Shadowfen",
        "pois": [
          {
            "poiIndex": 4,
            "name": "Stormhold"
          },
          {
            "poiIndex": 1,
            "name": "Ten-Maur-Wolk"
          },
          {
            "poiIndex": 2,
            "name": "Hatching Pools"
          },
          {
            "poiIndex": 3,
            "name": "Loriasel"
          }
        ]
      },
      {
        "zoneIndex": 2,
        "name": "Eastmarch",
        "pois": [
          {
            "poiIndex": 3,
            "name": "Windhelm"
          },
          {
            "poiIndex": 4,
            "name": "Cradlecrush"
          },
          {
            "poiIndex": 5,
            "name": "Fort Amol"
          },
          {
            "poiIndex": 6,
            "name": "Wittestadr"
          },
          {
            "poiIndex": 1,
            "name": "Mistwatch"
          },
          {
            "poiIndex": 7,
            "name": "Jorunn's Stand"
          },
          {
            "poiIndex": 2,
            "name": "Skuldafn"
          }
        ]
      },
      {
        "zoneIndex": 5,
        "name": "The Rift",
        "pois": [
          {
            "poiIndex": 1,
            "name": "Vernim Woods"
          },
          {
            "poiIndex": 4,
            "name": "Taarengrav"
          },
          {
            "poiIndex": 5,
            "name": "Pinepeak Cavern"
          },
          {
            "poiIndex": 2,
            "name": "Honrich Tower"
          },
          {
            "poiIndex": 3,
            "name": "Trolhetta"
          }
        ]
      }
    ]
  },
  {
    "level": 2,
    "label": "Gold",
    "zones": [
      {
        "zoneIndex": 3,
        "name": "Glenumbra",
        "pois": [
          {
            "poiIndex": 2,
            "name": "Beldama Wyrd Tree"
          },
          {
            "poiIndex": 1,
            "name": "Camlorn"
          },
          {
            "poiIndex": 4,
            "name": "Lion Guard Redoubt"
          },
          {
            "poiIndex": 3,
            "name": "Cath Bedraud"
          }
        ]
      },
      {
        "zoneIndex": 5,
        "name": "Stormhaven",
        "pois": [
          {
            "poiIndex": 4,
            "name": "Alcaire Keep"
          },
          {
            "poiIndex": 3,
            "name": "Firebrand Keep"
          },
          {
            "poiIndex": 5,
            "name": "Pariah Abbey"
          },
          {
            "poiIndex": 2,
            "name": "at-Tura Estate"
          },
          {
            "poiIndex": 1,
            "name": "Shinji's Scarp"
          }
        ]
      },
      {
        "zoneIndex": 4,
        "name": "Rivenspire",
        "pois": [
          {
            "poiIndex": 4,
            "name": "Shornhelm"
          },
          {
            "poiIndex": 5,
            "name": "Ravenwatch Castle"
          },
          {
            "poiIndex": 1,
            "name": "Camp Tamrith"
          },
          {
            "poiIndex": 2,
            "name": "Lorkrata Hills"
          },
          {
            "poiIndex": 6,
            "name": "Northpoint"
          },
          {
            "poiIndex": 3,
            "name": "The Doomcrag"
          }
        ]
      },
      {
        "zoneIndex": 1,
        "name": "Alik'r Desert",
        "pois": [
          {
            "poiIndex": 4,
            "name": "Sentinel"
          },
          {
            "poiIndex": 3,
            "name": "Tu'whacca's Throne"
          },
          {
            "poiIndex": 1,
            "name": "Tava's Blessing"
          },
          {
            "poiIndex": 2,
            "name": "Motalion Necropolis"
          }
        ]
      },
      {
        "zoneIndex": 2,
        "name": "Bangkorai",
        "pois": [
          {
            "poiIndex": 4,
            "name": "Evermore"
          },
          {
            "poiIndex": 1,
            "name": "Jackdaw Cove"
          },
          {
            "poiIndex": 2,
            "name": "Bangkorai Garrison"
          },
          {
            "poiIndex": 3,
            "name": "Hall of Heroes"
          }
        ]
      }
    ]
  }
]
