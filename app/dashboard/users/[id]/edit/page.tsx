import getCurrentUser from "@/actions/getCurrentUser";
import getUserById from "@/app/actions/getUserById";
import EmptyState from "@/components/EmptyState";
import { Separator } from "@/components/ui/separator";
import EditForm from "./EditForm";
export const revalidate = 1

interface IParams {
    id: string;
}

const UserPage = async ({ params }: { params: IParams }) => {

    const user = await getUserById(params);
    const currentUser = await getCurrentUser();

    if (!user) {
        return (
            <EmptyState />
        );
    }

    return ( 
        <div className="hidden h-full flex-1 flex-col space-y-8 p-8 md:flex">
            <div className="flex-1 space-y-4 pt-6">
                <div className="flex items-center justify-between space-y-2">
                    <h2 className="text-2xl font-bold tracking-tight">Edit User</h2>
                    <div className="grid w-full max-w-sm items-center gap-1.5">
                    </div>
                </div>
                <Separator />
                <EditForm 
                    user={user}
                    currentUser={currentUser} 
                />
            </div>
        </div>
    );
}
 
export default UserPage;