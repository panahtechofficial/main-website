// src/components/layout/Footer.jsx
import Image from "next/image";

export default function Footer() {
    return (
        <footer className="bg-white dark:bg-zinc-950 border-t border-gray-100 dark:border-zinc-800 transition-colors duration-300">
            <div className="max-w-7xl mx-auto px-4 py-12">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                    {/* Brand */}
                    <div className="space-y-4">
                        <div className="flex items-center gap-2">
                            <Image src="/logo-panahtech.webp" alt="Logo" width={100} height={100} />
                        </div>
                        <p className="text-gray-500 dark:text-zinc-400 text-sm">
                            Building the future with cutting-edge technology solutions.
                        </p>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h4 className="font-bold text-black dark:text-white mb-4">Quick Links</h4>
                        <ul className="space-y-2 text-sm">
                            <li><a href="#" className="text-gray-500 dark:text-zinc-400 hover:text-primary transition-colors">Home</a></li>
                            <li><a href="#" className="text-gray-500 dark:text-zinc-400 hover:text-primary transition-colors">Services</a></li>
                            <li><a href="#" className="text-gray-500 dark:text-zinc-400 hover:text-primary transition-colors">Projects</a></li>
                            <li><a href="#" className="text-gray-500 dark:text-zinc-400 hover:text-primary transition-colors">Contact</a></li>
                        </ul>
                    </div>

                    {/* Services */}
                    <div>
                        <h4 className="font-bold text-black dark:text-white mb-4">Services</h4>
                        <ul className="space-y-2 text-sm">
                            <li><a href="#" className="text-gray-500 dark:text-zinc-400 hover:text-primary transition-colors">Web Development</a></li>
                            <li><a href="#" className="text-gray-500 dark:text-zinc-400 hover:text-primary transition-colors">AI Integration</a></li>
                            <li><a href="#" className="text-gray-500 dark:text-zinc-400 hover:text-primary transition-colors">IoT Solutions</a></li>
                            <li><a href="#" className="text-gray-500 dark:text-zinc-400 hover:text-primary transition-colors">Mobile Apps</a></li>
                        </ul>
                    </div>

                    {/* Contact */}
                    <div>
                        <h4 className="font-bold text-black dark:text-white mb-4">Contact</h4>
                        <ul className="space-y-2 text-sm">
                            <li className="text-gray-500 dark:text-zinc-400">admin@panahtech.com</li>
                            <li className="text-gray-500 dark:text-zinc-400">+62 882 1471 7802</li>
                            <li className="text-gray-500 dark:text-zinc-400">Jl. Cipinang Muara III. RT 008/04 No.44 Kec. Duren Sawit, Kel. Klender,  Jakarta Timur, DKI Jakarta 13470</li>
                        </ul>
                    </div>
                </div>

                <div className="border-t border-gray-100 dark:border-zinc-800 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
                    <p className="text-gray-500 dark:text-zinc-400 text-sm">
                        © {new Date().getFullYear()} PanahTech. All rights reserved.
                    </p>
                    <div className="flex gap-4 mt-4 md:mt-0">
                        <a href="#" className="text-gray-400 dark:text-zinc-500 hover:text-primary transition-colors">Privacy Policy</a>
                        <a href="#" className="text-gray-400 dark:text-zinc-500 hover:text-primary transition-colors">Terms of Service</a>
                    </div>
                </div>
            </div>
        </footer>
    );
}