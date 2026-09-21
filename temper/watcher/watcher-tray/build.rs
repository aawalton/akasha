fn main() {
    let watcher_version = std::env::var("COMMIT_SHA").unwrap_or_else(|_| "dev".to_string());
    println!("cargo:rustc-env=WATCHER_VERSION={watcher_version}");

    let server_url =
        std::env::var("SERVER_URL").unwrap_or_else(|_| "https://tempereso.com".to_string());
    println!("cargo:rustc-env=SERVER_URL={server_url}");

    println!("cargo:rerun-if-env-changed=COMMIT_SHA");
    println!("cargo:rerun-if-env-changed=SERVER_URL");
    println!("cargo:rerun-if-changed=build.rs");
}
