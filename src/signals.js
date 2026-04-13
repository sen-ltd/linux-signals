/**
 * Linux / POSIX signals data
 * Sources: signal(7) man page, POSIX.1-2017, Linux kernel
 */

export const SIGNALS = [
  {
    number: 1,
    name: 'SIGHUP',
    defaultAction: 'Term',
    canCatch: true,
    canIgnore: true,
    canBlock: true,
    origin: 'POSIX',
    description: {
      ja: 'ハングアップ検出。端末が切断されたときや、設定ファイル再読み込みシグナルとして慣習的に使用される',
      en: 'Hangup detection. Sent when controlling terminal disconnects. Conventionally used to signal daemons to reload config',
    },
    useCases: {
      ja: ['nginx / Apache の設定再読み込み', 'デーモンの設定リロード', 'SSH 切断時のプロセス終了'],
      en: ['Reload nginx/Apache config', 'Daemon configuration reload', 'Process termination on SSH disconnect'],
    },
    example: 'kill -HUP $(pidof nginx)',
  },
  {
    number: 2,
    name: 'SIGINT',
    defaultAction: 'Term',
    canCatch: true,
    canIgnore: true,
    canBlock: true,
    origin: 'POSIX',
    description: {
      ja: 'キーボード割り込み。端末で Ctrl+C を押したときに送信される',
      en: 'Keyboard interrupt. Sent when the user presses Ctrl+C in the terminal',
    },
    useCases: {
      ja: ['Ctrl+C による実行中プログラムの停止', 'インタラクティブなシェルプログラムのキャンセル'],
      en: ['Stop a running program with Ctrl+C', 'Cancel interactive shell programs'],
    },
    example: 'kill -INT <pid>   # or press Ctrl+C',
  },
  {
    number: 3,
    name: 'SIGQUIT',
    defaultAction: 'Core',
    canCatch: true,
    canIgnore: true,
    canBlock: true,
    origin: 'POSIX',
    description: {
      ja: 'キーボード終了。Ctrl+\\ を押したときに送信され、コアダンプを生成する',
      en: 'Keyboard quit. Sent on Ctrl+\\, terminates with a core dump for debugging',
    },
    useCases: {
      ja: ['デバッグ用コアダンプの生成', 'プロセスの強制終了とスタックトレース取得'],
      en: ['Generate core dump for debugging', 'Force terminate and capture stack trace'],
    },
    example: 'kill -QUIT <pid>  # or press Ctrl+\\',
  },
  {
    number: 4,
    name: 'SIGILL',
    defaultAction: 'Core',
    canCatch: true,
    canIgnore: true,
    canBlock: true,
    origin: 'POSIX',
    description: {
      ja: '不正な命令。プロセスが不正または未定義の CPU 命令を実行しようとした',
      en: 'Illegal instruction. Sent when a process attempts to execute an illegal, malformed, or undefined CPU instruction',
    },
    useCases: {
      ja: ['バイナリ破損の検出', 'JIT コンパイラのバグ診断', 'CPU アーキテクチャ非互換の検出'],
      en: ['Detect corrupted binary', 'Diagnose JIT compiler bugs', 'Detect CPU architecture incompatibility'],
    },
    example: 'objdump -d binary | grep -i "invalid"',
  },
  {
    number: 5,
    name: 'SIGTRAP',
    defaultAction: 'Core',
    canCatch: true,
    canIgnore: true,
    canBlock: true,
    origin: 'POSIX',
    description: {
      ja: 'トレース/ブレークポイントトラップ。デバッガがブレークポイントで使用する',
      en: 'Trace/breakpoint trap. Used by debuggers to set breakpoints and for single-step execution',
    },
    useCases: {
      ja: ['gdb のブレークポイント実装', 'ptrace によるデバッグ', 'システムコールのトレース'],
      en: ['gdb breakpoint implementation', 'ptrace-based debugging', 'System call tracing'],
    },
    example: 'gdb -ex "break main" ./program',
  },
  {
    number: 6,
    name: 'SIGABRT',
    defaultAction: 'Core',
    canCatch: true,
    canIgnore: true,
    canBlock: true,
    origin: 'POSIX',
    description: {
      ja: '異常終了。abort() 関数から送信される。アサーション失敗時にも発生する',
      en: 'Abnormal termination. Sent by abort(). Also triggered by failed assertions (assert macro)',
    },
    useCases: {
      ja: ['C/C++ の assert() 失敗', 'malloc のヒープ破損検出', 'アプリケーション自身による異常終了'],
      en: ['C/C++ assert() failure', 'malloc heap corruption detection', 'Application self-abort on error'],
    },
    example: 'kill -ABRT <pid>  # equivalent to abort()',
  },
  {
    number: 7,
    name: 'SIGBUS',
    defaultAction: 'Core',
    canCatch: true,
    canIgnore: true,
    canBlock: true,
    origin: 'Linux',
    description: {
      ja: 'バスエラー。アライメントされていないメモリアクセスや、存在しない物理アドレスへのアクセス',
      en: 'Bus error. Sent on misaligned memory access, or accessing physical memory that does not exist',
    },
    useCases: {
      ja: ['アライメントエラーの診断', 'mmap したファイルが切り詰められた場合の検出', 'ハードウェアエラーの通知'],
      en: ['Diagnose alignment errors', 'Detect truncated mmap files', 'Hardware error notification'],
    },
    example: 'valgrind --tool=memcheck ./program',
  },
  {
    number: 8,
    name: 'SIGFPE',
    defaultAction: 'Core',
    canCatch: true,
    canIgnore: true,
    canBlock: true,
    origin: 'POSIX',
    description: {
      ja: '浮動小数点例外。ゼロ除算や浮動小数点オーバーフロー等の算術エラー',
      en: 'Floating-point exception. Arithmetic errors including division by zero and floating-point overflow',
    },
    useCases: {
      ja: ['ゼロ除算エラーの検出', '整数オーバーフロー診断', '数値計算コードのデバッグ'],
      en: ['Detect division by zero', 'Integer overflow diagnosis', 'Debug numerical computation code'],
    },
    example: 'feenableexcept(FE_ALL_EXCEPT);  # enable FP exceptions in C',
  },
  {
    number: 9,
    name: 'SIGKILL',
    defaultAction: 'Term',
    canCatch: false,
    canIgnore: false,
    canBlock: false,
    origin: 'POSIX',
    description: {
      ja: '強制終了。カーネルが即座にプロセスを終了させる。捕捉・無視・ブロック不可',
      en: 'Kill signal. Forces immediate process termination by the kernel. Cannot be caught, ignored, or blocked',
    },
    useCases: {
      ja: ['応答しないプロセスの強制終了', 'SIGTERM を無視するプロセスの終了', 'OOM キラーによる使用'],
      en: ['Force-terminate unresponsive processes', 'Kill processes ignoring SIGTERM', 'Used by OOM killer'],
    },
    example: 'kill -9 <pid>  # last resort termination',
  },
  {
    number: 10,
    name: 'SIGUSR1',
    defaultAction: 'Term',
    canCatch: true,
    canIgnore: true,
    canBlock: true,
    origin: 'POSIX',
    description: {
      ja: 'ユーザー定義シグナル 1。アプリケーションが自由に用途を決められる汎用シグナル',
      en: 'User-defined signal 1. Application-defined signal with no fixed meaning; use is up to the program',
    },
    useCases: {
      ja: ['カスタムアクションのトリガー', 'Apache のログローテーション', 'アプリケーション固有のハンドラ'],
      en: ['Trigger custom application actions', 'Apache log rotation', 'Application-specific handlers'],
    },
    example: 'kill -USR1 $(pidof apache2)  # rotate logs',
  },
  {
    number: 11,
    name: 'SIGSEGV',
    defaultAction: 'Core',
    canCatch: true,
    canIgnore: true,
    canBlock: true,
    origin: 'POSIX',
    description: {
      ja: 'セグメンテーション違反。無効なメモリアドレスへのアクセス（NULL ポインタ参照等）',
      en: 'Segmentation fault. Invalid memory reference such as null pointer dereference or buffer overflow',
    },
    useCases: {
      ja: ['NULL ポインタ参照の検出', 'バッファオーバーフロー診断', 'メモリ破壊のデバッグ'],
      en: ['Detect null pointer dereference', 'Diagnose buffer overflow', 'Debug memory corruption'],
    },
    example: 'valgrind --tool=memcheck ./program',
  },
  {
    number: 12,
    name: 'SIGUSR2',
    defaultAction: 'Term',
    canCatch: true,
    canIgnore: true,
    canBlock: true,
    origin: 'POSIX',
    description: {
      ja: 'ユーザー定義シグナル 2。SIGUSR1 と同様、アプリケーションが自由に定義できる',
      en: 'User-defined signal 2. Like SIGUSR1, freely defined by the application for custom purposes',
    },
    useCases: {
      ja: ['セカンダリカスタムアクション', 'デバッグ情報のダンプ', 'アプリケーション状態の切り替え'],
      en: ['Secondary custom actions', 'Dump debug information', 'Toggle application state'],
    },
    example: 'kill -USR2 <pid>  # application-specific action',
  },
  {
    number: 13,
    name: 'SIGPIPE',
    defaultAction: 'Term',
    canCatch: true,
    canIgnore: true,
    canBlock: true,
    origin: 'POSIX',
    description: {
      ja: '壊れたパイプ。読み手のいないパイプやソケットへの書き込み時に送信される',
      en: 'Broken pipe. Sent when writing to a pipe or socket with no reader on the other end',
    },
    useCases: {
      ja: ['パイプラインのエラーハンドリング', 'ネットワーク接続切断の検出', 'サーバーでの接続終了処理'],
      en: ['Pipeline error handling', 'Detect network connection loss', 'Handle client disconnect in servers'],
    },
    example: 'signal(SIGPIPE, SIG_IGN);  # ignore in server code',
  },
  {
    number: 14,
    name: 'SIGALRM',
    defaultAction: 'Term',
    canCatch: true,
    canIgnore: true,
    canBlock: true,
    origin: 'POSIX',
    description: {
      ja: 'アラームクロック。alarm() システムコールで設定した時間が経過すると送信される',
      en: 'Alarm clock. Sent when the timer set by alarm() expires. Used for real-time timeouts',
    },
    useCases: {
      ja: ['操作タイムアウトの実装', 'ウォッチドッグタイマー', '周期的な処理のトリガー'],
      en: ['Implement operation timeouts', 'Watchdog timer', 'Trigger periodic processing'],
    },
    example: 'alarm(30);  // send SIGALRM after 30 seconds',
  },
  {
    number: 15,
    name: 'SIGTERM',
    defaultAction: 'Term',
    canCatch: true,
    canIgnore: true,
    canBlock: true,
    origin: 'POSIX',
    description: {
      ja: '終了要求。kill コマンドのデフォルトシグナル。プロセスにクリーンアップする機会を与える',
      en: 'Termination request. Default signal for kill command. Allows process to clean up before exiting',
    },
    useCases: {
      ja: ['グレースフルシャットダウン', 'systemd によるサービス停止', 'コンテナの正常終了'],
      en: ['Graceful shutdown', 'systemd service stop', 'Container graceful termination'],
    },
    example: 'kill <pid>  # default is SIGTERM',
  },
  {
    number: 16,
    name: 'SIGSTKFLT',
    defaultAction: 'Term',
    canCatch: true,
    canIgnore: true,
    canBlock: true,
    origin: 'Linux',
    description: {
      ja: 'スタックフォルト（廃止予定）。i387 数値コプロセッサのスタックフォルト。現在はほぼ使用されない',
      en: 'Stack fault on coprocessor (obsolete). Originally for i387 FPU stack faults. Rarely used today',
    },
    useCases: {
      ja: ['古い x86 FPU エラーの処理（レガシー）'],
      en: ['Legacy x86 FPU error handling'],
    },
    example: '# Rarely seen in modern systems',
  },
  {
    number: 17,
    name: 'SIGCHLD',
    defaultAction: 'Ign',
    canCatch: true,
    canIgnore: true,
    canBlock: true,
    origin: 'POSIX',
    description: {
      ja: '子プロセスの状態変化。子プロセスが停止・終了・再開したときに親プロセスへ送信される',
      en: 'Child status changed. Sent to parent when a child process stops, terminates, or resumes',
    },
    useCases: {
      ja: ['ゾンビプロセスの防止（wait による回収）', '非同期の子プロセス管理', 'シェルによるジョブ制御'],
      en: ['Prevent zombie processes (reap with wait)', 'Asynchronous child process management', 'Shell job control'],
    },
    example: 'signal(SIGCHLD, SIG_IGN);  // auto-reap children',
  },
  {
    number: 18,
    name: 'SIGCONT',
    defaultAction: 'Cont',
    canCatch: true,
    canIgnore: true,
    canBlock: true,
    origin: 'POSIX',
    description: {
      ja: '停止中プロセスの再開。SIGSTOP や SIGTSTP で停止したプロセスを再開させる',
      en: 'Continue if stopped. Resumes a process that was stopped by SIGSTOP or SIGTSTP',
    },
    useCases: {
      ja: ['fg コマンドによるジョブ再開', 'バックグラウンドジョブの制御', 'デバッガでのプロセス再開'],
      en: ['Resume job with fg command', 'Background job control', 'Resume process in debugger'],
    },
    example: 'kill -CONT <pid>  # resume a stopped process',
  },
  {
    number: 19,
    name: 'SIGSTOP',
    defaultAction: 'Stop',
    canCatch: false,
    canIgnore: false,
    canBlock: false,
    origin: 'POSIX',
    description: {
      ja: 'プロセスの強制停止。SIGCONT で再開するまでプロセスを一時停止する。捕捉・無視・ブロック不可',
      en: 'Stop process. Suspends execution until SIGCONT. Cannot be caught, ignored, or blocked',
    },
    useCases: {
      ja: ['プロセスの一時停止と後から再開', 'デバッガによるプロセス停止', 'コンテナの一時停止'],
      en: ['Pause process and resume later', 'Debugger process suspension', 'Container pause'],
    },
    example: 'kill -STOP <pid>  # pause a process',
  },
  {
    number: 20,
    name: 'SIGTSTP',
    defaultAction: 'Stop',
    canCatch: true,
    canIgnore: true,
    canBlock: true,
    origin: 'POSIX',
    description: {
      ja: '端末からの停止要求。Ctrl+Z を押したときに送信される。SIGSTOP と異なりキャッチ可能',
      en: 'Terminal stop. Sent on Ctrl+Z. Unlike SIGSTOP, can be caught so programs can clean up',
    },
    useCases: {
      ja: ['Ctrl+Z によるジョブの一時停止', 'バックグラウンドへの移行 (bg コマンド)', 'ターミナルアプリのクリーンアップ'],
      en: ['Suspend job with Ctrl+Z', 'Move to background (bg command)', 'Terminal app cleanup on suspend'],
    },
    example: '# Press Ctrl+Z in terminal to send SIGTSTP',
  },
  {
    number: 21,
    name: 'SIGTTIN',
    defaultAction: 'Stop',
    canCatch: true,
    canIgnore: true,
    canBlock: true,
    origin: 'POSIX',
    description: {
      ja: 'バックグラウンドプロセスの端末読み込み。バックグラウンドプロセスが端末から読もうとした',
      en: 'Terminal input for background process. Sent when a background process tries to read from the terminal',
    },
    useCases: {
      ja: ['シェルのジョブ制御', 'バックグラウンドプロセスのI/O制御'],
      en: ['Shell job control', 'Background process I/O control'],
    },
    example: '# Automatically sent by kernel on bg terminal read',
  },
  {
    number: 22,
    name: 'SIGTTOU',
    defaultAction: 'Stop',
    canCatch: true,
    canIgnore: true,
    canBlock: true,
    origin: 'POSIX',
    description: {
      ja: 'バックグラウンドプロセスの端末書き込み。バックグラウンドプロセスが端末に書こうとした（設定による）',
      en: 'Terminal output for background process. Sent when a background process tries to write to terminal (if configured)',
    },
    useCases: {
      ja: ['シェルのジョブ制御', '端末出力権限の管理'],
      en: ['Shell job control', 'Terminal output permission management'],
    },
    example: 'stty tostop  # enable SIGTTOU for bg writes',
  },
  {
    number: 23,
    name: 'SIGURG',
    defaultAction: 'Ign',
    canCatch: true,
    canIgnore: true,
    canBlock: true,
    origin: 'POSIX',
    description: {
      ja: 'ソケットの緊急データ。TCP の OOB（Out-of-Band）データ受信時に送信される',
      en: 'Urgent condition on socket. Sent when out-of-band (OOB) data arrives on a TCP socket',
    },
    useCases: {
      ja: ['TCP Out-of-Band データの処理', '緊急ネットワークメッセージの通知'],
      en: ['Handle TCP out-of-band data', 'Notify urgent network messages'],
    },
    example: 'fcntl(fd, F_SETOWN, getpid());  // receive SIGURG',
  },
  {
    number: 24,
    name: 'SIGXCPU',
    defaultAction: 'Core',
    canCatch: true,
    canIgnore: true,
    canBlock: true,
    origin: 'POSIX',
    description: {
      ja: 'CPU 時間制限超過。setrlimit() で設定した CPU 時間上限を超えたプロセスへ送信される',
      en: 'CPU time limit exceeded. Sent when a process exceeds its CPU time limit set by setrlimit()',
    },
    useCases: {
      ja: ['CPU 使用量の制限施行', 'サンドボックス環境でのリソース制限', '暴走プロセスの検出'],
      en: ['Enforce CPU usage limits', 'Resource limiting in sandboxes', 'Detect runaway processes'],
    },
    example: 'ulimit -t 10  # set 10-second CPU limit',
  },
  {
    number: 25,
    name: 'SIGXFSZ',
    defaultAction: 'Core',
    canCatch: true,
    canIgnore: true,
    canBlock: true,
    origin: 'POSIX',
    description: {
      ja: 'ファイルサイズ制限超過。setrlimit() で設定した最大ファイルサイズを超えようとした',
      en: 'File size limit exceeded. Sent when a process tries to write beyond its file size limit',
    },
    useCases: {
      ja: ['ディスク使用量の制限', 'ログファイルサイズの制限', 'サンドボックスのファイルシステム制限'],
      en: ['Limit disk usage', 'Restrict log file size', 'Sandbox filesystem limits'],
    },
    example: 'ulimit -f 1024  # set 512 KB file size limit',
  },
  {
    number: 26,
    name: 'SIGVTALRM',
    defaultAction: 'Term',
    canCatch: true,
    canIgnore: true,
    canBlock: true,
    origin: 'POSIX',
    description: {
      ja: '仮想タイマーアラーム。プロセスのユーザーモード実行時間に基づくタイマー',
      en: 'Virtual timer alarm. Fires based on CPU time used in user mode only (excludes system calls)',
    },
    useCases: {
      ja: ['ユーザー空間の実行時間計測', 'プロファイリングツール', 'CPU バウンドコードのタイムアウト'],
      en: ['Measure user-space execution time', 'Profiling tools', 'Timeout CPU-bound code'],
    },
    example: 'setitimer(ITIMER_VIRTUAL, &val, NULL);',
  },
  {
    number: 27,
    name: 'SIGPROF',
    defaultAction: 'Term',
    canCatch: true,
    canIgnore: true,
    canBlock: true,
    origin: 'POSIX',
    description: {
      ja: 'プロファイリングタイマーアラーム。ユーザーモードとカーネルモード両方の CPU 時間に基づくタイマー',
      en: 'Profiling timer alarm. Fires based on CPU time in both user mode and kernel mode',
    },
    useCases: {
      ja: ['gprof などのプロファイリングツール', 'CPU 使用率の統計サンプリング', '実行時間プロファイリング'],
      en: ['gprof and other profiling tools', 'Statistical CPU usage sampling', 'Execution time profiling'],
    },
    example: 'setitimer(ITIMER_PROF, &val, NULL);',
  },
  {
    number: 28,
    name: 'SIGWINCH',
    defaultAction: 'Ign',
    canCatch: true,
    canIgnore: true,
    canBlock: true,
    origin: 'Linux',
    description: {
      ja: 'ウィンドウサイズ変更。端末ウィンドウがリサイズされたときに送信される',
      en: 'Window resize signal. Sent when the terminal window size changes',
    },
    useCases: {
      ja: ['端末アプリの動的リサイズ', 'vim / less のウィンドウ適応', 'TUI アプリのレイアウト更新'],
      en: ['Dynamic resize of terminal apps', 'vim/less window adaptation', 'TUI app layout update'],
    },
    example: 'signal(SIGWINCH, on_resize);  // handle terminal resize',
  },
  {
    number: 29,
    name: 'SIGIO',
    defaultAction: 'Term',
    canCatch: true,
    canIgnore: true,
    canBlock: true,
    origin: 'Linux',
    description: {
      ja: 'I/O 完了通知（非同期 I/O）。ファイルディスクリプタで I/O が可能になったときに送信される',
      en: 'I/O completion (async I/O). Sent when I/O is possible on a file descriptor set with O_ASYNC',
    },
    useCases: {
      ja: ['非同期 I/O 通知', 'ノンブロッキングネットワーク処理', 'シリアルポートの非同期読み取り'],
      en: ['Asynchronous I/O notification', 'Non-blocking network I/O', 'Async serial port reading'],
    },
    example: 'fcntl(fd, F_SETFL, O_ASYNC);  // enable async I/O',
  },
  {
    number: 30,
    name: 'SIGPWR',
    defaultAction: 'Term',
    canCatch: true,
    canIgnore: true,
    canBlock: true,
    origin: 'Linux',
    description: {
      ja: '電源障害。UPS などから電源異常が通知されたときに送信される',
      en: 'Power failure. Sent by init/systemd when a power failure is detected (e.g., from UPS)',
    },
    useCases: {
      ja: ['UPS 電源障害への対応', 'グレースフルシャットダウンの開始', '重要データの緊急保存'],
      en: ['Respond to UPS power failure', 'Initiate graceful shutdown', 'Emergency data persistence'],
    },
    example: '# Typically sent by apcupsd or similar UPS daemon',
  },
  {
    number: 31,
    name: 'SIGSYS',
    defaultAction: 'Core',
    canCatch: true,
    canIgnore: true,
    canBlock: true,
    origin: 'POSIX',
    description: {
      ja: '不正なシステムコール。無効なシステムコール番号が呼び出されたとき。seccomp フィルタでも使用される',
      en: 'Bad system call. Sent when an invalid syscall number is invoked. Used by seccomp filters',
    },
    useCases: {
      ja: ['seccomp サンドボックスによるシステムコール制限', '無効な syscall の検出', 'コンテナセキュリティ'],
      en: ['seccomp sandbox syscall restrictions', 'Detect invalid syscall', 'Container security'],
    },
    example: 'prctl(PR_SET_SECCOMP, SECCOMP_MODE_STRICT);',
  },
  {
    number: 34,
    name: 'SIGRTMIN',
    defaultAction: 'Term',
    canCatch: true,
    canIgnore: true,
    canBlock: true,
    origin: 'Linux',
    description: {
      ja: 'リアルタイムシグナルの最小値。SIGRTMIN〜SIGRTMAX（通常 34〜64）がリアルタイムシグナル範囲',
      en: 'Minimum real-time signal. SIGRTMIN to SIGRTMAX (typically 34–64) are real-time signals with queuing support',
    },
    useCases: {
      ja: ['リアルタイムアプリケーションの通知', 'シグナルキューイングが必要な処理', 'POSIX タイマー通知'],
      en: ['Real-time application notifications', 'Processing requiring signal queuing', 'POSIX timer notifications'],
    },
    example: 'sigqueue(pid, SIGRTMIN, val);  // send with data',
  },
  {
    number: 64,
    name: 'SIGRTMAX',
    defaultAction: 'Term',
    canCatch: true,
    canIgnore: true,
    canBlock: true,
    origin: 'Linux',
    description: {
      ja: 'リアルタイムシグナルの最大値。実際の値は "kill -l" や SIGRTMAX マクロで確認できる',
      en: 'Maximum real-time signal. Actual value can be checked with "kill -l" or the SIGRTMAX macro',
    },
    useCases: {
      ja: ['リアルタイムシグナル範囲の上限確認', 'アプリケーション固有のリアルタイム通知'],
      en: ['Check upper bound of real-time signal range', 'Application-specific real-time notifications'],
    },
    example: 'echo $(($(kill -l SIGRTMAX)))',
  },
];

/**
 * Find a signal by its number.
 * @param {number} n
 * @returns {object|null}
 */
export function findByNumber(n) {
  return SIGNALS.find(s => s.number === n) ?? null;
}

/**
 * Find a signal by name (case-insensitive, with or without SIG prefix).
 * @param {string} name
 * @returns {object|null}
 */
export function findByName(name) {
  const upper = name.toUpperCase();
  const normalized = upper.startsWith('SIG') ? upper : `SIG${upper}`;
  return SIGNALS.find(s => s.name === normalized) ?? null;
}

/**
 * Search signals by query string (matches number, name, or description keyword).
 * @param {string} query
 * @returns {object[]}
 */
export function searchSignals(query) {
  if (!query || query.trim() === '') return SIGNALS;
  const q = query.trim().toLowerCase();
  const numQuery = parseInt(q, 10);
  return SIGNALS.filter(s => {
    if (!isNaN(numQuery) && s.number === numQuery) return true;
    if (s.name.toLowerCase().includes(q)) return true;
    if (s.description.en.toLowerCase().includes(q)) return true;
    if (s.description.ja.includes(q)) return true;
    return false;
  });
}

/**
 * Filter signals by default action.
 * @param {string} action - 'Term' | 'Core' | 'Ign' | 'Stop' | 'Cont'
 * @returns {object[]}
 */
export function filterByAction(action) {
  return SIGNALS.filter(s => s.defaultAction === action);
}
