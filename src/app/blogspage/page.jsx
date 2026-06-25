"use client";

import Link from "next/link";
import { useState } from "react";
import { Button, Card, Input, Chip } from "@heroui/react";

const SERVICES = [
    { id: 1, icon: "verified_user", title: "Tenant Verification", description: "Comprehensive background checks and credit screening to ensure high-quality placements and peace of mind for every landlord.", tag: "Most Popular" },
    { id: 2, icon: "payments", title: "Secure Payments", description: "Automated, encrypted rent collection and financial reporting that ensures funds are handled with institutional-grade security.", tag: null },
    { id: 3, icon: "home_work", title: "Property Management", description: "A digital-first dashboard for managing maintenance requests, inspections, and lease renewals with zero friction.", tag: null },
    { id: 4, icon: "support_agent", title: "24/7 Support", description: "Always-on customer service and emergency response coordination, ensuring assistance is available the moment it is needed.", tag: null },
];

const FEATURED_POST = {
    id: "urban-rental-investments-2024", category: "Market Trends", title: "The 2024 Guide to Urban Rental Investments",
    excerpt: "Deep dive into the fastest-growing urban markets and how digital infrastructure is changing tenant expectations forever.",
    readTime: "12 min read", date: "Jun 14, 2024",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuCNTYebFsqpS_53DpSB4Cg-xw35S9WGnG4ZGv0b7pjsxmiX5NBX4x0aZiOqpbP6M2a6zvPqaOl0m2tuocSZCT7oJBp0g_P3I-h7i1UGdIYmJm_HXSs5mZT72r7yrld6HpMkKWmFQ4faAjZUWcx1uGFIfMtG_hg9bjSHhkre9hg-K0IaI-JdY30jHSQ_lb14LRGNy8-iFprn1f1U4yvi9l6ee_EPiuaNLXFSClBxkv8igMDAheHODVDg8c39CPi8UkxnIwFi9DSTB-1R",
};

const ARTICLES = [
    { id: "security-deposit-return", category: "Tenant Advice", title: "Maximizing Your Security Deposit Return", excerpt: "Everything you need to know about the move-out process, from documentation to deep cleaning checklists.", readTime: "5 min read", date: "Jun 8, 2024", image: "https://lh3.googleusercontent.com/aida-public/AB6AXuBuV7aep1X3KLobFx3Th4-KXdwsW0CaQZHXkJa37R79C3ZXPvqg54XVjFZi74wDwUtwQi6CA7GAFZTpLVri-fyO9l1zu8eZeE-ZbXYc71_YJ5J7UprIlmOZRPTTAjsBzugP7jnAYkh6xXEvNvIngEBsjV9nfgGIeqMWAg236lIKbQM6V2hRMpx2elrj-1_AmEIKLkPvMBW0lkOGBKYAyeM-ZEjnGcg1HActIx0zAhgsUWExniqzEgJzeeVcdCk9iVG7O6ykPFsp2KbC" },
    { id: "workspace-solutions-rentals", category: "Interior Design", title: "Modern Workspace Solutions for Rentals", excerpt: "Create a productive home office without permanent modifications. Explore ergonomic furniture and smart lighting.", readTime: "8 min read", date: "Jun 3, 2024", image: "https://lh3.googleusercontent.com/aida-public/AB6AXuCleIAFC62JMFP9HFxpAFPlGjRLvDWlZCQErUMWZcIYjrUReMYtSSIcjVTtXkr2sOJrfh8TAaSq2h2n35MgBFgPZok8mTcm7hOdKdmq-DoPPF4lxOhtkqC7DeVIrNMYVEls3we7oLiLqVWOpb57AXJ2R7iMwCkaJkBoeTocC3Xw0dRXV9K3exhlkpq-TXBKGD6tD9KYkAvPYGxy8h9Z-GszX8GjKRUEknRnyN49p5uYC-chH5pfBe0GXze-eu1EvS3SlR8mWzRiyQye" },
    { id: "automating-rental-cash-flow", category: "Landlord Tips", title: "Automating Your Rental Cash Flow", excerpt: "Discover how the latest RentNest features help landlords maintain 100% payment on-time records through smart automation.", readTime: "6 min read", date: "May 28, 2024", image: "https://lh3.googleusercontent.com/aida-public/AB6AXuALQD_mvFFqEFGBzZfHXJXZ39m5GkqpB789YavYt-gZILeWkSJe-Pymk1H-fawwngvA1rSyz7tMOgkRsQxSo8RaVdt0FfEyE6mDzx1_zJ5ms7Yn_WvMfY1YkAepLnf3Jz5Zganx9C1ctmoNoTp53OIez8bFKNzgWvz8T3befajBAKjMTSPnBS9UsjugVSOq_Qm0PuG93b5cAOtL12K83rF1PUeKIFNg0Y08Zr0No6XLf1m1pLGl6bLQxQMDpI_Tml55uzZJi302teeh" },
];

const CATEGORY_COLORS = { "Market Trends": "success", "Tenant Advice": "primary", "Interior Design": "secondary", "Landlord Tips": "warning" };

function ServiceCard({ service }) {
    return (
        <Card className="group border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-800 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg" >
            <div className="p-6">
                {service.tag && (
                    <Chip size="sm" className="mb-3 bg-emerald-100  dark:bg-emerald-900 text-emerald-700 dark:text-emerald-300 font-semibold">{service.tag}</Chip>
                )}
                <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-xl bg-emerald-100 dark:bg-emerald-900">
                    <span className="material-symbols-outlined text-emerald-600 dark:text-emerald-400" style={{ fontVariationSettings: "'FILL' 1" }}>{service.icon}</span>
                </div>
                <h3 className="mb-2 text-lg font-semibold text-zinc-500 ">{service.title}</h3>
                <p className="text-sm leading-relaxed text-zinc-500 dark:text-zinc-400">{service.description}</p>
                <div className="mt-5 flex items-center gap-1 text-sm font-semibold text-emerald-600 opacity-0 transition-opacity duration-200 group-hover:opacity-100">
                    Learn more <span className="material-symbols-outlined text-base">arrow_right_alt</span>
                </div>
            </div>
        </Card>
    );
}

function ArticleCard({ article }) {
    return (
        <Link href={`/blog/${article.id}`} className="group block">
            <Card className="h-full border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-800 shadow-sm transition-all duration-300 hover:shadow-lg">
                <div className="p-0">
                    <div className="relative h-48 overflow-hidden rounded-t-xl">
                        <img src={article.image} alt={article.title} className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105" />
                    </div>
                    <div className="flex flex-col p-5">
                        <div className="mb-3 flex items-center gap-2">
                            <Chip size="sm" variant="flat" color={CATEGORY_COLORS[article.category] || "default"} className="text-xs font-semibold uppercase">{article.category}</Chip>
                            <span className="text-xs text-zinc-400">·</span>
                            <span className="text-xs text-zinc-500 dark:text-zinc-400">{article.readTime}</span>
                        </div>
                        <h4 className="mb-2 text-base font-semibold leading-snug text-zinc-500">{article.title}</h4>
                        <p className="mb-4 line-clamp-2 text-sm text-zinc-500 dark:text-zinc-400">{article.excerpt}</p>
                        <div className="mt-auto flex items-center justify-between border-t border-zinc-100 dark:border-zinc-700 pt-3">
                            <span className="text-xs text-zinc-500 dark:text-zinc-400">{article.date}</span>
                            <span className="text-sm font-semibold text-emerald-600 dark:text-emerald-400">Read More →</span>
                        </div>
                    </div>
                </div>
            </Card>
        </Link>
    );
}

export default function BlogServicesPage() {
    const [email, setEmail] = useState("");
    const [subscribed, setSubscribed] = useState(false);
    const handleSubscribe = () => { if (email) setSubscribed(true); };

    return (
        <div className="min-h-screen bg-white dark:bg-zinc-900 text-zinc-900 dark:text-zinc-100">
            <style>{`
                @import url('https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200&display=swap');
                .material-symbols-outlined { font-family: 'Material Symbols Outlined'; font-style: normal; font-size: 24px; line-height: 1; letter-spacing: normal; text-transform: none; display: inline-block; white-space: nowrap; word-wrap: normal; direction: ltr; }
            `}</style>

            {/* Hero */}
            <section className="relative overflow-hidden bg-white dark:bg-zinc-950 py-20">
                <div className="mx-auto max-w-7xl px-4 text-center md:px-16">
                    <Chip size="sm" className="mb-4 bg-emerald-100 dark:bg-emerald-900 text-emerald-700 dark:text-emerald-300 font-semibold uppercase tracking-wider">RentNest Platform</Chip>
                    <h1 className="mb-4 text-5xl font-bold tracking-tight text-zinc-900 dark:text-white md:text-6xl">
                        Elevate Your Living <span className="text-emerald-600 dark:text-emerald-400">Experience</span>
                    </h1>
                    <p className="mx-auto max-w-2xl text-lg text-zinc-500 dark:text-zinc-400">
                        Discover professional property management services and expert insights tailored for the modern rental market.
                    </p>
                    <div className="mt-8 flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
                        <Button size="lg" className="bg-emerald-600 text-white font-semibold" as={Link} href="#services">Explore Services</Button>
                        <Button size="lg" variant="bordered" className="border-zinc-300 dark:border-zinc-600 text-zinc-900 dark:text-zinc-100" as={Link} href="#blog">Read the Blog</Button>
                    </div>
                </div>
            </section>

            {/* Services */}
            <section id="services" className="py-20 px-4 md:px-16 bg-white dark:bg-zinc-900">
                <div className="mx-auto max-w-7xl">
                    <div className="mb-12 flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
                        <div>
                            <span className="text-sm font-semibold uppercase tracking-wider text-emerald-600 dark:text-emerald-400">Our Expertise</span>
                            <h2 className="mt-1 text-4xl font-bold text-zinc-900 dark:text-zinc-100">Platform Services</h2>
                        </div>
                        <p className="max-w-md text-base text-zinc-500 dark:text-zinc-400">End-to-end solutions designed to make property rental seamless, secure, and stress-free.</p>
                    </div>
                    <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
                        {SERVICES.map((service) => <ServiceCard key={service.id} service={service} />)}
                    </div>

                    {/* Stats bar */}
                    <div className="mt-12 grid grid-cols-2 gap-4 rounded-2xl bg-zinc-900 dark:bg-zinc-800 p-8 text-white md:grid-cols-4">
                        {[
                            { value: "12,000+", label: "Properties Listed" },
                            { value: "98%", label: "Tenant Satisfaction" },
                            { value: "£2.4B", label: "Rent Processed" },
                            { value: "24/7", label: "Support Coverage" },
                        ].map(({ value, label }) => (
                            <div key={label} className="text-center">
                                <div className="text-3xl font-bold text-emerald-400">{value}</div>
                                <div className="mt-1 text-sm text-white/60">{label}</div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Blog */}
            <section id="blog" className="py-20 px-4 md:px-16 bg-zinc-50 dark:bg-zinc-950">
                <div className="mx-auto max-w-7xl">
                    <div className="mb-12 flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
                        <div>
                            <span className="text-sm font-semibold uppercase tracking-wider text-emerald-600 dark:text-emerald-400">Insights &amp; News</span>
                            <h2 className="mt-1 text-4xl font-bold text-zinc-900 dark:text-zinc-100">The RentNest Blog</h2>
                        </div>
                        <Button variant="light" className="hidden text-emerald-600 dark:text-emerald-400 font-semibold md:flex" endContent={<span className="material-symbols-outlined text-base">arrow_right_alt</span>}>
                            View All Articles
                        </Button>
                    </div>

                    {/* Featured Post + Newsletter */}
                    <div className="mb-8 grid grid-cols-1 gap-6 lg:grid-cols-12">
                        <Link href={`/blogspage/1`} className="group lg:col-span-8">
                            <Card className="h-full overflow-hidden border-0 shadow-md">
                                <div className="p-0">
                                    <div className="relative h-80 lg:h-full min-h-[20rem]">
                                        <img src={FEATURED_POST.image} alt={FEATURED_POST.title} className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105" />
                                        <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-transparent" />
                                        <div className="absolute bottom-0 left-0 p-8 text-white">
                                            <Chip size="sm" className="mb-4 bg-emerald-600 text-white font-semibold uppercase">{FEATURED_POST.category}</Chip>
                                            <h3 className="mb-2 text-3xl font-bold leading-tight max-w-xl">{FEATURED_POST.title}</h3>
                                            <p className="mb-4 max-w-lg text-sm opacity-80">{FEATURED_POST.excerpt}</p>
                                            <div className="flex items-center gap-4">
                                                <Button size="sm" className="bg-white text-zinc-900 font-semibold">Read Article</Button>
                                                <span className="text-xs opacity-60">{FEATURED_POST.readTime} · {FEATURED_POST.date}</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </Card>
                        </Link>

                        {/* Newsletter */}
                        <div className="lg:col-span-4">
                            <Card className="h-full border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-800 shadow-sm">
                                <div className="flex flex-col justify-center p-8">
                                    <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-100 dark:bg-emerald-900">
                                        <span className="material-symbols-outlined text-emerald-600 dark:text-emerald-400" style={{ fontVariationSettings: "'FILL' 1" }}>mail</span>
                                    </div>
                                    <h4 className="mb-1 text-lg font-semibold text-zinc-500 ">Weekly Newsletter</h4>
                                    <p className="mb-5 text-sm text-zinc-500 dark:text-zinc-400">Get the latest rental tips and property news delivered straight to your inbox every week.</p>
                                    {subscribed ? (
                                        <div className="rounded-lg bg-emerald-100 dark:bg-emerald-900 p-3 text-center text-sm font-medium text-emerald-700 dark:text-emerald-300">✓ Youre subscribed!</div>
                                    ) : (
                                        <div className="flex gap-2">
                                            <Input type="email" placeholder="your@email.com" value={email} onChange={setEmail} size="sm" variant="bordered"
                                                classNames={{ input: "text-sm dark:text-zinc-100", inputWrapper: "border-zinc-300 dark:border-zinc-600 bg-white dark:bg-zinc-900" }} />
                                            <Button size="sm" className="shrink-0 bg-emerald-600 text-white font-semibold" onPress={handleSubscribe}>Join</Button>
                                        </div>
                                    )}
                                    <div className="mt-6 border-t border-zinc-200 dark:border-zinc-700 pt-5">
                                        <p className="mb-3 text-xs font-semibold uppercase tracking-wider text-zinc-500 dark:text-zinc-400">Trending Topics</p>
                                        <div className="flex flex-wrap gap-2">
                                            {["Market Trends", "Tenant Rights", "Smart Homes", "Investment"].map((tag) => (
                                                <Chip key={tag} size="sm" variant="flat" className="cursor-pointer bg-zinc-100 dark:bg-zinc-700 text-zinc-600 dark:text-zinc-300 hover:bg-emerald-100 dark:hover:bg-emerald-900 hover:text-emerald-700 dark:hover:text-emerald-300 transition-colors text-xs">{tag}</Chip>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </Card>
                        </div>
                    </div>

                    {/* Article Grid */}
                    <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
                        {ARTICLES.map((article) => <ArticleCard key={article.id} article={article} />)}
                    </div>

                    <div className="mt-10 text-center">
                        <Button size="lg" variant="flat" className="bg-zinc-100 dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100 font-semibold">Load More Articles</Button>
                    </div>
                </div>
            </section>

            {/* CTA */}
            <section className="bg-zinc-900 dark:bg-zinc-950 py-20 px-4 md:px-16 text-white">
                <div className="mx-auto max-w-3xl text-center">
                    <h2 className="mb-4 text-4xl font-bold md:text-5xl">Ready to Simplify Your Rental Journey?</h2>
                    <p className="mb-8 text-lg opacity-75">Whether youre looking for your next home or managing a portfolio, RentNest provides the tools you need to succeed.</p>
                    <div className="flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
                        <Button size="lg" className="bg-emerald-600 text-white font-bold shadow-lg">Get Started Now</Button>
                        <Button size="lg" variant="bordered" className="border-white/30 text-white hover:bg-white/10">Request a Demo</Button>
                    </div>
                </div>
            </section>
        </div>
    );
}