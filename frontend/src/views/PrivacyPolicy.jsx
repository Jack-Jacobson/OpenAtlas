import { Link } from 'react-router-dom';

export default function PrivacyPolicy() {
    return (
        <div className="legal-page">
            <div className="legal-page-inner">
                <Link to="/" className="link-button">← Back</Link>
                <h2>OpenAtlas Privacy Policy</h2>
                <p className="legal-updated">Last Updated: July 14, 2026</p>

                <h3>1. Introduction</h3>
                <p>This Privacy Policy explains how OpenAtlas ("we," "our," or "the Service") collects, uses, stores, and protects information when you use the OpenAtlas web application and browser extension. OpenAtlas is an open-source personal knowledge management tool that lets you save and organize web resources into projects.</p>
                <p>By using OpenAtlas, you agree to the practices described in this policy. If you have questions or concerns, contact us at <strong>privacy@jackjacobson2011.com</strong>.</p>

                <h3>2. What Data We Collect</h3>
                <h4>2.1 Account Information</h4>
                <p>When you register for an account, we collect your username (required), password (stored only as a bcrypt hash, never in plain text), and email address (optional).</p>

                <h4>2.2 Resource Data Collected via the Browser Extension</h4>
                <p><strong>What is sent:</strong> When you actively click "Save this page to OpenAtlas" in the browser extension popup, the extension transmits the URL of the current tab, the page title, any notes you manually type, and the project ID you select, if any.</p>
                <p><strong>When this happens:</strong> This data is only ever transmitted when you personally click the save button. The extension does not passively monitor, log, or transmit your browsing activity in the background.</p>
                <p><strong>How it is sent:</strong> This data travels over an encrypted HTTPS connection to our backend server, authenticated with your personal login token, and is stored in our database associated with your account.</p>

                <h4>2.3 Data Created Directly in the Web Dashboard</h4>
                <p>Project names/descriptions, edits to resource titles and notes, and project assignments you make in the dashboard.</p>

                <h4>2.4 Session and Authentication Data</h4>
                <p>A JSON Web Token (JWT) is issued upon login and stored either in an httpOnly browser cookie (web dashboard) or in your browser's local extension storage (browser extension). We do not use third-party tracking cookies, analytics, or advertising trackers.</p>

                <h4>2.5 What We Do NOT Collect</h4>
                <p>We do not collect your general browsing history, read page content beyond what you explicitly save, or collect device fingerprints or IP-based tracking profiles.</p>

                <h3>3. How We Use Your Data</h3>
                <p>Your data is used exclusively to operate the Service: authentication, displaying your saved resources and projects, and letting you organize and edit them. We do not sell, rent, or share your data with third parties, and we do not use it for advertising.</p>

                <h3>4. Where and How Your Data Is Stored</h3>
                <p>All data is stored in databases on our secure server. Passwords are hashed with bcrypt before storage. Environment secrets are stored in a server-side configuration file that is never committed to the public source code repository. Data transmission occurs over HTTPS.</p>

                <h3>5. Data Retention and Deletion</h3>
                <p>You may delete individual resources or projects at any time. You may permanently delete your entire account and all associated data via the Settings page — this action is irreversible and immediate.</p>

                <h3>6. Open Source and Security</h3>
                <p>OpenAtlas is open-source software. Our full source code is publicly available for review. If a security vulnerability is discovered, we are committed to fixing it as soon as possible. Please report vulnerabilities to <strong>privacy@jackjacobson2011.com</strong> rather than disclosing them publicly.</p>

                <h3>7. Your Rights</h3>
                <p>You may request a copy of your data, request correction of inaccurate data, or request full deletion at any time by emailing <strong>privacy@jackjacobson2011.com</strong>.</p>

                <h3>8. Children's Privacy</h3>
                <p>OpenAtlas is not directed at children under 13, and we do not knowingly collect data from children under 13.</p>

                <h3>9. Changes to This Policy</h3>
                <p>We may update this Privacy Policy from time to time. Material changes will be reflected by updating the "Last Updated" date above.</p>

                <h3>10. Contact</h3>
                <p>Questions, concerns, or security reports: <strong>privacy@jackjacobson2011.com</strong></p>
            </div>
        </div>
    );
}