"use client";

import { useState } from "react";
import { Bookmark, TriangleRight } from '@gravity-ui/icons';
import { TriangleLeft } from '@gravity-ui/icons';

const properties = [
    {
        title: "The Emerald Heights",
        location: "Downtown Core, Seattle",
        price: "$3,200",
        bed: 2,
        bath: 2,
        sqft: "1,200",
        type: "Apartment",
        image:
            "https://lh3.googleusercontent.com/aida-public/AB6AXuBDJg8ekTlqURNEWWSBm1IBj4FeW10d9c0yrYmR6cn0Y3pLk4JMaIF1oebT7OUqZ1-jdh5UHKqmdVpKlMGGufWvOyk4lq84u35elN41gCAMoU8Z3Lqoz6-J-Jwyo0X5qfn40n0-y_Fzp278oiWqMmusfibxsYWtum1fFpr6ZFPDiUQcOvTbitRK47l-E5FkTdiDkIH3_dlSA6vjtGAkn6xMMHSCuT3MOthdk4W_aqspkVEW8jcuEN6jJDcXQgnUQCiKe_BfW7nTEa4q",
    },
    {
        title: "Azure Ridge Villa",
        location: "Bellevue Highlands",
        price: "$5,450",
        bed: 4,
        bath: "3.5",
        sqft: "3,100",
        type: "Modern House",
        image:
            "https://lh3.googleusercontent.com/aida-public/AB6AXuCghOjbjsMyL6SYZrmZwkm_oHc0WFe3i7iWw0hhYZh_zCPKj-RexRaqgIoIDKDnSYq8wJR-rTpaTN1hsmAMcPHecsKNN6wUSitSCZGtGi6PCB7Nle1HLBCkzZYr6RFAaTiPfgz8acqR-rO55Ldrxb8HQUBJcMRD1Z9TiU7XXnbsuMrCukTzgJqzbCG8rOQpKctJU7LyxgHiDwJ-s_DG6hnRNhp8CzR6FvKxE0YJlCmTXZCQaOk8Esnh2GL8MXuji6I2nVzUNRkESE7o",
    },
    {
        title: "Industrial Zenith Loft",
        location: "Capitol Hill, Seattle",
        price: "$2,800",
        bed: 1,
        bath: 1,
        sqft: "950",
        type: "Loft",
        image:
            "https://lh3.googleusercontent.com/aida-public/AB6AXuCNTSuB2FSS0CaQvE9wO0zAiNE8lgH8rJJkFEoAYgzuvjYtkJYoXvzQspeL7z6bBRXENha118DbGQqbuPsK8tZ47Z32jEwkWnUDME5quKV63UOUERUHgvDTZ6wDc5w1Na5WvFwTYu0NiyIfC9KJn3P8pnBNUIXqVLT4LaptnMlCIBuh_xgswvEdTdSim6e6mz-RUuVZS6fcOXHeNgvT0v4fqIIKtm7raizRUdgODyHz1YgoiKJpIZXPMnxNyjRLyx8u-FlUAj6w1hwJ",
    },
    {
        title: "Skyline Executive Suite",
        location: "Financial District",
        price: "$1,900",
        sqft: "600",
        type: "Commercial",
        amenity: "Incl.",
        image:
            "https://lh3.googleusercontent.com/aida-public/AB6AXuCJNLW1Qv90hsBScI5QNnW26YXvNjekGitM1yv4LaeFjU9eyKiEklGvM0pXTE-RyX3_-GFgdNQfxfAevk_gxIY6-FBie1Smi2Un800mXnfeJF5DdGiMbYAf0C8dPmWF2S42uQNQrEVUHR8wN27tH8rTim0Qhanj5GJzZmfSdyz8hvS4C6iXNNrdQvJTMWWtD2SOSmQmOLo91dmyD03F-epFYLF94duBXNBmX4u3F9JKlcAc2b08jsBIxtBLJTtuOj0vgtdBqFlHrCXb",
    },
    {
        title: "Azure Bay Penthouse",
        location: "Alki Beachfront",
        price: "$7,200",
        bed: 3,
        bath: 3,
        sqft: "2,400",
        type: "Penthouse",
        image:
            "https://lh3.googleusercontent.com/aida-public/AB6AXuACazV5GBwospZlrA4z_JpI9YJ7jxfd27ikwVeypc6IZ1I4n7Z6l-AfphILpmLqj9CUnUgmd0VnacL7YBEo4AQyU8rHVMBVXI4sRxBRSnWJqoAH1oeLhniMZxgt2ACAwZ8EFmBUfTEhKghm18z_yQX522OGNpe2rl6gOREbTafWg_7LcnfbLGSFa3rNlqvQZ_sab8sbqt_ETIIoPwqSd7yyb8plh-Iqqm9IrZcqOKOWcOsoP-9VEhc_OZZyKXX1dqz1m5HBZbqUjqbt",
    },
    {
        title: "The Nordic Hearth",
        location: "Ballard District",
        price: "$2,450",
        bed: 2,
        bath: 1,
        sqft: "1,050",
        type: "Apartment",
        image:
            "https://lh3.googleusercontent.com/aida-public/AB6AXuBeNBqXhb7rAAij29OIfKBEctapeTkirspuJOYmOC0PQus5p2DVAj4vJiUDoS-1_rd4tx5Vga0_Ju1UeaCrzTYIiz__bFs0GLDqT_hHX0ZYWuGL02vVXu8B4Zx-idzPnFdRFI_ScNHVWaJXwlgAmbZtZpCzxBAbcaojjpmxdIMzUJe0HPrkEyjNkNMzyAg6XdY0ykUllw8L9lmkxH7sS-7XHRMmB7G_b8G_pvg2iV0RmB084Yy_8cEb3YJlq2CNjhjL4cZt3A8aaQzM",
    },
];

function PropertyCard({ property }) {
    return (
        <div className="group bg-white rounded-xl overflow-hidden shadow-[0px_4px_12px_rgba(15,23,42,0.08)] hover:shadow-[0px_12px_32px_rgba(15,23,42,0.12)] transition-all duration-300 hover:-translate-y-1">
            {/* Image */}
            <div className="relative aspect-[4/3] overflow-hidden">
                <img
                    src={property.image}
                    alt={property.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute top-4 left-4">
                    <span className="bg-secondary/10 text-secondary backdrop-blur-md text-xs font-semibold px-3 py-1 rounded-full flex items-center gap-1 border border-secondary/20">
                        <span
                            className="material-symbols-outlined"
                            style={{ fontSize: 14, fontVariationSettings: "'FILL' 1" }}
                        >
                            verified
                        </span>
                        Approved
                    </span>
                </div>
                <button className="absolute top-4 right-4 w-10 h-10 bg-surface/50 backdrop-blur-md rounded-full flex items-center justify-center text-white hover:bg-secondary transition-colors">
                    {/* <span className="material-symbols-outlined">favorite</span> */}
                    <Bookmark className="w-6 h-6" />
                </button>
            </div>

            {/* Body */}
            <div className="p-6">
                <div className="flex justify-between items-start mb-2">
                    <h3 className="text-xl font-semibold text-on-surface group-hover:text-secondary transition-colors">
                        {property.title}
                    </h3>
                    <span className="text-xl font-semibold text-secondary whitespace-nowrap ml-2">
                        {property.price}
                        <span className="text-sm font-normal text-on-surface-variant">
                            /mo
                        </span>
                    </span>
                </div>
                <div className="flex items-center gap-1 text-on-surface-variant text-sm mb-6">

                    {property.location}
                </div>
                <div className=" items-center justify-between border-t border-outline-variant/30 pt-4">
                    <div className="flex items-center gap-4 text-on-surface-variant">
                        {property.bed && (
                            <div className="flex items-center gap-1.5">
                                <span
                                    className="material-symbols-outlined"
                                    style={{ fontSize: 12 }}
                                >
                                    bed
                                </span>
                                <span className="text-sm font-semibold">{property.bed}</span>
                            </div>
                        )}
                        {property.bath && (
                            <div className="flex items-center gap-1.5">
                                <span
                                    className="material-symbols-outlined"
                                    style={{ fontSize: 12 }}
                                >
                                    bathtub
                                </span>
                                <span className="text-sm font-semibold">{property.bath}</span>
                            </div>
                        )}
                        {property.amenity && (
                            <div className="flex items-center gap-1.5">
                                <span
                                    className="material-symbols-outlined"
                                    style={{ fontSize: 12 }}
                                >
                                    room_service
                                </span>
                                <span className="text-sm font-semibold">
                                    {property.amenity}
                                </span>
                            </div>
                        )}
                        {property.sqft && (
                            <div className="flex items-center gap-1.5">
                                <span
                                    className="material-symbols-outlined"
                                    style={{ fontSize: 12 }}
                                >
                                    size
                                </span>
                                <span className="text-sm font-semibold">{property.sqft}</span>
                            </div>
                        )}
                    </div>
                    <span className="bg-surface-container-high px-3 py-1 rounded text-on-surface-variant text-xs font-medium">
                        {property.type}
                    </span>
                </div>
            </div>
        </div>
    );
}

function Pagination({ current, total, onChange }) {
    return (
        <div className="mt-20 flex items-center justify-center gap-2">
            <button
                onClick={() => onChange(Math.max(1, current - 1))}
                className="w-10 h-10 rounded-lg border border-outline-variant flex items-center justify-center hover:bg-surface-container-high transition-colors"
            >
                <TriangleLeft></TriangleLeft>
            </button>

            {[1, 2, 3].map((page) => (
                <button
                    key={page}
                    onClick={() => onChange(page)}
                    className={`w-10 h-10 rounded-lg text-sm font-semibold transition-colors ${current === page
                        ? "bg-secondary text-on-secondary"
                        : "border border-outline-variant hover:bg-surface-container-high"
                        }`}
                >
                    {page}
                </button>
            ))}

            <span className="px-2 text-outline">...</span>

            <button
                onClick={() => onChange(12)}
                className="w-10 h-10 rounded-lg border border-outline-variant text-sm font-semibold hover:bg-surface-container-high transition-colors"
            >
                12
            </button>

            <button
                onClick={() => onChange(Math.min(total, current + 1))}
                className="w-10 h-10 rounded-lg border border-outline-variant flex items-center justify-center hover:bg-surface-container-high transition-colors"
            >
                <TriangleRight></TriangleRight>
            </button>
        </div>
    );
}

export default function PropertyGrid() {
    const [currentPage, setCurrentPage] = useState(1);

    return (
        <section className="flex-1 px-4 md:px-16 py-12 bg-surface">
            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
                <div>
                    <h1 className="text-5xl font-bold tracking-tight mb-2">
                        All Properties
                    </h1>
                    <p className="text-lg text-on-surface-variant max-w-2xl">
                        Discover hand-picked, premium rentals managed with absolute security
                        and transparency.
                    </p>
                </div>
                <span className="text-sm font-semibold text-on-surface-variant whitespace-nowrap">
                    Showing 24 properties
                </span>
            </div>

            {/* Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                {properties.map((p) => (
                    <PropertyCard key={p.title} property={p} />
                ))}
            </div>

            {/* Pagination */}
            <Pagination current={currentPage} total={12} onChange={setCurrentPage} />
        </section>
    );
}