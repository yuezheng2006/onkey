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
    "setup.stepWelcome": "Welcome", "setup.stepPermissions": "Permissions", "setup.stepMusic": "Music apps", "setup.stepMic": "Mic check", "setup.stepReady": "Ready", "setup.pointPlay": "Play a song in your music app, as you always do. OnKey listens to the music playing on your Mac and follows along by itself.", "setup.pointLearn": "The first time a song plays, OnKey learns the singer’s melody. From then on you see every note coming, and where you’re sharp or flat.", "setup.pointPrivacy": "OnKey never saves the music it listens to. Your singing recordings stay on this Mac so you can hear your takes back. To name a new song, listening mode sends Apple’s Shazam a short fingerprint of the music app’s sound (not the audio).", "setup.macosUnsupported": "OnKey needs macOS 14.2 or later to hear other apps. Update macOS in System Settings → General → Software Update.", "setup.permissionsHint": "macOS asks once for each. You can change them later in System Settings → Privacy & Security.", "setup.micTitle": "Microphone", "setup.micWhy": "To hear you sing.", "setup.micHint": "Turn on OnKey under Microphone.", "setup.audioTitle": "System audio recording", "setup.audioWhy": "To hear the music playing on your Mac, so OnKey can learn the melody. OnKey never saves the music or sends it; to name a song it doesn’t know, a short fingerprint of it (not the audio) can go to Apple’s Shazam.", "setup.audioHint": "Open Screen & System Audio Recording and turn on OnKey under System Audio Recording Only.", "setup.skipForNow": "Skip for now", "setup.restartHint": "If macOS asks to quit and reopen OnKey after you allow something, do. Setup carries on where you left off.", "setup.musicTitle": "Let OnKey follow Spotify and Apple Music", "setup.musicDesc": "So lyrics and notes are in the right place from the first second, and OnKey can play and restart songs for you.", "setup.musicRead": "It can read what’s playing and where, and play, pause and seek. Nothing else. macOS asks once for each app.", "setup.musicWaiting": "Waiting for macOS. If it’s asking about Spotify or Apple Music (its question can open behind this window), answer it. No question? Carry on: macOS asks the first time you play a song there.", "setup.musicNoAnswer": "macOS hasn’t had an answer yet. If its question is showing, answer it; otherwise it asks the first time you play a song there.", "setup.notAllowed": "Not allowed", "setup.askOnPlay": "macOS asks when you first play a song in it", "setup.noAnswer": "No answer yet", "setup.notAsked": "Not asked yet", "setup.micBack": "OnKey needs the microphone first: go back to allow it.", "setup.noMic": "No microphone is connected. Connect one, or choose one in System Settings → Sound → Input.", "setup.saySomething": "Say something, or sing a note.", "setup.listeningTo": "Listening to", "setup.chooseSettings": "You can choose another in Settings.", "setup.heardYou": "Heard you", "setup.listening": "Listening…", "setup.starting": "Starting…", "setup.noMicrophone": "No microphone", "setup.notAllowedShort": "Not allowed", "setup.skip": "Skip", "setup.micAdvice": "Headphones give the steadiest scores. Laptop speakers work too: OnKey takes the music out of what the mic hears.", "setup.readyDesc": "Play a song in your music app and start singing. The first play of each song teaches OnKey the melody.", "setup.readyAdvice": "Sing at a comfortable volume: OnKey scores your pitch, not how loud you are. Rest when your voice tires, and stop if your throat hurts.",
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
    ,"learning.thisSong": "Learning this song", "learning.blindTake": "Your blind take", "learning.blindHint": "Sing along, no hints. Next time you’ll see every note coming.", "learning.scoreAfter": "score after the song"
    ,"live.noLyrics": "No synced lyrics for this song", "live.lyricsOff": "Lyrics are off (Settings)", "live.findingPlace": "Finding your place…", "live.nextLine": "Next line", "live.firstLine": "First line", "live.score": "Score", "live.afterSong": "after the song", "live.finishLast": "That was the last line", "live.finishScore": "Finish and see your score", "live.singingIn": "Singing in", "live.skipAhead": "Skip ahead"
    ,"live.couldntScore": "couldn’t score", "live.singNow": "Sing now", "live.learnedPct": "% learned", "live.playThrough": "play it through", "live.learning": "learning…", "live.waitingToLearn": "waiting to learn", "live.scoring": "scoring…", "live.checkTiming": "Check timing on", "live.theseHeadphones": "these headphones", "live.live": "Live", "live.reconnecting": "Reconnecting", "live.bluetooth": "Bluetooth", "live.wired": "Wired / speakers", "live.noMicrophone": "No microphone", "live.notesAhead": "Notes ahead", "live.echoCancel": "Echo cancel", "live.dancer": "Dancer", "live.sessionFinished": "Session finished", "live.howDid": "Here’s how you did.", "live.noTakes": "No takes long enough to score this time.", "live.playSong": "Play a song in Spotify or Apple Music", "live.scoreLower": "score", "live.view": "View", "live.learnedReady": "Learned · notes ready next time", "sing.speakerHint": "OnKey can’t hear you over the music. If you’re singing, turn it down a little or use headphones for a fair score.", "sing.speakerHintHide": "Don’t show again"
    ,"starter.why.wubai": "Clear melody, good for following along", "starter.why.renai": "A familiar melody, good for a first demo", "starter.why.jay": "A Mandarin classic, good for pitch practice", "starter.why.andylau": "Steady rhythm, good for singing all the way through", "starter.why.pingfan": "Steady and memorable, good for beginners", "starter.why.haojiubujian": "Slow and clear, easy to follow", "starter.why.wenrou": "Gentle melody, good for breath control", "starter.why.yueliang": "Classic and relaxed, good for warm-up", "starter.why.steady": "Easy: a steady, simple melody", "starter.why.singalong": "The singalong everyone knows", "starter.why.low": "Low and steady, easy to follow", "starter.why.held": "Long held notes to hold steady", "starter.why.verses": "Gentle verses, big chorus", "starter.why.clear": "One clear voice, a chorus that lifts", "starter.why.pitch": "Slow and expressive: great for pitch", "starter.why.range": "The challenge: huge range"
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
    "setup.stepWelcome": "欢迎", "setup.stepPermissions": "权限", "setup.stepMusic": "音乐应用", "setup.stepMic": "麦克风检查", "setup.stepReady": "准备好了", "setup.pointPlay": "像平时一样在音乐应用中播放歌曲。OnKey 会聆听 Mac 上播放的音乐并自动跟唱。", "setup.pointLearn": "歌曲第一次播放时，OnKey 会学习歌手的旋律。之后你会提前看到每个音符，以及音准偏高还是偏低。", "setup.pointPrivacy": "OnKey 不会保存它聆听的音乐。你的演唱录音会保存在本机，方便回听。识别新歌曲时，监听模式只会把音乐应用声音的短指纹（不是音频）发送给 Apple Shazam。", "setup.macosUnsupported": "OnKey 需要 macOS 14.2 或更高版本才能聆听其他应用。请在系统设置 → 通用 → 软件更新中升级 macOS。", "setup.permissionsHint": "macOS 会分别询问一次。之后可以在系统设置 → 隐私与安全性中修改。", "setup.micTitle": "麦克风", "setup.micWhy": "用于听见你的演唱。", "setup.micHint": "在“麦克风”中打开 OnKey。", "setup.audioTitle": "系统音频录制", "setup.audioWhy": "用于听见 Mac 上播放的音乐，让 OnKey 学习旋律。OnKey 不会保存或发送音乐；识别未知歌曲时，只会把短指纹（不是音频）发送给 Apple Shazam。", "setup.audioHint": "打开“屏幕与系统音频录制”，在“仅系统音频录制”中打开 OnKey。", "setup.skipForNow": "暂时跳过", "setup.restartHint": "如果 macOS 允许权限后要求退出并重新打开 OnKey，请照做。设置会从刚才的位置继续。", "setup.musicTitle": "允许 OnKey 跟随 Spotify 和 Apple Music", "setup.musicDesc": "这样从第一秒开始歌词和音符就能对齐，OnKey 也可以为你播放和重新开始歌曲。", "setup.musicRead": "OnKey 只能读取正在播放的歌曲和位置，并进行播放、暂停和定位。macOS 会分别询问一次。", "setup.musicWaiting": "正在等待 macOS。如果 Spotify 或 Apple Music 的权限问题显示在窗口后面，请处理它。没有弹窗？可以继续，第一次在对应应用播放歌曲时 macOS 会再次询问。", "setup.musicNoAnswer": "macOS 还没有返回结果。如果权限问题正在显示，请处理它；否则第一次在对应应用播放歌曲时会再次询问。", "setup.notAllowed": "未允许", "setup.askOnPlay": "第一次在其中播放歌曲时 macOS 会询问", "setup.noAnswer": "尚未回答", "setup.notAsked": "尚未询问", "setup.micBack": "OnKey 需要麦克风：请返回并允许使用。", "setup.noMic": "没有连接麦克风。请连接麦克风，或在系统设置 → 声音 → 输入中选择一个。", "setup.saySomething": "说点什么，或唱一个音。", "setup.listeningTo": "正在聆听", "setup.chooseSettings": "你可以在设置中选择其他设备。", "setup.heardYou": "听到你的声音了", "setup.listening": "聆听中…", "setup.starting": "启动中…", "setup.noMicrophone": "没有麦克风", "setup.notAllowedShort": "未允许", "setup.skip": "跳过", "setup.micAdvice": "使用耳机评分最稳定。笔记本扬声器也可以：OnKey 会从麦克风输入中消除音乐。", "setup.readyDesc": "在音乐应用中播放歌曲并开始演唱。每首歌第一次播放时，OnKey 会学习它的旋律。", "setup.readyAdvice": "用舒适的音量演唱：OnKey 评分的是音准，不是音量。嗓子疲劳时请休息，疼痛时请停止。",
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
    ,"learning.thisSong": "正在学习这首歌", "learning.blindTake": "盲唱演示", "learning.blindHint": "跟着歌曲演唱，不看提示。下一次播放时你会看到每个音符。", "learning.scoreAfter": "歌曲结束后评分"
    ,"live.noLyrics": "这首歌没有同步歌词", "live.lyricsOff": "歌词已关闭（设置）", "live.findingPlace": "正在定位歌曲进度…", "live.nextLine": "下一句", "live.firstLine": "第一句", "live.score": "得分", "live.afterSong": "歌曲结束后", "live.finishLast": "最后一句了", "live.finishScore": "结束并查看得分", "live.singingIn": "将在", "live.skipAhead": "跳过前奏"
    ,"live.couldntScore": "无法评分", "live.singNow": "现在演唱", "live.learnedPct": "% 已学习", "live.playThrough": "完整播放一遍", "live.learning": "学习中…", "live.waitingToLearn": "等待学习", "live.scoring": "评分中…", "live.checkTiming": "检查", "live.theseHeadphones": "这副耳机的延迟", "live.live": "运行中", "live.reconnecting": "重新连接中", "live.bluetooth": "蓝牙", "live.wired": "有线 / 扬声器", "live.noMicrophone": "没有麦克风", "live.notesAhead": "提前显示音符", "live.echoCancel": "消除回声", "live.dancer": "舞者", "live.sessionFinished": "演唱结束", "live.howDid": "看看这次表现。", "live.noTakes": "这次没有足够长的演唱记录可评分。", "live.playSong": "在 Spotify 或 Apple Music 播放歌曲", "live.scoreLower": "得分", "live.view": "查看", "live.learnedReady": "已学习 · 下次可显示音符", "sing.speakerHint": "音乐声太大，OnKey 听不清你的声音。如果你正在演唱，请把音乐调小一点，或戴上耳机以获得更准确的评分。", "sing.speakerHintHide": "不再显示"
    ,"starter.why.wubai": "旋律清晰，适合练习跟唱", "starter.why.renai": "熟悉的旋律，适合初次演示", "starter.why.jay": "经典华语歌曲，适合练音准", "starter.why.andylau": "节奏稳定，适合完整演唱", "starter.why.pingfan": "节奏稳定、容易记，适合入门", "starter.why.haojiubujian": "速度舒缓、旋律清晰，容易跟唱", "starter.why.wenrou": "旋律温和，适合练习气息", "starter.why.yueliang": "经典舒缓，适合热身", "starter.why.steady": "简单：旋律稳定清晰", "starter.why.singalong": "大家都熟悉的跟唱歌曲", "starter.why.low": "音域较低、节奏稳定，容易跟唱", "starter.why.held": "长音练习，保持音准稳定", "starter.why.verses": "主歌舒缓，副歌有挑战", "starter.why.clear": "人声清晰，副歌逐渐升高", "starter.why.pitch": "速度较慢、情感丰富，适合练音准", "starter.why.range": "挑战：音域跨度很大"
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
