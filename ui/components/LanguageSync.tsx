"use client";
// Load the window's saved language and the computer's locale for Automatic and the Welcome picker.
import { useEffect } from "react";
import { getSettings, setLanguage, uiLocale, uiRegion } from "@/lib/session";
import { languageSetting, setLanguageSetting, setSystemLanguages, setSystemRegion } from "@/lib/i18n";
import { DEFAULT_LOCALE } from "@/lib/languages";

export default function LanguageSync() {
  useEffect(() => {
    let alive = true;
    const initialChoice = languageSetting();
    const readOs = () => uiLocale().then(l => { if (alive && l) setSystemLanguages(l); }).catch(() => {});
    void uiRegion().then(r => { if (alive) setSystemRegion(r); }).catch(() => {});   // for the Welcome step's list
    void Promise.all([readOs(), getSettings().catch(() => null)]).then(([, s]) => {
      if (!alive || languageSetting() !== initialChoice) return;
      if (s?.language) {
        setLanguageSetting(s.language);
        return;
      }
      let legacy: string | null = null;
      try { legacy = localStorage.getItem("onkey.locale"); } catch {}
      if (legacy === "zh" || legacy === "en") {
        const migrated = legacy === "zh" ? DEFAULT_LOCALE : "en";
        if (s) void setLanguage(migrated).catch(() => {});
        else setLanguageSetting(migrated);
      }
    });
    // the computer's language changed (matters when "auto"; the browser says so, the app's WebView may not)
    const changed = () => void readOs().then(() => setLanguageSetting(languageSetting()));
    window.addEventListener("languagechange", changed);
    return () => { alive = false; window.removeEventListener("languagechange", changed); };
  }, []);
  return null;
}
