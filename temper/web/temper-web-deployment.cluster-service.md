---
id: 99b5bb41-f840-5256-8959-27c9643bf000
page-type-slug: cluster-service
title: "Temper web deployment"
slug: temper-web-deployment
domain-parent-slug: page-type/cluster-service
kind: Deployment
namespace: temper
resource-name: web
---

# Definition

- **Temper web deployment** — what serves the parts of Temper that run in a browser.

# Design

The addon bundle and the watcher binaries arrive as images unpacked into the checkout before the app starts, rather than being built inside it.

The addon bundle image is named by a tag that never moves, and is pulled only when absent. The watcher image is named by a tag that does move, and is pulled always.
