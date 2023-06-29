import getDashboardInfo from "@/actions/getDashboardInformation";
import OverviewContent from "@/components/dashboard/OverviewContent";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default async function Dashboard() {

    const {
        safeProperties, 
        usersCount,
        propertiesCount
    } : any = await getDashboardInfo();

    return (
        <div className="flex-1 space-y-4 pt-6">
            <div className="flex items-center justify-between space-y-2">
                <h2 className="text-3xl font-bold tracking-tight">Dashboard</h2>
                <div className="flex items-center space-x-2">
            
                </div>
            </div>
            <Tabs defaultValue="overview" className="space-y-4">
                <TabsList>
                    <TabsTrigger value="overview">Overview</TabsTrigger>
                    <TabsTrigger value="analytics" disabled>
                        Analytics
                    </TabsTrigger>
                    <TabsTrigger value="reports" disabled>
                        Reports
                    </TabsTrigger>
                    <TabsTrigger value="notifications" disabled>
                        Notifications
                    </TabsTrigger>
                </TabsList>
                <TabsContent value="overview" className="space-y-4">
                    <OverviewContent users={usersCount} properties={safeProperties} propertiesCount={propertiesCount} />
                </TabsContent>
            </Tabs>
        </div>
     );
}
 