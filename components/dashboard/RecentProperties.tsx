'use client'

import { SafeListing } from "@/types";
import { Home } from "lucide-react";
import { NumericFormat } from "react-number-format";

interface RecentPropertiesProps {
    properties: Array<SafeListing>,
}

const RecentProperties: React.FC<RecentPropertiesProps> = ({
    properties
}) => {
   
  return (
    <div className="space-y-8">
        {properties.map((property: SafeListing) => (
            <div className="flex items-center">
                <Home className="h-12 w-12 text-muted-foreground" />
                <div className="ml-4 space-y-1">
                    <p className="text-sm font-medium leading-none">{property.title}</p>
                    <p className="text-sm text-muted-foreground">
                        {property.address}
                    </p>
                </div>
                <div className="ml-auto font-medium">
                    <NumericFormat
                        displayType="text"
                        className="ml-auto"
                        value={property.price}
                        prefix="$"
                        thousandSeparator
                    />
                </div>
            </div>
        ))}
    </div>
  )
}

export default RecentProperties;