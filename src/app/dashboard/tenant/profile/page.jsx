const user = {
    name: "Sarah Rahman",
    email: "sarah.rahman@example.com",
    phone: "+880 1711-234567",
    location: "Gulshan, Dhaka",
    joined: "January 2024",
    role: "Tenant",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuASKbHwshi694KrrbLHo4osnuabLb0b6ypxyarkospKCxHHSXqG4AI8RI84DlwnpuG8i-Jpp234hqQnA49FZd3mSlBKvmvB1NL68eq68RJu1m3WSkcwY_ET7-rrUhwnj2gf4bulDnltOca14h9lvAyYkJv2wGJ53TeEoG88IDLQTrYPo2_tYgBLjMMiVVYixToJ0MZHpwhdKg3lFfvVkzt5459GgkLBjTX34l6yOBcNylgCaFIEmzGXKO4LTd6-ji_KjOGPOPZCCrbj",
};

const fields = [
    { label: "Full Name", value: user.name, icon: "person" },
    { label: "Email Address", value: user.email, icon: "mail" },
    { label: "Phone", value: user.phone, icon: "phone" },
    { label: "Location", value: user.location, icon: "location_on" },
    { label: "Member Since", value: user.joined, icon: "calendar_today" },
    { label: "Account Type", value: user.role, icon: "badge" },
];

export default function Profile() {
    return (
        <div className="max-w-2xl space-y-6">
            <div>
                <h2 className="text-2xl font-bold text-on-surface">Profile</h2>
                <p className="text-sm text-on-surface-variant mt-1">Your personal details and account information.</p>
            </div>

            {/* Avatar card */}
            <div className="bg-white rounded-xl shadow-sm border border-outline-variant/20 p-6 flex flex-col sm:flex-row items-center gap-5">
                <div className="w-20 h-20 rounded-full overflow-hidden ring-4 ring-secondary/20 flex-shrink-0">
                    <img src={user.image} alt={user.name} className="w-full h-full object-cover" />
                </div>
                <div>
                    <h3 className="text-xl font-bold text-on-surface">{user.name}</h3>
                    <p className="text-sm text-on-surface-variant">{user.email}</p>
                    <span className="inline-flex items-center gap-1 mt-2 bg-secondary-container/30 text-secondary text-xs font-semibold px-3 py-1 rounded-full">
                        <span className="material-symbols-outlined" style={{ fontSize: 13, fontVariationSettings: "'FILL' 1" }}>check_circle</span>
                        Profile Complete
                    </span>
                </div>
            </div>

            {/* Fields */}
            <div className="bg-white rounded-xl shadow-sm border border-outline-variant/20 divide-y divide-outline-variant/20">
                {fields.map(({ label, value, icon }) => (
                    <div key={label} className="flex items-center gap-4 px-6 py-4">
                        <span className="material-symbols-outlined text-outline flex-shrink-0">{icon}</span>
                        <div>
                            <p className="text-xs text-on-surface-variant">{label}</p>
                            <p className="text-sm font-semibold text-on-surface mt-0.5">{value ?? "—"}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}