// app/components/dashboard/BookingsTable.jsx
const paymentStyles = {
    Paid: "bg-secondary-container/30 text-on-secondary-container",
    Pending: "bg-error-container/30 text-on-error-container",
};

const statusStyles = {
    Confirmed: "bg-primary-fixed/50 text-on-primary-fixed",
    "In Review": "bg-surface-container-high text-on-surface-variant",
    Active: "bg-primary-fixed/50 text-on-primary-fixed",
};

export default function BookingsTable({ bookings = [], fullPage = false }) {
    return (
        <div className="space-y-4">
            <div className="flex justify-between items-center">
                <h3 className="text-lg font-semibold text-on-surface">
                    {fullPage ? "All Bookings" : "Recent Bookings"}
                </h3>
                {!fullPage && (
                    <span className="text-secondary text-sm font-semibold">{bookings.length} total</span>
                )}
            </div>

            <div className="bg-white rounded-xl shadow-[0px_4px_12px_rgba(15,23,42,0.08)] overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                        <thead className="bg-surface-container-low border-b border-outline-variant/30">
                            <tr>
                                {["User Name", "Email", "Price", "Payment", "Status"].map((col) => (
                                    <th key={col} className="px-6 py-4 text-xs font-semibold text-on-surface-variant uppercase tracking-wider">
                                        {col}
                                    </th>
                                ))}
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-outline-variant/20">
                            {bookings.map((row, i) => (
                                <tr key={i} className="hover:bg-surface-container-low/50 transition-colors">
                                    <td className="px-6 py-4 text-sm font-medium text-on-surface">{row.name}</td>
                                    <td className="px-6 py-4 text-sm text-on-surface-variant">{row.email}</td>
                                    <td className="px-6 py-4 text-sm font-bold text-on-surface">{row.price}</td>
                                    <td className="px-6 py-4">
                                        <span className={`${paymentStyles[row.payment] ?? ""} px-3 py-1 rounded-full text-xs font-bold`}>
                                            {row.payment}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4">
                                        <span className={`${statusStyles[row.status] ?? ""} px-3 py-1 rounded-full text-xs font-bold`}>
                                            {row.status}
                                        </span>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}