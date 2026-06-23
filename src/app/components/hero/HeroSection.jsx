export default function HeroSection() {
    return (
        <section className="relative min-h-[870px] flex items-center justify-center overflow-hidden">
            {/* Background Image + Overlay */}
            <div className="absolute inset-0 z-0">
                <div className="absolute inset-0 bg-black/40 z-10" />
                <div
                    className="w-full h-full bg-cover bg-center"
                    style={{
                        backgroundImage:
                            "url('https://lh3.googleusercontent.com/aida-public/AB6AXuCcEGKAk4F__z16v1ecmhezscuN6fP3F6zSt9Dlvr9XvlqWnR9wd5qx0FLbUiZTjDmEWQayyaqk7o7lPfrE4ngplnBD21WkPnlGsKPMqEfh8U1syxd-g9SCACvFQ9uTEotFsZXr6BkphPEy5F2xsltcZImR9SqKl1FmRKvvdBiKl_0QJMxgVp15vivYa4Fec2PwhzXKnokIU0y5TTGgdPNV3_0iT5axintwiM19ug_pAxzzapr_Ss5JZcf1ghjjYevzetgCX4mfAw-n')",
                    }}
                />
            </div>

            {/* Content */}
            <div className="relative z-20 text-center px-4 max-w-4xl w-full">
                <h1 className="text-white font-bold text-5xl md:text-[64px] md:leading-[72px] tracking-tight mb-6 drop-shadow-lg">
                    Find Your Perfect Nest
                </h1>
                <p className="text-white/90 text-lg leading-7 mb-10 max-w-2xl mx-auto">
                    Discover premium rental properties tailored to your lifestyle. From
                    urban lofts to suburban retreats, your next home starts here.
                </p>

                {/* Search Bar */}
                <div className="bg-white/80 backdrop-blur-md p-4 md:p-6 rounded-2xl shadow-2xl flex flex-col md:flex-row items-stretch gap-4 w-full">
                    {/* Location */}
                    <div className="flex-1 text-left">
                        <label className="block text-xs font-medium text-on-surface-variant mb-1 ml-1">
                            Location
                        </label>
                        <div className="flex items-center gap-2 bg-surface-container-low px-4 py-3 rounded-xl border border-outline-variant">

                            <input
                                type="text"
                                placeholder="Where to?"
                                className="bg-transparent border-none focus:ring-0 w-full text-base text-on-surface placeholder:text-outline-variant"
                            />
                        </div>
                    </div>

                    {/* Property Type */}
                    <div className="flex-1 text-left">
                        <label className="block text-xs font-medium text-on-surface-variant mb-1 ml-1">
                            Property Type
                        </label>
                        <div className="flex items-center gap-2 bg-surface-container-low px-4 py-3 rounded-xl border border-outline-variant">

                            <select className="bg-transparent border-none focus:ring-0 w-full text-base text-on-surface">
                                <option>Any Type</option>
                                <option>Apartment</option>
                                <option>House</option>
                                <option>Villa</option>
                            </select>
                        </div>
                    </div>

                    {/* Price Range */}
                    <div className="flex-1 text-left">
                        <label className="block text-xs font-medium text-on-surface-variant mb-1 ml-1">
                            Price Range
                        </label>
                        <div className="flex items-center gap-2 bg-surface-container-low px-4 py-3 rounded-xl border border-outline-variant">

                            <input
                                type="text"
                                placeholder="Min - Max"
                                className="bg-transparent border-none focus:ring-0 w-full text-base text-on-surface placeholder:text-outline-variant"
                            />
                        </div>
                    </div>

                    {/* Search Button */}
                    <div className="flex items-end">
                        <button className="bg-secondary text-on-secondary h-[52px] px-8 rounded-xl text-sm font-semibold flex items-center justify-center gap-2 hover:bg-secondary/90 transition-all shadow-md w-full md:w-auto">
                            <span className="material-symbols-outlined">search</span>
                            Search
                        </button>
                    </div>
                </div>
            </div>
        </section>
    );
}