"use client";

/**
 * RentNest — Admin Dashboard
 * Next.js (App Router) page · HeroUI v3 (@heroui/react) · Gravity UI Icons (@gravity-ui/icons)
 *
 * SETUP (one-time, not part of this file):
 *   npm install @heroui/react @heroui/styles @gravity-ui/icons
 *
 *   In app/layout.jsx, import the HeroUI stylesheet once (Tailwind v4 + React Aria base styles):
 *     import "@heroui/styles";
 *
 *   Tailwind v4 needs no JS config — HeroUI ships its tokens as CSS variables
 *   (--accent, --surface, --radius, …). The <style> block below remaps a few of
 *   those variables to the original RentNest palette (teal-green accent, soft
 *   neutral surfaces) so HeroUI's built-in components pick up the brand colors
 *   automatically, while the page chrome (sidebar/topbar/stat tiles) uses the
 *   same hex values directly via Tailwind arbitrary values.
 *
 * NOTE ON ICONS: Gravity UI Icons ships 700+ icons as named PascalCase exports
 * (e.g. `import { Envelope } from "@gravity-ui/icons"`). The set used below was
 * checked against the library's own docs/examples; if any single import ever
 * 404s on your installed version, swap it for the closest match at
 * https://gravity-ui.com/icons — everything else in the file is unaffected.
 */

import { useState } from "react";
import {
    Avatar,
    Button,
    Card,
    Chip,
    InputGroup,
    Label,
    ListBox,
    Pagination,
    Select,
    Switch,
    TextField,
} from "@heroui/react";
import {
    Ban,
    House as Buildings,
    Calendar,
    Camera,
    CircleCheckFill,
    Envelope,
    Gear,
    Heart,
    House,
    Magnifier,
    Pencil,
    Persons,
    Plus,
    Power,
    ArrowUp,
    Xmark,
} from "@gravity-ui/icons";

/* ---------------------------------- data --------------------------------- */

const NAV_ITEMS = [
    { label: "Dashboard", icon: House, active: true },
    { label: "My Bookings", icon: Calendar },
    { label: "Favorites", icon: Heart },
    { label: "Properties", icon: Buildings },
    { label: "Messages", icon: Envelope },
];

const STATS = [
    { label: "Total Users", value: 20, trend: 12, up: true, icon: Persons },
    { label: "Total Owners", value: 30, trend: 8, up: true, icon: Buildings },
    { label: "Total Properties", value: 100, trend: 24, up: true, icon: House },
    { label: "Total Bookings", value: 100, trend: 3, up: false, icon: Calendar },
];

const PROPERTIES = [
    {
        id: "skyline-penthouse",
        name: "Skyline Penthouse",
        location: "New York, NY",
        owner: "m.ross@email.com",
        price: "$4,500/mo",
        status: "pending",
        image:
            "https://lh3.googleusercontent.com/aida-public/AB6AXuBLj2lyvyedam2YAlxNBjKfDjCwV4nLMswg6GU7hO8J7LqeJQFvUdzWlCLWh6OyG1O-vRCCW-MmTekt5m1TWL6tCKKBcKxQw_7nICGNc0JwKcoTSzmeBhzRQfPgk_xmxjRxIJBDcvvVffTlbnoYiMeZNTwJg5ZUFM8QuBTJnhi5pkrHE0BVdF8-E7gR94Udq7Z_V2N9baeh2H4Kt_qM4PtcLuhlK0vAJZBvLab_kUNbdpTQ44x1Oz_Zc1KFt2DapS3KqPej69s1hyuL",
    },
    {
        id: "cedarwood-cabin",
        name: "Cedarwood Cabin",
        location: "Aspen, CO",
        owner: "j.doe@email.com",
        price: "$2,800/mo",
        status: "approved",
        image:
            "https://lh3.googleusercontent.com/aida-public/AB6AXuD55HtS6dW0gFMc4Hd57wWxmza2makg88g9dhkLTCuSdyhn5dDRFpFmr3-HZcvjxWfxJCQVSeKNrtm1bDcCVemN4oeyNH8gByyDruYCNbSXzwA2ZSfZ_Oeds3dC8X5Bj_2ErFUoB56kCmIbWptimvWjy7uKlt_kkG3bsDE-eVUZDJfAndNorJ0IdN1Vhwfm7jXjRGGrTDezZzh4xTiZoHEKcUuqL5GrnuOiXCrZrgyOHaQU8CVAni1TE-W7Sd4CdxrM8qwu-rFJn_VW",
    },
];

const USERS = [
    {
        id: "elena-martinez",
        name: "Elena Martinez",
        email: "elena.m@example.com",
        role: "Owner",
        lastActive: "2 hours ago",
        initials: "EM",
        image: null,
    },
    {
        id: "sarah-chen",
        name: "Sarah Chen",
        email: "sarah.c@design.io",
        role: "Tenant",
        lastActive: "Yesterday",
        initials: "SC",
        image:
            "https://lh3.googleusercontent.com/aida-public/AB6AXuBq9vpSQ_u89Mu5skvQg04fTL-BQBeYkj5KyUSmVZa6Ee9hMaoYuGn7RJH_AtaUKOQCigpLvOZi4Psux4PwcYo981I1EglIsIjdx51chdbxNQ_sLg0VzhafsXSxsy6Gf1RdlIrPudoGYIDlNE__E4x046qQS3mKKKhC72jE7xOFTNr-LLeK98mXyANQHOFu0fcJh9DbCfdU3vJqQ5x6EyENB33BFKbPjUfCXFaV3V-mh5hGge5sVndUJhoo6C0JZpDMRkenQx8zsfYG",
    },
    {
        id: "julian-black",
        name: "Julian Black",
        email: "j.black@corporate.com",
        role: "Admin",
        lastActive: "Active now",
        initials: "JB",
        image: null,
    },
];

const ROLE_OPTIONS = [
    { id: "all", label: "All Roles" },
    { id: "tenant", label: "Tenant" },
    { id: "owner", label: "Owner" },
    { id: "admin", label: "Admin" },
];

const ROLE_CHIP_COLOR = {
    Owner: "tertiary",
    Tenant: "secondary",
    Admin: "primary",
};

/* --------------------------------- helpers -------------------------------- */

function StatCard({ label, value, trend, up, icon: Icon }) {
    return (
        <Card className="gap-4 rounded-xl border border-[#c6c6cd]/40 bg-white p-6 shadow-sm transition-shadow hover:shadow-md">
            <div className="flex items-start justify-between">
                <div className="rounded-lg bg-[#dae2fd] p-2 text-[#191c1e]">
                    <Icon className="size-5" />
                </div>
                <span
                    className={`flex items-center gap-1 text-xs font-semibold ${up ? "text-[#006c49]" : "text-[#ba1a1a]"
                        }`}
                >
                    <ArrowUp className={`size-3.5 ${up ? "" : "rotate-180"}`} />
                    {trend}%
                </span>
            </div>
            <div>
                <p className="text-sm text-[#45464d]">{label}</p>
                <h3 className="mt-1 text-2xl font-bold text-[#191c1e]">{value}</h3>
            </div>
        </Card>
    );
}

function StatusChip({ status }) {
    if (status === "pending") {
        return (
            <Chip variant="soft" color="secondary">
                Pending
            </Chip>
        );
    }
    return (
        <Chip variant="soft" color="neutral">
            Approved
        </Chip>
    );
}

function RoleChip({ role }) {
    return (
        <Chip variant="soft" color={ROLE_CHIP_COLOR[role] ?? "neutral"}>
            {role}
        </Chip>
    );
}

/* ---------------------------------- page ---------------------------------- */

export default function AdminDashboardPage() {
    const [notifications, setNotifications] = useState(true);
    const [twoFactor, setTwoFactor] = useState(false);

    return (
        <div className="min-h-screen bg-[#f7f9fb] text-[#191c1e]">
            <style>{`
        :root {
          --accent: #006c49;
          --accent-foreground: #ffffff;
        }
      `}</style>

            {/* ----------------------------- Sidebar ----------------------------- */}
            <aside className="fixed left-0 top-0 hidden h-screen w-64 flex-col gap-2 border-r border-[#c6c6cd]/30 bg-white py-6 md:flex">
                <div className="px-6 py-2">
                    <span className="text-xl font-bold text-[#191c1e]">RentNest</span>
                </div>

                <nav className="mt-4 flex flex-col gap-1 px-2">
                    {NAV_ITEMS.map(({ label, icon: Icon, active }) => (
                        <a
                            key={label}
                            href="#"
                            className={`flex items-center gap-3 rounded-lg px-4 py-3 text-sm font-semibold transition-colors ${active
                                ? "bg-[#6cf8bb] text-[#00714d]"
                                : "text-[#45464d] hover:bg-[#eceef0]"
                                }`}
                        >
                            <Icon className="size-5" />
                            {label}
                        </a>
                    ))}
                </nav>

                <div className="mt-auto flex flex-col gap-1 border-t border-[#c6c6cd]/30 px-2 pt-4">
                    <a
                        href="#"
                        className="flex items-center gap-3 rounded-lg px-4 py-3 text-sm font-semibold text-[#45464d] hover:bg-[#eceef0]"
                    >
                        <Gear className="size-5" />
                        Settings
                    </a>
                    <a
                        href="#"
                        className="flex items-center gap-3 rounded-lg px-4 py-3 text-sm font-semibold text-[#45464d] hover:bg-[#eceef0]"
                    >
                        <Power className="size-5" />
                        Logout
                    </a>
                </div>
            </aside>

            {/* ------------------------------ Main ------------------------------ */}
            <main className="min-h-screen md:ml-64">
                {/* Topbar */}
                <header className="sticky top-0 z-40 flex items-center justify-between border-b border-[#c6c6cd]/30 bg-white/80 px-4 py-4 backdrop-blur-md md:px-12">
                    <h1 className="text-xl font-bold text-[#191c1e]">Admin Dashboard</h1>

                    <div className="flex items-center gap-6">
                        <TextField aria-label="Search system" className="hidden w-64 lg:block">
                            <InputGroup>
                                <InputGroup.Prefix>
                                    <Magnifier className="size-4 text-[#76777d]" />
                                </InputGroup.Prefix>
                                <InputGroup.Input placeholder="Search system..." />
                            </InputGroup>
                        </TextField>

                        <div className="flex items-center gap-3">
                            <div className="hidden text-right sm:block">
                                <p className="text-sm font-semibold text-[#191c1e]">Alex Rivera</p>
                                <p className="text-xs text-[#45464d]">System Administrator</p>
                            </div>
                            <Avatar className="size-10 border-2 border-[#6cf8bb]">
                                <Avatar.Image
                                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuD1cSbEMe6XBFtN57zC-iCIf6cCxH2UnI8lFz_G2RnJTU-MfGg-7ALHVRqCMGFBxE2FsgAGv6Jpvo-ifmchJNo15PoDfsolrzeU_StJO8ewBTa0KPYtEKvipVPj59OV9q0iyJeuNkfIBl7e3fklngSEVj_cthLK5kdaHwKOqpJz9vCQ2SNyXU2Y0sYfwXmEHKYRqtVn6A1lHTsyV5kV6VD0e1wOmYzfCip5APLxKWgD7upHsCRCMt3k7vgCMaJphC5i8VKZ31sdEiiH"
                                    alt="Alex Rivera"
                                />
                                <Avatar.Fallback>AR</Avatar.Fallback>
                            </Avatar>
                        </div>
                    </div>
                </header>

                <section className="space-y-8 p-4 md:p-12">
                    {/* Stats */}
                    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
                        {STATS.map((stat) => (
                            <StatCard key={stat.label} {...stat} />
                        ))}
                    </div>

                    {/* Property approvals + Admin profile */}
                    <div className="grid grid-cols-1 items-start gap-6 xl:grid-cols-3">
                        {/* Property Approvals */}
                        <Card className="overflow-hidden rounded-xl border border-[#c6c6cd]/40 p-0 xl:col-span-2">
                            <div className="flex items-center justify-between border-b border-[#c6c6cd]/20 px-6 py-4">
                                <h2 className="text-lg font-bold">Property Approvals</h2>
                                <Button variant="tertiary" className="text-[#006c49]">
                                    View All
                                </Button>
                            </div>

                            <div className="overflow-x-auto">
                                <table className="w-full border-collapse text-sm">
                                    <thead>
                                        <tr className="bg-[#f2f4f6] text-left">
                                            <th className="px-6 py-3 font-semibold text-[#45464d]">Property</th>
                                            <th className="px-6 py-3 font-semibold text-[#45464d]">Owner</th>
                                            <th className="px-6 py-3 font-semibold text-[#45464d]">Price</th>
                                            <th className="px-6 py-3 font-semibold text-[#45464d]">Status</th>
                                            <th className="px-6 py-3 font-semibold text-[#45464d]">Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-[#c6c6cd]/20">
                                        {PROPERTIES.map((property) => (
                                            <tr key={property.id} className="transition-colors hover:bg-[#f2f4f6]/60">
                                                <td className="px-6 py-4">
                                                    <div className="flex items-center gap-3">
                                                        <img
                                                            src={property.image}
                                                            alt={property.name}
                                                            className="size-12 shrink-0 rounded-lg object-cover"
                                                        />
                                                        <div>
                                                            <p className="font-semibold">{property.name}</p>
                                                            <p className="text-xs text-[#45464d]">{property.location}</p>
                                                        </div>
                                                    </div>
                                                </td>
                                                <td className="px-6 py-4 text-[#45464d]">{property.owner}</td>
                                                <td className="px-6 py-4 font-semibold text-[#006c49]">
                                                    {property.price}
                                                </td>
                                                <td className="px-6 py-4">
                                                    <StatusChip status={property.status} />
                                                </td>
                                                <td className="px-6 py-4">
                                                    {property.status === "pending" ? (
                                                        <div className="flex gap-1">
                                                            <Button
                                                                isIconOnly
                                                                variant="tertiary"
                                                                aria-label="Approve"
                                                                title="Approve"
                                                                className="text-[#006c49]"
                                                            >
                                                                <CircleCheckFill className="size-5" />
                                                            </Button>
                                                            <Button
                                                                isIconOnly
                                                                variant="tertiary"
                                                                aria-label="Reject"
                                                                title="Reject"
                                                                className="text-[#ba1a1a]"
                                                            >
                                                                <Xmark className="size-5" />
                                                            </Button>
                                                        </div>
                                                    ) : (
                                                        <Button
                                                            isIconOnly
                                                            variant="tertiary"
                                                            aria-label="Edit"
                                                            title="Edit"
                                                        >
                                                            <Pencil className="size-5" />
                                                        </Button>
                                                    )}
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </Card>

                        {/* Admin Profile */}
                        <Card className="gap-6 rounded-xl border border-[#c6c6cd]/40 p-6">
                            <h2 className="text-lg font-bold">Admin Profile</h2>

                            <div className="flex flex-col items-center gap-1 border-b border-[#c6c6cd]/20 py-4">
                                <div className="relative">
                                    <Avatar className="size-24 border-4 border-[#6cf8bb]">
                                        <Avatar.Image
                                            src="https://lh3.googleusercontent.com/aida-public/AB6AXuBc-3PYJSsYtHf4OpnU54_ktTJ8WW_buSFyoppNxbBhwpuq_WX3AkGaIyaXO83c0BqxSOSqvWK_-RpARpdzvK3RaZVY9ckbKhhi185fcrNhxUAEXDHtJkli9Oz5xZFfbHpQKw1p_-0ytmxm-1XY5eCBaU6qfhRQnUZyKrc_hg4rsH6oApCQBV9hGQ6mzJFrapqJVYwLn92fiduDpVJKHxPVXG5PcvClUbKdfmuir-v210J0HJ9fB43UyQYiJovEDzhwd-0hbLI1rrRy"
                                            alt="Alex Rivera"
                                        />
                                        <Avatar.Fallback>AR</Avatar.Fallback>
                                    </Avatar>
                                    <Button
                                        isIconOnly
                                        aria-label="Change photo"
                                        title="Change photo"
                                        className="absolute bottom-0 right-0 size-8 rounded-full bg-[#006c49] text-white shadow-lg"
                                    >
                                        <Camera className="size-4" />
                                    </Button>
                                </div>
                                <h4 className="mt-4 text-lg font-bold">Alex Rivera</h4>
                                <p className="text-sm text-[#45464d]">alex.admin@rentnest.com</p>
                            </div>

                            <div className="space-y-4">
                                <Switch isSelected={notifications} onChange={setNotifications}>
                                    <Switch.Control>
                                        <Switch.Thumb />
                                    </Switch.Control>
                                    <Label className="flex-1 text-sm font-semibold text-[#45464d]">
                                        System Notifications
                                    </Label>
                                </Switch>

                                <Switch isSelected={twoFactor} onChange={setTwoFactor}>
                                    <Switch.Control>
                                        <Switch.Thumb />
                                    </Switch.Control>
                                    <Label className="flex-1 text-sm font-semibold text-[#45464d]">
                                        Two-Factor Auth
                                    </Label>
                                </Switch>

                                <Button fullWidth className="mt-2 bg-[#006c49] text-white">
                                    Save Changes
                                </Button>
                            </div>
                        </Card>
                    </div>

                    {/* User Management */}
                    <Card className="overflow-hidden rounded-xl border border-[#c6c6cd]/40 p-0">
                        <div className="flex flex-col items-start justify-between gap-4 border-b border-[#c6c6cd]/20 px-6 py-4 sm:flex-row sm:items-center">
                            <h2 className="text-lg font-bold">User Management</h2>

                            <div className="flex w-full gap-2 sm:w-auto">
                                <Select className="w-40" defaultSelectedKey="all">
                                    <Select.Trigger>
                                        <Select.Value />
                                        <Select.Indicator />
                                    </Select.Trigger>
                                    <Select.Popover>
                                        <ListBox>
                                            {ROLE_OPTIONS.map((role) => (
                                                <ListBox.Item
                                                    key={role.id}
                                                    id={role.id}
                                                    textValue={role.label}
                                                >
                                                    <Label>{role.label}</Label>
                                                </ListBox.Item>
                                            ))}
                                        </ListBox>
                                    </Select.Popover>
                                </Select>

                                <Button className="gap-2 bg-[#191c1e] text-white">
                                    <Plus className="size-4" />
                                    Add User
                                </Button>
                            </div>
                        </div>

                        <div className="overflow-x-auto">
                            <table className="w-full border-collapse text-sm">
                                <thead>
                                    <tr className="bg-[#f2f4f6] text-left">
                                        <th className="px-6 py-3 font-semibold text-[#45464d]">User</th>
                                        <th className="px-6 py-3 font-semibold text-[#45464d]">Role</th>
                                        <th className="px-6 py-3 font-semibold text-[#45464d]">Last Active</th>
                                        <th className="px-6 py-3 font-semibold text-[#45464d]">Status</th>
                                        <th className="px-6 py-3 font-semibold text-[#45464d]">Actions</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-[#c6c6cd]/20">
                                    {USERS.map((user) => (
                                        <tr key={user.id} className="transition-colors hover:bg-[#f2f4f6]/60">
                                            <td className="px-6 py-4">
                                                <div className="flex items-center gap-3">
                                                    <Avatar className="size-10 shrink-0 bg-[#dae2fd] text-[#191c1e]">
                                                        {user.image ? (
                                                            <Avatar.Image src={user.image} alt={user.name} />
                                                        ) : null}
                                                        <Avatar.Fallback>{user.initials}</Avatar.Fallback>
                                                    </Avatar>
                                                    <div>
                                                        <p className="font-semibold">{user.name}</p>
                                                        <p className="text-xs text-[#45464d]">{user.email}</p>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="px-6 py-4">
                                                <RoleChip role={user.role} />
                                            </td>
                                            <td className="px-6 py-4 text-[#45464d]">{user.lastActive}</td>
                                            <td className="px-6 py-4">
                                                <span className="flex items-center gap-1.5 text-sm font-semibold text-[#006c49]">
                                                    <span className="size-2 rounded-full bg-[#006c49]" />
                                                    Active
                                                </span>
                                            </td>
                                            <td className="px-6 py-4">
                                                <div className="flex gap-1">
                                                    <Button
                                                        isIconOnly
                                                        variant="tertiary"
                                                        aria-label="Edit"
                                                        title="Edit"
                                                    >
                                                        <Pencil className="size-5" />
                                                    </Button>
                                                    <Button
                                                        isIconOnly
                                                        variant="tertiary"
                                                        aria-label="Ban user"
                                                        title="Ban user"
                                                        className="text-[#ba1a1a]"
                                                    >
                                                        <Ban className="size-5" />
                                                    </Button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>

                        <div className="flex items-center justify-between border-t border-[#c6c6cd]/20 px-6 py-4">
                            <p className="text-xs text-[#45464d]">Showing 1-10 of 150 users</p>
                            <Pagination>
                                <Pagination.Content>
                                    <Pagination.Item>
                                        <Pagination.Previous>
                                            <Pagination.PreviousIcon />
                                        </Pagination.Previous>
                                    </Pagination.Item>
                                    <Pagination.Item>
                                        <Pagination.Link isActive>1</Pagination.Link>
                                    </Pagination.Item>
                                    <Pagination.Item>
                                        <Pagination.Link>2</Pagination.Link>
                                    </Pagination.Item>
                                    <Pagination.Item>
                                        <Pagination.Ellipsis />
                                    </Pagination.Item>
                                    <Pagination.Item>
                                        <Pagination.Link>15</Pagination.Link>
                                    </Pagination.Item>
                                    <Pagination.Item>
                                        <Pagination.Next>
                                            <Pagination.NextIcon />
                                        </Pagination.Next>
                                    </Pagination.Item>
                                </Pagination.Content>
                            </Pagination>
                        </div>
                    </Card>
                </section>

                {/* Footer */}
                <footer className="mt-12 grid grid-cols-1 gap-8 bg-[#2d3133] px-4 py-12 text-[#e0e3e5] md:grid-cols-4 md:px-12">
                    <div className="space-y-4">
                        <span className="text-xl font-bold text-white">RentNest</span>
                        <p className="text-sm text-[#c6c6cd]">
                            Revolutionizing the rental market with transparent data and
                            seamless property management for everyone.
                        </p>
                    </div>

                    <div>
                        <h5 className="mb-4 text-sm font-semibold text-white">Quick Links</h5>
                        <ul className="space-y-2 text-sm text-[#c6c6cd]">
                            <li><a href="#" className="hover:text-white hover:underline">About Us</a></li>
                            <li><a href="#" className="hover:text-white hover:underline">Terms of Service</a></li>
                            <li><a href="#" className="hover:text-white hover:underline">Privacy Policy</a></li>
                            <li><a href="#" className="hover:text-white hover:underline">Contact Support</a></li>
                        </ul>
                    </div>

                    <div>
                        <h5 className="mb-4 text-sm font-semibold text-white">Admin Resources</h5>
                        <ul className="space-y-2 text-sm text-[#c6c6cd]">
                            <li><a href="#" className="hover:text-white hover:underline">System Health</a></li>
                            <li><a href="#" className="hover:text-white hover:underline">Legal Compliance</a></li>
                            <li><a href="#" className="hover:text-white hover:underline">User Feedback</a></li>
                        </ul>
                    </div>

                    <div className="space-y-4">
                        <h5 className="text-sm font-semibold text-white">Newsletter</h5>
                        <TextField aria-label="System email">
                            <InputGroup>
                                <InputGroup.Prefix>
                                    <Envelope className="size-4 text-[#c6c6cd]" />
                                </InputGroup.Prefix>
                                <InputGroup.Input
                                    type="email"
                                    placeholder="System email..."
                                    className="bg-transparent text-white placeholder:text-[#76777d]"
                                />
                                <InputGroup.Suffix>
                                    <Button isIconOnly aria-label="Subscribe" className="bg-[#006c49] text-white">
                                        <ArrowUp className="size-4 rotate-45" />
                                    </Button>
                                </InputGroup.Suffix>
                            </InputGroup>
                        </TextField>
                        <p className="text-xs text-[#76777d]">
                            © 2026 RentNest Real Estate. All rights reserved.
                        </p>
                    </div>
                </footer>
            </main>

            {/* Floating action button */}
            <Button
                isIconOnly
                aria-label="New entry"
                title="New entry"
                className="fixed bottom-8 right-8 z-50 size-14 rounded-full bg-[#006c49] text-white shadow-2xl"
            >
                <Plus className="size-7" />
            </Button>
        </div>
    );
}