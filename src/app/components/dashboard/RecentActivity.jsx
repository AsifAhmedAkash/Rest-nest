const activities = [
    {
        text: "Booked a 2-bedroom apartment in Dhaka",
        time: "2 hours ago",
        dotColor: "bg-secondary",
        ringColor: "ring-secondary-container/30",
        showLine: true,
    },
    {
        text: "Added 'Skyline Villa' to Favorites",
        time: "Yesterday",
        dotColor: "bg-primary",
        ringColor: "ring-primary-fixed",
        showLine: true,
    },
    {
        text: "Updated Profile Information",
        time: "3 days ago",
        dotColor: "bg-tertiary-container",
        ringColor: "ring-tertiary-fixed",
        showLine: false,
    },
];

export default function RecentActivity() {
    return (
        <div className="space-y-6">
            <h3 className="text-xl font-semibold text-on-surface">Recent Activity</h3>

            <div className="bg-white p-6 rounded-xl shadow-[0px_4px_12px_rgba(15,23,42,0.08)] space-y-6">
                {activities.map((a, i) => (
                    <div key={i} className="flex gap-4">
                        <div className="relative flex-shrink-0">
                            <div
                                className={`w-2 h-2 rounded-full ${a.dotColor} ring-4 ${a.ringColor} mt-2`}
                            />
                            {a.showLine && (
                                <div className="absolute top-4 left-[3px] w-[1px] h-12 bg-outline-variant/30" />
                            )}
                        </div>
                        <div>
                            <p className="text-sm text-on-surface">{a.text}</p>
                            <p className="text-xs text-on-surface-variant mt-0.5">{a.time}</p>
                        </div>
                    </div>
                ))}

                <button className="w-full py-2 text-sm font-semibold text-secondary border border-secondary rounded-lg hover:bg-secondary/5 transition-colors">
                    View Full Log
                </button>
            </div>
        </div>
    );
}