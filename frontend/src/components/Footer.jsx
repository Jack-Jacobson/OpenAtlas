import { Link } from 'react-router-dom';

export default function Footer() {
    return (
        <footer className="site-footer">
            <span className="footer-brand">OpenAtlas</span>
            <Link className="footer-link" to="/privacy">Privacy Policy</Link>
            <Link className="footer-link" to="/terms">Terms of Service</Link>
            <Link className="footer-link" to="/about">About</Link>
            <a className="footer-link" href="mailto:openatlas@jackjacobson2011.com">Contact</a>
        </footer>
    );
}