"use client";

/**
 * RentNest — Blog & Services Page
 *
 * Dependencies:
 *   @heroui/react          (Button, Card, CardBody, Input, Chip, Divider, Avatar)
 *   @gravity-ui/uikit      (Text, Icon, Label, TextInput, Breadcrumbs)
 *   @gravity-ui/icons      (BookOpen, Star, Clock, ArrowRight, ChevronRight)
 *   next/image, next/link
 *   tailwindcss
 *
 * Tailwind config must include the RentNest color tokens (primary, secondary, etc.)
 */

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { Button, Card, Input, Chip } from "@heroui/react";
import { Text, Label } from "@gravity-ui/uikit";

// ─── Data ────────────────────────────────────────────────────────────────────

const SERVICES = [
    {
        id: 1,
        icon: "verified_user",
        title: "Tenant Verification",
        description:
            "Comprehensive background checks and credit screening to ensure high-quality placements and peace of mind for every landlord.",
        tag: "Most Popular",
    },
    {
        id: 2,
        icon: "payments",
        title: "Secure Payments",
        description:
            "Automated, encrypted rent collection and financial reporting that ensures funds are handled with institutional-grade security.",
        tag: null,
    },
    {
        id: 3,
        icon: "home_work",
        title: "Property Management",
        description:
            "A digital-first dashboard for managing maintenance requests, inspections, and lease renewals with zero friction.",
        tag: null,
    },
    {
        id: 4,
        icon: "support_agent",
        title: "24/7 Support",
        description:
            "Always-on customer service and emergency response coordination, ensuring assistance is available the moment it is needed.",
        tag: null,
    },
];

const FEATURED_POST = {
    id: "urban-rental-investments-2024",
    category: "Market Trends",
    title: "The 2024 Guide to Urban Rental Investments",
    excerpt:
        "Deep dive into the fastest-growing urban markets and how digital infrastructure is changing tenant expectations forever.",
    readTime: "12 min read",
    date: "Jun 14, 2024",
    image:
        "https://lh3.googleusercontent.com/aida-public/AB6AXuCNTYebFsqpS_53DpSB4Cg-xw35S9WGnG4ZGv0b7pjsxmiX5NBX4x0aZiOqpbP6M2a6zvPqaOl0m2tuocSZCT7oJBp0g_P3I-h7i1UGdIYmJm_HXSs5mZT72r7yrld6HpMkKWmFQ4faAjZUWcx1uGFIfMtG_hg9bjSHhkre9hg-K0IaI-JdY30jHSQ_lb14LRGNy8-iFprn1f1U4yvi9l6ee_EPiuaNLXFSClBxkv8igMDAheHODVDg8c39CPi8UkxnIwFi9DSTB-1R",
};

const ARTICLES = [
    {
        id: "security-deposit-return",
        category: "Tenant Advice",
        title: "Maximizing Your Security Deposit Return",
        excerpt:
            "Everything you need to know about the move-out process, from documentation to deep cleaning checklists that property managers love.",
        readTime: "5 min read",
        date: "Jun 8, 2024",
        image:
            "https://lh3.googleusercontent.com/aida-public/AB6AXuBuV7aep1X3KLobFx3Th4-KXdwsW0CaQZHXkJa37R79C3ZXPvqg54XVjFZi74wDwUtwQi6CA7GAFZTpLVri-fyO9l1zu8eZeE-ZbXYc71_YJ5J7UprIlmOZRPTTAjsBzugP7jnAYkh6xXEvNvIngEBsjV9nfgGIeqMWAg236lIKbQM6V2hRMpx2elrj-1_AmEIKLkPvMBW0lkOGBKYAyeM-ZEjnGcg1HActIx0zAhgsUWExniqzEgJzeeVcdCk9iVG7O6ykPFsp2KbC",
    },
    {
        id: "workspace-solutions-rentals",
        category: "Interior Design",
        title: "Modern Workspace Solutions for Rentals",
        excerpt:
            "Create a productive home office without permanent modifications. Explore ergonomic furniture and smart lighting for small spaces.",
        readTime: "8 min read",
        date: "Jun 3, 2024",
        image:
            "https://lh3.googleusercontent.com/aida-public/AB6AXuCleIAFC62JMFP9HFxpAFPlGjRLvDWlZCQErUMWZcIYjrUReMYtSSIcjVTtXkr2sOJrfh8TAaSq2h2n35MgBFgPZok8mTcm7hOdKdmq-DoPPF4lxOhtkqC7DeVIrNMYVEls3we7oLiLqVWOpb57AXJ2R7iMwCkaJkBoeTocC3Xw0dRXV9K3exhlkpq-TXBKGD6tD9KYkAvPYGxy8h9Z-GszX8GjKRUEknRnyN49p5uYC-chH5pfBe0GXze-eu1EvS3SlR8mWzRiyQye",
    },
    {
        id: "automating-rental-cash-flow",
        category: "Landlord Tips",
        title: "Automating Your Rental Cash Flow",
        excerpt:
            "Discover how the latest RentNest features help landlords maintain 100% payment on-time records through smart automation and reminders.",
        readTime: "6 min read",
        date: "May 28, 2024",
        image:
            "https://lh3.googleusercontent.com/aida-public/AB6AXuALQD_mvFFqEFGBzZfHXJXZ39m5GkqpB789YavYt-gZILeWkSJe-Pymk1H-fawwngvA1rSyz7tMOgkRsQxSo8RaVdt0FfEyE6mDzx1_zJ5ms7Yn_WvMfY1YkAepLnf3Jz5Zganx9C1ctmoNoTp53OIez8bFKNzgWvz8T3befajBAKjMTSPnBS9UsjugVSOq_Qm0PuG93b5cAOtL12K83rF1PUeKIFNg0Y08Zr0No6XLf1m1pLGl6bLQxQMDpI_Tml55uzZJi302teeh",
    },
];

const CATEGORY_COLORS = {
    "Market Trends": "success",
    "Tenant Advice": "primary",
    "Interior Design": "secondary",
    "Landlord Tips": "warning",
};

// ─── Sub-components ───────────────────────────────────────────────────────────


function ServiceCard({ service }) {
    return (
        <Card
            className="group border border-outline-variant/20 bg-white/80 backdrop-blur-sm shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
            isPressable
        >
            <div className="p-6">
                {service.tag && (
                    <Chip
                        size="sm"
                        className="mb-3 bg-secondary-container text-on-secondary-container font-semibold"
                    >
                        {service.tag}
                    </Chip>
                )}
                <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-xl bg-secondary-container">
                    <span
                        className="material-symbols-outlined text-on-secondary-container"
                        style={{ fontVariationSettings: "'FILL' 1" }}
                    >
                        {service.icon}
                    </span>
                </div>
                <h3 className="mb-2 text-lg font-semibold text-on-surface">
                    {service.title}
                </h3>
                <p className="text-sm leading-relaxed text-on-surface-variant">
                    {service.description}
                </p>
                <div className="mt-5 flex items-center gap-1 text-sm font-semibold text-secondary opacity-0 transition-opacity duration-200 group-hover:opacity-100">
                    Learn more
                    <span className="material-symbols-outlined text-base">
                        arrow_right_alt
                    </span>
                </div>
            </div>
        </Card>
    );
}

function ArticleCard({ article }) {
    return (
        <Link href={`/blog/${article.id}`} className="group block">
            <Card className="h-full border border-outline-variant/20 bg-white shadow-sm transition-all duration-300 hover:shadow-lg">
                <div className="p-0">
                    <div className="relative h-48 overflow-hidden rounded-t-xl">
                        <img
                            src={article.image}
                            alt={article.title}
                            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                        />
                    </div>
                    <div className="flex flex-col p-5">
                        <div className="mb-3 flex items-center gap-2">
                            <Chip
                                size="sm"
                                variant="flat"
                                color={CATEGORY_COLORS[article.category] || "default"}
                                className="text-xs font-semibold uppercase"
                            >
                                {article.category}
                            </Chip>
                            <span className="text-xs text-on-surface-variant">·</span>
                            <span className="text-xs text-on-surface-variant">
                                {article.readTime}
                            </span>
                        </div>
                        <h4 className="mb-2 text-base font-semibold leading-snug text-on-surface">
                            {article.title}
                        </h4>
                        <p className="mb-4 line-clamp-2 text-sm text-on-surface-variant">
                            {article.excerpt}
                        </p>
                        <div className="mt-auto flex items-center justify-between border-t border-outline-variant/30 pt-3">
                            <span className="text-xs text-on-surface-variant">
                                {article.date}
                            </span>
                            <span className="text-sm font-semibold text-secondary">
                                Read More →
                            </span>
                        </div>
                    </div>
                </div>
            </Card>
        </Link>
    );
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function BlogServicesPage() {
    const [email, setEmail] = useState("");
    const [subscribed, setSubscribed] = useState(false);

    const handleSubscribe = () => {
        if (email) setSubscribed(true);
    };

    return (
        <div className="min-h-screen bg-surface text-on-surface">
            {/* Google Material Symbols font */}
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


            {/* ── Hero ── */}
            <section className="relative overflow-hidden bg-surface-container-lowest py-20">
                <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_80%_50%_at_50%_-20%,rgba(86,94,116,0.08),transparent)]" />
                <div className="mx-auto max-w-7xl px-4 text-center md:px-16">
                    <Chip
                        size="sm"
                        className="mb-4 bg-secondary-container text-on-secondary-container font-semibold uppercase tracking-wider"
                    >
                        RentNest Platform
                    </Chip>
                    <h1 className="mb-4 text-5xl font-bold tracking-tight text-on-surface md:text-6xl">
                        Elevate Your Living
                        <span className="text-secondary"> Experience</span>
                    </h1>
                    <p className="mx-auto max-w-2xl text-lg text-on-surface-variant">
                        Discover professional property management services and expert
                        insights tailored for the modern rental market.
                    </p>
                    <div className="mt-8 flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
                        <Button
                            size="lg"
                            className="bg-secondary text-on-secondary font-semibold"
                            as={Link}
                            href="#services"
                        >
                            Explore Services
                        </Button>
                        <Button
                            size="lg"
                            variant="bordered"
                            className="border-outline-variant text-on-surface"
                            as={Link}
                            href="#blog"
                        >
                            Read the Blog
                        </Button>
                    </div>
                </div>
            </section>

            {/* ── Services ── */}
            <section id="services" className="py-20 px-4 md:px-16 bg-surface">
                <div className="mx-auto max-w-7xl">
                    <div className="mb-12 flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
                        <div>
                            <span className="text-sm font-semibold uppercase tracking-wider text-secondary">
                                Our Expertise
                            </span>
                            <h2 className="mt-1 text-4xl font-bold text-on-surface">
                                Platform Services
                            </h2>
                        </div>
                        <p className="max-w-md text-base text-on-surface-variant">
                            End-to-end solutions designed to make property rental seamless,
                            secure, and stress-free for both parties.
                        </p>
                    </div>
                    <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
                        {SERVICES.map((service) => (
                            <ServiceCard key={service.id} service={service} />
                        ))}
                    </div>

                    {/* Stats bar */}
                    <div className="mt-12 grid grid-cols-2 gap-4 rounded-2xl bg-inverse-surface p-8 text-white md:grid-cols-4">
                        {[
                            { value: "12,000+", label: "Properties Listed" },
                            { value: "98%", label: "Tenant Satisfaction" },
                            { value: "£2.4B", label: "Rent Processed" },
                            { value: "24/7", label: "Support Coverage" },
                        ].map(({ value, label }) => (
                            <div key={label} className="text-center">
                                <div className="text-3xl font-bold text-secondary-fixed-dim">
                                    {value}
                                </div>
                                <div className="mt-1 text-sm text-white/60">{label}</div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ── Blog ── */}
            <section
                id="blog"
                className="py-20 px-4 md:px-16 bg-surface-container-lowest"
            >
                <div className="mx-auto max-w-7xl">
                    <div className="mb-12 flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
                        <div>
                            <span className="text-sm font-semibold uppercase tracking-wider text-secondary">
                                Insights &amp; News
                            </span>
                            <h2 className="mt-1 text-4xl font-bold text-on-surface">
                                The RentNest Blog
                            </h2>
                        </div>
                        <Button
                            variant="light"
                            className="hidden text-secondary font-semibold md:flex"
                            endContent={
                                <span className="material-symbols-outlined text-base">
                                    arrow_right_alt
                                </span>
                            }
                        >
                            View All Articles
                        </Button>
                    </div>

                    {/* Featured Post */}
                    <div className="mb-8 grid grid-cols-1 gap-6 lg:grid-cols-12">
                        <Link
                            href={`/blog/${FEATURED_POST.id}`}
                            className="group lg:col-span-8"
                        >
                            <Card className="h-full overflow-hidden border-0 shadow-md">
                                <div className="p-0">
                                    <div className="relative h-80 lg:h-full min-h-[20rem]">
                                        <img
                                            src={FEATURED_POST.image}
                                            alt={FEATURED_POST.title}
                                            className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                                        />
                                        <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-transparent" />
                                        <div className="absolute bottom-0 left-0 p-8 text-white">
                                            <Chip
                                                size="sm"
                                                className="mb-4 bg-secondary text-white font-semibold uppercase"
                                            >
                                                {FEATURED_POST.category}
                                            </Chip>
                                            <h3 className="mb-2 text-3xl font-bold leading-tight max-w-xl">
                                                {FEATURED_POST.title}
                                            </h3>
                                            <p className="mb-4 max-w-lg text-sm opacity-80">
                                                {FEATURED_POST.excerpt}
                                            </p>
                                            <div className="flex items-center gap-4">
                                                <Button
                                                    size="sm"
                                                    className="bg-white text-primary font-semibold"
                                                >
                                                    Read Article
                                                </Button>
                                                <span className="text-xs opacity-60">
                                                    {FEATURED_POST.readTime} · {FEATURED_POST.date}
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </Card>
                        </Link>

                        {/* Newsletter */}
                        <div className="lg:col-span-4">
                            <Card className="h-full border border-outline-variant/20 bg-surface-container-high shadow-sm">
                                <div className="flex flex-col justify-center p-8">
                                    <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-xl bg-secondary-container">
                                        <span
                                            className="material-symbols-outlined text-on-secondary-container"
                                            style={{ fontVariationSettings: "'FILL' 1" }}
                                        >
                                            mail
                                        </span>
                                    </div>
                                    <h4 className="mb-1 text-lg font-semibold text-on-surface">
                                        Weekly Newsletter
                                    </h4>
                                    <p className="mb-5 text-sm text-on-surface-variant">
                                        Get the latest rental tips and property news delivered
                                        straight to your inbox every week.
                                    </p>
                                    {subscribed ? (
                                        <div className="rounded-lg bg-secondary-container p-3 text-center text-sm font-medium text-on-secondary-container">
                                            ✓ You're subscribed!
                                        </div>
                                    ) : (
                                        <div className="flex gap-2">
                                            <Input
                                                type="email"
                                                placeholder="your@email.com"
                                                value={email}
                                                onValueChange={setEmail}
                                                size="sm"
                                                variant="bordered"
                                                classNames={{
                                                    input: "text-sm",
                                                    inputWrapper:
                                                        "border-outline-variant bg-surface-container-lowest",
                                                }}
                                            />
                                            <Button
                                                size="sm"
                                                className="shrink-0 bg-primary text-on-primary font-semibold"
                                                onPress={handleSubscribe}
                                            >
                                                Join
                                            </Button>
                                        </div>
                                    )}

                                    {/* Mini stats */}
                                    <div className="mt-6 border-t border-outline-variant/30 pt-5">
                                        <p className="mb-3 text-xs font-semibold uppercase tracking-wider text-on-surface-variant">
                                            Trending Topics
                                        </p>
                                        <div className="flex flex-wrap gap-2">
                                            {[
                                                "Market Trends",
                                                "Tenant Rights",
                                                "Smart Homes",
                                                "Investment",
                                            ].map((tag) => (
                                                <Chip
                                                    key={tag}
                                                    size="sm"
                                                    variant="flat"
                                                    className="cursor-pointer bg-surface-container text-on-surface-variant hover:bg-secondary-container hover:text-on-secondary-container transition-colors text-xs"
                                                >
                                                    {tag}
                                                </Chip>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </Card>
                        </div>
                    </div>

                    {/* Article Grid */}
                    <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
                        {ARTICLES.map((article) => (
                            <ArticleCard key={article.id} article={article} />
                        ))}
                    </div>

                    <div className="mt-10 text-center">
                        <Button
                            size="lg"
                            variant="flat"
                            className="bg-surface-container-high text-on-surface font-semibold"
                        >
                            Load More Articles
                        </Button>
                    </div>
                </div>
            </section>

            {/* ── CTA ── */}
            <section className="bg-inverse-surface py-20 px-4 md:px-16 text-white">
                <div className="mx-auto max-w-3xl text-center">
                    <h2 className="mb-4 text-4xl font-bold md:text-5xl">
                        Ready to Simplify Your Rental Journey?
                    </h2>
                    <p className="mb-8 text-lg opacity-75">
                        Whether you're looking for your next home or managing a portfolio,
                        RentNest provides the tools you need to succeed.
                    </p>
                    <div className="flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
                        <Button
                            size="lg"
                            className="bg-secondary text-on-secondary font-bold shadow-lg"
                        >
                            Get Started Now
                        </Button>
                        <Button
                            size="lg"
                            variant="bordered"
                            className="border-white/30 text-white hover:bg-white/10"
                        >
                            Request a Demo
                        </Button>
                    </div>
                </div>
            </section>


        </div>
    );
}