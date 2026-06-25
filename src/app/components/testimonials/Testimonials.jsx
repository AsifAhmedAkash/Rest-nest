const testimonials = [
    { name: "Elena Fischer", role: "Tenant", rating: 5, quote: "Found my dream apartment in Berlin within 3 days. The verification process gave me so much peace of mind.", avatar: "https://lh3.googleusercontent.com/aida-public/AB6AXuCniKzO1v4X2K41BMy5G_vESGu664zRtUbwE1Ww4_NgKK8-bgvgzwY7RnPU2Drf3tAFztgdV0W--rUC821moBtK5iyZCM79t8H_B0P151EItgvrmnTI2JvF1CSK60mLv3jPn6rCttAjwxeiNVeBerkb7spSLCkC0bM9L06GD8j8G5gPKRjIaq3Vust2Z_FuCcTAK25D6bQ8v6nkJYZpsOU70bOYrjj2hNW9oDzePxMITK-Jcua-O_ZhbJjZPxlrNZquvf7Ng5VyXIZ2" },
    { name: "Mark Stevenson", role: "Property Owner", rating: 5, quote: "As a landlord, RentNest has revolutionized how I manage my properties. The tenant quality is consistently high.", avatar: "https://lh3.googleusercontent.com/aida-public/AB6AXuC85Ea-rXgAdsiqKK2yv3v8HxGvRa-y1fhPeWSMG50B_si9cPnSqsVbY7NnYf4YnbdF1uziMpgq23nB2yRn9L2di3BYJLb1ZK5f3HWeaQ3vik_vOJGwO5EtQFx8NfTk9Fx1Xq8kCQk2Dy7evr3S5kgO5bs5h2ZSKmtyNA-K5D3AXhnY5U4YHEz2S1P-x-oyZjuI3VIQe-6ccysotOq1-X6ijLsVDdfc_uN-EV45YyRpLl0kWbJulPkV9AZHNCRFHhaOSzkO7E-avvkx" },
    { name: "James Wu", role: "Tenant", rating: 5, quote: "The support team is incredible. They helped me navigate a complex lease agreement in hours.", avatar: "https://lh3.googleusercontent.com/aida-public/AB6AXuAIZXWYiwY3Imr8R-gvhxYso3S5A_oCcfx46wFQeCupTuGpTTP0koNzVmxt4CaSFANMMHdXCWqhmOhzWmxJNztlPMCq8qvscSREeFNziylLL_ciZgE-x7B6dFZpUOoh64KZ92kCmINjWjGNeEdfhbpY-FK_4CWlAG-HFbVULXsDGexiRwoAi5J0mIXYVoatAjx_RKH_tWASBUwLnlMoI6hBgU_Beb-9ADA1iGSd7XnYRzw9nVHK5F-_K2mHMRiKdpubcj38qPugIlD" },
    { name: "Sarah Connor", role: "Architect", rating: 4, quote: "Beautifully designed app. It makes browsing for a home feel like scrolling through a high-end magazine.", avatar: "https://lh3.googleusercontent.com/aida-public/AB6AXuBBkXoGXlrtCrqmtASvE48E1mJFgyjpSJRL9awSUSrWhpWsx5n4tB2LflAMWfbvkJBm8bKsYrdlM31pptFoQqBhNTdVEyKI9M4L6aTHmeeRbsTRmy-lYP4BeH5s2ZLtkW6aLivtiAjSG67ZRfJ7N_M4R2YOuD68M2r8R5bE0XEq69FGDnRFpHwhcELlg3bGR_UQpeqnjnhk4od09zOPdZSCsYEgY75ZD4oP-8hM7cIuS6Urc5V7m0V8r97As1b5ROEIPwdLUnEfME7y" },
];

function StarRating({ rating }) {
    return (
        <div className="flex text-emerald-400 mb-4">
            {Array.from({ length: 5 }).map((_, i) => (
                <span key={i} className="material-symbols-outlined" style={{ fontVariationSettings: `'FILL' ${i < rating ? 1 : 0}`, fontSize: 20 }}>
                    star
                </span>
            ))}
        </div>
    );
}

export default function Testimonials() {
    return (
        <section className="py-20 px-4 md:px-16 bg-zinc-50 dark:bg-zinc-950">
            <div className="max-w-7xl mx-auto">
                <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-zinc-900 dark:text-zinc-100 mb-12 text-center">
                    What Our Community Says
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                    {testimonials.map((t) => (
                        <div key={t.name} className="bg-white dark:bg-zinc-800 p-6 rounded-2xl shadow-sm border border-zinc-100 dark:border-zinc-700 flex flex-col">

                            <p className="text-zinc-500 dark:text-zinc-400 text-base mb-6 flex-1">{t.quote}</p>
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 rounded-full bg-cover bg-center flex-shrink-0" style={{ backgroundImage: `url('${t.avatar}')` }} />
                                <div>
                                    <p className="text-sm font-semibold text-zinc-900 dark:text-zinc-100">{t.name}</p>
                                    <p className="text-xs text-zinc-500 dark:text-zinc-400">{t.role}</p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}