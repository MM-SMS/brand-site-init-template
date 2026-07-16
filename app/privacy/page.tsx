import type { Metadata } from 'next'
import {
  LegalBody,
  LegalSection,
  LegalList,
  LegalLink,
  LegalMail,
  TradeNameNotice,
} from '@/components/legal/legal-body'
import { BRAND, LEGAL, CONTACT_URL, PRIVACY_URL, SITE_URL, UNSUBSCRIBE_URL } from '@/lib/constants'

export const metadata: Metadata = {
  title: `Privacy Policy — ${BRAND.name}`,
}

const SMS_HELP =
  LEGAL.contactPhone !== ''
    ? `reply HELP or contact ${BRAND.contactEmail} or ${LEGAL.contactPhone}`
    : `reply HELP or contact ${BRAND.contactEmail}`

const TOC = [
  '1. Who We Are and How to Contact Us',
  '2. Scope of This Privacy Policy',
  '3. Information We Collect',
  '4. How We Use Information',
  '5. Email and SMS Communications',
  '6. How We Disclose Information',
  '7. Third-Party Links, Affiliate Offers, and External Services',
  '8. Data Retention',
  '9. Cookies, Analytics, and Similar Technologies',
  '10. Data Security',
  '11. U.S. State Privacy Rights and Choices',
  '12. Children\'s Privacy',
  '13. International Access and Data Processing',
  '14. Changes to This Privacy Policy',
  '15. Contact Us',
]

export default function PrivacyPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-16 sm:px-6 lg:px-8 lg:py-24">
        <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">Legal</p>
        <h1 className="mt-4 text-3xl font-semibold tracking-tight sm:text-4xl">{BRAND.name} Privacy Policy</h1>
        <p className="mt-3 text-sm text-muted-foreground">Last updated: {LEGAL.privacyLastUpdated}</p>

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
            This Privacy Policy explains how {BRAND.name} (&quot;{BRAND.name},&quot; &quot;we,&quot;
            &quot;us,&quot; or &quot;our&quot;) collects, uses, discloses, and protects information when
            you visit <LegalLink href="/">{SITE_URL}</LegalLink>, use our websites or digital properties,
            subscribe to email or SMS communications, complete forms, quizzes, challenges, planners, or
            other interactive features, or otherwise interact with our services (collectively, the
            &quot;Services&quot;).
          </p>
          <p>
            {BRAND.name} is operated by {LEGAL.entityName}, doing business as {BRAND.name}. The Services
            are primarily intended for users in the United States. By using the Services, you acknowledge
            the practices described in this Privacy Policy.
          </p>

          <LegalSection id="who-we-are" title="1. Who We Are and How to Contact Us">
            <LegalList
              items={[
                `Operator: ${LEGAL.entityName}, d/b/a ${BRAND.name}`,
                `Legal form: ${LEGAL.legalForm}`,
                `State and country of formation: ${LEGAL.state}, ${LEGAL.country}`,
                `Principal address: ${LEGAL.principalAddress}`,
                `Website: ${SITE_URL}`,
                `General contact email: ${BRAND.contactEmail}`,
                `Privacy email: ${LEGAL.privacyEmail}`,
                ...(LEGAL.contactPhone ? [`Phone: ${LEGAL.contactPhone}`] : []),
              ]}
            />
          </LegalSection>

          <LegalSection id="scope" title="2. Scope of This Privacy Policy">
            <p>
              This Privacy Policy applies to information processed through the Services, including the website, editorial or product content, email and SMS communications,
              interactive features, forms, and related digital experiences. It does not govern websites, applications, products, services, or
              checkout pages operated independently by third parties, even when they are linked from or
              promoted through the Services. Those third parties apply their own privacy policies and
              terms.
            </p>
          </LegalSection>

          <LegalSection id="collect" title="3. Information We Collect">
            <p>
              We may collect information in three principal ways: (A) information you provide directly,
              (B) information collected automatically, and (C) information received from third parties.
            </p>

            <p className="font-medium text-foreground">A. Information You Provide Directly</p>
            <p>Depending on how you use the Services, you may provide:</p>
            <LegalList
              items={[
                'Identifiers and contact information, such as your name, email address, mobile telephone number, or similar details.',
                'Subscription and communication preferences, such as topics of interest, requested frequency, preferred channel, email or SMS selections, and language preferences.',
                'Communications and support information, such as questions, feedback, requests, complaints, partnership inquiries, and other messages you send us.',
                'Form and quiz information, such as onboarding answers, survey responses, weekly check-in responses, habit selections, challenge participation, and information submitted through contact or subscribe forms.',
                'Consent and compliance records, such as the date, time, source, IP address, consent language presented, form version, opt-in status, opt-out status, suppression status, and related logs used to document and honor your choices.',
              ]}
            />

            <p className="font-medium text-foreground">B. Information Collected Automatically</p>
            <p>When you use the Services, we and our service providers may automatically collect:</p>
            <LegalList
              items={[
                'Device and browser information, such as device type, operating system, browser type, language, screen size, unique device or browser identifiers, and similar technical information.',
                'Usage and interaction information, such as pages or articles viewed, links clicked, forms started or submitted, referring and exit pages, timestamps, session duration, scrolling, content engagement, and interactions with email or SMS links.',
                'Internet and network information, such as IP address, general location inferred from IP address, network provider, and diagnostic logs.',
                'Cookie and similar technology information collected through cookies, pixels, tags, software development kits, local storage, and comparable technologies, as described in Section 9.',
                'Campaign and attribution information, such as referral source, campaign identifiers, affiliate parameters, advertising identifiers, and conversion or performance events.',
              ]}
            />

            <p className="font-medium text-foreground">C. Information Received from Third Parties</p>
            <p>We may receive information from:</p>
            <LegalList
              items={[
                'Vendors that help operate the Services, including hosting, content management, security, fraud prevention, analytics, forms, customer support, email delivery (such as Resend), SMS delivery (such as Textbelt), captcha verification (such as Cloudflare Turnstile), and data storage providers.',
                'Advertising, attribution, and measurement partners, if enabled, which may provide aggregated, pseudonymous, or event-level reporting about traffic, engagement, and campaign performance.',
                'Partners or advertisers when you expressly request, authorize, or initiate a connection, including through a clearly disclosed co-branded form or user-directed referral.',
                'Publicly available sources and lawful business sources, where permitted by law.',
              ]}
            />

            <p className="font-medium text-foreground">D. Sensitive Information</p>
            <p>
              Unless expressly disclosed at the point of collection, we do not request and do not intend
              to collect sensitive personal information such as Social Security numbers, government
              identification numbers, precise geolocation, account passwords, biometric identifiers,
              medical diagnoses, prescriptions, health insurance information, racial or ethnic origin,
              religious beliefs, union membership, sexual orientation, or the contents of private
              communications.
            </p>
            <p>
              Please do not submit sensitive information through general website forms, email, SMS,
              quizzes, notes, or support channels. If you voluntarily provide sensitive information, we
              may process it only as reasonably necessary to respond, secure the Services, comply with
              law, and maintain appropriate records.
            </p>
          </LegalSection>

          <LegalSection id="use" title="4. How We Use Information">
            <p>We may use personal information to:</p>
            <LegalList
              items={[
                'Provide, operate, maintain, secure, and improve the Services.',
                'Deliver the content, newsletters, alerts, plan PDFs, recommendations, or other communications you request.',
                'Send transactional or service-related communications, including confirmations, security alerts, support replies, and administrative messages.',
                'Send marketing emails and SMS messages where permitted and consistent with your consent and preferences, including newsletters, updates, reminders, and occasional promotional messages.',
                'Personalize content, communications, recommendations, and user experience based on preferences and engagement.',
                'Administer saved content, forms, quizzes, tools, and other interactive features.',
                'Measure audience engagement, attribution, campaign effectiveness, conversions, and performance.',
                'Conduct analytics, research, testing, troubleshooting, and product or content development.',
                'Detect, investigate, prevent, and address fraud, misuse, security incidents, unlawful activity, violations of our terms, and technical problems.',
                'Maintain consent, opt-out, suppression, complaint, and compliance records.',
                'Protect our rights, users, personnel, partners, property, and the integrity of the Services.',
                'Comply with applicable law, lawful requests, court orders, subpoenas, regulatory obligations, and recordkeeping requirements.',
                'Carry out any other purpose disclosed at the time information is collected or with your direction or consent.',
              ]}
            />
          </LegalSection>

          <LegalSection id="email-sms" title="5. Email and SMS Communications">
            <p className="font-medium text-foreground">A. Email Communications</p>
            <p>
              If you provide your email address and subscribe, we may send newsletters, daily tips,
              weekly recaps, content alerts, promotional messages, partner highlights, and other
              communications described at the point of collection.
            </p>
            <p>
              Every marketing email will include a clear method to unsubscribe. You may unsubscribe by
              using the link in the message, by contacting <LegalMail email={BRAND.contactEmail} />, or
              through our <LegalLink href="/unsubscribe">Unsubscribe page</LegalLink> ({UNSUBSCRIBE_URL}
              ). We may retain your email address on a suppression list so that we can honor your request
              and avoid sending future marketing emails.
            </p>
            <p>
              Unsubscribing from marketing email does not prevent us from sending non-marketing
              communications that are reasonably necessary to provide a requested service, respond to you,
              protect security, or comply with law.
            </p>

            <p className="font-medium text-foreground">B. SMS / Text Message Communications</p>
            <p>
              If you provide a mobile number and affirmatively opt in, you authorize {BRAND.name} to send
              recurring text messages to the number you provide, consistent with the disclosure and
              selections presented at the time of consent. Messages may be sent using automated technology
              and may include service updates, editorial alerts, and
              occasional promotional SMS messages.
            </p>
            <LegalList
              items={[
                'Message frequency varies.',
                'Message and data rates may apply.',
                'Consent to receive marketing text messages is not a condition of purchasing any property, goods, or services.',
                'To opt out, reply STOP, QUIT, END, CANCEL, UNSUBSCRIBE, or another reasonable opt-out request to a message from us. You may receive one final confirmation message.',
                `For help, ${SMS_HELP}.`,
                'Wireless carriers are not liable for delayed or undelivered messages.',
                'The SMS program may not be available on all devices, carriers, or locations.',
                'We maintain SMS consent, delivery, opt-out, suppression, and complaint records as reasonably necessary to administer the program, honor consumer choices, and demonstrate compliance.',
              ]}
            />

            <p className="font-medium text-foreground">C. Online Preference and Unsubscribe Page</p>
            <p>
              You may manage email and SMS preferences through our{' '}
              <LegalLink href="/unsubscribe">Unsubscribe page</LegalLink> ({UNSUBSCRIBE_URL}). The page
              allows you to enter your email address or telephone number, select the channels you wish to
              stop, and submit your request. We may send a confirmation through the selected channel. The
              page is intended to provide a self-service method for managing communication preferences.
            </p>

            <p className="font-medium text-foreground">D. Telephone Number Reassignment</p>
            <p>
              If you change, transfer, or deactivate a mobile number, please update your information or
              opt out before relinquishing the number. This helps prevent messages intended for you from
              being sent to a subsequent subscriber or customary user of that number.
            </p>
          </LegalSection>

          <LegalSection id="disclose" title="6. How We Disclose Information">
            <p>We may disclose information in the circumstances described below.</p>

            <p className="font-medium text-foreground">A. Service Providers and Contractors</p>
            <p>
              We may provide information to vendors and contractors that process it on our behalf to
              operate the Services. These may include hosting, cloud storage, security, fraud prevention,
              analytics, content management, forms, customer support, email delivery, SMS delivery, link
              management, database, legal, accounting, and professional service providers.
            </p>
            <p>
              These providers may access information only as reasonably necessary to perform services for
              us and are subject to contractual, legal, or other restrictions appropriate to their role.
            </p>

            <p className="font-medium text-foreground">B. Legal, Safety, and Rights Protection</p>
            <p>
              We may disclose information when we reasonably believe disclosure is necessary to comply
              with applicable law, regulation, legal process, court order, subpoena, or governmental
              request; enforce our agreements; investigate fraud, abuse, security incidents, or
              violations; protect the rights, safety, and property of {BRAND.name}, users, partners, or
              others; or establish, exercise, or defend legal claims.
            </p>

            <p className="font-medium text-foreground">C. Business Transfers</p>
            <p>
              We may disclose or transfer information in connection with an actual or proposed merger,
              acquisition, financing, reorganization, bankruptcy, sale of assets, corporate transaction,
              or transfer of all or part of our business. A recipient may use the information subject to
              this Privacy Policy unless you are notified otherwise as required by law.
            </p>

            <p className="font-medium text-foreground">D. User-Directed and Partner Disclosures</p>
            <p>
              We may disclose information to a third party when you direct, request, authorize, or
              intentionally initiate the disclosure, including when you submit a clearly disclosed
              co-branded form, request contact from a partner, click through to a third-party service, or
              otherwise ask us to connect you.
            </p>
            <p>
              We do not disclose your mobile number, email address, or messaging opt-in data to
              unaffiliated third parties for their independent marketing merely because you subscribed to{' '}
              {BRAND.name}. Any user-directed lead transfer must be clearly disclosed at the point of
              collection.
            </p>

            <p className="font-medium text-foreground">E. Advertising, Analytics, and Measurement</p>
            <p>
              We may use analytics and measurement providers to understand use of the Services and
              improve performance. We do not sell personal information for monetary consideration, and we
              do not use or disclose personal information for cross-context behavioral advertising or
              targeted advertising in a manner that constitutes &quot;selling&quot; or &quot;sharing&quot;
              under applicable state privacy laws.
            </p>

            <p className="font-medium text-foreground">F. Mobile and Messaging Information</p>
            <p>
              We do not sell or rent mobile telephone numbers, email addresses, or text-message opt-in
              information. We do not share mobile information with third parties or affiliates for their
              own marketing or promotional purposes.
            </p>
            <p>
              Text-message originator opt-in data and consent records—including opt-in status,
              timestamps, consent language, source information, and opt-out records—are not disclosed to
              third parties for their independent marketing. We may disclose limited mobile and consent
              information to messaging providers, carriers, aggregators, compliance vendors, and other
              service providers solely as necessary to operate the messaging program, deliver messages,
              process opt-outs, prevent fraud or abuse, and comply with law.
            </p>

            <p className="font-medium text-foreground">G. Aggregated and De-identified Information</p>
            <p>
              We may use and disclose information that has been aggregated, de-identified, or otherwise
              reasonably modified so that it cannot reasonably be linked to an identified or identifiable
              individual. We may use such information for analytics, research, reporting, marketing,
              advertising, measurement, product development, and other lawful purposes.
            </p>
          </LegalSection>

          <LegalSection id="third-party" title="7. Third-Party Links, Affiliate Offers, and External Services">
            <p>
              The Services may include links to advertisers, affiliate merchants, sponsors, telehealth
              providers, marketplaces, social networks, applications, or other third-party services. We
              may receive compensation when you click a link, submit a form, or complete a transaction
              with a third party.
            </p>
            <p>
              Third parties operate independently and may collect information directly from you. Their
              privacy policies, terms, security practices, pricing, eligibility standards, and data
              processing are not controlled by {BRAND.name}. Review the third party&apos;s policies
              before providing information or completing a transaction.
            </p>
          </LegalSection>

          <LegalSection id="retention" title="8. Data Retention">
            <p>
              We retain personal information only for as long as reasonably necessary for the purposes
              described in this Privacy Policy, including providing the Services, maintaining
              subscriptions and accounts, honoring opt-outs, resolving disputes, protecting security,
              enforcing agreements, and meeting legal, tax, accounting, and compliance obligations.
            </p>
            <p>Retention periods vary by data type, purpose, sensitivity, legal requirements, and operational context. We may retain:</p>
            <LegalList
              items={[
                'Active subscription and account information while the relationship continues.',
                'Consent, opt-out, suppression, complaint, and messaging records for as long as reasonably necessary to honor choices and demonstrate compliance.',
                'Security and diagnostic logs for periods reasonably necessary to detect and investigate misuse or incidents.',
                'Transactional and business records for legally required or commercially reasonable periods.',
                'Aggregated or de-identified information for longer periods where permitted by law.',
              ]}
            />
          </LegalSection>

          <LegalSection id="cookies" title="9. Cookies, Analytics, and Similar Technologies">
            <p>
              Cookies are small data files stored on a browser or device. We and our providers may use
              cookies, pixels, tags, SDKs, local storage, and similar technologies to:
            </p>
            <LegalList
              items={[
                'Operate the website and provide core functionality.',
                'Remember preferences and settings stored in your browser.',
                'Maintain sessions and account state.',
                'Understand traffic, navigation, engagement, and performance.',
                'Measure campaigns, referrals, conversions, and affiliate attribution.',
                'Detect fraud, abuse, bots, and security threats.',
                'Provide analytics and, if enabled, advertising or personalization.',
              ]}
            />
            <p className="font-medium text-foreground">Your Cookie Choices</p>
            <p>
              You may manage cookies through browser settings and, where available, our cookie or privacy
              preferences tool. Blocking certain cookies may affect functionality. Browser &quot;Do Not
              Track&quot; signals are not uniformly standardized. Where required by applicable law and
              relevant to our processing, we recognize valid universal opt-out mechanisms, such as Global
              Privacy Control.
            </p>
          </LegalSection>

          <LegalSection id="security" title="10. Data Security">
            <p>
              We use reasonable administrative, technical, and organizational safeguards designed to
              protect personal information against unauthorized access, loss, misuse, alteration, and
              disclosure. Safeguards may include access controls, encrypted transmission, vendor
              management, monitoring, backups, logging, malware protection, and security reviews.
            </p>
            <p>
              No method of transmission, storage, or security is completely secure. We cannot guarantee
              absolute security, and users should use care when transmitting information online.
            </p>
          </LegalSection>

          <LegalSection id="rights" title="11. U.S. State Privacy Rights and Choices">
            <p>
              Depending on your state of residence, the nature of our processing, and whether an
              applicable law covers {BRAND.name}, you may have rights concerning personal information,
              including the right to:
            </p>
            <LegalList
              items={[
                'Confirm whether we process personal information and request access to it.',
                'Request correction of inaccurate personal information.',
                'Request deletion of certain personal information.',
                'Obtain a portable copy of certain personal information.',
                'Opt out of sale, sharing, targeted advertising, or certain profiling, where applicable.',
                'Limit certain uses or disclosures of sensitive personal information, where applicable.',
                'Appeal a decision concerning a privacy request, in states that provide an appeal right.',
                'Exercise privacy rights without unlawful discrimination or retaliation.',
              ]}
            />
            <p>
              These rights are subject to definitions, exceptions, thresholds, verification requirements,
              and limitations under applicable law.
            </p>
            <p className="font-medium text-foreground">How to Submit a Privacy Request</p>
            <p>
              Submit a request by emailing <LegalMail email={LEGAL.privacyEmail} /> with the subject line
              &quot;Privacy Request.&quot; Please describe your request and provide information
              reasonably necessary to identify relevant records. We may verify your identity and, where
              applicable, the authority of an authorized agent. We will respond within the period
              required by applicable law.
            </p>
          </LegalSection>

          <LegalSection id="children" title="12. Children's Privacy">
            <p>
              The Services are not directed to children under 13, and we do not knowingly collect personal
              information from children under 13. If you believe a child under 13 has provided personal
              information, contact <LegalMail email={LEGAL.privacyEmail} /> so that we can take
              appropriate steps.
            </p>
            <p>
              The Services are intended for users who are at least 18 years old or the age of majority in
              their jurisdiction. We do not knowingly use or disclose the personal information of minors
              for targeted advertising or sell or share such information except as permitted by applicable
              law and with any required authorization.
            </p>
          </LegalSection>

          <LegalSection id="international" title="13. International Access and Data Processing">
            <p>
              {BRAND.name} is based in the United States, and information may be processed and stored in
              the United States and other countries where our service providers operate. Those
              jurisdictions may have data protection laws different from the laws where you live.
            </p>
          </LegalSection>

          <LegalSection id="changes" title="14. Changes to This Privacy Policy">
            <p>
              We may update this Privacy Policy from time to time to reflect changes in the Services,
              data practices, vendors, legal requirements, or operational needs. We will revise the
              &quot;Last updated&quot; date above and provide additional notice when required by law.
              Material changes apply prospectively unless otherwise permitted by law.
            </p>
          </LegalSection>

          <LegalSection id="contact" title="15. Contact Us">
            <p>Questions, requests, or concerns about this Privacy Policy may be sent to:</p>
            <LegalList
              items={[
                `Brand: ${BRAND.name}`,
                `Legal entity: ${LEGAL.entityName}`,
                `Principal address: ${LEGAL.principalAddress}`,
                `Email: ${LEGAL.privacyEmail}`,
                ...(LEGAL.contactPhone ? [`Phone: ${LEGAL.contactPhone}`] : []),
                `Website: ${SITE_URL}`,
                `Privacy Policy: ${PRIVACY_URL}`,
                `Contact page: ${CONTACT_URL}`,
              ]}
            />
          </LegalSection>

          <TradeNameNotice />
        </LegalBody>
    </div>
  )
}
