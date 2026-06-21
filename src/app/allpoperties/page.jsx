// import Navbar from "@/components/navbar/Navbar";
// import Footer from "@/components/footer/Footer";
// import Sidebar from "@/components/properties/Sidebar";
// import PropertyGrid from "@/components/properties/PropertyGrid";
import Footer from "../components/footer/Footer";
import Navbar from "../components/navbar/Navbar";
import PropertyGrid from "../components/properties/PropertyGrid";
import Sidebar from "../components/properties/Sidebar";

export default function AllProperties() {
    return (
        <>

            <main className="flex min-h-screen">
                <Sidebar />
                <PropertyGrid />
            </main>

        </>
    );
}