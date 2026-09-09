use std::fs;
use std::io::Write;
use std::path::{Path, PathBuf};
use std::time::Duration;

use directories::BaseDirs;

use crate::logger::log_info;
#[cfg(windows)]
use crate::logger::log_error;
#[cfg(windows)]
use std::process::Command;

#[cfg(windows)]
const CREATE_NO_WINDOW: u32 = 0x0800_0000;

const BOOTSTRAP_TIMEOUT: Duration = Duration::from_secs(120);

pub const WORKER_EXE_NAME: &str = "temper-watcher-worker.exe";

pub fn worker_path(install_dir: &Path) -> PathBuf {
    install_dir.join(WORKER_EXE_NAME)
}

pub fn bootstrap_worker_if_missing(server_url: &str, install_dir: &Path) -> Result<(), String> {
    let dest = worker_path(install_dir);
    if dest.exists() {
        return Ok(());
    }

    log_info(&format!(
        "Worker missing at {}. Bootstrapping from {}.",
        dest.display(),
        server_url
    ));

    let url = format!("{server_url}/api/watcher/worker/download");
    let client = reqwest::blocking::Client::builder()
        .timeout(BOOTSTRAP_TIMEOUT)
        .build()
        .map_err(|e| format!("Failed to build HTTP client: {e}"))?;

    let mut response = client
        .get(&url)
        .send()
        .map_err(|e| format!("GET {url} failed: {e}"))?;

    if !response.status().is_success() {
        return Err(format!(
            "GET {url} returned HTTP {}",
            response.status().as_u16()
        ));
    }

    let tmp = install_dir.join(format!("{WORKER_EXE_NAME}.new"));
    {
        let mut file = fs::File::create(&tmp)
            .map_err(|e| format!("Failed to create {}: {e}", tmp.display()))?;
        let bytes = response
            .copy_to(&mut file)
            .map_err(|e| format!("Failed to stream worker bytes: {e}"))?;
        file.flush()
            .map_err(|e| format!("Failed to flush worker bytes: {e}"))?;
        log_info(&format!("Downloaded worker: {bytes} bytes."));
    }

    fs::rename(&tmp, &dest).map_err(|e| {
        format!(
            "Failed to rename {} -> {}: {e}",
            tmp.display(),
            dest.display()
        )
    })?;

    log_info(&format!("Worker bootstrapped at {}.", dest.display()));
    Ok(())
}

fn startup_shortcut_path() -> Option<PathBuf> {
    let base = BaseDirs::new()?;
    let appdata = base.data_dir();
    Some(
        appdata
            .join("Microsoft")
            .join("Windows")
            .join("Start Menu")
            .join("Programs")
            .join("Startup")
            .join("Temper Watcher.lnk"),
    )
}

#[cfg(windows)]
pub fn ensure_autostart_shortcut(exe_path: &Path) -> Result<(), String> {
    use std::os::windows::process::CommandExt;

    let Some(shortcut) = startup_shortcut_path() else {
        return Err("Could not resolve %APPDATA% via BaseDirs.".to_string());
    };
    if shortcut.exists() {
        return Ok(());
    }

    if let Some(parent) = shortcut.parent() {
        let _ = fs::create_dir_all(parent);
    }

    let shortcut_str = shortcut
        .to_str()
        .ok_or_else(|| format!("Non-UTF-8 shortcut path: {}", shortcut.display()))?;
    let exe_str = exe_path
        .to_str()
        .ok_or_else(|| format!("Non-UTF-8 exe path: {}", exe_path.display()))?;

    let shortcut_ps = shortcut_str.replace('\'', "''");
    let exe_ps = exe_str.replace('\'', "''");

    let ps = format!(
        "$ws = New-Object -ComObject WScript.Shell; \
         $s = $ws.CreateShortcut('{shortcut_ps}'); \
         $s.TargetPath = '{exe_ps}'; \
         $s.Description = 'Temper SavedVariables Watcher'; \
         $s.Save()"
    );

    let status = Command::new("powershell")
        .args(["-NoProfile", "-NonInteractive", "-Command", &ps])
        .creation_flags(CREATE_NO_WINDOW)
        .status()
        .map_err(|e| format!("Failed to spawn powershell: {e}"))?;

    if !status.success() {
        let code = status.code().unwrap_or(-1);
        log_error(&format!(
            "PowerShell exited with status {code} while creating startup shortcut."
        ));
        return Err(format!("powershell exited with status {code}"));
    }

    log_info(&format!(
        "Startup shortcut created at {}.",
        shortcut.display()
    ));
    Ok(())
}

#[cfg(not(windows))]
pub fn ensure_autostart_shortcut(_exe_path: &Path) -> Result<(), String> {
    Ok(())
}
