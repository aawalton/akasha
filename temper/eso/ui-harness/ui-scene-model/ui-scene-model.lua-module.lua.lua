local _G = _G
local setmetatable = setmetatable
local ipairs = ipairs
local pcall = pcall
local insert = table.insert

local SHOWING = "showing"
local SHOWN = "shown"
local HIDING = "hiding"
local HIDDEN = "hidden"

_G.SCENE_SHOWING = SHOWING
_G.SCENE_SHOWN = SHOWN
_G.SCENE_HIDING = HIDING
_G.SCENE_HIDDEN = HIDDEN

local scenes = {}

local Scene = {}
Scene.__index = Scene

local function told(scene, was, now)
  local held = scene.uiCallbacks.StateChange
  if held == nil then return end
  for _, callback in ipairs(held) do pcall(callback, was, now) end
end

local function moved(scene, now)
  local was = scene.uiState
  if was == now then return scene end
  scene.uiState = now
  told(scene, was, now)
  return scene
end

function Scene:GetName() return self.uiName end
function Scene:GetState() return self.uiState end
function Scene:IsShowing() return self.uiState == SHOWN or self.uiState == SHOWING end
function Scene:HasFragment(fragment)
  for _, held in ipairs(self.uiFragments) do
    if held == fragment then return true end
  end
  return false
end
function Scene:AddFragment(fragment)
  if fragment == nil or self:HasFragment(fragment) then return end
  insert(self.uiFragments, fragment)
end
function Scene:RemoveFragment(fragment)
  for at, held in ipairs(self.uiFragments) do
    if held == fragment then
      table.remove(self.uiFragments, at)
      return
    end
  end
end
function Scene:RegisterCallback(event, callback)
  local held = self.uiCallbacks[event]
  if held == nil then
    held = {}
    self.uiCallbacks[event] = held
  end
  insert(held, callback)
end
function Scene:UnregisterCallback(event, callback)
  local held = self.uiCallbacks[event]
  if held == nil then return end
  for at, one in ipairs(held) do
    if one == callback then
      table.remove(held, at)
      return
    end
  end
end

local function sceneNamed(name)
  local held = scenes[name]
  if held == nil then
    held = setmetatable({
      uiName = name,
      uiState = HIDDEN,
      uiCallbacks = {},
      uiFragments = {},
    }, Scene)
    scenes[name] = held
  end
  return held
end

local SceneManager = {}

function SceneManager:GetScene(name) return sceneNamed(name) end
function SceneManager:SetInUIMode(mode) self.uiMode = mode and true or false end
function SceneManager:IsInUIMode() return self.uiMode == true end
function SceneManager:GetCurrentScene() return self.uiCurrent end
function SceneManager:GetCurrentSceneName()
  return self.uiCurrent ~= nil and self.uiCurrent.uiName or nil
end
function SceneManager:IsShowing(name) return sceneNamed(name):IsShowing() end
function SceneManager:Show(name)
  local scene = sceneNamed(name)
  moved(scene, SHOWING)
  moved(scene, SHOWN)
  self.uiCurrent = scene
  return scene
end
function SceneManager:Hide(name)
  local scene = sceneNamed(name)
  moved(scene, HIDING)
  moved(scene, HIDDEN)
  if self.uiCurrent == scene then self.uiCurrent = nil end
  return scene
end

_G.SCENE_MANAGER = SceneManager

local Fragment = {}
Fragment.__index = Fragment

function Fragment:GetControl() return self.uiControl end

local function fragmentOver(control)
  return setmetatable({ uiControl = control }, Fragment)
end

_G.ZO_SimpleSceneFragment = {}

function _G.ZO_SimpleSceneFragment.New(first, second)
  if second ~= nil then return fragmentOver(second) end
  if first == _G.ZO_SimpleSceneFragment then return fragmentOver(nil) end
  return fragmentOver(first)
end

_G.ZO_SceneFragment = _G.ZO_SimpleSceneFragment
_G.ZO_HUDFadeSceneFragment = _G.ZO_SimpleSceneFragment

function _G.__ui_scene(name, state)
  if state == SHOWN then return SceneManager:Show(name):GetState() end
  if state == HIDDEN then return SceneManager:Hide(name):GetState() end
  return moved(sceneNamed(name), state):GetState()
end

function _G.__ui_scenes()
  local found = {}
  for name, scene in pairs(scenes) do found[name] = scene.uiState end
  return found
end
