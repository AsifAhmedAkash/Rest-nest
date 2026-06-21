export default function DashboardTopBar() {
    return (
        <header className="sticky top-0 z-30 bg-white/80 backdrop-blur-md border-b border-outline-variant/30 px-4 md:px-16 py-4 flex justify-between items-center">
            <h1 className="text-xl font-bold text-on-surface">Dashboard</h1>
            <div className="flex items-center gap-4">
                <button className="p-2 rounded-full hover:bg-surface-variant/20 transition-colors">
                    <span className="material-symbols-outlined">notifications</span>
                </button>
                <div className="w-8 h-8 rounded-full bg-secondary-container" />
            </div>
        </header>
    );
}