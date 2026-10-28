"use client";

import { createContext, useContext, useEffect, useMemo, useState } from "react";

export type Locale = "en" | "zh";

type Messages = Record<string, string>;

const messages: Record<Locale, Messages> = {
  en: {
    "nav.sing": "Sing", "nav.library": "Library", "nav.history": "History", "nav.settings": "Settings",
    "nav.songsToTry": "Songs to try", "nav.language": "中文",
    "setup.welcome": "Welcome to OnKey", "setup.tagline": "Learn to sing the songs you love, with the music you already play.",
    "setup.later": "Set up later", "setup.start": "Get started", "setup.permissions": "Two permissions",
    "setup.continue": "Continue", "setup.allowed": "Allowed", "setup.openSettings": "Open System Settings",
    "setup.recommended": "Recommended", "setup.canHear": "Can OnKey hear you?", "setup.back": "Back to permissions",
    "setup.ready": "You're set", "setup.startSinging": "Start singing", "setup.allow": "Allow", "setup.asking": "Asking…",
    "setup.listenOnly": "Listen only", "setup.carryOn": "Carry on",
    "library.title": "Library", "library.subtitle": "Songs OnKey has learned. Pick one to sing it with every note shown ahead.",
    "library.search": "Search songs", "library.empty": "Nothing learned yet", "library.start": "Start",
    "library.show": "Show songs to try", "library.all": "All", "library.favourites": "Favourites",
    "library.unscored": "Not scored yet", "library.partial": "Partly learned", "library.difficulty": "Difficulty",
    "library.clear": "Clear", "library.song": "song", "library.songs": "songs", "library.noMatch": "No songs match these filters.",
    "history.title": "Your singing", "history.subtitle": "Every song you sing becomes a take. Here’s how they’re going.",
    "history.scorePerTake": "Score per take", "history.songs": "Songs", "history.allTakes": "All takes",
    "history.song": "Song", "history.when": "When", "history.notesHit": "Notes hit", "history.pitch": "Pitch",
    "history.score": "Score", "history.empty": "No takes yet", "history.emptyHint": "Sing along to a song for at least 20 seconds and it’ll show up here.",
    "history.start": "Start singing", "settings.title": "Settings", "settings.control": "Let OnKey control",
    "settings.lyrics": "Lyrics", "settings.voice": "Your voice", "settings.performance": "Performance", "settings.about": "About",
    "settings.updates": "Check for updates automatically", "settings.showLyrics": "Show lyrics", "settings.rest": "Remind me to rest my voice",
    "settings.battery": "Save battery while singing", "settings.models": "Keep learning models ready", "settings.report": "Report a problem",
    "settings.discord": "Join OnKey’s Discord", "settings.licences": "Open-source licences",
    "common.cancel": "Cancel", "common.save": "Save", "common.done": "Done", "common.delete": "Delete",
    "common.notNow": "Not now", "common.openIssue": "Open a GitHub issue", "common.showFinder": "Show in Finder",
    "common.showFiles": "Show the files", "common.optional": "optional", "common.searching": "Searching…",
    "common.language": "Language", "control.settingsHint": "You can change this any time in Settings."
    ,"sing.starting": "Starting OnKey…", "sing.startingSong": "Starting the song…", "sing.gettingReady": "Getting ready…", "sing.notSong": "Not a song", "sing.stillListening": "Still listening"
    ,"sing.playSpotifyApple": "Play a song in Spotify or Apple Music", "sing.playSpotifyAppleYoutube": "Play a song in Spotify, Apple Music or YouTube"
    ,"sing.playPause": "play / pause", "sing.startOver": "start over", "sing.skip": "skip", "sing.favourite": "favourite"
    ,"sing.youtube": "YouTube and YouTube Music", "sing.experimental": "Experimental", "sing.turnOn": "Turn on", "sing.turnOff": "Turn off"
    ,"sing.youtubeOn": "On. macOS asks once to let OnKey control your browser, so it can read where the video is.", "sing.youtubeOff": "Off, so songs playing in your browser aren’t picked up. Turn it on to sing along in Chrome, Safari, Brave or Edge: macOS asks once to let OnKey control the browser."
    ,"sing.setup": "Setup: permissions and mic check", "sing.songsToTry": "Songs to try", "sing.playlist": "Play the OnKey starter playlist", "sing.playlistHint": "All of these and more, from easy to challenging: press play and sing", "sing.playIn": "Play in"
    ,"sing.tryThese": "Try these", "sing.followsWell": "· songs OnKey follows well", "sing.hideSuggestions": "Hide suggestions", "sing.in": "in"
    ,"sing.fixSong": "Fix the song name", "sing.fixSongHint": "Read from the YouTube video. OnKey finds the lyrics by this name.", "sing.artist": "Artist", "sing.title": "Title"
    ,"sing.sessionFinished": "Session finished", "sing.howDid": "Here’s how you did.", "sing.noTakes": "No takes long enough to score this time."
    ,"sing.score": "score", "sing.playSongMini": "Play a song in Spotify or Apple Music"
  },
  zh: {
    "nav.sing": "演唱", "nav.library": "曲库", "nav.history": "演唱记录", "nav.settings": "设置",
    "nav.songsToTry": "推荐歌曲", "nav.language": "English",
    "setup.welcome": "欢迎使用 OnKey", "setup.tagline": "用你已有的音乐，练习演唱你喜欢的歌曲。",
    "setup.later": "稍后设置", "setup.start": "开始使用", "setup.permissions": "需要两项权限",
    "setup.continue": "继续", "setup.allowed": "已允许", "setup.openSettings": "打开系统设置",
    "setup.recommended": "推荐", "setup.canHear": "OnKey 能听见你的声音吗？", "setup.back": "返回权限设置",
    "setup.ready": "准备好了", "setup.startSinging": "开始演唱", "setup.allow": "允许", "setup.asking": "请求中…",
    "setup.listenOnly": "仅监听", "setup.carryOn": "继续",
    "library.title": "曲库", "library.subtitle": "OnKey 已学习的歌曲。选择一首，跟着即将出现的音符演唱。",
    "library.search": "搜索歌曲", "library.empty": "还没有学习的歌曲", "library.start": "开始",
    "library.show": "显示推荐歌曲", "library.all": "全部", "library.favourites": "收藏",
    "library.unscored": "尚未评分", "library.partial": "部分学习", "library.difficulty": "难度",
    "library.clear": "清除", "library.song": "首歌曲", "library.songs": "首歌曲", "library.noMatch": "没有符合筛选条件的歌曲。",
    "history.title": "你的演唱", "history.subtitle": "每首演唱过的歌曲都会留下记录，看看最近的表现。",
    "history.scorePerTake": "每次演唱得分", "history.songs": "歌曲", "history.allTakes": "全部记录",
    "history.song": "歌曲", "history.when": "时间", "history.notesHit": "命中音符", "history.pitch": "音准",
    "history.score": "得分", "history.empty": "还没有演唱记录", "history.emptyHint": "跟着歌曲演唱至少 20 秒，记录就会显示在这里。",
    "history.start": "开始演唱", "settings.title": "设置", "settings.control": "允许 OnKey 控制",
    "settings.lyrics": "歌词", "settings.voice": "你的声音", "settings.performance": "性能", "settings.about": "关于",
    "settings.updates": "自动检查更新", "settings.showLyrics": "显示歌词", "settings.rest": "提醒我休息嗓子",
    "settings.battery": "演唱时节省电量", "settings.models": "保持学习模型就绪", "settings.report": "报告问题",
    "settings.discord": "加入 OnKey Discord", "settings.licences": "开源许可证",
    "common.cancel": "取消", "common.save": "保存", "common.done": "完成", "common.delete": "删除",
    "common.notNow": "暂不处理", "common.openIssue": "打开 GitHub Issue", "common.showFinder": "在 Finder 中显示",
    "common.showFiles": "显示文件", "common.optional": "可选", "common.searching": "搜索中…",
    "common.language": "语言", "control.settingsHint": "你可以随时在设置中修改。"
    ,"sing.starting": "正在启动 OnKey…", "sing.startingSong": "正在启动歌曲…", "sing.gettingReady": "准备中…", "sing.notSong": "不是歌曲", "sing.stillListening": "仍在聆听"
    ,"sing.playSpotifyApple": "在 Spotify 或 Apple Music 播放歌曲", "sing.playSpotifyAppleYoutube": "在 Spotify、Apple Music 或 YouTube 播放歌曲"
    ,"sing.playPause": "播放 / 暂停", "sing.startOver": "重新开始", "sing.skip": "跳过", "sing.favourite": "收藏"
    ,"sing.youtube": "YouTube 和 YouTube Music", "sing.experimental": "实验功能", "sing.turnOn": "开启", "sing.turnOff": "关闭"
    ,"sing.youtubeOn": "已开启。macOS 会询问是否允许 OnKey 控制浏览器，以读取视频位置。", "sing.youtubeOff": "已关闭，因此不会识别浏览器中播放的歌曲。开启后即可在 Chrome、Safari、Brave 或 Edge 中跟唱；macOS 只会询问一次是否允许 OnKey 控制浏览器。"
    ,"sing.setup": "设置：权限和麦克风检查", "sing.songsToTry": "推荐歌曲", "sing.playlist": "播放 OnKey 入门歌单", "sing.playlistHint": "从简单到有挑战，这些歌曲都在这里：点击播放并开始演唱", "sing.playIn": "在此播放"
    ,"sing.tryThese": "试试这些", "sing.followsWell": "· OnKey 跟唱效果好", "sing.hideSuggestions": "隐藏推荐", "sing.in": "打开"
    ,"sing.fixSong": "修正歌曲名称", "sing.fixSongHint": "信息来自 YouTube 视频。OnKey 会用这个名称查找歌词。", "sing.artist": "歌手", "sing.title": "歌名"
    ,"sing.sessionFinished": "演唱结束", "sing.howDid": "看看这次表现。", "sing.noTakes": "这次没有足够长的演唱记录可评分。"
    ,"sing.score": "得分", "sing.playSongMini": "在 Spotify 或 Apple Music 播放歌曲"
  }
};

type I18n = { locale: Locale; setLocale: (locale: Locale) => void; t: (key: string, fallback?: string) => string };
const I18nContext = createContext<I18n | null>(null);

export function I18nProvider({ children }: { children: React.ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>("zh");
  useEffect(() => {
    const saved = localStorage.getItem("onkey.locale") as Locale | null;
    // Chinese is the product default; users can switch to English from the nav and the choice is persisted.
    const initial = saved === "zh" || saved === "en" ? saved : "zh";
    setLocaleState(initial);
  }, []);
  const setLocale = (next: Locale) => { setLocaleState(next); localStorage.setItem("onkey.locale", next); };
  useEffect(() => { document.documentElement.lang = locale === "zh" ? "zh-CN" : "en"; }, [locale]);
  const value = useMemo(() => ({ locale, setLocale, t: (key: string, fallback = key) => messages[locale][key] ?? messages.en[key] ?? fallback }), [locale]);
  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>;
}

export function useI18n() {
  const value = useContext(I18nContext);
  if (!value) throw new Error("useI18n must be used inside I18nProvider");
  return value;
}
