const bookings = [
    { name: "Sarah Khan", email: "sarah.k@example.com", property: "Urban Loft Metropolis", price: "$1,250", payment: "Paid", status: "Confirmed", date: "Jun 1, 2025" },
    { name: "James Hossain", email: "james.h@example.com", property: "Minimalist Studio", price: "$850", payment: "Pending", status: "In Review", date: "Jun 8, 2025" },
    { name: "Maria Chen", email: "maria.c@example.com", property: "Skyline Vista Penthouse", price: "$2,400", payment: "Paid", status: "Active", date: "May 20, 2025" },
    { name: "Alex Rahim", email: "alex.r@example.com", property: "Garden Family Home", price: "$3,800", payment: "Paid", status: "Confirmed", date: "Apr 15, 2025" },
];

const paymentStyle = {
    Paid: "bg-secondary-container/40 text-on-secondary-container",
    Pending: "bg-error-container/40 text-on-error-container",
};
const statusStyle = {
    Confirmed: "bg-primary-fixed/60 text-on-primary-fixed",
    "In Review": "bg-surface-container-high text-on-surface-variant",
    Active: "bg-primary-fixed/60 text-on-primary-fixed",
};

export default function MyBookings() {
    return (
        <div className="space-y-6">
            <div>
                <h2 className="text-2xl font-bold text-on-surface">My Bookings</h2>
                <p className="text-sm text-on-surface-variant mt-1">{bookings.length} bookings total</p>
            </div>

            <div className="bg-white rounded-xl shadow-sm border border-outline-variant/20 overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-left">
                        <thead className="bg-surface-container-low border-b border-outline-variant/20">
                            <tr>
                                {["Name", "Property", "Date", "Price", "Payment", "Status"].map((col) => (
                                    <th key={col} className="px-5 py-3.5 text-xs font-semibold text-on-surface-variant uppercase tracking-wide">{col}</th>
                                ))}
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-outline-variant/20">
                            {bookings.map((row, i) => (
                                <tr key={i} className="hover:bg-surface-container-low/50 transition-colors">
                                    <td className="px-5 py-4">
                                        <p className="text-sm font-medium text-on-surface">{row.name}</p>
                                        <p className="text-xs text-on-surface-variant">{row.email}</p>
                                    </td>
                                    <td className="px-5 py-4 text-sm text-on-surface">{row.property}</td>
                                    <td className="px-5 py-4 text-sm text-on-surface-variant">{row.date}</td>
                                    <td className="px-5 py-4 text-sm font-bold text-on-surface">{row.price}</td>
                                    <td className="px-5 py-4">
                                        <span className={`${paymentStyle[row.payment]} px-2.5 py-1 rounded-full text-xs font-bold`}>{row.payment}</span>
                                    </td>
                                    <td className="px-5 py-4">
                                        <span className={`${statusStyle[row.status]} px-2.5 py-1 rounded-full text-xs font-bold`}>{row.status}</span>
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