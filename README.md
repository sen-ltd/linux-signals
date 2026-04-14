# Linux Signals Reference

Linux / POSIX シグナルの完全リファレンスサイト。番号・名前検索、デフォルト動作フィルター、日英バイリンガル対応。

A searchable reference for Linux/POSIX signals with bilingual (Japanese/English) descriptions, use cases, and shell examples.

**Demo**: https://sen.ltd/portfolio/linux-signals/

---

## Features

- **30+ signals** — Full POSIX standard set plus Linux/BSD-specific signals and real-time signal range
- **Search** — By signal number, name, or description keyword (both Japanese and English)
- **Filter** — By default action: Term / Core / Ign / Stop / Cont
- **Per-signal details** — Number, name, default action, catchable/ignorable/blockable flags, origin (POSIX/Linux/BSD), description, use cases, example command
- **Bilingual** — All descriptions and use cases in Japanese and English
- **Dark / Light theme** — Terminal-like dark theme by default
- **Zero dependencies** — Vanilla JS ES modules, no build step

## Signals Covered

| Range | Description |
|-------|-------------|
| 1–15  | Core POSIX signals (SIGHUP, SIGINT, SIGKILL, SIGTERM, etc.) |
| 16–31 | Extended signals (SIGCHLD, SIGCONT, SIGSTOP, SIGSYS, etc.) |
| 34    | SIGRTMIN (real-time signal range start) |
| 64    | SIGRTMAX (real-time signal range end) |

## Usage

```sh
# Clone and serve locally
git clone https://github.com/masaru87/linux-signals
cd linux-signals
npm run serve
# open http://localhost:8080
```

## Development

```sh
npm test          # Run test suite (node:test, no dependencies)
npm run serve     # Start local HTTP server on port 8080
```

## Tests

15+ tests covering:

- SIGNALS array has at least 30 entries
- All signal numbers unique
- All names start with SIG
- findByNumber / findByName (case-insensitive, with/without SIG prefix)
- searchSignals (by number, name, description keyword, Japanese text)
- filterByAction
- SIGKILL and SIGSTOP cannot be caught/ignored/blocked

## License

MIT License — Copyright (c) 2026 SEN LLC (SEN 合同会社)

<!-- sen-publish:links -->
## Links

- 🌐 Demo: https://sen.ltd/portfolio/linux-signals/
- 📝 dev.to: https://dev.to/sendotltd/a-searchable-linuxposix-signal-reference-why-sigrtmin-is-34-not-32-4f9d
<!-- /sen-publish:links -->
