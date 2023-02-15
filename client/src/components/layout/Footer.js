import React from 'react';
import InternalLink from '../reusable/InternalLink';
import ExternalLink from '../reusable/ExternalLink';
import logo from '../../assets/img/logo.png';
import Facebook from '../icons/Facebook';
import Instagram from '../icons/Instagram';
import Twitter from '../icons/Twitter';
import { useLocation } from 'react-router-dom';
import { Fragment } from 'react';

const Footer = () => {
    const location = useLocation();

    if (location.pathname.includes('/admin')) {
        return <Fragment />;
    }

    const footerLinks = [
        { label: 'faq', path: '/faq' },
        { label: 'contact us', path: '/contact' },
        { label: 'privacy policy', path: '/privacy' },
        { label: 'terms & conditions', path: '/terms' },
    ];

    return (
        <div className='footer'>
            <div className='container'>
                <div className='logo-container'>
                    <img src={logo} alt='Feast In logo' />
                </div>
                <div className='footer-links'>
                    {footerLinks.map(({ label, path }, index) => (
                        <InternalLink key={index} to={path}>
                            {label}
                        </InternalLink>
                    ))}
                </div>
                <div className='social-container'>
                    <ExternalLink to='/' className='social-links'>
                        <Facebook fill='white' width='20px' height='20px' />
                    </ExternalLink>
                    <ExternalLink to='/' className='social-links'>
                        <Instagram fill='white' width='20px' height='20px' />
                    </ExternalLink>
                    <ExternalLink to='/' className='social-links'>
                        <Twitter fill='white' width='20px' height='20px' />
                    </ExternalLink>
                </div>
                <p className='copyright'>
                    &copy; 2021 Feast In. All rights reserved.
                </p>
            </div>
        </div>
    );
};

export default Footer;
