import type { Metadata } from 'next'
import {
  LegalBody,
  LegalSection,
  LegalList,
  LegalLink,
  LegalMail,
  LegalCallout,
  TradeNameNotice,
} from '@/components/legal/legal-body'
import { BRAND, LEGAL, CONTACT_URL, PRIVACY_URL, SITE_URL, UNSUBSCRIBE_URL } from '@/lib/constants'

export const metadata: Metadata = {
  title: `Terms & Conditions — ${BRAND.name}`,
}

const SMS_HELP =
  LEGAL.contactPhone !== ''
    ? `reply HELP, email ${BRAND.contactEmail}, or call ${LEGAL.contactPhone}`
    : `reply HELP or email ${BRAND.contactEmail}`

const TOC = [
  '1. Who We Are',
  '2. Eligibility and Geographic Scope',
  '3. Description of the Services',
  '4. Informational and Educational Purposes Only',
  '5. Your Use of the Services',
  '6. Email Communications',
  '7. SMS / Mobile Messaging Program Terms',
  '8. Interactive Features, Quizzes, Challenges, and Tools',
  '10. User Submissions and Feedback',
  '11. Third-Party Links, Products, Services, and Partners',
  '12. Affiliate, Referral, Advertising, and Sponsored Content',
  '13. Purchases, Billing, and Refunds',
  '14. Intellectual Property',
  '15. Copyright Complaints',
  '16. Privacy',
  '17. Disclaimer of Warranties',
  '18. Limitation of Liability',
  '19. Indemnification',
  '20. Suspension and Termination',
  '21. Changes to the Services or These Terms',
  '22. Governing Law and Venue',
  '23. General Provisions',
  '24. Contact',
]

export default function TermsPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-16 sm:px-6 lg:px-8 lg:py-24">
        <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">Legal</p>
        <h1 className="mt-4 text-3xl font-semibold tracking-tight sm:text-4xl">{BRAND.name} Terms &amp; Conditions</h1>
        <p className="mt-3 text-sm text-muted-foreground">Last updated: {LEGAL.termsLastUpdated}</p>

        <LegalBody>
          <nav className="rounded-2xl border border-border bg-card/40 p-5 text-sm">
            <p className="mb-3 text-xs font-medium uppercase tracking-wider text-primary">Contents</p>
            <ol className="grid gap-1 sm:grid-cols-2">
              {TOC.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ol>
          </nav>

          <p>
            These Terms &amp; Conditions (the &quot;Terms&quot;) govern your access to and use of{' '}
            <LegalLink href="/">{SITE_URL}</LegalLink>, related websites, content, newsletters, SMS
            programs, forms, quizzes, challenges, tools, planners, and other services operated under
            the {BRAND.name} brand (collectively, the &quot;Services&quot;).
          </p>
          <p>
            The Services are operated by {LEGAL.entityName}, doing business as {BRAND.name} (&quot;
            {BRAND.name},&quot; &quot;we,&quot; &quot;us,&quot; or &quot;our&quot;). These Terms
            incorporate our <LegalLink href="/privacy">Privacy Policy</LegalLink> and any additional
            rules, disclosures, or terms presented for a specific feature.
          </p>
          <LegalCallout>
            BY ACCESSING OR USING THE SERVICES, YOU AGREE TO THESE TERMS. IF YOU DO NOT AGREE, DO NOT
            ACCESS OR USE THE SERVICES.
          </LegalCallout>

          <LegalSection id="who-we-are" title="1. Who We Are">
            <LegalList
              items={[
                `Brand / trade name: ${BRAND.name}`,
                `Operator: ${LEGAL.entityName}`,
                `Legal form: ${LEGAL.legalForm}`,
                `State and country of formation: ${LEGAL.state}, ${LEGAL.country}`,
                `Principal address: ${LEGAL.principalAddress}`,
                `Website: ${SITE_URL}`,
                `Email: ${BRAND.contactEmail}`,
                ...(LEGAL.contactPhone ? [`Phone: ${LEGAL.contactPhone}`] : []),
              ]}
            />
          </LegalSection>

          <LegalSection id="eligibility" title="2. Eligibility and Geographic Scope">
            <p>
              The Services are primarily intended for users in the United States. You must be at least{' '}
              <strong className="text-foreground">18</strong> years old and have the legal capacity to
              enter into these Terms. If the age of majority where you live is higher, you must satisfy
              that higher age requirement.
            </p>
            <p>
              You may not use the Services if you are prohibited from doing so under applicable law. By
              using the Services, you represent that the information you provide is accurate and that
              your use complies with applicable law.
            </p>
          </LegalSection>

          <LegalSection id="services" title="3. Description of the Services">
            <p>
              {BRAND.name} provides a website, editorial or product content, email and
              SMS communications, interactive tools, and related digital experiences.
            </p>
            <p>The Services may include:</p>
            <LegalList
              items={[
                'Editorial articles, life hacks, and educational materials',
                'Email newsletters, daily tips, weekly recaps, and promotional communications',
                'SMS wellness nudges, habit reminders, and promotional text messages',
                'Onboarding quizzes, personal path recommendations, and weekly check-ins',
                'Habit planners, challenges, calculators, and smart-selection tools',
                'PDF plan exports and interactive explore content',
                'Affiliate links, sponsored content, and references to third-party services',
              ]}
            />
            <p>
              We may add, modify, suspend, restrict, or discontinue any part of the Services. We do
              not guarantee that any particular content, feature, offer, partner, or communication
              channel will remain available.
            </p>
          </LegalSection>

          <LegalSection id="informational-only" title="4. Informational and Educational Purposes Only">
            <p>
              Unless we expressly state otherwise in a separate written agreement, all content and
              communications provided through the Services are for general informational, educational,
              editorial, entertainment, or motivational purposes only.
            </p>
            <p>
              The Services do not provide and are not a substitute for medical, psychological, legal,
              tax, financial, investment, nutrition, fitness, or other professional advice. You should
              consult an appropriately qualified professional before acting on information that may
              affect your health, finances, legal rights, safety, or other material interests.
            </p>
            <p>
              No clinician-patient, therapist-client, attorney-client, fiduciary, financial
              adviser-client, or other professional relationship is created by your use of the Services.
            </p>
            <p className="font-medium text-foreground">Health and Wellness Warning</p>
            <p>
              We are not a medical provider and do not diagnose, treat, cure, or prevent disease.
              Health, wellness, fitness, dietary, supplement, fasting, cold-exposure, sleep, or
              self-improvement content may not be appropriate for every person. Consider your health
              conditions, medications, limitations, and personal circumstances, and consult a qualified
              clinician before starting, changing, or stopping a health routine, supplement,
              medication, treatment, diet, or physical activity. Stop an activity and seek appropriate
              care if you experience concerning symptoms. In a medical emergency, call 911 or your local
              emergency number.
            </p>
          </LegalSection>

          <LegalSection id="your-use" title="5. Your Use of the Services">
            <p>
              You may use the Services only for lawful, personal, and non-commercial purposes unless we
              authorize otherwise in writing.
            </p>
            <p>You agree not to:</p>
            <LegalList
              items={[
                'Access or use the Services in a manner that violates law, regulation, court order, or the rights of another person.',
                'Interfere with, disrupt, overload, damage, disable, or impair the Services or related systems.',
                'Attempt to gain unauthorized access to accounts, systems, networks, source code, credentials, or data.',
                'Probe, scan, test, or circumvent security, authentication, rate limits, access controls, or technical restrictions.',
                'Use bots, scrapers, crawlers, automation, data-mining tools, or similar methods to access, copy, harvest, monitor, or extract data without written permission, except as allowed by law or standard search-engine indexing instructions.',
                'Introduce malware, malicious code, harmful files, or deceptive links.',
                'Impersonate another person or entity, misrepresent affiliation, or provide false or misleading information.',
                'Use the Services to harass, threaten, exploit, defraud, deceive, abuse, or harm another person.',
                'Infringe intellectual property, privacy, publicity, confidentiality, contractual, or other rights.',
                'Reverse engineer, decompile, disassemble, copy, frame, mirror, modify, sell, sublicense, or create derivative works from the Services except as permitted by law.',
                'Use content or data from the Services to train, develop, or improve an artificial intelligence or machine-learning model without our written permission, except where such restriction is prohibited by law.',
                'Use interactive features in a manner that is unsafe, dishonest, manipulative, or inconsistent with their intended purpose.',
              ]}
            />
            <p>
              We may investigate suspected violations and suspend or terminate access when reasonably
              necessary to protect the Services, users, third parties, or our legal interests.
            </p>
          </LegalSection>

          <LegalSection id="email" title="6. Email Communications">
            <p>
              If you provide an email address and subscribe, you agree to receive the communications
              described at the point of collection, which may include newsletters, product or tool announcements, event notices, and occasional
              promotional messages.
            </p>
            <p>
              You may unsubscribe from marketing email at any time using the unsubscribe link in the
              message, contacting <LegalMail email={BRAND.contactEmail} />, or using our{' '}
              <LegalLink href="/unsubscribe">Unsubscribe page</LegalLink> ({UNSUBSCRIBE_URL}). We may
              continue to send transactional, security, administrative, or service-related messages
              that are not marketing communications.
            </p>
          </LegalSection>

          <LegalSection id="sms" title="7. SMS / Mobile Messaging Program Terms">
            <p>
              This Section applies if you opt in to receive text messages from {BRAND.name} (the &quot;SMS
              Program&quot;).
            </p>
            <p className="font-medium text-foreground">7.1 Consent and Authorization</p>
            <p>
              By submitting a mobile number through an SMS opt-in form, checking the applicable consent
              box, or otherwise completing a disclosed opt-in process, you authorize {BRAND.name} to send
              recurring text messages to the number provided, including messages sent using automated
              technology. Messages may include service updates, editorial alerts,
              and occasional promotional SMS messages.
            </p>
            <p>
              You represent that you are the subscriber or customary user of the mobile number and are
              authorized to provide consent for messages to that number.
            </p>
            <p className="font-medium text-foreground">7.2 Message Frequency and Charges</p>
            <p>
              Message frequency varies. Message and data rates may apply. Your carrier&apos;s rates and
              terms govern charges associated with receiving or sending text messages.
            </p>
            <p className="font-medium text-foreground">7.3 Opting Out</p>
            <p>
              You may revoke consent and opt out at any time by replying STOP, QUIT, END, CANCEL,
              UNSUBSCRIBE, or another reasonable opt-out request to a message from us. We may send one
              final confirmation message. After the opt-out is processed, you will no longer receive
              messages covered by the request unless you separately opt in again or a message is
              otherwise permitted by law. You may also manage SMS preferences through our{' '}
              <LegalLink href="/unsubscribe">Unsubscribe page</LegalLink> ({UNSUBSCRIBE_URL}).
            </p>
            <p className="font-medium text-foreground">7.4 Help</p>
            <p>
              For help, {SMS_HELP}.
            </p>
            <p className="font-medium text-foreground">7.5 No Purchase Requirement</p>
            <p>
              Consent to receive marketing text messages is not a condition of purchasing any property,
              goods, or services.
            </p>
            <p className="font-medium text-foreground">7.6 Carrier and Delivery Disclaimer</p>
            <p>
              Wireless carriers are not liable for delayed or undelivered messages. Delivery depends on
              carrier networks, device compatibility, service availability, and other factors outside
              our control. We do not guarantee that every message will be delivered or received.
            </p>
            <p className="font-medium text-foreground">7.7 Number Changes and Reassignment</p>
            <p>
              If you change, transfer, or deactivate your mobile number, you are responsible for updating
              your information or opting out before relinquishing the number. You agree not to provide a
              number for which you are not the subscriber or customary user.
            </p>
            <p className="font-medium text-foreground">7.8 Program Changes or Termination</p>
            <p>
              We may modify, suspend, or terminate the SMS Program or change the sending number,
              message content, or frequency. Where required, we will provide notice. Your opt-out rights
              remain available as required by law.
            </p>
          </LegalSection>

          <LegalSection id="interactive" title="8. Interactive Features, Quizzes, Challenges, and Tools">
            <p>
              The Services may provide quizzes, tools, saved preferences, and other interactive
              features. These features are intended for personal information, education, engagement,
              entertainment, or motivation and are not professional assessments or guarantees of results.
            </p>
            <p>
              You participate voluntarily and are responsible for determining whether an activity is
              appropriate for your circumstances. Scores, streaks, recommendations, progress indicators,
              and completion records are informational and may be incomplete, delayed, or inaccurate.
            </p>
            <p className="font-medium text-foreground">Events</p>
            <p>
              If we offer events, schedules, speakers, venues, topics, eligibility, and availability
              may change. Registration does not guarantee admission unless expressly confirmed. Separate
              event rules, releases, or policies may apply.
            </p>
          </LegalSection>

          <LegalSection id="submissions" title="10. User Submissions and Feedback">
            <p>
              If you submit comments, questions, suggestions, ideas, testimonials, reviews, images,
              content, or other materials (&quot;Submissions&quot;), you represent that you have the
              necessary rights and that the Submission does not violate law or another person&apos;s
              rights.
            </p>
            <p>
              Unless a separate written agreement states otherwise, you grant {BRAND.name} a worldwide,
              non-exclusive, royalty-free, transferable, sublicensable license to host, store, reproduce,
              modify, adapt, publish, translate, distribute, display, perform, and otherwise use
              Submissions as reasonably necessary to operate, improve, promote, and provide the Services.
            </p>
            <p>
              This license does not apply to personal information in a manner inconsistent with the{' '}
              <LegalLink href="/privacy">Privacy Policy</LegalLink>. Do not submit confidential,
              proprietary, or sensitive information unless we specifically request it through an
              appropriate channel.
            </p>
            <p>
              Feedback and general ideas may be used without restriction or compensation, to the extent
              permitted by law.
            </p>
          </LegalSection>

          <LegalSection id="third-party" title="11. Third-Party Links, Products, Services, and Partners">
            <p>
              The Services may link to or reference independent third-party websites, products,
              merchants, advertisers, applications, telehealth providers, marketplaces, or other
              services (&quot;Third-Party Services&quot;).
            </p>
            <p>
              Third-Party Services are not controlled by {BRAND.name}. We do not guarantee or assume
              responsibility for their content, accuracy, availability, eligibility standards, quality,
              safety, legality, pricing, billing, shipping, refund practices, security, or privacy
              practices. Your use of Third-Party Services is governed by the third party&apos;s own terms
              and policies.
            </p>
            <p>
              A link, mention, ranking, review, comparison, or recommendation does not necessarily
              constitute an endorsement. You are responsible for evaluating a Third-Party Service before
              providing information, making a purchase, or relying on it.
            </p>
          </LegalSection>

          <LegalSection
            id="affiliate"
            title="12. Affiliate, Referral, Advertising, and Sponsored Content Disclosure"
          >
            <p>
              Some links, recommendations, placements, articles, emails, SMS messages, or other content
              may be sponsored, paid, affiliate-based, or referral-based. {BRAND.name} may receive
              compensation when you view, click, register, submit information, purchase, or take another
              action through those materials.
            </p>
            <p>
              Compensation may influence which products, services, or partners are presented, but it
              does not change your responsibility to conduct independent evaluation. We aim to disclose
              material relationships in a clear and reasonably prominent manner where required.
            </p>
          </LegalSection>

          <LegalSection id="purchases" title="13. Purchases, Billing, and Refunds">
            <p className="font-medium text-foreground">No Direct Sales / Third-Party Purchases</p>
            <p>
              {BRAND.name} does not directly sell the third-party products or services promoted through
              the Services unless expressly stated. Purchases are generally made from independent
              merchants or providers. Pricing, billing, fulfillment, cancellation, returns, warranties,
              refunds, and customer support for those purchases are governed by the applicable third
              party.
            </p>
          </LegalSection>

          <LegalSection id="ip" title="14. Intellectual Property">
            <p>
              The Services and their content—including text, articles, graphics, designs, interfaces,
              logos, trademarks, photographs, videos, audio, code, databases, compilations, and other
              materials—are owned by or licensed to {BRAND.name} and are protected by applicable
              intellectual property laws.
            </p>
            <p>
              Subject to these Terms, we grant you a limited, revocable, non-exclusive, non-transferable,
              non-sublicensable license to access and use the Services for lawful personal, non-commercial
              purposes.
            </p>
            <p>
              Except as permitted by law or with our written authorization, you may not reproduce,
              republish, distribute, transmit, publicly display, publicly perform, modify, sell, license,
              create derivative works from, systematically extract, or commercially exploit any part of
              the Services.
            </p>
            <p>
              &quot;{BRAND.name},&quot; related logos, and other brand identifiers are trademarks or
              trade dress of {LEGAL.entityName} or their respective owners. No license to use a
              trademark is granted by these Terms.
            </p>
          </LegalSection>

          <LegalSection id="copyright" title="15. Copyright Complaints">
            <p>
              If you believe content on the Services infringes your copyright, send a notice to{' '}
              <LegalMail email={LEGAL.copyrightEmail} /> containing sufficient information to identify
              the copyrighted work, the allegedly infringing material, your contact information, a
              good-faith statement, a statement under penalty of perjury that the notice is accurate and
              you are authorized to act, and your physical or electronic signature.
            </p>
          </LegalSection>

          <LegalSection id="privacy" title="16. Privacy">
            <p>
              Our Privacy Policy explains how we collect, use, disclose, and protect personal information
              and is incorporated into these Terms. The Privacy Policy is available at{' '}
              <LegalLink href="/privacy">{PRIVACY_URL}</LegalLink>.
            </p>
          </LegalSection>

          <LegalSection id="disclaimer" title="17. Disclaimer of Warranties">
            <LegalCallout>
              THE SERVICES ARE PROVIDED &quot;AS IS&quot; AND &quot;AS AVAILABLE,&quot; WITH ALL FAULTS
              AND WITHOUT GUARANTEES OF ANY KIND.
            </LegalCallout>
            <LegalCallout>
              TO THE MAXIMUM EXTENT PERMITTED BY LAW, {BRAND.name.toUpperCase()} AND ITS AFFILIATES,
              LICENSORS, SERVICE PROVIDERS, PARTNERS, OFFICERS, DIRECTORS, EMPLOYEES, AND AGENTS
              DISCLAIM ALL EXPRESS, IMPLIED, AND STATUTORY WARRANTIES, INCLUDING WARRANTIES OF
              MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE, TITLE, NON-INFRINGEMENT, ACCURACY,
              COMPLETENESS, QUIET ENJOYMENT, SECURITY, AND WARRANTIES ARISING FROM COURSE OF DEALING OR
              USAGE OF TRADE.
            </LegalCallout>
            <LegalCallout>
              WE DO NOT WARRANT THAT THE SERVICES WILL BE UNINTERRUPTED, ERROR-FREE, SECURE, CURRENT,
              COMPLETE, OR SUITABLE FOR YOUR PURPOSE; THAT DEFECTS WILL BE CORRECTED; THAT CONTENT OR
              RECOMMENDATIONS WILL PRODUCE A PARTICULAR RESULT; OR THAT THIRD-PARTY SERVICES WILL BE
              AVAILABLE, SAFE, LAWFUL, OR SATISFACTORY.
            </LegalCallout>
            <p>Some jurisdictions do not allow certain warranty exclusions, so some exclusions may not apply to you.</p>
          </LegalSection>

          <LegalSection id="liability" title="18. Limitation of Liability">
            <LegalCallout>
              TO THE MAXIMUM EXTENT PERMITTED BY LAW, {BRAND.name.toUpperCase()} AND ITS AFFILIATES,
              LICENSORS, SERVICE PROVIDERS, PARTNERS, OFFICERS, DIRECTORS, EMPLOYEES, AND AGENTS WILL
              NOT BE LIABLE FOR ANY INDIRECT, INCIDENTAL, SPECIAL, CONSEQUENTIAL, EXEMPLARY, PUNITIVE, OR
              ENHANCED DAMAGES; LOSS OF PROFITS, REVENUE, DATA, GOODWILL, OPPORTUNITY, OR BUSINESS;
              PERSONAL INJURY OR PROPERTY DAMAGE ARISING FROM OPTIONAL ACTIVITIES; OR DAMAGES ARISING FROM
              THIRD-PARTY SERVICES, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGES.
            </LegalCallout>
            <p>
              The limitations apply regardless of the legal theory and even if a remedy fails of its
              essential purpose. They do not apply to liability that cannot lawfully be excluded or
              limited.
            </p>
          </LegalSection>

          <LegalSection id="indemnification" title="19. Indemnification">
            <p>
              To the extent permitted by law, you agree to defend, indemnify, and hold harmless{' '}
              {BRAND.name}, {LEGAL.entityName}, and their affiliates, licensors, service providers,
              partners, officers, directors, employees, and agents from claims, liabilities, damages,
              judgments, losses, costs, and expenses, including reasonable attorneys&apos; fees, arising
              from or relating to:
            </p>
            <LegalList
              items={[
                'Your unlawful or unauthorized use of the Services.',
                'Your violation of these Terms.',
                'Your Submissions.',
                'Your infringement or violation of another person\'s rights.',
                'Fraud, willful misconduct, or misuse attributable to you.',
              ]}
            />
            <p>
              We may control the defense of a matter subject to indemnification, and you agree to
              cooperate reasonably. This Section does not require indemnification to the extent
              prohibited by applicable consumer law.
            </p>
          </LegalSection>

          <LegalSection id="termination" title="20. Suspension and Termination">
            <p>
              We may suspend, restrict, or terminate access to all or part of the Services if we
              reasonably believe you violated these Terms, created risk or possible legal exposure,
              compromised security, harmed another person, or misused the Services.
            </p>
            <p>
              You may stop using the Services at any time. Termination does not affect provisions that by
              their nature should survive, including intellectual property, disclaimers, limitations of
              liability, indemnification, governing law, and dispute provisions.
            </p>
          </LegalSection>

          <LegalSection id="changes" title="21. Changes to the Services or These Terms">
            <p>
              We may update the Services and these Terms from time to time. We will revise the &quot;Last
              updated&quot; date and provide additional notice when required by law. Material changes
              apply prospectively unless otherwise permitted.
            </p>
            <p>
              Your continued use of the Services after the effective date of revised Terms constitutes
              acceptance of the revised Terms, to the extent enforceable. If you do not agree to revised
              Terms, stop using the Services.
            </p>
          </LegalSection>

          <LegalSection id="governing-law" title="22. Governing Law and Venue">
            <p>
              These Terms and any dispute arising out of or relating to the Services are governed by the
              laws of the State of {LEGAL.state}, without regard to conflict-of-law principles, except
              to the extent federal law applies or the law of your jurisdiction provides non-waivable
              consumer protections.
            </p>
            <p>
              To the extent a dispute may be brought in court, you and {BRAND.name} consent to the
              exclusive jurisdiction and venue of the state and federal courts located in{' '}
              {LEGAL.governingLawCounty}, {LEGAL.state}, except where applicable law permits or requires
              a different forum.
            </p>
          </LegalSection>

          <LegalSection id="general" title="23. General Provisions">
            <p className="font-medium text-foreground">Entire Agreement</p>
            <p>
              These Terms, the Privacy Policy, and any feature-specific terms or disclosures constitute
              the entire agreement between you and {BRAND.name} regarding the Services and supersede
              prior or contemporaneous communications on the same subject.
            </p>
            <p className="font-medium text-foreground">Severability</p>
            <p>
              If any provision is found unlawful, invalid, or unenforceable, it will be enforced to the
              maximum extent permitted or modified to reflect the original intent, and the remaining
              provisions will remain in effect.
            </p>
            <p className="font-medium text-foreground">No Waiver</p>
            <p>A failure to enforce a provision is not a waiver of that provision or any other provision.</p>
            <p className="font-medium text-foreground">Assignment</p>
            <p>
              You may not assign or transfer these Terms without our written consent. We may assign these
              Terms in connection with a merger, acquisition, reorganization, sale of assets, corporate
              transaction, or by operation of law, subject to applicable law.
            </p>
            <p className="font-medium text-foreground">Headings</p>
            <p>Headings are for convenience only and do not limit interpretation.</p>
            <p className="font-medium text-foreground">Electronic Communications</p>
            <p>
              You consent to receive agreements, notices, disclosures, and other communications
              electronically where permitted by law. Electronic communications satisfy legal requirements
              that communications be in writing.
            </p>
            <p className="font-medium text-foreground">Force Majeure</p>
            <p>
              We are not responsible for delay or failure caused by circumstances beyond our reasonable
              control, including natural disasters, acts of government, labor disputes, telecommunications
              or internet failures, cyberattacks, utility failures, or failures of third-party platforms,
              except where liability cannot be excluded by law.
            </p>
          </LegalSection>

          <LegalSection id="contact" title="24. Contact">
            <p>Questions about these Terms may be sent to:</p>
            <LegalList
              items={[
                `Brand: ${BRAND.name}`,
                `Legal entity: ${LEGAL.entityName}`,
                `Principal address: ${LEGAL.principalAddress}`,
                `Email: ${BRAND.contactEmail}`,
                ...(LEGAL.contactPhone ? [`Phone: ${LEGAL.contactPhone}`] : []),
                `Website: ${SITE_URL}`,
                `Contact page: ${CONTACT_URL}`,
              ]}
            />
          </LegalSection>

          <TradeNameNotice />
        </LegalBody>
    </div>
  )
}
