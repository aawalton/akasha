use std::io::Cursor;
use std::path::{Path, PathBuf};
use std::process::Command;

use tray_icon::menu::{Menu, MenuEvent, MenuId, MenuItem};
use tray_icon::{Icon, TrayIcon, TrayIconBuilder};
use winit::application::ApplicationHandler;
use winit::event_loop::{ActiveEventLoop, EventLoop};
use winit::window::WindowId;

use crate::logger::{log_error, log_info};
use crate::supervisor::Supervisor;

const ICON_BYTES: &[u8] = include_bytes!("../assets/icon.ico");

#[cfg(windows)]
const CREATE_NO_WINDOW: u32 = 0x0800_0000;

const MENU_ID_QUIT: &str = "quit";
const MENU_ID_OPEN_LOGS: &str = "open_logs";
const MENU_ID_OPEN_SAVED_VARS: &str = "open_saved_vars";

#[derive(Debug)]
pub enum UserEvent {
    Menu(MenuEvent),
    Tray(tray_icon::TrayIconEvent),
}

pub struct TrayApp {
    tray_icon: Option<TrayIcon>,
    version: String,
    supervisor: Supervisor,
    worker_log_path: PathBuf,
    saved_vars_dir: Option<PathBuf>,
}

impl TrayApp {
    pub fn new(
        version: String,
        supervisor: Supervisor,
        worker_log_path: PathBuf,
        saved_vars_dir: Option<PathBuf>,
    ) -> Self {
        Self {
            tray_icon: None,
            version,
            supervisor,
            worker_log_path,
            saved_vars_dir,
        }
    }

    fn build_menu() -> Menu {
        let menu = Menu::new();

        let open_logs = MenuItem::with_id(MENU_ID_OPEN_LOGS, "Open Logs", true, None);
        let open_sv = MenuItem::with_id(
            MENU_ID_OPEN_SAVED_VARS,
            "Open SavedVariables Folder",
            true,
            None,
        );
        let quit = MenuItem::with_id(MENU_ID_QUIT, "Quit", true, None);

        if let Err(e) = menu.append(&open_logs) {
            log_error(&format!("Failed to append Open Logs item: {e}"));
        }
        if let Err(e) = menu.append(&open_sv) {
            log_error(&format!("Failed to append Open SavedVariables item: {e}"));
        }
        if let Err(e) = menu.append(&quit) {
            log_error(&format!("Failed to append Quit item: {e}"));
        }

        menu
    }

    fn build_tray(&self) -> Result<TrayIcon, String> {
        let icon = load_embedded_icon()?;
        TrayIconBuilder::new()
            .with_menu(Box::new(Self::build_menu()))
            .with_tooltip(format!("Temper Watcher v{}", self.version))
            .with_icon(icon)
            .build()
            .map_err(|e| format!("Failed to build tray icon: {e}"))
    }

    fn handle_menu_event(&self, event_loop: &ActiveEventLoop, id: &MenuId) {
        match id.as_ref() {
            MENU_ID_QUIT => {
                log_info("Quit clicked. Terminating worker and exiting.");
                self.supervisor.quit();
                event_loop.exit();
            }
            MENU_ID_OPEN_LOGS => {
                open_in_notepad(&self.worker_log_path);
            }
            MENU_ID_OPEN_SAVED_VARS => match &self.saved_vars_dir {
                Some(dir) => open_in_explorer(dir),
                None => log_error("Open SavedVariables: no resolved directory."),
            },
            other => {
                log_error(&format!("Unknown menu id clicked: {other}"));
            }
        }
    }
}

impl ApplicationHandler<UserEvent> for TrayApp {
    fn resumed(&mut self, _event_loop: &ActiveEventLoop) {}

    fn window_event(
        &mut self,
        _event_loop: &ActiveEventLoop,
        _id: WindowId,
        _event: winit::event::WindowEvent,
    ) {
    }

    fn new_events(&mut self, _event_loop: &ActiveEventLoop, cause: winit::event::StartCause) {
        if cause == winit::event::StartCause::Init && self.tray_icon.is_none() {
            match self.build_tray() {
                Ok(tray) => self.tray_icon = Some(tray),
                Err(e) => log_error(&format!("Failed to create tray icon: {e}")),
            }
        }
    }

    fn user_event(&mut self, event_loop: &ActiveEventLoop, event: UserEvent) {
        match event {
            UserEvent::Menu(menu_event) => self.handle_menu_event(event_loop, &menu_event.id),
            UserEvent::Tray(_) => {
            }
        }
    }
}

pub fn install_event_handlers(event_loop: &EventLoop<UserEvent>) {
    let proxy = event_loop.create_proxy();
    tray_icon::TrayIconEvent::set_event_handler(Some(move |event| {
        let _ = proxy.send_event(UserEvent::Tray(event));
    }));

    let proxy = event_loop.create_proxy();
    MenuEvent::set_event_handler(Some(move |event| {
        let _ = proxy.send_event(UserEvent::Menu(event));
    }));
}

fn load_embedded_icon() -> Result<Icon, String> {
    let img = image::load(Cursor::new(ICON_BYTES), image::ImageFormat::Ico)
        .map_err(|e| format!("Failed to decode embedded ICO: {e}"))?
        .into_rgba8();
    let (w, h) = img.dimensions();
    let rgba = img.into_raw();
    Icon::from_rgba(rgba, w, h).map_err(|e| format!("Icon::from_rgba failed: {e}"))
}

#[cfg(windows)]
fn open_in_notepad(path: &Path) {
    use std::os::windows::process::CommandExt;

    log_info(&format!("Opening log in notepad: {}.", path.display()));

    let result = Command::new("notepad.exe")
        .arg(path)
        .creation_flags(CREATE_NO_WINDOW)
        .spawn();

    if let Err(e) = result {
        log_error(&format!("Failed to launch notepad: {e}"));
    }
}

#[cfg(not(windows))]
fn open_in_notepad(path: &Path) {
    log_info(&format!(
        "open_in_notepad called on non-Windows for {}.",
        path.display()
    ));
}

#[cfg(windows)]
fn open_in_explorer(path: &Path) {
    use std::os::windows::process::CommandExt;

    log_info(&format!("Opening folder in explorer: {}.", path.display()));

    let result = Command::new("explorer.exe")
        .arg(path)
        .creation_flags(CREATE_NO_WINDOW)
        .spawn();

    if let Err(e) = result {
        log_error(&format!("Failed to launch explorer: {e}"));
    }
}

#[cfg(not(windows))]
fn open_in_explorer(path: &Path) {
    log_info(&format!(
        "open_in_explorer called on non-Windows for {}.",
        path.display()
    ));
}

pub fn resolve_saved_vars_dir() -> Option<PathBuf> {
    let user_profile = std::env::var_os("USERPROFILE")?;
    let user_profile = PathBuf::from(user_profile);

    let eso_subpath: PathBuf = ["Documents", "Elder Scrolls Online", "live", "SavedVariables"]
        .iter()
        .collect();

    let onedrive = user_profile.join("OneDrive").join(&eso_subpath);
    if onedrive.is_dir() {
        return Some(onedrive);
    }

    let direct = user_profile.join(&eso_subpath);
    if direct.is_dir() {
        return Some(direct);
    }

    None
}
