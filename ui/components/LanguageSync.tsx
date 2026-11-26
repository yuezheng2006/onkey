"use client";
// Load the window's saved language and the computer's locale for Automatic and the Welcome picker.
import { useEffect } from "react";
import { getSettings, setLanguage, storedLanguage, uiLocale, uiRegion } from "@/lib/session";
import { languageSetting, setLanguageSetting, setSystemLanguages, setSystemRegion } from "@/lib/i18n";

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
      const saved = storedLanguage();
      if (saved && s) void setLanguage(saved).catch(() => {});
      else if (saved) setLanguageSetting(saved);
    });
    // the computer's language changed (matters when "auto"; the browser says so, the app's WebView may not)
    const changed = () => void readOs().then(() => setLanguageSetting(languageSetting()));
    window.addEventListener("languagechange", changed);
    return () => { alive = false; window.removeEventListener("languagechange", changed); };
  }, []);
  return null;
}
