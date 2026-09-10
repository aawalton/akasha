use std::path::{Path, PathBuf};
use std::process::{Child, Command, Stdio};
use std::sync::atomic::{AtomicBool, Ordering};
use std::sync::{Arc, Mutex};
use std::thread;
use std::time::Duration;

use crate::logger::{log_error, log_info};

#[cfg(windows)]
const WORKER_CREATION_FLAGS: u32 = 0x0000_0008 | 0x0800_0000;

pub struct Supervisor {
    pub should_quit: Arc<AtomicBool>,
    current_child: Arc<Mutex<Option<Child>>>,
    worker_path: PathBuf,
}

impl Supervisor {
    pub fn new(worker_path: &Path) -> Self {
        Self {
            should_quit: Arc::new(AtomicBool::new(false)),
            current_child: Arc::new(Mutex::new(None)),
            worker_path: worker_path.to_path_buf(),
        }
    }

    pub fn start(&self) -> Result<(), String> {
        let initial = spawn_worker(&self.worker_path)?;
        *self.current_child.lock().unwrap() = Some(initial);
        log_info(&format!(
            "Worker spawned: {}.",
            self.worker_path.display()
        ));

        let should_quit = self.should_quit.clone();
        let current_child = self.current_child.clone();
        let worker_path = self.worker_path.clone();

        thread::Builder::new()
            .name("temper-watcher-tray-supervisor".to_string())
            .spawn(move || supervise_loop(should_quit, current_child, worker_path))
            .map_err(|e| format!("Failed to spawn supervisor thread: {e}"))?;

        Ok(())
    }

    pub fn quit(&self) {
        self.should_quit.store(true, Ordering::SeqCst);

        let mut guard = self.current_child.lock().unwrap();
        if let Some(mut child) = guard.take() {
            if let Err(e) = child.kill() {
                log_error(&format!("Failed to terminate worker: {e}"));
            } else {
                log_info("Worker terminated by Quit.");
            }
            let _ = child.wait();
        }
    }
}

#[cfg(windows)]
pub fn spawn_worker(worker_path: &Path) -> Result<Child, String> {
    use std::os::windows::process::CommandExt;

    Command::new(worker_path)
        .stdin(Stdio::null())
        .stdout(Stdio::null())
        .stderr(Stdio::null())
        .creation_flags(WORKER_CREATION_FLAGS)
        .spawn()
        .map_err(|e| format!("Failed to spawn {}: {e}", worker_path.display()))
}

#[cfg(not(windows))]
pub fn spawn_worker(worker_path: &Path) -> Result<Child, String> {
    Command::new(worker_path)
        .stdin(Stdio::null())
        .stdout(Stdio::null())
        .stderr(Stdio::null())
        .spawn()
        .map_err(|e| format!("Failed to spawn {}: {e}", worker_path.display()))
}

fn supervise_loop(
    should_quit: Arc<AtomicBool>,
    current_child: Arc<Mutex<Option<Child>>>,
    worker_path: PathBuf,
) {
    let poll = Duration::from_millis(500);

    loop {
        if should_quit.load(Ordering::SeqCst) {
            log_info("Supervisor exiting (should_quit set).");
            return;
        }

        enum WaitOutcome {
            Running,
            Exited(String),
        }

        let outcome = {
            let mut guard = current_child.lock().unwrap();
            match guard.as_mut() {
                Some(child) => match child.try_wait() {
                    Ok(Some(status)) => WaitOutcome::Exited(format!("{status:?}")),
                    Ok(None) => WaitOutcome::Running,
                    Err(e) => {
                        let _ = child.wait();
                        WaitOutcome::Exited(format!("try_wait error: {e}"))
                    }
                },
                None => WaitOutcome::Exited("no child handle".to_string()),
            }
        };

        if let WaitOutcome::Exited(detail) = outcome {
            if should_quit.load(Ordering::SeqCst) {
                log_info("Supervisor exiting (should_quit set after exit).");
                return;
            }

            log_info(&format!("Worker exited ({detail}). Respawning."));

            match spawn_worker(&worker_path) {
                Ok(child) => {
                    *current_child.lock().unwrap() = Some(child);
                }
                Err(e) => {
                    log_error(&format!("Respawn failed: {e}. Retrying in 500 ms."));
                }
            }
        }

        thread::sleep(poll);
    }
}
