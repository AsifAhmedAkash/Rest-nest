// app/components/dashboard/ProfileView.jsx
export default function ProfileView({ user }) {
    const fields = [
        { label: "Full Name", value: user.name, icon: "person" },
        { label: "Email Address", value: user.email, icon: "mail" },
        { label: "Phone", value: user.phone, icon: "phone" },
        { label: "Location", value: user.location, icon: "location_on" },
        { label: "Member Since", value: user.joinedDate, icon: "calendar_today" },
    ];

    return (
        <div className="max-w-2xl space-y-8">
            {/* Avatar section */}
            <div className="bg-white rounded-xl shadow-[0px_4px_12px_rgba(15,23,42,0.08)] p-8 flex flex-col sm:flex-row items-center gap-6">
                <div className="w-24 h-24 rounded-full bg-secondary-container overflow-hidden flex-shrink-0 ring-4 ring-secondary/20">
                    {user.image ? (
                        <img src={user.image} alt={user.name} className="w-full h-full object-cover" />
                    ) : (
                        <div className="w-full h-full flex items-center justify-center text-3xl font-bold text-on-secondary-container">
                            {user.name?.[0] ?? "?"}
                        </div>
                    )}
                </div>
                <div>
                    <h2 className="text-2xl font-bold text-on-surface">{user.name}</h2>
                    <p className="text-sm text-on-surface-variant mt-1">{user.email}</p>
                    <span className="inline-flex items-center gap-1 mt-3 bg-secondary-container/30 text-secondary text-xs font-semibold px-3 py-1 rounded-full">
                        <span className="material-symbols-outlined" style={{ fontSize: 14, fontVariationSettings: "'FILL' 1" }}>check_circle</span>
                        Profile Complete
                    </span>
                </div>
            </div>

            {/* Info fields */}
            <div className="bg-white rounded-xl shadow-[0px_4px_12px_rgba(15,23,42,0.08)] divide-y divide-outline-variant/20">
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