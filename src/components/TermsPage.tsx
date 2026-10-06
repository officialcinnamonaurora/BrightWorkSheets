import React from 'react';
import { SITE_CONFIG } from '../data/siteConfig';
import { FileText, CheckCircle, XCircle, AlertCircle, Clock, Mail } from 'lucide-react';

export const TermsPage: React.FC = () => {
  return (
    <div className="no-print max-w-4xl mx-auto py-6 sm:py-10 px-4 sm:px-6">
      {/* Category Tag */}
      <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-100 text-slate-800 text-xs font-bold uppercase tracking-wider mb-4">
        <FileText className="w-3.5 h-3.5 text-slate-600" />
        <span>Terms & Conditions</span>
      </div>

      {/* Main H1 with Last Updated Date */}
      <div className="mb-8 border-b border-slate-200 pb-6">
        <h1 className="text-3xl sm:text-5xl font-black font-display tracking-tight text-slate-900 leading-tight mb-2">
          Terms of Use
        </h1>
        <div className="flex items-center gap-2 text-xs font-semibold text-slate-500">
          <Clock className="w-3.5 h-3.5 text-slate-400" />
          <span>Last updated: {SITE_CONFIG.lastUpdated}</span>
        </div>
      </div>

      {/* Summary Box */}
      <div className="bg-amber-50/70 border border-amber-200/80 rounded-2xl p-5 mb-8">
        <h2 className="font-bold text-amber-950 text-base mb-2">Terms at a Glance:</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs sm:text-sm">
          <div className="flex items-start gap-2 text-emerald-800">
            <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
            <span><strong>Allowed:</strong> Free printing for your home, classroom, daycare, or homeschool co-op.</span>
          </div>
          <div className="flex items-start gap-2 text-rose-800">
            <XCircle className="w-4 h-4 text-rose-600 shrink-0 mt-0.5" />
            <span><strong>Prohibited:</strong> Reselling printed sheets, selling digital PDFs, or republishing the website code.</span>
          </div>
        </div>
      </div>

      {/* Full Terms Sections */}
      <div className="space-y-8 text-slate-700 text-sm sm:text-base leading-relaxed">
        {/* Section 1 */}
        <section className="space-y-3">
          <h2 className="text-xl font-bold font-display text-slate-900">
            1. Acceptance of Terms
          </h2>
          <p>
            By accessing or using {SITE_CONFIG.domain} (the "Site"), you agree to be bound by these Terms of Use
            and our Privacy Policy. If you do not agree with any part of these terms, please do not use the Site.
          </p>
        </section>

        {/* Section 2 */}
        <section className="space-y-3">
          <h2 className="text-xl font-bold font-display text-slate-900">
            2. Permitted Use: Free Personal and Classroom Use
          </h2>
          <p>
            BrightWorkSheets grants you a non-exclusive, non-transferable, revocable license to access our online tools
            and to print, copy, and distribute physical paper printouts of generated worksheets for:
          </p>
          <ul className="list-disc pl-6 space-y-1.5 text-slate-600">
            <li>Personal, non-commercial use with your own children or family members.</li>
            <li>Classroom instruction, tutoring, speech therapy, and homeschool education.</li>
            <li>Non-profit community groups, libraries, daycares, and after-school programs.</li>
          </ul>
          <p>
            You may print as many copies as needed for your students or children without requesting individual permission.
          </p>
        </section>

        {/* Section 3 */}
        <section className="space-y-3">
          <h2 className="text-xl font-bold font-display text-slate-900">
            3. Restrictions: No Reselling or Redistribution
          </h2>
          <p>
            While our generators and printables are 100% free for educators and families, commercial exploitation
            is strictly prohibited. You agree that you will <strong>not</strong>:
          </p>
          <ul className="list-disc pl-6 space-y-1.5 text-slate-600">
            <li>Sell, license, sub-license, or package generated worksheets for commercial resale (whether printed or digital).</li>
            <li>Upload our generated PDF files to commercial digital marketplaces, subscription bundles, or file-sharing hubs.</li>
            <li>Remove or obscure the small, light-gray "brightworksheets.com" attribution footer from printed worksheets.</li>
            <li>Mirror, scrape, reverse-engineer, frame, or reproduce the website interface or software code.</li>
          </ul>
        </section>

        {/* Section 4 */}
        <section className="space-y-3">
          <h2 className="text-xl font-bold font-display text-slate-900">
            4. Provided "As Is" Without Warranties
          </h2>
          <p>
            The Site, generators, and worksheets are provided on an "AS IS" and "AS AVAILABLE" basis without warranties
            of any kind, either express or implied, including but not limited to implied warranties of merchantability,
            fitness for a particular educational purpose, accuracy, or non-infringement.
          </p>
          <p>
            While we strive for accurate handwriting stroke guidelines, mathematical calculations, and word placements,
            we do not warrant that our tools will be error-free or uninterrupted.
          </p>
        </section>

        {/* Section 5 */}
        <section className="space-y-3">
          <h2 className="text-xl font-bold font-display text-slate-900">
            5. Modifications to Tools and Terms
          </h2>
          <p>
            We reserve the right to modify, add, or discontinue any worksheet generator, feature, or option on the
            Site at any time without prior notice. We may also revise these Terms of Use at our sole discretion. Any
            changes take effect immediately upon posting to this page with an updated "Last updated" date. Continued
            use of the Site following updates constitutes acceptance of the new terms.
          </p>
        </section>

        {/* Section 6 */}
        <section className="space-y-3">
          <h2 className="text-xl font-bold font-display text-slate-900">
            6. Third-Party Links & Services
          </h2>
          <p>
            The Site may display links to third-party services, font repositories, or sponsor advertisements. We do not
            control and are not responsible for the content, privacy practices, or availability of third-party platforms.
            Accessing external links is done at your own risk.
          </p>
        </section>

        {/* Section 7 */}
        <section className="space-y-3">
          <h2 className="text-xl font-bold font-display text-slate-900">
            7. Limitation of Liability
          </h2>
          <p>
            To the maximum extent permitted by applicable law, in no event shall BrightWorkSheets, its creators, or
            operators be liable for any direct, indirect, incidental, special, consequential, or punitive damages arising
            out of or related to your access to, use of, or inability to use the Site or its printed materials.
          </p>
        </section>

        {/* Section 8 */}
        <section className="space-y-3">
          <h2 className="text-xl font-bold font-display text-slate-900">
            8. Questions & Contact Information
          </h2>
          <p>
            If you have any questions or concerns regarding these Terms of Use or wish to inquire about licensing,
            please reach out to us:
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
      </div>
    </div>
  );
};
