use std::fs::{self, OpenOptions};
use std::io::Write;
use std::path::PathBuf;
use std::sync::Mutex;
use std::time::{SystemTime, UNIX_EPOCH};

use directories::BaseDirs;

const MAX_LOG_BYTES: u64 = 1024 * 1024;

const KEEP_FILES: usize = 3;

static LOG_LOCK: Mutex<()> = Mutex::new(());

fn temper_dir() -> Option<PathBuf> {
    BaseDirs::new().map(|b| b.data_local_dir().join("TemperWatcher"))
}

fn log_path() -> Option<PathBuf> {
    temper_dir().map(|d| d.join("tray.log"))
}

fn archive_path(n: usize) -> Option<PathBuf> {
    temper_dir().map(|d| d.join(format!("tray.{n}.log")))
}

fn iso8601_now() -> String {
    let secs = SystemTime::now()
        .duration_since(UNIX_EPOCH)
        .map(|d| d.as_secs())
        .unwrap_or(0);

    let mut days = (secs / 86_400) as i64;
    let secs_of_day = (secs % 86_400) as u32;

    let hour = secs_of_day / 3600;
    let minute = (secs_of_day / 60) % 60;
    let second = secs_of_day % 60;

    days += 719_468;
    let era = if days >= 0 { days } else { days - 146_096 } / 146_097;
    let doe = (days - era * 146_097) as u32;
    let yoe = (doe - doe / 1460 + doe / 36_524 - doe / 146_096) / 365;
    let y = (yoe as i64) + era * 400;
    let doy = doe - (365 * yoe + yoe / 4 - yoe / 100);
    let mp = (5 * doy + 2) / 153;
    let d = doy - (153 * mp + 2) / 5 + 1;
    let m = if mp < 10 { mp + 3 } else { mp - 9 };
    let y = if m <= 2 { y + 1 } else { y };

    format!("{y:04}-{m:02}-{d:02}T{hour:02}:{minute:02}:{second:02}Z")
}

fn maybe_rotate() {
    let Some(live) = log_path() else { return };
    let Ok(meta) = fs::metadata(&live) else { return };
    if meta.len() < MAX_LOG_BYTES {
        return;
    }

    if let Some(oldest) = archive_path(KEEP_FILES - 1) {
        let _ = fs::remove_file(&oldest);
    }
    for n in (1..KEEP_FILES - 1).rev() {
        if let (Some(from), Some(to)) = (archive_path(n), archive_path(n + 1)) {
            let _ = fs::rename(from, to);
        }
    }
    if let Some(first_archive) = archive_path(1) {
        let _ = fs::rename(&live, first_archive);
    }
}

fn write_line(level: &str, msg: &str) {
    let _guard = LOG_LOCK.lock().ok();

    let Some(dir) = temper_dir() else { return };
    if fs::create_dir_all(&dir).is_err() {
        return;
    }

    maybe_rotate();

    let Some(path) = log_path() else { return };
    let Ok(mut f) = OpenOptions::new().create(true).append(true).open(&path) else {
        return;
    };

    let _ = writeln!(f, "{} [{}] {}", iso8601_now(), level, msg);
}

pub fn log_info(msg: &str) {
    write_line("INFO", msg);
}

pub fn log_error(msg: &str) {
    write_line("ERROR", msg);
}
