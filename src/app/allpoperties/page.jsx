'use client'
import { useState } from "react";
// import Navbar from "@/components/navbar/Navbar";
// import Footer from "@/components/footer/Footer";
// import Sidebar from "@/components/properties/Sidebar";
// import PropertyGrid from "@/components/properties/PropertyGrid";
import Footer from "../components/footer/Footer";
import Navbar from "../components/navbar/Navbar";
import PropertyGrid from "../components/properties/PropertyGrid";
import Sidebar from "../components/properties/Sidebar";

export default function AllProperties() {
    const [filters, setFilters] = useState({});
    return (
        <>

            <div className="flex min-h-screen">
                <Sidebar onFilter={setFilters} />
                <PropertyGrid filters={filters} />
            </div>

        </>
    );
}