import getCurrentUser from "@/actions/getCurrentUser";
import getListingById from "@/app/actions/getListingById";
import EmptyState from "@/components/EmptyState";
import { Separator } from "@/components/ui/separator";
import EditForm from "./EditForm";
export const revalidate = 1

interface IParams {
    id: string;
}

const ListingPage = async ({ params }: { params: IParams }) => {

    const listing = await getListingById(params);
    const currentUser = await getCurrentUser();

    if (!listing) {
        return (
            <EmptyState />
        );
    }

    return ( 
        <div className="hidden h-full flex-1 flex-col space-y-8 p-8 md:flex">
            <div className="flex-1 space-y-4 pt-6">
                <div className="flex items-center justify-between space-y-2">
                    <h2 className="text-2xl font-bold tracking-tight">Edit Property</h2>
                    <div className="grid w-full max-w-sm items-center gap-1.5">
                    
                    </div>
                </div>
                <Separator />
                <EditForm 
                    listing={listing}
                    currentUser={currentUser} 
                />
            </div>
        </div>
    );
}
 
export default ListingPage;