import { Link } from 'react-router-dom';

export default function About() {
    return (
        <div className="legal-page">
            <div className="legal-page-inner about-page-inner">
                <Link to="/" className="link-button">← Back</Link>

                <h2>What is OpenAtlas?</h2>
                <p>
                    OpenAtlas is a personal knowledge management tool. Save any webpage you're
                    reading with one click, organize everything into projects, and pick up right
                    where you left off — all from a clean dashboard you control.
                </p>
                <p>
                    It's made of two parts: this <strong>web dashboard</strong>, where you view and
                    organize everything you've saved, and a <strong>browser extension</strong> that
                    lets you save the page you're currently on in a single click.
                </p>

                <h3>Here From Hackclub?</h3>
                <p>
                    Feel free to use the below credentis if you prefer to not make your account (account is monitered, please be responsible
                    <br> Username: <code>hackclub</code>
                    <br> Password: <code>stardance</code>
                </p>

                <h3>Get the Extension</h3>
                <p>Install the extension for your browser below, then create an account to start saving.</p>

                <div className="extension-download-row">
                    <a
                        href="https://github.com/Jack-Jacobson/OpenAtlas/releases/tag/extension"
                        target="_blank"
                        rel="noreferrer"
                        className="auth-action download-btn"
                    >
                        Get for Your Browser (Manual Install)
                    </a>
                </div>

                <h3>How to Install</h3>


                <h4>Firefox / Chrome / Edge / Brave</h4>
                <p>These browsers don't yet have OpenAtlas in their official stores, so install it manually (firefox coming to webstore soon):</p>
                <ol>
                    <li>Download the extension folder from the link above</li>
                    <li>Extract the zip folder</li>
                    <li>Go to <code>chrome://extensions (for chrome)</code> or <code>edge://extensions</code> (for edge) or <code>about://debugging</code> (for firefox)</li>
                    <li>Turn on <strong>Developer mode</strong> (top-right toggle)</li>
                    <li>Click <strong>Load unpacked</strong> and select the downloaded <code>extension</code> folder</li>
                </ol>

                <h3>Using It</h3>
                <p>
                    Once installed, click the OpenAtlas icon in your toolbar, log in, and hit
                    "Save this page" on any site. Assign it to a project or add notes right from
                    the popup — it'll show up instantly in your dashboard.
                </p>

                <p className="about-cta">
                    You'll need an account to save and view resources.{' '}
                    <Link to="/signup" className="link-button">Create one for free</Link> to get started.
                </p>
            </div>
        </div>
    );
}
