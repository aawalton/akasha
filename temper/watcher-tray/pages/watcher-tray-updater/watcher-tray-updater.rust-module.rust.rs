use std::fs;
use std::io::Write;
use std::path::{Path, PathBuf};
use std::time::Duration;

use serde::Deserialize;

use crate::logger::{log_error, log_info};

const UPDATE_TIMEOUT: Duration = Duration::from_secs(120);

pub enum UpdateOutcome {
    UpToDate,
    UpdateApplied,
    CheckFailed(String),
}

#[derive(Deserialize)]
struct VersionResponse {
    version: String,
}

pub fn check_and_apply_tray_update(
    server_url: &str,
    current_version: &str,
    install_dir: &Path,
) -> UpdateOutcome {
    let client = match reqwest::blocking::Client::builder()
        .timeout(UPDATE_TIMEOUT)
        .build()
    {
        Ok(c) => c,
        Err(e) => return UpdateOutcome::CheckFailed(format!("Failed to build HTTP client: {e}")),
    };

    let version_url = format!("{server_url}/api/watcher/version");
    let response = match client.get(&version_url).send() {
        Ok(r) => r,
        Err(e) => return UpdateOutcome::CheckFailed(format!("GET {version_url} failed: {e}")),
    };

    if !response.status().is_success() {
        return UpdateOutcome::CheckFailed(format!(
            "GET {version_url} returned HTTP {}",
            response.status().as_u16()
        ));
    }

    let parsed: VersionResponse = match response.json() {
        Ok(p) => p,
        Err(e) => return UpdateOutcome::CheckFailed(format!("Bad version JSON: {e}")),
    };

    if parsed.version == current_version {
        log_info(&format!("Tray up to date at {current_version}."));
        return UpdateOutcome::UpToDate;
    }

    log_info(&format!(
        "Tray update available: {current_version} -> {}. Downloading.",
        parsed.version
    ));

    match apply_tray_update(&client, server_url, install_dir) {
        Ok(()) => UpdateOutcome::UpdateApplied,
        Err(e) => {
            log_error(&format!("Tray update failed: {e}"));
            UpdateOutcome::CheckFailed(e)
        }
    }
}

fn apply_tray_update(
    client: &reqwest::blocking::Client,
    server_url: &str,
    install_dir: &Path,
) -> Result<(), String> {
    let current = install_dir.join("temper-watcher.exe");
    let new_path = install_dir.join("temper-watcher.new.exe");
    let old_path = install_dir.join("temper-watcher.old.exe");

    let _ = fs::remove_file(&new_path);

    let download_url = format!("{server_url}/api/watcher/download");
    let mut response = client
        .get(&download_url)
        .send()
        .map_err(|e| format!("GET {download_url} failed: {e}"))?;

    if !response.status().is_success() {
        return Err(format!(
            "GET {download_url} returned HTTP {}",
            response.status().as_u16()
        ));
    }

    {
        let mut file = fs::File::create(&new_path)
            .map_err(|e| format!("Failed to create {}: {e}", new_path.display()))?;
        let bytes = response
            .copy_to(&mut file)
            .map_err(|e| format!("Failed to stream new tray bytes: {e}"))?;
        file.flush()
            .map_err(|e| format!("Failed to flush new tray bytes: {e}"))?;
        log_info(&format!("Downloaded new tray binary: {bytes} bytes."));
    }

    let _ = fs::remove_file(&old_path);

    fs::rename(&current, &old_path).map_err(|e| {
        format!(
            "Failed to rename running exe out of the way ({} -> {}): {e}",
            current.display(),
            old_path.display()
        )
    })?;
    fs::rename(&new_path, &current).map_err(|e| {
        format!(
            "Failed to rename new exe into place ({} -> {}): {e}",
            new_path.display(),
            current.display()
        )
    })?;

    log_info("Tray update applied. Exiting; new tray will start at next login.");
    Ok(())
}

pub fn cleanup_old_tray(install_dir: &Path) {
    let old = install_dir.join("temper-watcher.old.exe");
    if !old.exists() {
        return;
    }

    match fs::remove_file(&old) {
        Ok(()) => log_info(&format!("Removed stale {}.", old.display())),
        Err(e) => log_error(&format!("Could not remove {}: {e}", old.display())),
    }
}

pub fn install_dir() -> PathBuf {
    std::env::current_exe()
        .ok()
        .and_then(|p| p.parent().map(|p| p.to_path_buf()))
        .unwrap_or_else(|| PathBuf::from("."))
}
