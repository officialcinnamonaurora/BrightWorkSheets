import React from 'react';
import { SITE_CONFIG } from '../data/siteConfig';
import { ShieldCheck, Lock, ExternalLink, Mail, Clock } from 'lucide-react';

export const PrivacyPage: React.FC = () => {
  return (
    <div className="no-print max-w-4xl mx-auto py-6 sm:py-10 px-4 sm:px-6">
      {/* Category Tag */}
      <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-100 text-emerald-900 text-xs font-bold uppercase tracking-wider mb-4">
        <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
        <span>Your Privacy & Safety</span>
      </div>

      {/* Main H1 with Last Updated Date */}
      <div className="mb-8 border-b border-slate-200 pb-6">
        <h1 className="text-3xl sm:text-5xl font-black font-display tracking-tight text-slate-900 leading-tight mb-2">
          Privacy Policy
        </h1>
        <div className="flex items-center gap-2 text-xs font-semibold text-slate-500">
          <Clock className="w-3.5 h-3.5 text-slate-400" />
          <span>Last updated: {SITE_CONFIG.lastUpdated}</span>
        </div>
      </div>

      {/* Overview Card */}
      <div className="bg-emerald-50/70 border border-emerald-200/80 rounded-2xl p-5 mb-8 flex items-start gap-3.5">
        <Lock className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
        <p className="text-sm text-emerald-950 leading-relaxed font-medium">
          <strong>Privacy Summary:</strong> BrightWorkSheets is built with privacy-by-design. All worksheet
          generators run completely client-side in your web browser. Names, custom words, and handwriting exercises
          you input never leave your device, are never transmitted to our servers, and are never stored in any database.
        </p>
      </div>

      {/* Policy Content Sections with Semantic HTML */}
      <div className="space-y-8 text-slate-700 text-sm sm:text-base leading-relaxed">
        {/* Section 1 */}
        <section className="space-y-3">
          <h2 className="text-xl font-bold font-display text-slate-900">
            1. Client-Side Processing & Worksheet Inputs
          </h2>
          <p>
            When you type a child's name, vocabulary words, or customize problem parameters on {SITE_CONFIG.domain},
            that data is processed strictly by JavaScript running in your local web browser. We do not transmit, log,
            save, or share any names or personal text inputs entered into our generators. When you refresh or close your
            browser tab, your session inputs remain solely under your control.
          </p>
        </section>

        {/* Section 2 */}
        <section className="space-y-3">
          <h2 className="text-xl font-bold font-display text-slate-900">
            2. Third-Party Advertising & Cookies
          </h2>
          <p>
            To keep BrightWorkSheets 100% free for parents and educators, we may display third-party advertisements
            (such as through Google AdSense). These third-party vendors, including Google, use cookies and similar
            technologies to serve advertisements based on a visitor's prior visits to this website or other websites
            on the Internet.
          </p>
          <p>
            Google's use of advertising cookies enables it and its partners to serve ads to users based on their
            browsing patterns. You may opt out of personalized advertising by visiting{' '}
            <a
              href="https://adssettings.google.com"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 text-amber-700 font-bold hover:underline"
            >
              <span>Google Ad Settings</span>
              <ExternalLink className="w-3 h-3" />
            </a>
            . Alternatively, you can opt out of third-party vendor use of cookies for personalized advertising by
            visiting{' '}
            <a
              href="https://www.aboutads.info/choices/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 text-amber-700 font-bold hover:underline"
            >
              <span>AboutAds.info</span>
              <ExternalLink className="w-3 h-3" />
            </a>
            .
          </p>
        </section>

        {/* Section 3 */}
        <section className="space-y-3">
          <h2 className="text-xl font-bold font-display text-slate-900">
            3. Information Collected Automatically Through Analytics
          </h2>
          <p>
            Like standard web services, we may collect non-personally identifiable information automatically when you
            browse our website. This may include your browser type, device category, referring URL, operating system,
            language preference, and general geographic region (country or state level). We use this aggregated, anonymous
            data solely to monitor site performance, troubleshoot broken links, and understand which worksheet generators
            are most popular.
          </p>
        </section>

        {/* Section 4 */}
        <section className="space-y-3">
          <h2 className="text-xl font-bold font-display text-slate-900">
            4. Children's Privacy (COPPA Compliance)
          </h2>
          <p>
            BrightWorkSheets is designed for adult visitors—specifically parents, guardians, teachers, and homeschool
            instructors. The website is not intended for unsupervised use by children under the age of 13.
          </p>
          <p>
            We do not require user accounts, logins, or contact forms, and we do not knowingly collect personal
            information from children under 13 years of age. If a parent or guardian believes their child has
            inadvertently provided personal information to us, please contact us immediately at{' '}
            <a
              href={`mailto:${SITE_CONFIG.contactEmail}`}
              className="text-amber-700 font-bold hover:underline font-mono"
            >
              {SITE_CONFIG.contactEmail}
            </a>
            , and we will promptly take steps to delete any such data.
          </p>
        </section>

        {/* Section 5 */}
        <section className="space-y-3">
          <h2 className="text-xl font-bold font-display text-slate-900">
            5. External Links to Third-Party Sites
          </h2>
          <p>
            Our website may occasionally contain links to external sites (such as Google Fonts or educational
            reference resources). Please note that once you leave {SITE_CONFIG.domain}, our Privacy Policy no
            longer applies. We encourage you to review the privacy policies of any third-party websites you visit.
          </p>
        </section>

        {/* Section 6 */}
        <section className="space-y-3">
          <h2 className="text-xl font-bold font-display text-slate-900">
            6. Visitor Rights & Privacy Inquiries
          </h2>
          <p>
            Depending on your jurisdiction, you may have rights regarding your personal information, such as the
            right to request access, correction, or deletion of any data held about you. Because we do not store
            account profiles, user records, or typed worksheet text, we generally hold no personal records associated
            with individual visitors.
          </p>
          <p>
            If you have questions, comments, or requests regarding this Privacy Policy, please contact us by email:
          </p>
          <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 inline-flex items-center gap-3">
            <Mail className="w-4 h-4 text-amber-600" />
            <span className="font-semibold text-slate-800">Email:</span>
            <a
              href={`mailto:${SITE_CONFIG.contactEmail}`}
              className="text-amber-700 font-bold hover:underline font-mono"
            >
              {SITE_CONFIG.contactEmail}
            </a>
          </div>
        </section>

        {/* Section 7 */}
        <section className="space-y-3">
          <h2 className="text-xl font-bold font-display text-slate-900">
            7. Changes to This Privacy Policy
          </h2>
          <p>
            We may periodically update this Privacy Policy to reflect improvements to our tools, legal requirements,
            or advertising partner specifications. When updates are published, the "Last updated" date at the top of
            this page will be revised accordingly. We recommend checking this page occasionally to stay informed.
          </p>
        </section>
      </div>
    </div>
  );
};
