"use client";

/**
 * RentNest — Blog Detail Page
 * Route: /blog/[slug]
 *
 * Dependencies:
 *   @heroui/react         (Button, Card, CardBody, Chip, Avatar, Divider)
 *   @gravity-ui/uikit     (Breadcrumbs, BreadcrumbsItem, Text)
 *   next/link, next/image
 *   tailwindcss
 */

import Link from "next/link";
import { useState } from "react";
import { Button, Card, Chip } from "@heroui/react";
import { Breadcrumbs, BreadcrumbsItem } from "@gravity-ui/uikit";

// ─── Mock Data ───────────────────────────────────────────────────────────────
// In production: fetch from your CMS / API using the `slug` param.

const POST = {
    id: "urban-rental-investments-2024",
    category: "Market Trends",
    title: "The 2024 Guide to Urban Rental Investments",
    subtitle:
        "Deep dive into the fastest-growing urban markets and how digital infrastructure is changing tenant expectations forever.",
    date: "June 14, 2024",
    readTime: "12 min read",
    author: {
        name: "Sarah Mitchell",
        role: "Head of Market Research",
        avatar: "https://i.pravatar.cc/150?img=47",
    },
    heroImage:
        "https://lh3.googleusercontent.com/aida-public/AB6AXuCNTYebFsqpS_53DpSB4Cg-xw35S9WGnG4ZGv0b7pjsxmiX5NBX4x0aZiOqpbP6M2a6zvPqaOl0m2tuocSZCT7oJBp0g_P3I-h7i1UGdIYmJm_HXSs5mZT72r7yrld6HpMkKWmFQ4faAjZUWcx1uGFIfMtG_hg9bjSHhkre9hg-K0IaI-JdY30jHSQ_lb14LRGNy8-iFprn1f1U4yvi9l6ee_EPiuaNLXFSClBxkv8igMDAheHODVDg8c39CPi8UkxnIwFi9DSTB-1R",
    tags: ["Market Trends", "Investment", "Urban Living", "PropTech"],
    sections: [
        {
            type: "intro",
            content:
                "Urban rental markets have always been a barometer for broader economic health — and in 2024, they are telling a particularly nuanced story. As remote work norms evolve, young professionals are reconverting back to city centres, pushing vacancy rates to decade lows in certain corridors while peripheral suburbs cool. Understanding these dynamics is no longer optional for landlords and investors; it's the baseline.",
        },
        {
            type: "heading",
            content: "The Three Cities Leading the Recovery",
        },
        {
            type: "paragraph",
            content:
                "Manchester, Bristol, and Leeds have emerged as the standout performers of the English rental market in the first half of 2024. Average asking rents in these cities have risen between 11% and 14% year-on-year, outpacing London's comparatively modest 6.2% uplift. The drivers are familiar: an undersupplied housing stock, strong graduate retention from local universities, and a broadening base of tech and creative sector employers.",
        },
        {
            type: "callout",
            icon: "trending_up",
            content:
                "Average rental yields in Manchester's M1 postcode reached 6.8% in Q1 2024 — the highest recorded figure since RentNest began tracking in 2018.",
        },
        {
            type: "heading",
            content: "How Digital Infrastructure Reshapes Tenant Expectations",
        },
        {
            type: "paragraph",
            content:
                "The post-pandemic tenant is not the same person who signed a lease in 2019. Today's renter arrives with a checklist that prioritises gigabit broadband, smart home compatibility, and paperless lease management. A 2024 RentNest survey of 4,200 tenants found that 67% would pay a 5–8% premium for a property with verified full-fibre broadband over a comparable property without it. That is a meaningful spread landlords can capture at negligible capital cost.",
        },
        {
            type: "paragraph",
            content:
                "Beyond connectivity, the expectation for digital self-service has reset completely. Prospective tenants now expect online viewings, digital referencing, and e-signature on contracts as standard — not premium add-ons. Platforms that automate these touchpoints report a 40% reduction in void periods simply because friction in the application funnel has been eliminated.",
        },
        {
            type: "image",
            src: "https://lh3.googleusercontent.com/aida-public/AB6AXuCleIAFC62JMFP9HFxpAFPlGjRLvDWlZCQErUMWZcIYjrUReMYtSSIcjVTtXkr2sOJrfh8TAaSq2h2n35MgBFgPZok8mTcm7hOdKdmq-DoPPF4lxOhtkqC7DeVIrNMYVEls3we7oLiLqVWOpb57AXJ2R7iMwCkaJkBoeTocC3Xw0dRXV9K3exhlkpq-TXBKGD6tD9KYkAvPYGxy8h9Z-GszX8GjKRUEknRnyN49p5uYC-chH5pfBe0GXze-eu1EvS3SlR8mWzRiyQye",
            caption:
                "A modern workspace within a high-end rental — broadband and ergonomics are now top-tier amenity signals.",
        },
        {
            type: "heading",
            content: "Investment Strategy: Where to Focus in H2 2024",
        },
        {
            type: "list",
            items: [
                "Target sub-£250k price points in Leeds LS6 and LS2 corridors for gross yields above 7%.",
                "Look at student-adjacent but non-HMO stock in Bristol BS2 — occupational demand remains structurally high.",
                "In Manchester, purpose-built rental developments with EPC ratings of A or B command a demonstrable premium.",
                "Avoid high-density city centre micro-apartments sub-35m²; rental growth here has flatlined as tenant preferences shift toward space.",
            ],
        },
        {
            type: "paragraph",
            content:
                "The overarching theme is quality over quantity. The era of yield compression masked underlying asset quality, but with financing costs normalising, investors are returning to fundamentals: energy efficiency, liveability, and connectivity. Properties that tick all three boxes are pulling away from the field.",
        },
        {
            type: "heading",
            content: "What This Means for Landlords Today",
        },
        {
            type: "paragraph",
            content:
                "For existing landlords, the practical upshot is straightforward: invest in the specification of your property before investing in additional assets. A £3,000 full-fibre installation and smart lock system will return more in rental uplift over a five-year hold than the same capital deployed as a deposit on a second unit in a stagnant postcode. The data now supports this decisively, and RentNest's own landlord cohort data confirms it.",
        },
    ],
};

const RELATED = [
    {
        id: "security-deposit-return",
        category: "Tenant Advice",
        title: "Maximizing Your Security Deposit Return",
        readTime: "5 min read",
        image:
            "https://lh3.googleusercontent.com/aida-public/AB6AXuBuV7aep1X3KLobFx3Th4-KXdwsW0CaQZHXkJa37R79C3ZXPvqg54XVjFZi74wDwUtwQi6CA7GAFZTpLVri-fyO9l1zu8eZeE-ZbXYc71_YJ5J7UprIlmOZRPTTAjsBzugP7jnAYkh6xXEvNvIngEBsjV9nfgGIeqMWAg236lIKbQM6V2hRMpx2elrj-1_AmEIKLkPvMBW0lkOGBKYAyeM-ZEjnGcg1HActIx0zAhgsUWExniqzEgJzeeVcdCk9iVG7O6ykPFsp2KbC",
    },
    {
        id: "automating-rental-cash-flow",
        category: "Landlord Tips",
        title: "Automating Your Rental Cash Flow",
        readTime: "6 min read",
        image:
            "https://lh3.googleusercontent.com/aida-public/AB6AXuALQD_mvFFqEFGBzZfHXJXZ39m5GkqpB789YavYt-gZILeWkSJe-Pymk1H-fawwngvA1rSyz7tMOgkRsQxSo8RaVdt0FfEyE6mDzx1_zJ5ms7Yn_WvMfY1YkAepLnf3Jz5Zganx9C1ctmoNoTp53OIez8bFKNzgWvz8T3befajBAKjMTSPnBS9UsjugVSOq_Qm0PuG93b5cAOtL12K83rF1PUeKIFNg0Y08Zr0No6XLf1m1pLGl6bLQxQMDpI_Tml55uzZJi302teeh",
    },
];

// ─── Sub-components ───────────────────────────────────────────────────────────

function ProgressBar() {
    // Scroll-driven progress — works client-side only
    const [progress, setProgress] = useState(0);

    if (typeof window !== "undefined") {
        window.onscroll = () => {
            const el = document.documentElement;
            const scrolled = el.scrollTop;
            const total = el.scrollHeight - el.clientHeight;
            setProgress((scrolled / total) * 100);
        };
    }

    return (
        <div className="fixed top-0 left-0 z-[60] h-1 w-full bg-outline-variant/20">
            <div
                className="h-full bg-secondary transition-all duration-100"
                style={{ width: `${progress}%` }}
            />
        </div>
    );
}

function RenderSection({ section, index }) {
    switch (section.type) {
        case "intro":
            return (
                <p className="text-lg leading-8 text-on-surface-variant font-light first-letter:float-left first-letter:mr-2 first-letter:text-6xl first-letter:font-bold first-letter:text-secondary first-letter:leading-none">
                    {section.content}
                </p>
            );
        case "heading":
            return (
                <h2 className="mt-2 text-2xl font-bold text-on-surface md:text-3xl">
                    {section.content}
                </h2>
            );
        case "paragraph":
            return (
                <p className="text-base leading-8 text-on-surface-variant">
                    {section.content}
                </p>
            );
        case "callout":
            return (
                <div className="flex gap-4 rounded-xl border-l-4 border-secondary bg-secondary-container/40 p-5">
                    <span
                        className="material-symbols-outlined mt-0.5 shrink-0 text-secondary"
                        style={{ fontVariationSettings: "'FILL' 1" }}
                    >
                        {section.icon}
                    </span>
                    <p className="text-base font-medium text-on-secondary-container">
                        {section.content}
                    </p>
                </div>
            );
        case "list":
            return (
                <ul className="space-y-3">
                    {section.items.map((item, i) => (
                        <li key={i} className="flex gap-3 text-base text-on-surface-variant">
                            <span className="mt-1 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-secondary-container text-xs font-bold text-on-secondary-container">
                                {i + 1}
                            </span>
                            {item}
                        </li>
                    ))}
                </ul>
            );
        case "image":
            return (
                <figure className="overflow-hidden rounded-xl">
                    <img
                        src={section.src}
                        alt={section.caption}
                        className="w-full object-cover"
                    />
                    {section.caption && (
                        <figcaption className="mt-2 text-center text-sm text-on-surface-variant">
                            {section.caption}
                        </figcaption>
                    )}
                </figure>
            );
        default:
            return null;
    }
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function BlogDetailPage({ params }) {
    // In a real app: const { slug } = params;
    const post = POST;
    const [bookmarked, setBookmarked] = useState(false);

    return (
        <div className="min-h-screen bg-surface text-on-surface">
            <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200&display=swap');
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap');
        body { font-family: 'Inter', sans-serif; }
        .material-symbols-outlined {
          font-family: 'Material Symbols Outlined';
          font-style: normal;
          font-size: 24px;
          line-height: 1;
          letter-spacing: normal;
          text-transform: none;
          display: inline-block;
          white-space: nowrap;
          word-wrap: normal;
          direction: ltr;
        }
      `}</style>

            <ProgressBar />
            {/* <Navbar /> */}

            {/* ── Breadcrumbs ── */}


            {/* ── Hero ── */}
            <header className="relative h-[60vh] min-h-[400px] overflow-hidden">
                <img
                    src={post.heroImage}
                    alt={post.title}
                    className="h-full w-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 px-4 pb-10 md:px-16">
                    <div className="mx-auto max-w-4xl">
                        <Chip
                            size="sm"
                            className="mb-4 bg-secondary text-white font-semibold uppercase tracking-wider"
                        >
                            {post.category}
                        </Chip>
                        <h1 className="text-4xl font-bold leading-tight text-white md:text-5xl">
                            {post.title}
                        </h1>
                    </div>
                </div>
            </header>

            {/* ── Article Layout ── */}
            <div className="mx-auto max-w-7xl px-4 py-12 md:px-16">
                <div className="grid grid-cols-1 gap-12 lg:grid-cols-12">
                    {/* Main Content */}
                    <main className="lg:col-span-8">
                        {/* Meta bar */}
                        <div className="mb-8 flex flex-wrap items-center justify-between gap-4 rounded-xl bg-surface-container p-5">
                            <div className="flex items-center gap-3">
                                <img src={post.author.avatar} alt="avatar" className="h-8 w-8 rounded-full object-cover" />
                                <div>
                                    <p className="text-sm font-semibold text-on-surface">
                                        {post.author.name}
                                    </p>
                                    <p className="text-xs text-on-surface-variant">
                                        {post.author.role}
                                    </p>
                                </div>
                            </div>
                            <div className="flex items-center gap-4 text-xs text-on-surface-variant">
                                <span className="flex items-center gap-1">
                                    <span className="material-symbols-outlined text-base">
                                        calendar_today
                                    </span>
                                    {post.date}
                                </span>
                                <span className="flex items-center gap-1">
                                    <span className="material-symbols-outlined text-base">
                                        schedule
                                    </span>
                                    {post.readTime}
                                </span>
                                <button
                                    onClick={() => setBookmarked(!bookmarked)}
                                    className="flex items-center gap-1 transition-colors hover:text-secondary"
                                >
                                    <span
                                        className="material-symbols-outlined text-base"
                                        style={{
                                            fontVariationSettings: bookmarked
                                                ? "'FILL' 1"
                                                : "'FILL' 0",
                                            color: bookmarked ? "var(--color-secondary, #006c49)" : undefined,
                                        }}
                                    >
                                        bookmark
                                    </span>
                                    {bookmarked ? "Saved" : "Save"}
                                </button>
                            </div>
                        </div>

                        {/* Article body */}
                        <article className="space-y-7">
                            {post.sections.map((section, i) => (
                                <RenderSection key={i} section={section} index={i} />
                            ))}
                        </article>

                        {/* Tags */}
                        <div className="mt-10 flex flex-wrap gap-2">
                            {post.tags.map((tag) => (
                                <Chip
                                    key={tag}
                                    size="sm"
                                    variant="flat"
                                    className="bg-surface-container text-on-surface-variant cursor-pointer hover:bg-secondary-container hover:text-on-secondary-container transition-colors"
                                >
                                    #{tag}
                                </Chip>
                            ))}
                        </div>

                        <hr className="my-10 bg-outline-variant/30" />

                        {/* Author bio */}
                        <Card className="border border-outline-variant/20 bg-surface-container-low shadow-sm">
                            <div className="flex flex-row gap-5 p-6">
                                <img src={post.author.avatar} alt="avatar" className="h-12 w-12 rounded-full object-cover shrink-0" />
                                <div>
                                    <p className="text-xs font-semibold uppercase tracking-wider text-secondary mb-1">
                                        About the Author
                                    </p>
                                    <h4 className="text-base font-bold text-on-surface">
                                        {post.author.name}
                                    </h4>
                                    <p className="text-sm text-on-surface-variant">
                                        {post.author.role}
                                    </p>
                                    <p className="mt-2 text-sm text-on-surface-variant leading-relaxed">
                                        Sarah has spent over a decade analysing residential property
                                        markets across the UK. She leads RentNests research
                                        division and advises institutional landlords on portfolio
                                        strategy.
                                    </p>
                                </div>
                            </div>
                        </Card>

                        {/* Share */}
                        <div className="mt-8 flex items-center gap-3">
                            <span className="text-sm font-semibold text-on-surface-variant">
                                Share this article:
                            </span>
                            {[
                                { icon: "public", label: "Web" },
                                { icon: "alternate_email", label: "Email" },
                                { icon: "share", label: "Copy link" },
                            ].map(({ icon, label }) => (
                                <button
                                    key={icon}
                                    className="flex h-9 w-9 items-center justify-center rounded-full bg-surface-container transition-colors hover:bg-secondary-container hover:text-on-secondary-container"
                                    title={label}
                                >
                                    <span className="material-symbols-outlined text-sm">
                                        {icon}
                                    </span>
                                </button>
                            ))}
                        </div>
                    </main>

                    {/* Sidebar */}
                    <aside className="lg:col-span-4 space-y-6">
                        {/* Table of contents */}
                        <Card className="border border-outline-variant/20 bg-surface-container-low shadow-sm sticky top-24">
                            <div className="p-5">
                                <p className="mb-4 text-sm font-bold uppercase tracking-wider text-on-surface">
                                    In this article
                                </p>
                                <ul className="space-y-2">
                                    {post.sections
                                        .filter((s) => s.type === "heading")
                                        .map((s, i) => (
                                            <li key={i}>
                                                <button className="text-left text-sm text-on-surface-variant transition-colors hover:text-secondary leading-snug">
                                                    <span className="mr-2 font-semibold text-secondary">
                                                        {String(i + 1).padStart(2, "0")}
                                                    </span>
                                                    {s.content}
                                                </button>
                                            </li>
                                        ))}
                                </ul>

                                <hr className="my-5 bg-outline-variant/30" />

                                {/* Quick stats */}
                                <p className="mb-3 text-sm font-bold uppercase tracking-wider text-on-surface">
                                    Key Numbers
                                </p>
                                <div className="space-y-3">
                                    {[
                                        { value: "14%", label: "YoY rent growth, Leeds" },
                                        { value: "6.8%", label: "Yield, Manchester M1" },
                                        { value: "67%", label: "Tenants pay broadband premium" },
                                        { value: "40%", label: "Fewer void days, digital-first" },
                                    ].map(({ value, label }) => (
                                        <div key={label} className="flex items-baseline gap-2">
                                            <span className="text-xl font-bold text-secondary">
                                                {value}
                                            </span>
                                            <span className="text-xs text-on-surface-variant">
                                                {label}
                                            </span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </Card>
                    </aside>
                </div>

                {/* ── Related Articles ── */}
                <section className="mt-16">
                    <h2 className="mb-6 text-2xl font-bold text-on-surface">
                        You Might Also Like
                    </h2>
                    <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                        {RELATED.map((rel) => (
                            <Link key={rel.id} href={`/blog/${rel.id}`} className="group block">
                                <Card className="border border-outline-variant/20 bg-white shadow-sm transition-all duration-300 hover:shadow-lg">
                                    <div className="flex flex-row gap-4 p-4">
                                        <div className="h-24 w-32 shrink-0 overflow-hidden rounded-lg">
                                            <img
                                                src={rel.image}
                                                alt={rel.title}
                                                className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                                            />
                                        </div>
                                        <div className="flex flex-col justify-center">
                                            <Chip size="sm" variant="flat" className="mb-1 w-fit text-xs font-semibold bg-secondary-container text-on-secondary-container">
                                                {rel.category}
                                            </Chip>
                                            <h4 className="text-sm font-semibold leading-snug text-on-surface group-hover:text-secondary transition-colors">
                                                {rel.title}
                                            </h4>
                                            <span className="mt-1 text-xs text-on-surface-variant">
                                                {rel.readTime}
                                            </span>
                                        </div>
                                    </div>
                                </Card>
                            </Link>
                        ))}
                    </div>
                </section>
            </div>

            {/* ── Footer ── */}

        </div>
    );
}