import OwnerSidebar from "./OwnerSidebar";
// import OwnerMobileNav from "@/components/owner-dashboard/OwnerMobileNav";
import OwnerStatsSection from "./OwnerStatsSection";
// import AddPropertyForm from "@/components/owner-dashboard/AddPropertyForm";
// import PropertiesTable from "./PropertiesTable";
import AddPropertyForm from "./AddPropertyForm";
import OwnerMobileNav from "./OwnerMobileNav";
import PropertiesTable from "./PropertiesTable";
// import Footer from "@/components/footer/Footer";

export default function OwnerDashboard() {
    return (
        <div className="bg-white min-h-screen">
            <OwnerSidebar />

            <main className="md:ml-64 min-h-screen px-4 md:px-16 py-12 space-y-12 pb-20">
                {/* Header */}
                <header className="flex flex-col md:flex-row md:items-end justify-between gap-6">
                    <div>
                        <h2 className="text-3xl font-bold text-on-surface tracking-tight">
                            Owner Dashboard
                        </h2>
                        <p className="text-base text-on-surface-variant mt-1">
                            Welcome back, Farhan. Here is whats happening with your properties today.
                        </p>
                    </div>
                    <div className="flex items-center gap-4 bg-white p-3 rounded-xl shadow-sm border border-outline-variant/30">
                        <div className="text-right">
                            <p className="text-xs text-on-surface-variant">Member Since</p>
                            <p className="text-sm font-semibold">January 2022</p>
                        </div>
                        <div className="h-8 w-px bg-outline-variant" />
                        <button className="bg-secondary text-white px-4 py-2 rounded-lg text-sm font-semibold hover:shadow-md transition-shadow active:scale-95">
                            Add New Property
                        </button>
                    </div>
                </header>

                <OwnerStatsSection />

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
                    <div className="lg:col-span-1">
                        <AddPropertyForm />
                    </div>
                    <div className="lg:col-span-2">
                        <PropertiesTable />
                    </div>
                </div>
            </main>

            {/* <Footer /> */}
            <OwnerMobileNav />
        </div>
    );
}