// app/components/dashboard/RecentActivity.jsx
const typeStyles = {
    booking: { dot: "bg-secondary", ring: "ring-secondary-container/30" },
    favorite: { dot: "bg-primary", ring: "ring-primary-fixed" },
    profile: { dot: "bg-tertiary-container", ring: "ring-tertiary-fixed" },
};

export default function RecentActivity({ activities = [] }) {
    return (
        <div className="space-y-4">
            <h3 className="text-lg font-semibold text-on-surface">Recent Activity</h3>
            <div className="bg-white p-6 rounded-xl shadow-[0px_4px_12px_rgba(15,23,42,0.08)] space-y-6">
                {activities.map((a, i) => {
                    const style = typeStyles[a.type] ?? typeStyles.profile;
                    const showLine = i < activities.length - 1;
                    return (
                        <div key={i} className="flex gap-4">
                            <div className="relative flex-shrink-0">
                                <div className={`w-2 h-2 rounded-full ${style.dot} ring-4 ${style.ring} mt-2`} />
                                {showLine && (
                                    <div className="absolute top-4 left-[3px] w-[1px] h-12 bg-outline-variant/30" />
                                )}
                            </div>
                            <div>
                                <p className="text-sm text-on-surface">{a.text}</p>
                                <p className="text-xs text-on-surface-variant mt-0.5">{a.time}</p>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}