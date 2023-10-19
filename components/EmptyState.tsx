'use client';

import { useRouter } from "next/navigation";

import Heading from "./Heading";
import Button from "./ui/button";

interface EmptyStateProps {
    title?: string;
    subtitle?: string;
    showReset?: boolean;
  }

  const EmptyState: React.FC<EmptyStateProps> = ({
    title = "No hubo coincidencias",
    subtitle = "Intenta remover alguno de los filtros.",
    showReset
  }) => {
    const router = useRouter();

    return (
        <div className="
            h-[60vh]
            flex 
            flex-col 
            gap-2 
            justify-center 
            items-center 
        ">
            <Heading
                center
                title={title}
                subtitle={subtitle}
            />
            <div className="w-48 mt-4">
                {showReset && (
                <Button
                    outline
                    label="Remover filtros"
                    onClick={() => router.push('/')}
                />
            )}
            </div>
        </div>
    );
}
 
export default EmptyState;