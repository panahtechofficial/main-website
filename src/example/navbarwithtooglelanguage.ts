'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import { usePathname } from 'next/navigation';
import { Menu, X } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';
import { translations } from '@/lib/i18n';

export function Navbar() {
    const [isOpen, setIsOpen] = useState(false);
    const pathname = usePathname();
    const { language, toggleLanguage } = useLanguage();

    const t = translations.nav;

    const navItems = [
        { name: t.home[language], href: '/' },
        { name: t.catalog[language], href: '/catalog' },
        { name: t.export[language], href: '/export' },
        { name: t.about[language], href: '/about' },
    ];

    const isActive = (href: string) => {
        if (href === '/') {
            return pathname === '/';
        }
        return pathname.startsWith(href);
    };

    return (
        <nav className="absolute top-0 left-0 right-0 z-50 pt-6">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-16">

                    {/* Logo (Mobile Only) */}
                    <div className="flex items-center md:hidden">
                        <Link href="/">
                            <Image
                                src="/logo.svg"
                                alt="BORBORÉ Logo"
                                width={120}
                                height={40}
                                className="h-10 w-auto"
                            />
                        </Link>
                    </div>

                    {/* Desktop Menu */}
                    <div className="hidden md:flex md:items-center md:gap-8">
                        <Link href="/" className="mr-8 cursor-pointer">
                            <Image
                                src="/logo.svg"
                                alt="BORBORÉ Logo"
                                width={150}
                                height={50}
                                className="h-12 w-auto"
                            />
                        </Link>
                        {navItems.map((item) => (
                            <Link
                                key={item.href}
                                href={item.href}
                                className={`text-xs font-semibold tracking-[0.15em] transition-colors ${isActive(item.href)
                                    ? 'text-primary'
                                    : 'text-white/80 hover:text-primary'
                                    }`}
                            >
                                {item.name}
                            </Link>
                        ))}
                    </div>

                    <div className="hidden md:flex items-center space-x-4">
                        {/* Language Toggle - Desktop (Switch Style) */}
                        <button
                            onClick={toggleLanguage}
                            className="relative flex items-center w-[68px] h-8 rounded-full bg-zinc-800 border border-white/10 hover:border-white/20 transition-all duration-300 overflow-hidden"
                        >
                            {/* Text Label - shows current language on opposite side */}
                            <span className={`absolute text-[10px] font-bold text-white/70 transition-all duration-300 ${language === 'en' ? 'right-2.5' : 'left-3'
                                }`}>
                                {language === 'en' ? 'EN' : 'ID'}
                            </span>

                            {/* Sliding Flag Circle */}
                            <div
                                className={`absolute w-6 h-6 rounded-full bg-white flex items-center justify-center transition-all duration-300 ease-in-out ${language === 'en' ? 'left-0.5' : 'left-[calc(100%-30px)]'
                                    }`}
                            >
                                <Image
                                    src={language === 'en' ? '/images/flag/united-kingdom.png' : '/images/flag/indonesia.png'}
                                    alt={language === 'en' ? 'English' : 'Indonesia'}
                                    width={20}
                                    height={20}
                                    className="w-6 h-6 rounded-full"
                                />
                            </div>
                        </button>

                        <Link
                            href="/export"
                            className="w-[180px] h-10 flex items-center justify-center px-6 py-2 bg-primary text-white rounded-full text-xs font-bold tracking-wider hover:bg-amber-600 transition-colors"
                        >
                            {t.getQuote[language]}
                        </Link>
                    </div>

                    {/* Mobile: Language Toggle & Menu Button */}
                    <div className="flex items-center gap-3 md:hidden">
                        {/* Language Toggle - Mobile (Switch Style) */}
                        <button
                            onClick={toggleLanguage}
                            className="relative flex items-center w-[56px] h-7 rounded-full bg-zinc-800 border border-white/10 overflow-hidden"
                        >
                            {/* Text Label - shows current language */}
                            <span className={`absolute text-[8px] font-bold text-white/70 transition-all duration-300 ${language === 'en' ? 'right-2' : 'left-2'
                                }`}>
                                {language === 'en' ? 'EN' : 'ID'}
                            </span>

                            {/* Sliding Flag Circle */}
                            <div
                                className={`absolute w-5 h-5 rounded-full bg-white flex items-center justify-center shadow-md transition-all duration-300 ease-in-out ${language === 'en' ? 'left-0.5' : 'left-[calc(100%-26px)]'
                                    }`}
                            >
                                <Image
                                    src={language === 'en' ? '/images/flag/united-kingdom.png' : '/images/flag/indonesia.png'}
                                    alt={language === 'en' ? 'English' : 'Indonesia'}
                                    width={16}
                                    height={16}
                                    className="w-5 h-5 rounded-full object-cover"
                                />
                            </div>
                        </button>

                        <button
                            onClick={() => setIsOpen(!isOpen)}
                            className="inline-flex items-center justify-center p-2 rounded-md text-white hover:text-primary focus:outline-none"
                        >
                            {isOpen ? <X className="block h-6 w-6" /> : <Menu className="block h-6 w-6" />}
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile Menu */}
            {isOpen && (
                <div className="md:hidden bg-black/95 backdrop-blur-md absolute top-full left-0 right-0 border-b border-white/10 shadow-2xl">
                    <div className="px-4 pt-4 pb-6 space-y-2">
                        {navItems.map((item) => (
                            <Link
                                key={item.href}
                                href={item.href}
                                className={`block px-3 py-3 text-sm font-bold tracking-widest border-b border-white/5 ${isActive(item.href)
                                    ? 'text-primary'
                                    : 'text-white hover:text-primary'
                                    }`}
                                onClick={() => setIsOpen(false)}
                            >
                                {item.name}
                            </Link>
                        ))}
                        <Link
                            href="/export"
                            className="block px-3 py-3 text-sm font-bold     tracking-widest text-primary"
                            onClick={() => setIsOpen(false)}
                        >
                            {t.getQuote[language]}
                        </Link>
                    </div>
                </div>
            )}
        </nav>
    );
}
