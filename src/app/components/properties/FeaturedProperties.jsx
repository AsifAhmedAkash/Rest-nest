const properties = [
    {
        price: "$3,200",
        title: "Modern Glass Villa",
        loc: "Malibu, CA",
        bed: 4,
        bath: 3,
        image:
            "https://lh3.googleusercontent.com/aida-public/AB6AXuCcEGKAk4F__z16v1ecmhezscuN6fP3F6zSt9Dlvr9XvlqWnR9wd5qx0FLbUiZTjDmEWQayyaqk7o7lPfrE4ngplnBD21WkPnlGsKPMqEfh8U1syxd-g9SCACvFQ9uTEotFsZXr6BkphPEy5F2xsltcZImR9SqKl1FmRKvvdBiKl_0QJMxgVp15vivYa4Fec2PwhzXKnokIU0y5TTGgdPNV3_0iT5axintwiM19ug_pAxzzapr_Ss5JZcf1ghjjYevzetgCX4mfAw-n",
    },
    {
        price: "$2,100",
        title: "Skyline Penthouse",
        loc: "Manhattan, NY",
        bed: 2,
        bath: 2,
        image:
            "https://lh3.googleusercontent.com/aida-public/AB6AXuCjNSwZJTw01KqdM7tXBz7EkYXym-7b1Oo-CmLPCoyE1x1NCOwUIwhRQ311nlaMshzShLS20JcW0FHKuNiFL-92LO1eWfPE1Gxi24dPDBCdmtddf027gG-Cdl5uvR6CGWw4ofEypJq5COGn0NAgnqzT1OxoBeOt37GWJ1JSBbV0-D6CmQwzXsZj0vuOfYN0slbH5Q9m7BSTgda8HJuWO5BZedakKbPmSsIAsfBbcMHSPhFai7O6_EABabNY1S0Y4jU6GptOJXz-WFy0",
    },
    {
        price: "$1,850",
        title: "Urban Garden Loft",
        loc: "Berlin, DE",
        bed: 1,
        bath: 1,
        image:
            "https://lh3.googleusercontent.com/aida-public/AB6AXuDrFTZDEA7cxW77pRprvD490n4uLOLUro4qJy4JrmXCqODdNfg_zAqQHZ_3sHxNS7aGGjizF1JPzqPNER1isDDz06ySmqhI1JDjLo0G7cxMidHbiuyXDpU5Pv_6Ey26QBnx_ICE9A0XGeiGaGRJe1PK-Z0XhFYswy7syIYv6taUy04OuP4zxYbJZW1v7lY5cqP3ZnKiKigFvG0K72UkzRoEdtnRE5uceJDIXdQOCQkUqEF9U3YZ7soCohp70C66_UtJa0iop8uwnhEz",
    },
    {
        price: "$4,500",
        title: "Azure Waterfront Estate",
        loc: "Miami, FL",
        bed: 5,
        bath: 4,
        image:
            "https://lh3.googleusercontent.com/aida-public/AB6AXuCgOOxI-D6OgMLHWZejONk0cu0d1UxedDBNq31MlBLUBk8ySU5l_yqiUg9IWh4fu1RpSzSlQPPMIqYcxayXfZUMICkgI5FHYrGigpWE7NOImsAgg4tkMQrySOaLIs3hDD2AbEYgyyW3XlofRYUrKZODzdRBFHDDj8_UpQ5Nwj4bnyftvJAEJc62QOIDrOI1D5wYZqZP-OoyKY9tFmkJ2ff7JhHphlK47Rzp0DcpDbGT-NeNXgfZLSex4n4h5kE4y1JdKcMPs6crXyTm",
    },
    {
        price: "$2,800",
        title: "Nordic Pine Cabin",
        loc: "Oslo, NO",
        bed: 3,
        bath: 2,
        image:
            "https://lh3.googleusercontent.com/aida-public/AB6AXuCwsVWvL4M0NXqOp3ebuzQpGtH_ZA_MERIoggdpxaqhnwwzvthmkkgZKr-tWLWVacKP1qifCpsHX9-oINEpgCfGqYQija90QWCBzUCHTd1Ws2DkkGS0R7CypAofNAPfss8krVSKD-5gM-dOP4-svGKvGLxkGDaBD3a0GEMYa2HN2cx6KBqQNItP-5SCUp8bPlJ0XQO76RbUdl8XydhMuyw_oP5m4fcbl5WA4xZpy4Tl6Igtp7-ggRiF7rMblNlrWOWi57anmMe4aIRg",
    },
    {
        price: "$1,600",
        title: "Classic Townhouse",
        loc: "London, UK",
        bed: 2,
        bath: 1,
        image:
            "https://lh3.googleusercontent.com/aida-public/AB6AXuDYmaLxqzR6iZTEeEfh0a58Zj_cIBEjjvgF-tRYpNUndzwejm9dzUcBpPt8HREiF8JeW19BGXNxCWuZuS6nGDDlBT2-Zg6yXmO6mra7EVQ_Uh_B3-bVL2rTHzi1x9ImFzm01uFnH_P1iS_5FPC_pSV0RBTLoKksWm_EsoDujQUOK6_RCXbY8AmPZVNEuiDVmhensx9NMda9w0maVZ5hvWUkPKRNnhmFjK4J7hBLJnUaAhhBrmCMqmxZEq-LO53b-mwlk5VOCWXy4c5J",
    },
];

export default function FeaturedProperties() {
    return (
        <section className="bg-white py-20 px-4 md:px-16">
            <div className="max-w-7xl mx-auto">
                {/* Header */}
                <div className="text-center mb-12">
                    <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-on-surface mb-4">
                        Featured Properties
                    </h2>
                    <p className="text-on-surface-variant text-base max-w-2xl mx-auto">
                        Hand-picked premium listings that define luxury and comfort.
                        Verified for quality and security.
                    </p>
                </div>

                {/* Grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {properties.map((p) => (
                        <div
                            key={p.title}
                            className="bg-white rounded-xl overflow-hidden shadow-[0px_4px_12px_rgba(15,23,42,0.08)] hover:shadow-[0px_12px_32px_rgba(15,23,42,0.12)] transition-all duration-300 hover:scale-[1.02] flex flex-col cursor-pointer group"
                        >
                            {/* Image */}
                            <div className="relative aspect-[4/3] overflow-hidden">
                                <div
                                    className="w-full h-full bg-cover bg-center transition-transform duration-500 group-hover:scale-110"
                                    style={{ backgroundImage: `url('${p.image}')` }}
                                />
                                {/* Approved Badge */}
                                <div className="absolute top-4 left-4 bg-emerald-500/10 backdrop-blur-md text-emerald-400 px-3 py-1 rounded-full text-xs font-semibold flex items-center gap-1 border border-emerald-400/20">
                                    <span
                                        className="material-symbols-outlined"
                                        style={{
                                            fontSize: 14,
                                            fontVariationSettings: "'FILL' 1",
                                        }}
                                    >
                                        verified
                                    </span>
                                    Approved
                                </div>
                                {/* Price */}
                                <div className="absolute bottom-4 left-4">
                                    <span className="bg-secondary text-on-secondary px-4 py-1.5 rounded-lg text-xl font-semibold">
                                        {p.price}
                                        <span className="text-xs opacity-80 font-normal">/mo</span>
                                    </span>
                                </div>
                                {/* Favourite */}
                                <button className="absolute top-4 right-4 w-10 h-10 rounded-full bg-white/80 backdrop-blur-md flex items-center justify-center text-on-surface-variant hover:text-red-500 transition-colors">
                                    <span className="material-symbols-outlined">favorite</span>
                                </button>
                            </div>

                            {/* Body */}
                            <div className="p-6 flex-1 flex flex-col">
                                <h3 className="text-xl font-semibold text-on-surface mb-1">
                                    {p.title}
                                </h3>
                                <div className="flex items-center gap-1 text-on-surface-variant text-sm mb-4">
                                    <span className="material-symbols-outlined text-sm">
                                        location_on
                                    </span>
                                    {p.loc}
                                </div>
                                <div className="mt-auto pt-4 border-t border-outline-variant/30 flex justify-between items-center text-on-surface-variant">
                                    <div className="flex gap-4">
                                        <span className="flex items-center gap-1.5 text-sm font-semibold">
                                            <span className="material-symbols-outlined text-outline">
                                                bed
                                            </span>
                                            {p.bed}
                                        </span>
                                        <span className="flex items-center gap-1.5 text-sm font-semibold">
                                            <span className="material-symbols-outlined text-outline">
                                                bathtub
                                            </span>
                                            {p.bath}
                                        </span>
                                    </div>
                                    <span className="material-symbols-outlined text-secondary opacity-0 group-hover:opacity-100 transition-opacity">
                                        arrow_forward
                                    </span>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}