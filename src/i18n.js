/**
 * i18n strings for UI labels (ja/en).
 */

export const UI = {
  ja: {
    title: 'Linux シグナルリファレンス',
    subtitle: 'Linux / POSIX シグナルの完全ガイド',
    searchPlaceholder: '番号または名前で検索（例: 9, SIGKILL, kill）',
    filterAll: 'すべて',
    filterTerm: 'Term（終了）',
    filterCore: 'Core（コアダンプ）',
    filterIgn: 'Ign（無視）',
    filterStop: 'Stop（停止）',
    filterCont: 'Cont（再開）',
    labelNumber: '番号',
    labelName: '名前',
    labelDefaultAction: 'デフォルト動作',
    labelOrigin: '規格',
    labelCanCatch: 'キャッチ可能',
    labelCanIgnore: '無視可能',
    labelCanBlock: 'ブロック可能',
    labelDescription: '説明',
    labelUseCases: 'ユースケース',
    labelExample: '使用例',
    yes: 'はい',
    no: 'いいえ',
    noResults: '一致するシグナルが見つかりません',
    signalCount: 'シグナル',
    closeModal: '閉じる',
    themeToggle: 'テーマ切替',
    langToggle: 'EN',
    modalTitle: 'シグナル詳細',
  },
  en: {
    title: 'Linux Signal Reference',
    subtitle: 'Complete guide to Linux / POSIX signals',
    searchPlaceholder: 'Search by number or name (e.g. 9, SIGKILL, kill)',
    filterAll: 'All',
    filterTerm: 'Term',
    filterCore: 'Core',
    filterIgn: 'Ign',
    filterStop: 'Stop',
    filterCont: 'Cont',
    labelNumber: 'Number',
    labelName: 'Name',
    labelDefaultAction: 'Default Action',
    labelOrigin: 'Origin',
    labelCanCatch: 'Catchable',
    labelCanIgnore: 'Ignorable',
    labelCanBlock: 'Blockable',
    labelDescription: 'Description',
    labelUseCases: 'Use Cases',
    labelExample: 'Example',
    yes: 'Yes',
    no: 'No',
    noResults: 'No signals match your search',
    signalCount: 'signals',
    closeModal: 'Close',
    themeToggle: 'Theme',
    langToggle: 'JA',
    modalTitle: 'Signal Details',
  },
};

/**
 * Get the UI string set for a given language code.
 * Falls back to 'en' for unknown codes.
 * @param {string} lang - 'ja' or 'en'
 * @returns {object}
 */
export function getStrings(lang) {
  return UI[lang] ?? UI.en;
}

/**
 * Toggle between 'ja' and 'en'.
 * @param {string} current
 * @returns {string}
 */
export function toggleLang(current) {
  return current === 'ja' ? 'en' : 'ja';
}
