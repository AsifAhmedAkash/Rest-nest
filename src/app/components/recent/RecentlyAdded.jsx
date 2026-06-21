const smallCards = [
    {
        title: "Cedar House",
        price: "$3,100/mo",
        image:
            "https://lh3.googleusercontent.com/aida-public/AB6AXuDYmaLxqzR6iZTEeEfh0a58Zj_cIBEjjvgF-tRYpNUndzwejm9dzUcBpPt8HREiF8JeW19BGXNxCWuZuS6nGDDlBT2-Zg6yXmO6mra7EVQ_Uh_B3-bVL2rTHzi1x9ImFzm01uFnH_P1iS_5FPC_pSV0RBTLoKksWm_EsoDujQUOK6_RCXbY8AmPZVNEuiDVmhensx9NMda9w0maVZ5hvWUkPKRNnhmFjK4J7hBLJnUaAhhBrmCMqmxZEq-LO53b-mwlk5VOCWXy4c5J",
    },
    {
        title: "Harbor View Suite",
        price: "$5,200/mo",
        image:
            "https://lh3.googleusercontent.com/aida-public/AB6AXuCnsQAo_viYnDVQssabenIpLNPFPTVJBXjDjookOq7q1Mq4o1oc8fdw0SP2Ky05HycvOhzz6S9a1wOOfmjekn2qVjbqQOpPxc-Tkl8zGc44S3LfA_xOcg1g7NcgMZTmCwgRcqeEuyCi3AUWJijZyVfAWd9c9JlcjyDFY8bJpsl2NBqpdr4MMLMK1D_LLXRyX6maCAyk-Hz0ZeUdpYYWaFEEs3wpCB_Ph5BkVRAKCvvPxscDRqPrtZ6qeEaveEK3Bh5OLddBXkqpXJXz",
    },
];

export default function RecentlyAdded() {
    return (
        <section className="bg-inverse-surface py-20 px-4 md:px-16 text-white">
            <div className="max-w-7xl mx-auto">
                {/* Header */}
                <div className="flex justify-between items-center mb-12">
                    <h2 className="text-3xl md:text-4xl font-bold tracking-tight">
                        Recently Added
                    </h2>
                    <div className="flex gap-2">
                        <button className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center hover:bg-white/10 transition-colors">
                            <span className="material-symbols-outlined">chevron_left</span>
                        </button>
                        <button className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center hover:bg-white/10 transition-colors">
                            <span className="material-symbols-outlined">chevron_right</span>
                        </button>
                    </div>
                </div>

                {/* Bento Layout */}
                <div className="flex flex-col md:flex-row gap-6 h-auto md:h-[400px]">
                    {/* Main large card */}
                    <div className="flex-1 relative rounded-2xl overflow-hidden group cursor-pointer min-h-[280px]">
                        <div
                            className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-110"
                            style={{
                                backgroundImage:
                                    "url('https://lh3.googleusercontent.com/aida-public/AB6AXuCwsVWvL4M0NXqOp3ebuzQpGtH_ZA_MERIoggdpxaqhnwwzvthmkkgZKr-tWLWVacKP1qifCpsHX9-oINEpgCfGqYQija90QWCBzUCHTd1Ws2DkkGS0R7CypAofNAPfss8krVSKD-5gM-dOP4-svGKvGLxkGDaBD3a0GEMYa2HN2cx6KBqQNItP-5SCUp8bPlJ0XQO76RbUdl8XydhMuyw_oP5m4fcbl5WA4xZpy4Tl6Igtp7-ggRiF7rMblNlrWOWi57anmMe4aIRg')",
                            }}
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
                        <div className="absolute bottom-6 left-6">
                            <span className="bg-secondary text-white px-3 py-1 rounded text-xs mb-2 inline-block font-semibold tracking-wide">
                                JUST LISTED
                            </span>
                            <h4 className="text-2xl font-bold">Midnight Studio Loft</h4>
                            <p className="text-white/70 text-sm">Brooklyn, NY • $2,400/mo</p>
                        </div>
                    </div>

                    {/* Two small stacked cards */}
                    <div className="hidden md:flex flex-col gap-6 w-1/3">
                        {smallCards.map((card) => (
                            <div
                                key={card.title}
                                className="flex-1 relative rounded-2xl overflow-hidden group cursor-pointer"
                            >
                                <div
                                    className="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-110"
                                    style={{ backgroundImage: `url('${card.image}')` }}
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                                <div className="absolute bottom-4 left-4">
                                    <h4 className="font-bold text-white">{card.title}</h4>
                                    <p className="text-white/70 text-sm">{card.price}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}