import type { Metadata } from "next";
import "./globals.css";
import ControlPrompt from "@/components/ControlPrompt";
import ReportProblem from "@/components/ReportProblem";
import Feedback from "@/components/Feedback";
import MirrorBadge from "@/components/MirrorBadge";
import UpdatePill from "@/components/UpdatePill";
import GoHome from "@/components/GoHome";
import DevDrive from "@/components/DevDrive";
import OpenLinks from "@/components/OpenLinks";
import LanguageSync from "@/components/LanguageSync";
import I18n from "@/components/I18n";
import { DEFAULT_LOCALE } from "@/lib/languages";
import zhHans from "@/messages/zh-Hans.json" with { type: "json" };

export const metadata: Metadata = {
  title: zhHans.app.title,
  description: zhHans.app.description,
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang={DEFAULT_LOCALE}>
      <body className="antialiased">
        <script dangerouslySetInnerHTML={{ __html: "if ('__TAURI_INTERNALS__' in window) { document.documentElement.classList.add('in-app'); const log = m => { try { window.__TAURI_INTERNALS__.invoke('ui_log', { msg: String(m).slice(0, 2000) }); } catch (e) {} }; window.addEventListener('error', e => log(e.message + ' at ' + e.filename + ':' + e.lineno)); window.addEventListener('unhandledrejection', e => log('unhandled: ' + (e.reason && (e.reason.stack || e.reason)))); const ce = console.error; console.error = (...a) => { log(a.join(' ')); ce(...a); }; window.addEventListener('load', () => log('window loaded')); }" }} />
        <LanguageSync />
        <I18n>
          {children}
          <ControlPrompt />
          <ReportProblem />
          <Feedback />
          <MirrorBadge />
          <UpdatePill />
          <GoHome />
          <DevDrive />
          <OpenLinks />
        </I18n>
      </body>
    </html>
  );
}
