// import DashboardSidebar from "@/components/dashboard/DashboardSidebar";
// import DashboardTopBar from "@/components/dashboard/DashboardTopBar";
// import StatsCards from "@/components/dashboard/StatsCards";
// import BookingsTable from "@/components/dashboard/BookingsTable";
// import RecentActivity from "@/components/dashboard/RecentActivity";
// import FavoritesGrid from "@/components/dashboard/FavoritesGrid";
// import Footer from "@/components/footer/Footer";
// import MobileNav from "@/components/dashboard/MobileNav";

import BookingsTable from "@/app/components/dashboard/BookingsTable";
import DashboardSidebar from "@/app/components/dashboard/DashboardSidebar";
import DashboardTopBar from "@/app/components/dashboard/DashboardTopBar";
import FavoritesGrid from "@/app/components/dashboard/FavoritesGrid";
import MobileNav from "@/app/components/dashboard/MobileNav";
import RecentActivity from "@/app/components/dashboard/RecentActivity";
import StatsCards from "@/app/components/dashboard/StatsCards";

export default function TenantDashboard() {
    return (
        <div className="flex min-h-screen bg-white">
            <DashboardSidebar />

            <main className="flex-1 md:ml-64 min-h-screen flex flex-col">
                <DashboardTopBar />

                <div className="px-4 md:px-16 py-6 space-y-12">
                    {/* Welcome */}
                    <div>
                        <h2 className="text-3xl font-bold text-on-surface">
                            Welcome Back 👋
                        </h2>
                        <p className="text-base text-on-surface-variant mt-1">
                            Here is whats happening with your rentals today.
                        </p>
                    </div>

                    <StatsCards />

                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                        <div className="lg:col-span-2">
                            <BookingsTable />
                        </div>
                        <RecentActivity />
                    </div>

                    <FavoritesGrid />
                </div>

            </main>

            <MobileNav />
        </div>
    );
}