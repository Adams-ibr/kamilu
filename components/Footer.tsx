// FIX: Using a namespace import for React to solve JSX intrinsic element type errors.
import * as React from 'react';
import { Link } from 'react-router-dom';
import SocialIcons from './SocialIcons';
import { NAV_LINKS } from '../constants';

const Footer: React.FC = () => {
    return (
        <footer className="bg-brand-charcoal text-white">
            <div className="container mx-auto px-4 py-12">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                    <div>
                        <h3 className="text-xl font-bold mb-4">Kamilu<span className="text-brand-gold">Welding</span></h3>
                        <p className="text-gray-400">Fabricating Nigeria's Industrial & Agricultural Future.</p>
                        <SocialIcons />
                    </div>
                    <div>
                        <h4 className="font-semibold text-lg mb-4">Quick Links</h4>
                        <ul className="space-y-2">
                            {NAV_LINKS.map(link => (
                                <li key={link.path}>
                                    <Link to={link.path} className="text-gray-400 hover:text-brand-gold transition-colors">{link.name}</Link>
                                </li>
                            ))}
                        </ul>
                    </div>
                    <div>
                        <h4 className="font-semibold text-lg mb-4">Contact Us</h4>
                        <ul className="space-y-2 text-gray-400">
                            <li><a href="mailto:info@kamiluwelding.com" className="hover:text-brand-gold">info@kamiluwelding.com</a></li>
                            <li><a href="tel:+2348037555035" className="hover:text-brand-gold">+234 803 755 5035</a></li>
                             <li><a href="tel:+2348097200923" className="hover:text-brand-gold">+234 809 720 0923</a></li>
                            <li>Technology Incubation Centre (TIC Complex), Farm Center, Kano State, Nigeria</li>
                        </ul>
                    </div>
                    <div>
                        <h4 className="font-semibold text-lg mb-4">Newsletter</h4>
                        <p className="text-gray-400 mb-4">Get industry insights and company news.</p>
                        <form className="flex">
                            <input type="email" placeholder="Your email" className="w-full px-4 py-2 text-gray-800 rounded-l-md focus:outline-none dark:bg-gray-800 dark:text-gray-200" />
                            <button className="bg-brand-gold text-white px-4 py-2 rounded-r-md hover:bg-yellow-600 transition-colors">Subscribe</button>
                        </form>
                    </div>
                </div>
                <div className="border-t border-gray-700 mt-8 pt-6 text-center text-gray-500">
                    <p>&copy; {new Date().getFullYear()} Kamilu Welding Services (K.W.S.). All Rights Reserved.</p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;