import getListings from "@/app/actions/getListings";

import { columns } from "./components/columns"
import { DataTable } from "./components/data-table"
import { listingSchema } from "./data/schema"
import { Button } from "@/components/ui/ButtonUI";
import Link from 'next/link'

export const revalidate = 1 // revalidate this page every 60 seconds

export default async function Properties () {
    const listings = await getListings();

    return ( 
        <div className="hidden h-full flex-1 flex-col space-y-8 p-8 md:flex">
            <div className="flex-1 space-y-4 pt-6">
                <div className="flex items-center justify-between space-y-2">
                    <h2 className="text-2xl font-bold tracking-tight">Propiedades</h2>
                    <p className="text-muted-foreground">
                        Lista de propiedades para administración.
                    </p>
                </div>
            </div>
            <p className="ml-auto">
                
                <Link 
                    className="
                        inline-flex items-center justify-center rounded-md text-sm
                        font-medium transition-colors focus-visible:outline-none focus-visible:ring-2
                        focus-visible:ring-ring focus-visible:ring-offset-2 disabled:opacity-50
                        disabled:pointer-events-none ring-offset-background
                        border border-input hover:bg-accent hover:text-accent-foreground
                        h-10 py-2 px-4
                    "
                    href={"/dashboard/properties/create"}
                >
                    Crear propiedad
                </Link>
            </p>
            <DataTable data={listings} columns={columns} />
        </div>
    );
}
 