import { useState } from 'react';
import PrivacyPolicy from './PrivacyPolicy.jsx';
import TermsOfService from './TermsOfService.jsx';

export default function Footer() {
    const [openModal, setOpenModal] = useState(null); // 'privacy' | 'terms' | null

    return (
        <>
            <footer className="site-footer">
                <span className="footer-brand">OpenAtlas</span>
                <button className="footer-link" onClick={() => setOpenModal('privacy')}>
                    Privacy Policy
                </button>
                <button className="footer-link" onClick={() => setOpenModal('terms')}>
                    Terms of Service
                </button>
                <a className="footer-link" href="mailto:privacy@jackjacobson2011.com">
                    Contact
                </a>
            </footer>

            {openModal && (
                <div className="legal-modal-overlay" onClick={() => setOpenModal(null)}>
                    <div className="legal-modal" onClick={(e) => e.stopPropagation()}>
                        <button className="close-panel-btn legal-modal-close" onClick={() => setOpenModal(null)}>
                            Close
                        </button>
                        {openModal === 'privacy' ? <PrivacyPolicy /> : <TermsOfService />}
                    </div>
                </div>
            )}
        </>
    );
}