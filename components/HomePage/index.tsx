import { FaFacebook, FaInstagram, FaGithub } from 'react-icons/fa';
export default function HomePage() {
    return (
        <div className="social-icons">
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">
                <FaFacebook />
            </a>
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">
                <FaInstagram />
            </a>
            <a href="https://github.com/nikitamalinov/razvedchik" target="_blank" rel="noopener noreferrer">
                <FaGithub />
            </a>
        </div>
    );
}