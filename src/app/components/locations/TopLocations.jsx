const locations = [
    { name: "London", image: "https://lh3.googleusercontent.com/aida-public/AB6AXuBglhSyX9eL3H-U2917WUVzkDd1Z5wI-U33wOvYFT58-238roGkdBZ-m8QwKWWfb67LmyCVLMq0fO-5Xv41CMWPDFovZRC_nLgLvj_c3q1TaBMQF8fzm7pL4ocL-6tFYdoUsbLe-s_uTjJYBKP_lWk4IJ7sNRg6EbLQ4PGBt1Teb8nlgJ9gWVpRFWv8fsmoTHFKdKKTBSErVFJcfSsRAwCOtPqjNFfiexTLxwRmMDiGi_VPd6CPVrnVrW3GCQAPsfgXtu16W77I46WQ" },
    { name: "New York", image: "https://lh3.googleusercontent.com/aida-public/AB6AXuCjNSwZJTw01KqdM7tXBz7EkYXym-7b1Oo-CmLPCoyE1x1NCOwUIwhRQ311nlaMshzShLS20JcW0FHKuNiFL-92LO1eWfPE1Gxi24dPDBCdmtddf027gG-Cdl5uvR6CGWw4ofEypJq5COGn0NAgnqzT1OxoBeOt37GWJ1JSBbV0-D6CmQwzXsZj0vuOfYN0slbH5Q9m7BSTgda8HJuWO5BZedakKbPmSsIAsfBbcMHSPhFai7O6_EABabNY1S0Y4jU6GptOJXz-WFy0" },
    { name: "Dubai", image: "https://lh3.googleusercontent.com/aida-public/AB6AXuCgOOxI-D6OgMLHWZejONk0cu0d1UxedDBNq31MlBLUBk8ySU5l_yqiUg9IWh4fu1RpSzSlQPPMIqYcxayXfZUMICkgI5FHYrGigpWE7NOImsAgg4tkMQrySOaLIs3hDD2AbEYgyyW3XlofRYUrKZODzdRBFHDDj8_UpQ5Nwj4bnyftvJAEJc62QOIDrOI1D5wYZqZP-OoyKY9tFmkJ2ff7JhHphlK47Rzp0DcpDbGT-NeNXgfZLSex4n4h5kE4y1JdKcMPs6crXyTm" },
    { name: "Paris", image: "https://lh3.googleusercontent.com/aida-public/AB6AXuDrFTZDEA7cxW77pRprvD490n4uLOLUro4qJy4JrmXCqODdNfg_zAqQHZ_3sHxNS7aGGjizF1JPzqPNER1isDDz06ySmqhI1JDjLo0G7cxMidHbiuyXDpU5Pv_6Ey26QBnx_ICE9A0XGeiGaGRJe1PK-Z0XhFYswy7syIYv6taUy04OuP4zxYbJZW1v7lY5cqP3ZnKiKigFvG0K72UkzRoEdtnRE5uceJDIXdQOCQkUqEF9U3YZ7soCohp70C66_UtJa0iop8uwnhEz" },
    { name: "Sydney", image: "https://lh3.googleusercontent.com/aida-public/AB6AXuDikbKgCVb_-GInuUXIRaTGijqzLEMe_757SA03o4BeSTjjpmuPRY_diUvCkSscxH56hadBkLMppAc_X1Zj3p0PnHk3BxXZGk1N0UpF7rZTlCq7e_uIn7dJuIeSNXikqk6Wwmf0hviSb5dwqCotDfajSExOYcrsnyIwWbrLEE7E-kPDrsE_xB1z5HTBDMp98tWDh_7XQhOgsexs4JgNJ0sSnp-TncBVtgQSgR3TXZJ_QSNKafxe_F33Of0qbR3oc-ckSs9o52b22oj7" },
];

export default function TopLocations() {
    return (
        <section className="py-20 px-4 md:px-16 bg-white dark:bg-zinc-900">
            <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
                <div>
                    <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-zinc-900 dark:text-zinc-100 mb-2">
                        Explore Top Locations
                    </h2>
                    <p className="text-zinc-500 dark:text-zinc-400 text-base">
                        Find properties in the most desirable neighborhoods.
                    </p>
                </div>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-5 gap-6">
                {locations.map((loc) => (
                    <div key={loc.name} className="flex flex-col items-center gap-4 group cursor-pointer">
                        <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-zinc-200 dark:border-zinc-700 group-hover:border-emerald-500 dark:group-hover:border-emerald-400 transition-all">
                            <div className="w-full h-full bg-cover bg-center" style={{ backgroundImage: `url('${loc.image}')` }} />
                        </div>
                        <span className="text-sm font-semibold text-zinc-900 dark:text-zinc-100 group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors">
                            {loc.name}
                        </span>
                    </div>
                ))}
            </div>
        </section>
    );
}