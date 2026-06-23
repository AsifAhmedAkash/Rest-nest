// app/components/dashboard/DashboardTopBar.jsx
export default function DashboardTopBar({ title, user }) {
    return (
        <header className="sticky top-0 z-30 bg-white/80 backdrop-blur-md border-b border-outline-variant/30 px-4 md:px-10 py-4 flex justify-between items-center">
            <h1 className="text-lg font-bold text-on-surface">{title}</h1>
            <div className="flex items-center gap-3">
                <button className="p-2 rounded-full hover:bg-surface-container-high transition-colors relative">
                    <span className="material-symbols-outlined text-on-surface-variant">notifications</span>
                </button>
                <div className="w-8 h-8 rounded-full bg-secondary-container overflow-hidden">
                    {user?.image ? (
                        <img src={user.image} alt="avatar" className="w-full h-full object-cover" />
                    ) : (
                        <div className="w-full h-full flex items-center justify-center text-xs font-bold text-on-secondary-container">
                            {user?.name?.[0] ?? "?"}
                        </div>
                    )}
                </div>
            </div>
        </header>
    );
}