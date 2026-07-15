import { Link } from 'react-router-dom';

export default function TermsOfService() {
    return (
        <div className="legal-page">
            <div className="legal-page-inner">
                <Link to="/" className="link-button">← Back</Link>
                <h2>OpenAtlas Terms of Service</h2>
                <p className="legal-updated">Last Updated: July 14 2026</p>

                <h3>1. Acceptance of Terms</h3>
                <p>By creating an account, accessing the OpenAtlas web dashboard, or installing the OpenAtlas browser extension ("the Service"), you agree to be bound by these Terms of Service. If you do not agree, do not use the Service.</p>

                <h3>2. Description of the Service</h3>
                <p>OpenAtlas is a personal knowledge management tool consisting of a web dashboard for viewing and organizing saved resources, and a browser extension that lets you manually save the URL, title, and notes of a page you're viewing, optionally assigned to a project. OpenAtlas is an independently developed, open-source personal project with no guaranteed uptime or service-level commitments.</p>

                <h3>3. Account Registration</h3>
                <p>You must provide a username and password (email optional) to use the Service. You are responsible for maintaining the confidentiality of your credentials and all activity under your account. Usernames must be 3–32 characters (letters, numbers, underscores, hyphens); passwords must be at least 8 characters.</p>

                <h3>4. Acceptable Use</h3>
                <p>You agree not to store unlawful content, attempt unauthorized access to other accounts, interfere with the Service's infrastructure, use automated bots beyond normal personal use, or exploit security vulnerabilities rather than responsibly disclosing them.</p>

                <h3>5. User Content and Data Ownership</h3>
                <p>You retain ownership of all URLs, titles, notes, and project data you save. You grant us a limited license to store and display this data back to you as necessary to operate the Service. You are solely responsible for the content you choose to save.</p>

                <h3>6. Data Collection Disclosure</h3>
                <p>Using the browser extension's save feature transmits the URL, page title, your notes, and any selected project ID from your browser to our server, only when you manually trigger a save. No data is collected passively. See our full Privacy Policy for details.</p>

                <h3>7. Open Source Disclosure</h3>
                <p>OpenAtlas is open-source software, maintained on a best-effort basis. We are committed to addressing security issues as quickly as possible upon discovery, but no warranty is made regarding the absence of bugs or vulnerabilities at any given time.</p>

                <h3>8. Service Availability</h3>
                <p>OpenAtlas is provided "as is" and "as available," with no guarantee of uninterrupted operation or specific backup redundancy. The Service may be modified, suspended, or discontinued at any time. We strongly encourage you not to use OpenAtlas as your sole backup for critical information.</p>

                <h3>9. Account Termination</h3>
                <p>You may delete your account at any time via Settings, permanently erasing all associated data. We reserve the right to suspend accounts that violate these Terms.</p>

                <h3>10. Limitation of Liability</h3>
                <p>To the fullest extent permitted by law, OpenAtlas and its creator are not liable for indirect, incidental, or consequential damages arising from your use of the Service, including loss of data or service interruptions.</p>

                <h3>11. Security Vulnerability Reporting</h3>
                <p>Please report vulnerabilities responsibly to <strong>privacy@jackjacobson2011.com</strong> rather than disclosing them publicly. We are committed to fixing verified issues as soon as possible.</p>

                <h3>12. Changes to These Terms</h3>
                <p>These Terms may be updated periodically, reflected by an updated "Last Updated" date. Continued use after changes take effect constitutes acceptance.</p>

                <h3>13. Contact</h3>
                <p>Questions regarding these Terms: <strong>privacy@jackjacobson2011.com</strong></p>
            </div>
        </div>
    );
}