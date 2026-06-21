"use client";

import { useState } from "react";
import { Avatar } from "@heroui/react";
import Link from "next/link";

// ── Icon helper ───────────────────────────────────────────────────────────────
function Icon({ name, filled = false, size = 22, className = "" }) {
    return (
        <span
            className={`material-symbols-outlined select-none leading-none ${className}`}
            style={{
                fontSize: size,
                fontVariationSettings: `'FILL' ${filled ? 1 : 0}, 'wght' 400, 'GRAD' 0, 'opsz' ${size}`,
            }}
        >
            {name}
        </span>
    );
}

// ── Static data ───────────────────────────────────────────────────────────────
const PROPERTY = {
    title: "Skyline Vista Penthouse",
    location: "Gulshan-2, Dhaka, Bangladesh",
    price: 4200,
    rating: 4.9,
    reviews: 128,
    type: "Penthouse",
    available: true,
    images: [
        "https://lh3.googleusercontent.com/aida-public/AB6AXuDKIFP0LDx_nnx_aFoc27Ooe3duoTcXrrJyK2U447ZncxX6OxzlAdnb7TqBHZf55jfhBFJH3GF9Jy_JGdAeCDfp2oiphwj_B317czCFeooG7SSXSWcqwiMhuhzq_N6t4TrMtq0h0MdPL7gWAdTxsV8DhnQ2dOL_5SmBNea4U-Sc6GO5PjqcNGU1Jq_obVkBUv3CX6iDsEd1VdSZxZFSU311vTs_5dzF6r8Z1yrsnzuXoespMjdBlTnuxh-jTfWDqKiGG1ize4BM0FxH",
        "https://lh3.googleusercontent.com/aida-public/AB6AXuDrrtQkDaZTCZOvB0LKlpd2M406y8VAS6NtK_C0fjNYpXsqAkaaWs2B2k3eAmo-4GwSNuQHTFs5e99u8ZJQOAuuBdW22gF2DNzxZGF3K5RtKIHPyvSDPIOZePvG4ycpKhlyhi6ue1XLUh8Nm-FVhAINA8CmO5tF8z-1ZfW-P-61GmlR76DnjpozUO6LBukU7Le5qM-DOXBhVs-m7paEY-Aq8nhjI7FBMQSIbuOtx8-OJENoi5sfM-sYlI2aDX5raTBPBbomJwUysF4L",
        "https://lh3.googleusercontent.com/aida-public/AB6AXuC7t2nMRD6sMH6bSWBgI9aB2bi-37ECcviGb8dqV3waooUDmLHLRRA_Te5v4aJSIdBDv4btMzuTecfjdUSU8GzxTaeiIDmHsyHQCei0tmCxx90iRv9a80BeRFiJKcO7nC9ivsuksYOrhNXAj5YWwGdVoZDEUJRLTv5HwusD8puQ-kDMXKG6aKk-HnL4Dj7PW3LU3uAwDyFcybVYDenstkgS2ku5TzVwChDYTta4YM_-SCQgfeL54FLmzr8G6ZQD1cQBmLCdo5pTco5-",
        "https://lh3.googleusercontent.com/aida-public/AB6AXuCpM7poXJEg_uZlER1y0GSyyF8XvV1sDPiPxt004-kJmlfsz-IHqyPB9pwR5z98to5t42-nbYTcQwX20bF25bSq7tRRMQCgZ5MRxSaSV2jNQcRnZ-8UIP5YjU_6J-i7TlsFCvOPiR6COGmG5X22SkX__7fTB9e3bDi-rWsP9z5tAqWuc05vdIP7JmMKFEhQ_UTXVpkQ6-sFDCeTV4-IuYVLykXLzOPBPcllAyAxyrZYQKrI2e6TU03trRmDxv21peBknsQaXbEX7_4n",
    ],
    specs: [
        { icon: "bed", label: "Bedrooms", value: "3" },
        { icon: "bathroom", label: "Bathrooms", value: "2" },
        { icon: "straighten", label: "Area", value: "2,400 sqft" },
        { icon: "directions_car", label: "Parking", value: "2 spots" },
        { icon: "elevator", label: "Floor", value: "18th" },
        { icon: "pets", label: "Pets", value: "Allowed" },
    ],
    amenities: [
        { icon: "wifi", label: "High-speed WiFi" },
        { icon: "ac_unit", label: "Central AC" },
        { icon: "local_laundry_service", label: "In-unit Laundry" },
        { icon: "fitness_center", label: "Gym Access" },
        { icon: "pool", label: "Rooftop Pool" },
        { icon: "security", label: "24/7 Security" },
        { icon: "local_parking", label: "Private Parking" },
        { icon: "balcony", label: "Private Terrace" },
        { icon: "kitchen", label: "Modern Kitchen" },
        { icon: "tv", label: "Smart TV" },
        { icon: "elevator", label: "Elevator" },
        { icon: "room_service", label: "Concierge" },
    ],
    description: `Experience unparalleled luxury living at the Skyline Vista Penthouse in the heart of Gulshan-2. This spectacular residence occupies the entire 18th floor, offering 360-degree panoramic views of the Dhaka skyline and the sparkling cityscape below.

The open-plan living and dining areas flow seamlessly to a private wraparound terrace — perfect for entertaining or simply enjoying the city from above. The chef's kitchen features premium European appliances, custom cabinetry, and a waterfall island. Three spacious bedrooms each have ensuite access, with the master suite boasting a walk-in wardrobe and a spa-style bathroom.

This property is managed by a dedicated concierge team and benefits from the full amenities of one of Dhaka's most prestigious residential towers.`,
    host: {
        name: "RentNest Verified Host",
        since: "2019",
        avatar:
            "https://lh3.googleusercontent.com/aida-public/AB6AXuASKbHwshi694KrrbLHo4osnuabLb0b6ypxyarkospKCxHHSXqG4AI8RI84DlwnpuG8i-Jpp234hqQnA49FZd3mSlBKvmvB1NL68eq68RJu1m3WSkcwY_ET7-rrUhwnj2gf4bulDnltOca14h9lvAyYkJv2wGJ53TeEoG88IDLQTrYPo2_tYgBLjMMiVVYixToJ0MZHpwhdKg3lFfvVkzt5459GgkLBjTX34l6yOBcNylgCaFIEmzGXKO4LTd6-ji_KjOGPOPZCCrbj",
        responseTime: "Usually within 1 hour",
        totalListings: 14,
    },
    reviews_list: [
        {
            name: "Samira Rahman",
            date: "May 2025",
            rating: 5,
            comment:
                "Absolutely stunning property. The terrace views at night are worth every taka. The concierge team was incredibly responsive throughout our stay.",
        },
        {
            name: "David Chen",
            date: "March 2025",
            rating: 5,
            comment:
                "Top-tier penthouse experience. Immaculate interiors, incredible location. Would book again without hesitation.",
        },
        {
            name: "Nadia Islam",
            date: "January 2025",
            rating: 4,
            comment:
                "Gorgeous space and fantastic amenities. The gym and rooftop pool were highlights. Minor parking hiccup on arrival but resolved quickly.",
        },
    ],
    nearby: [
        { icon: "restaurant", label: "The Bistro Co.", distance: "200m" },
        { icon: "local_grocery_store", label: "Shwapno Supermarket", distance: "350m" },
        { icon: "local_hospital", label: "Square Hospital", distance: "1.2km" },
        { icon: "school", label: "Gulshan Model School", distance: "600m" },
        { icon: "directions_subway", label: "Gulshan-2 Circle", distance: "180m" },
        { icon: "local_mall", label: "Jamuna Future Park", distance: "4km" },
    ],
};

// ── Helpers ───────────────────────────────────────────────────────────────────
function HR() {
    return <div className="border-t border-[var(--color-outline-variant)]/30" />;
}

function PCard({ children, className = "" }) {
    return (
        <div
            className={`bg-[var(--color-surface-container-lowest)] rounded-2xl shadow-[0px_4px_12px_rgba(15,23,42,0.08)] ${className}`}
        >
            {children}
        </div>
    );
}

// ── Custom Tabs (zero HeroUI dependency) ──────────────────────────────────────
function CustomTabs({ tabs }) {
    const [active, setActive] = useState(0);
    return (
        <div>
            {/* Tab bar */}
            <div className="flex gap-1 bg-[var(--color-surface-container-low)] rounded-xl p-1">
                {tabs.map((tab, i) => (
                    <button
                        key={tab.label}
                        onClick={() => setActive(i)}
                        className={`flex-1 py-2 px-3 rounded-lg text-sm font-semibold transition-all duration-200 ${active === i
                                ? "bg-[var(--color-surface-container-lowest)] text-[var(--color-on-surface)] shadow-sm"
                                : "text-[var(--color-on-surface-variant)] hover:text-[var(--color-on-surface)]"
                            }`}
                    >
                        {tab.label}
                    </button>
                ))}
            </div>
            {/* Active panel */}
            <div className="pt-6">{tabs[active].content}</div>
        </div>
    );
}

// ── Image gallery ─────────────────────────────────────────────────────────────
function ImageGallery({ images }) {
    const [active, setActive] = useState(0);
    return (
        <div className="space-y-3">
            <div className="relative w-full aspect-[16/9] rounded-2xl overflow-hidden bg-[var(--color-surface-container)]">
                <img
                    src={images[active]}
                    alt="Property view"
                    className="w-full h-full object-cover transition-all duration-500"
                />
                <button
                    onClick={() => setActive((a) => (a - 1 + images.length) % images.length)}
                    className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/85 backdrop-blur-sm p-2 rounded-full shadow-md hover:bg-white transition-colors"
                >
                    <Icon name="chevron_left" size={20} />
                </button>
                <button
                    onClick={() => setActive((a) => (a + 1) % images.length)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/85 backdrop-blur-sm p-2 rounded-full shadow-md hover:bg-white transition-colors"
                >
                    <Icon name="chevron_right" size={20} />
                </button>
                <div className="absolute bottom-4 right-4 bg-black/50 text-white text-xs font-semibold px-3 py-1 rounded-full backdrop-blur-sm">
                    {active + 1} / {images.length}
                </div>
            </div>
            <div className="grid grid-cols-4 gap-2">
                {images.map((img, i) => (
                    <button
                        key={i}
                        onClick={() => setActive(i)}
                        className={`relative aspect-[4/3] rounded-xl overflow-hidden transition-all duration-200 ${active === i
                                ? "ring-2 ring-[var(--color-secondary)] ring-offset-2"
                                : "opacity-60 hover:opacity-90"
                            }`}
                    >
                        <img src={img} alt={`View ${i + 1}`} className="w-full h-full object-cover" />
                    </button>
                ))}
            </div>
        </div>
    );
}

// ── Star rating ───────────────────────────────────────────────────────────────
function StarRating({ rating, size = 16 }) {
    return (
        <span className="flex items-center gap-0.5">
            {[1, 2, 3, 4, 5].map((s) => (
                <Icon
                    key={s}
                    name="star"
                    filled={s <= Math.round(rating)}
                    size={size}
                    className="text-amber-400"
                />
            ))}
        </span>
    );
}

// ── Booking card ──────────────────────────────────────────────────────────────
function BookingCard({ property }) {
    const [checkIn, setCheckIn] = useState("");
    const [checkOut, setCheckOut] = useState("");
    const [saved, setSaved] = useState(false);
    const [booked, setBooked] = useState(false);

    const months =
        checkIn && checkOut
            ? Math.max(
                1,
                Math.round(
                    (new Date(checkOut) - new Date(checkIn)) / (1000 * 60 * 60 * 24 * 30)
                )
            )
            : 1;
    const subtotal = property.price * months;
    const serviceFee = Math.round(subtotal * 0.05);
    const total = subtotal + serviceFee;

    return (
        <PCard className="p-6 space-y-5 sticky top-24">
            {/* Price + badge */}
            <div className="flex items-end justify-between">
                <div>
                    <span className="text-3xl font-bold text-[var(--color-on-surface)]">
                        ${property.price.toLocaleString()}
                    </span>
                    <span className="text-sm text-[var(--color-on-surface-variant)] ml-1">/ month</span>
                </div>
                <span className="bg-[var(--color-secondary-container)] text-[var(--color-on-secondary-container)] text-xs font-bold px-3 py-1 rounded-full">
                    {property.available ? "Available Now" : "Unavailable"}
                </span>
            </div>

            {/* Rating */}
            <div className="flex items-center gap-2">
                <StarRating rating={property.rating} />
                <span className="text-sm font-semibold text-[var(--color-on-surface)]">
                    {property.rating}
                </span>
                <span className="text-sm text-[var(--color-on-surface-variant)]">
                    ({property.reviews} reviews)
                </span>
            </div>

            <HR />

            {/* Date pickers */}
            <div className="grid grid-cols-2 gap-3">
                {[
                    { label: "Move-in", val: checkIn, set: setCheckIn },
                    { label: "Move-out", val: checkOut, set: setCheckOut },
                ].map(({ label, val, set }) => (
                    <div key={label} className="space-y-1">
                        <label className="text-xs font-semibold text-[var(--color-on-surface-variant)] uppercase tracking-wide">
                            {label}
                        </label>
                        <input
                            type="date"
                            value={val}
                            onChange={(e) => set(e.target.value)}
                            className="w-full rounded-xl border border-[var(--color-outline-variant)] bg-[var(--color-surface-container-low)] px-3 py-2.5 text-sm text-[var(--color-on-surface)] focus:outline-none focus:ring-2 focus:ring-[var(--color-secondary)] transition-all"
                        />
                    </div>
                ))}
            </div>

            {/* Price breakdown */}
            <div className="space-y-2.5 bg-[var(--color-surface-container-low)] rounded-xl p-4">
                <div className="flex justify-between text-sm">
                    <span className="text-[var(--color-on-surface-variant)]">
                        ${property.price.toLocaleString()} × {months} mo
                    </span>
                    <span className="font-semibold text-[var(--color-on-surface)]">
                        ${subtotal.toLocaleString()}
                    </span>
                </div>
                <div className="flex justify-between text-sm">
                    <span className="text-[var(--color-on-surface-variant)]">Service fee (5%)</span>
                    <span className="font-semibold text-[var(--color-on-surface)]">
                        ${serviceFee.toLocaleString()}
                    </span>
                </div>
                <HR />
                <div className="flex justify-between pt-1">
                    <span className="font-bold text-[var(--color-on-surface)]">Total</span>
                    <span className="font-bold text-[var(--color-secondary)] text-lg">
                        ${total.toLocaleString()}
                    </span>
                </div>
            </div>

            {/* Book CTA */}
            <button
                onClick={() => setBooked((b) => !b)}
                className={`w-full flex items-center justify-center gap-2 py-3.5 rounded-xl font-semibold text-base transition-all ${booked
                        ? "bg-[var(--color-secondary-container)] text-[var(--color-on-secondary-container)]"
                        : "bg-[var(--color-secondary)] text-[var(--color-on-secondary)] hover:opacity-90"
                    }`}
            >
                {booked ? (
                    <>
                        <Icon name="check_circle" filled size={18} />
                        Booking Requested
                    </>
                ) : (
                    "Request to Book"
                )}
            </button>

            {/* Secondary row */}
            <div className="flex gap-3">
                <button className="flex-1 flex items-center justify-center gap-2 py-3 border border-[var(--color-outline-variant)] rounded-xl text-sm font-semibold text-[var(--color-on-surface)] hover:bg-[var(--color-surface-container-low)] transition-colors">
                    <Icon name="chat_bubble_outline" size={16} />
                    Message Host
                </button>
                <button
                    onClick={() => setSaved((s) => !s)}
                    className={`w-12 h-12 flex items-center justify-center border border-[var(--color-outline-variant)] rounded-xl transition-colors hover:bg-[var(--color-surface-container-low)] ${saved
                            ? "text-[var(--color-error)]"
                            : "text-[var(--color-on-surface-variant)]"
                        }`}
                    aria-label="Save to favorites"
                >
                    <Icon name="favorite" filled={saved} size={18} />
                </button>
            </div>

            <p className="text-xs text-center text-[var(--color-on-surface-variant)]">
                You won&apos;t be charged until the host confirms.
            </p>
        </PCard>
    );
}

// ── Review card ───────────────────────────────────────────────────────────────
function ReviewCard({ review }) {
    const initials = review.name
        .split(" ")
        .map((n) => n[0])
        .join("")
        .slice(0, 2);
    return (
        <div className="space-y-3">
            <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-[var(--color-secondary-container)] flex items-center justify-center text-sm font-bold text-[var(--color-on-secondary-container)] shrink-0">
                    {initials}
                </div>
                <div className="flex-1 min-w-0">
                    <p className="text-sm font-semibold text-[var(--color-on-surface)] truncate">
                        {review.name}
                    </p>
                    <p className="text-xs text-[var(--color-on-surface-variant)]">{review.date}</p>
                </div>
                <StarRating rating={review.rating} size={14} />
            </div>
            <p className="text-sm text-[var(--color-on-surface-variant)] leading-relaxed">
                {review.comment}
            </p>
        </div>
    );
}

// ── Tab panels ────────────────────────────────────────────────────────────────
function AboutPanel({ p }) {
    return (
        <div className="space-y-6">
            <div className="space-y-4 text-sm text-[var(--color-on-surface-variant)] leading-relaxed">
                {p.description.split("\n\n").map((para, i) => (
                    <p key={i}>{para}</p>
                ))}
            </div>
            {/* Host card */}
            <div className="border border-[var(--color-outline-variant)]/40 bg-[var(--color-surface-container-lowest)] rounded-2xl p-5">
                <div className="flex items-start gap-4">
                    <Avatar
                        src={p.host.avatar}
                        size="lg"
                        className="shrink-0 ring-2 ring-[var(--color-secondary-container)]"
                    />
                    <div className="flex-1 min-w-0 space-y-1">
                        <div className="flex items-center gap-2 flex-wrap">
                            <p className="font-semibold text-[var(--color-on-surface)]">{p.host.name}</p>
                            <span className="flex items-center gap-1 bg-[var(--color-secondary-container)]/30 text-[var(--color-on-secondary-container)] text-xs font-semibold px-2.5 py-0.5 rounded-full">
                                <Icon name="verified" filled size={13} className="text-[var(--color-secondary)]" />
                                Verified
                            </span>
                        </div>
                        <p className="text-xs text-[var(--color-on-surface-variant)]">
                            Hosting since {p.host.since} · {p.host.totalListings} active listings
                        </p>
                        <p className="text-xs text-[var(--color-on-surface-variant)] flex items-center gap-1">
                            <Icon name="schedule" size={13} />
                            {p.host.responseTime}
                        </p>
                    </div>
                    <button className="border border-[var(--color-secondary)] text-[var(--color-secondary)] text-sm font-semibold px-4 py-2 rounded-xl hover:bg-[var(--color-secondary)]/5 transition-colors shrink-0">
                        Contact
                    </button>
                </div>
            </div>
        </div>
    );
}

function AmenitiesPanel({ amenities }) {
    return (
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
            {amenities.map((a) => (
                <div
                    key={a.label}
                    className="flex items-center gap-3 p-3.5 rounded-xl bg-[var(--color-surface-container-low)] border border-[var(--color-outline-variant)]/20"
                >
                    <Icon name={a.icon} size={18} className="text-[var(--color-secondary)] shrink-0" />
                    <span className="text-sm text-[var(--color-on-surface)]">{a.label}</span>
                </div>
            ))}
        </div>
    );
}

function LocationPanel({ location, nearby }) {
    return (
        <div className="space-y-5">
            {/* Map placeholder */}
            <div className="w-full h-56 rounded-2xl bg-[var(--color-surface-container)] flex flex-col items-center justify-center gap-3 border border-[var(--color-outline-variant)]/30 overflow-hidden relative">
                <div className="absolute inset-0 opacity-10">
                    {Array.from({ length: 8 }).map((_, i) => (
                        <div
                            key={`h${i}`}
                            className="absolute border-t border-[var(--color-outline)]"
                            style={{ top: `${i * 14.28}%`, left: 0, right: 0 }}
                        />
                    ))}
                    {Array.from({ length: 8 }).map((_, i) => (
                        <div
                            key={`v${i}`}
                            className="absolute border-l border-[var(--color-outline)]"
                            style={{ left: `${i * 14.28}%`, top: 0, bottom: 0 }}
                        />
                    ))}
                </div>
                <div className="relative bg-[var(--color-secondary)] text-[var(--color-on-secondary)] w-10 h-10 rounded-full flex items-center justify-center shadow-lg">
                    <Icon name="location_on" filled size={22} />
                </div>
                <p className="relative text-sm font-semibold text-[var(--color-on-surface)]">{location}</p>
                <button className="relative bg-[var(--color-surface-container-lowest)] text-[var(--color-secondary)] text-xs font-semibold px-4 py-1.5 rounded-lg hover:opacity-80 transition-opacity">
                    Open in Maps
                </button>
            </div>
            {/* Nearby POIs */}
            <div>
                <h4 className="text-sm font-bold text-[var(--color-on-surface)] mb-3 uppercase tracking-wider">
                    Nearby
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {nearby.map((poi) => (
                        <div
                            key={poi.label}
                            className="flex items-center justify-between p-3 rounded-xl bg-[var(--color-surface-container-low)]"
                        >
                            <div className="flex items-center gap-2.5">
                                <Icon name={poi.icon} size={17} className="text-[var(--color-on-surface-variant)]" />
                                <span className="text-sm text-[var(--color-on-surface)]">{poi.label}</span>
                            </div>
                            <span className="text-xs font-semibold text-[var(--color-secondary)] bg-[var(--color-secondary-container)]/30 px-2 py-0.5 rounded-full">
                                {poi.distance}
                            </span>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

function ReviewsPanel({ rating, reviews, reviews_list }) {
    return (
        <div className="space-y-6">
            {/* Summary bar */}
            <div className="flex items-center gap-6 bg-[var(--color-surface-container-low)] rounded-2xl p-5">
                <div className="text-center shrink-0">
                    <p className="text-5xl font-bold text-[var(--color-on-surface)]">{rating}</p>
                    <StarRating rating={rating} size={18} />
                    <p className="text-xs text-[var(--color-on-surface-variant)] mt-1">{reviews} reviews</p>
                </div>
                <div className="flex-1 space-y-2">
                    {[
                        { label: "Cleanliness", val: 98 },
                        { label: "Location", val: 96 },
                        { label: "Value", val: 90 },
                        { label: "Communication", val: 99 },
                    ].map((cat) => (
                        <div key={cat.label} className="flex items-center gap-3 text-xs">
                            <span className="w-24 text-[var(--color-on-surface-variant)] shrink-0">
                                {cat.label}
                            </span>
                            <div className="flex-1 h-1.5 bg-[var(--color-surface-container-high)] rounded-full overflow-hidden">
                                <div
                                    className="h-full bg-[var(--color-secondary)] rounded-full"
                                    style={{ width: `${cat.val}%` }}
                                />
                            </div>
                            <span className="font-semibold text-[var(--color-on-surface)] w-6 text-right">
                                {(cat.val / 20).toFixed(1)}
                            </span>
                        </div>
                    ))}
                </div>
            </div>
            {/* Review list */}
            <div className="space-y-6 divide-y divide-[var(--color-outline-variant)]/20">
                {reviews_list.map((r, i) => (
                    <div key={i} className={i > 0 ? "pt-6" : ""}>
                        <ReviewCard review={r} />
                    </div>
                ))}
            </div>
            <button className="w-full py-3 border border-[var(--color-outline-variant)] rounded-xl text-sm font-semibold text-[var(--color-on-surface)] hover:bg-[var(--color-surface-container-low)] transition-colors">
                Load all {reviews} reviews
            </button>
        </div>
    );
}

// ── Page ──────────────────────────────────────────────────────────────────────
export default function PropertyDetailsPage() {
    const p = PROPERTY;

    const tabs = [
        { label: "About", content: <AboutPanel p={p} /> },
        { label: "Amenities", content: <AmenitiesPanel amenities={p.amenities} /> },
        { label: "Location", content: <LocationPanel location={p.location} nearby={p.nearby} /> },
        {
            label: `Reviews (${p.reviews})`,
            content: (
                <ReviewsPanel
                    rating={p.rating}
                    reviews={p.reviews}
                    reviews_list={p.reviews_list}
                />
            ),
        },
    ];

    return (
        <>
            <link
                href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200&display=swap"
                rel="stylesheet"
            />

            <div className="min-h-screen bg-[var(--color-background)] text-[var(--color-on-surface)]">

                {/* ── Breadcrumb bar ── */}
                <div className="sticky top-0 z-30 bg-[var(--color-surface)]/90 backdrop-blur-md border-b border-[var(--color-outline-variant)]/30">
                    <div className="max-w-7xl mx-auto px-4 md:px-16 py-3 flex items-center justify-between">
                        <nav className="flex items-center gap-1 text-sm text-[var(--color-on-surface-variant)]">
                            <Link href="/" className="hover:text-[var(--color-secondary)] transition-colors">
                                Home
                            </Link>
                            <Icon name="chevron_right" size={16} />
                            <Link
                                href="/allproperties"
                                className="hover:text-[var(--color-secondary)] transition-colors"
                            >
                                Properties
                            </Link>
                            <Icon name="chevron_right" size={16} />
                            <span className="text-[var(--color-on-surface)] font-medium truncate max-w-[180px]">
                                {p.title}
                            </span>
                        </nav>
                        <button className="flex items-center gap-1.5 text-sm font-semibold text-[var(--color-on-surface-variant)] hover:text-[var(--color-on-surface)] transition-colors px-3 py-1.5 rounded-lg hover:bg-[var(--color-surface-container-low)]">
                            <Icon name="share" size={16} />
                            Share
                        </button>
                    </div>
                </div>

                {/* ── Main content ── */}
                <div className="max-w-7xl mx-auto px-4 md:px-16 py-8">

                    {/* Title block */}
                    <div className="mb-6 space-y-2">
                        <div className="flex flex-wrap items-center gap-2">
                            <span className="bg-[var(--color-primary-fixed)] text-[var(--color-on-primary-fixed)] text-xs font-bold px-3 py-1 rounded-full">
                                {p.type}
                            </span>
                            {p.available && (
                                <span className="flex items-center gap-1.5 bg-[var(--color-secondary-container)]/40 text-[var(--color-on-secondary-container)] text-xs font-bold px-3 py-1 rounded-full">
                                    <span className="w-1.5 h-1.5 rounded-full bg-[var(--color-secondary)]" />
                                    Available Now
                                </span>
                            )}
                        </div>
                        <h1 className="text-3xl md:text-4xl font-bold text-[var(--color-on-surface)] leading-tight">
                            {p.title}
                        </h1>
                        <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-sm text-[var(--color-on-surface-variant)]">
                            <span className="flex items-center gap-1">
                                <Icon name="location_on" size={16} className="text-[var(--color-secondary)]" />
                                {p.location}
                            </span>
                            <span className="flex items-center gap-1.5">
                                <StarRating rating={p.rating} size={14} />
                                <span className="font-semibold text-[var(--color-on-surface)]">{p.rating}</span>
                                <span>({p.reviews} reviews)</span>
                            </span>
                        </div>
                    </div>

                    {/* Two-column layout */}
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

                        {/* LEFT col */}
                        <div className="lg:col-span-2 space-y-8">
                            <ImageGallery images={p.images} />

                            {/* Specs strip */}
                            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                                {p.specs.map((spec) => (
                                    <div
                                        key={spec.label}
                                        className="flex items-center gap-3 bg-[var(--color-surface-container-lowest)] rounded-xl p-4 border border-[var(--color-outline-variant)]/30"
                                    >
                                        <div className="bg-[var(--color-secondary-container)]/40 p-2 rounded-lg shrink-0">
                                            <Icon
                                                name={spec.icon}
                                                size={18}
                                                className="text-[var(--color-on-secondary-container)]"
                                            />
                                        </div>
                                        <div>
                                            <p className="text-xs text-[var(--color-on-surface-variant)]">{spec.label}</p>
                                            <p className="text-sm font-semibold text-[var(--color-on-surface)]">
                                                {spec.value}
                                            </p>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            {/* Custom tabs */}
                            <CustomTabs tabs={tabs} />
                        </div>

                        {/* RIGHT col */}
                        <div className="lg:col-span-1">
                            <BookingCard property={p} />
                        </div>
                    </div>
                </div>

                {/* ── Footer ── */}
                <footer className="w-full px-4 md:px-16 py-12 grid grid-cols-1 md:grid-cols-4 gap-6 bg-[var(--color-inverse-surface)] mt-16 text-white">
                    <div className="md:col-span-1 space-y-3">
                        <span className="text-2xl font-bold text-[var(--color-surface-container-lowest)]">
                            RentNest
                        </span>
                        <p className="text-xs text-[var(--color-surface-variant)]/80">
                            © 2024 RentNest Real Estate. All rights reserved.
                        </p>
                    </div>
                    {[
                        { title: "Resources", links: ["About Us", "Blog"] },
                        { title: "Legal", links: ["Terms of Service", "Privacy Policy"] },
                        { title: "Support", links: ["Contact Support", "FAQ"] },
                    ].map((col) => (
                        <div key={col.title} className="space-y-3">
                            <h5 className="text-xs font-semibold text-[var(--color-secondary-fixed)]">
                                {col.title}
                            </h5>
                            <ul className="space-y-2">
                                {col.links.map((link) => (
                                    <li key={link}>
                                        <a
                                            href="#"
                                            className="text-xs text-[var(--color-surface-variant)] hover:text-white transition-colors hover:underline underline-offset-2"
                                        >
                                            {link}
                                        </a>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </footer>
            </div>
        </>
    );
}