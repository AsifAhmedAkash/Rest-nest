const quickLinks = ["About Us", "Terms of Service", "Privacy Policy", "Contact Support"];
const propertyLinks = ["Urban Apartments", "Luxury Villas", "Modern Lofts", "Pet Friendly"];

export default function Footer() {
    return (
        <footer className="bg-inverse-surface text-white w-full px-4 md:px-16 py-12">
            <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-6">

                {/* Brand */}
                <div className="flex flex-col gap-4">
                    <div className="flex items-center ">
                        <span
                            className=" text-secondary text-3xl"
                            style={{ fontVariationSettings: "'FILL' 1" }}
                        >
                            Rent
                        </span>
                        <span className="text-3xl font-bold text-on-primary">Nest</span>
                    </div>
                    <p className="text-white/50 text-sm pr-4">
                        Leading the future of rental real estate with transparency,
                        technology, and trust.
                    </p>
                    <div className="flex gap-4 text-white/50">
                        <a href="#" className="hover:text-white transition-colors">
                            <span className="material-symbols-outlined">public</span>
                        </a>
                        <a href="#" className="hover:text-white transition-colors">
                            <span className="material-symbols-outlined">forum</span>
                        </a>

                    </div>
                </div>

                {/* Quick Links */}
                <div className="flex flex-col gap-4">
                    <h4 className="text-sm font-semibold text-white">Quick Links</h4>
                    <nav className="flex flex-col gap-2">
                        {quickLinks.map((link) => (
                            <a
                                key={link}
                                href="#"
                                className="text-white/50 hover:text-white text-xs font-medium transition-colors hover:underline decoration-secondary"
                            >
                                {link}
                            </a>
                        ))}
                    </nav>
                </div>

                {/* Properties */}
                <div className="flex flex-col gap-4">
                    <h4 className="text-sm font-semibold text-white">Properties</h4>
                    <nav className="flex flex-col gap-2">
                        {propertyLinks.map((link) => (
                            <a
                                key={link}
                                href="#"
                                className="text-white/50 hover:text-white text-xs font-medium transition-colors hover:underline decoration-secondary"
                            >
                                {link}
                            </a>
                        ))}
                    </nav>
                </div>

                {/* Subscribe */}
                <div className="flex flex-col gap-4">
                    <h4 className="text-sm font-semibold text-white">Subscribe</h4>
                    <p className="text-white/50 text-sm">
                        Get the latest property alerts directly to your inbox.
                    </p>
                    <div className="flex gap-2">
                        <input
                            type="email"
                            placeholder="Email address"
                            className="bg-white/10 border border-white/20 rounded-lg px-4 py-2 w-full text-sm text-white placeholder:text-white/40 focus:outline-none focus:ring-1 focus:ring-secondary"
                        />
                        <button className="bg-secondary px-4 py-2 rounded-lg text-white hover:bg-secondary/90 transition-colors flex-shrink-0">
                            <span className="material-symbols-outlined">send</span>
                        </button>
                    </div>
                </div>

            </div>

            {/* Bottom Bar */}
            <div className="max-w-7xl mx-auto mt-12 pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-4">
                <p className="text-white/40 text-xs">
                    © 2024 RentNest Real Estate. All rights reserved.
                </p>
                <div className="flex gap-6">
                    <a href="#" className="text-white/40 hover:text-white text-xs transition-colors">
                        English (US)
                    </a>
                    <a href="#" className="text-white/40 hover:text-white text-xs transition-colors">
                        USD ($)
                    </a>
                </div>
            </div>
        </footer>
    );
}