'use client'
import { Activity, Home, DollarSign, Download, Users } from "lucide-react";

import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
  } from "@/components/ui/card";
import RecentProperties from "./RecentProperties";
import { SafeListing, SafeUser } from "@/types";
import Link from "next/link";
import { useRouter } from "next/navigation";

interface OverviewContentProps {
    users: number
    properties: Array<SafeListing>,
    propertiesCount: number
}

const OverviewContent: React.FC<OverviewContentProps> = ({
users,
properties,
propertiesCount
}) => {
    const router = useRouter();
    return (
        <>
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">
                            Subscriptions
                        </CardTitle>
                        <Users className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">0</div>
                    </CardContent>
                </Card>
                <Card className="cursor-pointer" onClick={() => {router.push('/dashboard/users')}}>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">
                            Users
                        </CardTitle>
                        <Users className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{users}</div>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">
                            Properties
                        </CardTitle>
                        <Home className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{propertiesCount}</div>
                    </CardContent>
                </Card>
            </div>
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
                <Card className="col-span-3">
                    <CardHeader>
                        <CardTitle className="flex justify-between">Recent Properties <Link href="/dashboard/properties" className="text-sm cursor-pointer underline">See all</Link></CardTitle>
                        
                        <CardDescription>
                            Your last 5 properties.
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <RecentProperties properties={properties} />
                    </CardContent>
                </Card>
            </div>
        </>
    );
}
 
export default OverviewContent;