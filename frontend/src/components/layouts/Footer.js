import React from 'react';

export default function Footer() {
    return (
        <footer className="py-1">
            <div className="text-center text-dark mt-1">
                <p>&copy; 2023-2024 Ester Aura. All rights reserved.</p>
                <p>Follow us on social media:</p>
                <div className="social-media-links">
                    <a href="https://www.facebook.com/YourFacebookPage" target="_blank" rel="noopener noreferrer">
                        <i className="fab fa-facebook"></i>
                    </a>
                    <a href="https://twitter.com/YourTwitterPage" target="_blank" rel="noopener noreferrer">
                        <i className="fab fa-twitter"></i>
                    </a>
                    <a href="https://www.instagram.com/YourInstagramPage" target="_blank" rel="noopener noreferrer">
                        <i className="fab fa-instagram"></i>
                    </a>
                </div>
                <p>Discover our organic products on <a href="https://www.google.com" target="_blank" rel="noopener noreferrer">Google</a></p>
            </div>
        </footer>
    );
}
