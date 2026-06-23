
'use client'
import { getMyProperty } from '@/lib/api/property';
import React, { useEffect, useState } from 'react';
import { useSession } from "@/lib/auth-client";

const properties = [
    {
        title: "Skyline Penthouse",
        location: "Sonadanga R/A, Khulna",
        price: "৳45,000",
        rentType: "Monthly",
        type: "Apartment",
        status: "Approved",
        statusStyle: "bg-secondary-container/30 text-on-secondary-container",
        image: "https://lh3.googleusercontent.com/aida-public/AB6AXuBAPM_1ORDcnBM-zXSJ7GHkoghIqg6kz97LVULoSx0OmzPK_lf2XGRYiyCUP3debt3354vBQ6EwRlFdHw_HSaN0m3SjCcuSWbjPW5qc4cjNVcVNL5cAeIFSRbKBnVv8V8evutqRbY_ifofdD5w9rtwhjCBZ8WAirjOlQTOcw7Z6P-UNAT0jhfhIRVTMhMSTzIGQz2c1dJfwIZz-fROv0iCsBT6WOUFUTBDEL_b08T0QSYIDMnqOxF--lWi8p9ILb4W0aS9IltgKSY_P",
    },
    {
        title: "Green Valley Villa",
        location: "Khalishpur, Khulna",
        price: "৳120,000",
        rentType: "Monthly",
        type: "Villa",
        status: "Pending",
        statusStyle: "bg-tertiary-fixed text-on-tertiary-container",
        image: "https://lh3.googleusercontent.com/aida-public/AB6AXuBfPo4wVeLjtWJfnsiCjxZIM5j2Xrys5nAIxJ4Q4FyuJLdO7jWJQkR_uuR4WJIGnA0ZX6-fXUye04ykQ7X1C3aSPJIvt67KFEZj7aDHp1ZfStuenZVhiRb7PFwZjp_QyxkZmz_fX9liQ3KP_iVbXidkNqN-FQbj5ZXfvOFWr3yzM5w1BaQeR4YG1p5t7bJo7r-dE2oQhd0lDPIG97DByXNhdlvD1izLRq-ASTuJcrJW-MOhdIcYZZAvzW4MH9pmofI1q5F28_yRKFeO",
    },
    {
        title: "Royal Studio Space",
        location: "Mujgunni R/A, Khulna",
        price: "৳32,000",
        rentType: "Monthly",
        type: "Commercial",
        status: "Approved",
        statusStyle: "bg-secondary-container/30 text-on-secondary-container",
        image: "https://lh3.googleusercontent.com/aida-public/AB6AXuCYPfPXxdNbcCOumOaK_CkLc0NVejrstBd0kmQQQqVCwcnBDk0i-llKa8VtmRhLzOGITwY1-M5Gr4nASdUOmn4ouW1lUbgnof-KwRBiTLCVE3PFQmI3GZoQ3Cze3xFN4f-kbeo-7UVcBvl6KtxY4gDfdhDX4Kh5wBHyoULhQdx2im_IeCTBgjGkkTGQkD-QXsFnEp3U3S-yLoGgtfD91P4l1lLtoqDbStdPWca8ulc2-lYP83ZCoJFgOTC2X4zWMoJ-yeo2029DdWoW",
    },
];

const MyPropertyPage = () => {
    const { data: session } = useSession();
    const [properties, setProperties] = useState([]);

    useEffect(() => {
        if (session?.user?.id) {
            getMyProperty(session.user.id).then(data => setProperties(data));
        }
    }, [session]);

    return (
        <div>
            <div className="lg:col-span-2 space-y-6">
                <div className="flex items-center justify-between">
                    <h3 className="text-xl font-semibold text-on-surface dark:text-white">My Properties</h3>
                    <div className="flex gap-2">
                        {/* <button className="p-2 border border-outline-variant dark:border-zinc-700 rounded-lg hover:bg-surface-container-high dark:hover:bg-zinc-800 transition-colors">
                            <span className="material-symbols-outlined">filter_list</span>
                        </button>
                        <button className="p-2 border border-outline-variant dark:border-zinc-700 rounded-lg hover:bg-surface-container-high dark:hover:bg-zinc-800 transition-colors">
                            <span className="material-symbols-outlined">search</span>
                        </button> */}
                    </div>
                </div>

                <div className="bg-white dark:bg-zinc-900 rounded-2xl border border-outline-variant/30 dark:border-zinc-700 overflow-hidden shadow-sm">
                    <div className="overflow-x-auto">
                        <table className="w-full text-left border-collapse">
                            <thead>
                                <tr className="bg-surface-container dark:bg-zinc-800 text-on-surface-variant dark:text-zinc-400">
                                    {["Property", "Price", "Type", "Status", "Actions"].map((col) => (
                                        <th key={col} className="px-6 py-4 text-sm font-semibold">{col}</th>
                                    ))}
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-outline-variant/20 dark:divide-zinc-700">
                                {properties.length === 0 ? (
                                    <tr>
                                        <td colSpan={5} className="px-6 py-10 text-center text-sm text-zinc-400">
                                            No properties found.
                                        </td>
                                    </tr>
                                ) : (
                                    properties.map((p) => (
                                        <tr key={p._id} className="hover:bg-surface-container-low dark:hover:bg-zinc-800 transition-colors group">
                                            <td className="px-6 py-4">
                                                <div className="flex items-center gap-3">
                                                    <div
                                                        className="w-12 h-12 rounded-lg bg-cover bg-center flex-shrink-0 bg-zinc-200 dark:bg-zinc-700"
                                                        style={p.images && !p.images.includes('localhost:3000/dashboard')
                                                            ? { backgroundImage: `url('${p.images}')` }
                                                            : {}
                                                        }
                                                    />
                                                    <div>
                                                        <p className="text-sm font-semibold text-on-surface dark:text-white">{p.propertyTitle}</p>
                                                        <p className="text-xs text-on-surface-variant dark:text-zinc-400">{p.location}</p>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="px-6 py-4">
                                                <p className="text-sm font-semibold text-on-surface dark:text-white">৳{p.rent}</p>
                                                <p className="text-xs text-outline dark:text-zinc-400">{p.rentType}</p>
                                            </td>
                                            <td className="px-6 py-4 text-sm text-on-surface dark:text-zinc-300">{p.propertyType}</td>
                                            <td className="px-6 py-4">
                                                <span className={`px-3 py-1 rounded-full text-xs font-semibold ${p.status === "Approved"
                                                    ? "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400"
                                                    : "bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400"
                                                    }`}>
                                                    {p.status}
                                                </span>
                                            </td>
                                            <td className="px-6 py-4">
                                                <div className="flex gap-2 opacity-50 group-hover:opacity-100 transition-opacity">
                                                    <button className="p-1 hover:text-secondary transition-colors">
                                                        <span className="material-symbols-outlined">edit</span>
                                                    </button>
                                                    <button className="p-1 hover:text-red-500 transition-colors">
                                                        <span className="material-symbols-outlined">delete</span>
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
                {/* 
                <div className="flex justify-center">
                    <button className="flex items-center gap-2 text-sm font-semibold text-on-surface-variant dark:text-zinc-400 hover:text-secondary transition-colors">
                        Show more properties
                        <span className="material-symbols-outlined" style={{ fontSize: 18 }}>expand_more</span>
                    </button>
                </div> */}
            </div>
        </div>
    );
};

export default MyPropertyPage;