import { Separator } from "@/components/ui/separator";
import { CreateForm } from "./CreateForm";

export default async function create () {
    return (
        <div className="hidden h-full flex-1 flex-col space-y-8 p-8 md:flex">
            <div className="flex-1 space-y-4 pt-6">
                <div className="flex items-center justify-between space-y-2">
                    <h2 className="text-2xl font-bold tracking-tight">Create Property</h2>
                    <div className="grid w-full max-w-sm items-center gap-1.5">
                    
                    </div>
                </div>
                <Separator />
                <CreateForm />
            </div>
        </div>
    );
}