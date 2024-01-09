'use client';

import * as z from "zod";
import axios from "axios";
import { SafeUser, SafeListing } from "@/types";
import { toast } from "@/components/ui/use-toast";
import { useRouter } from 'next/navigation';
import { propertyFormSchema } from "../../data/schema";
import PropertyForm from "../../components/PropertyForm";
import { useState } from "react";

interface EditFormProps {
    listing: SafeListing & {
      user: SafeUser;
    };
    currentUser?: SafeUser | null;
}

type PropertyFormValues = z.infer<typeof propertyFormSchema>

const EditForm: React.FC<EditFormProps> = ({
    listing,
    currentUser
}) => {
    const data: any | undefined = listing;
    const [isLoading, setIsLoading] = useState(false);
    const [images, setImages] = useState<Array<string> | undefined>(data.imageMultipleSrc);

    const Router = useRouter();

    function onSubmit(data: PropertyFormValues) {
      setIsLoading(true);

      data.imageMultipleSrc = [...data.imageMultipleSrc ?? [], ...images ?? []];

      data.imageMultipleSrc = data.imageMultipleSrc.map((image) =>
        image.replace('http://','https://')
      );
      
      axios.put(`/api/listings/${listing.id}/edit`, data)
          .then(() => {
             toast({
                  title: "Propiedad Actualizada!",
                  
                  /* description: (
                  <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
                      <code className="text-white">{JSON.stringify(data, null, 2)}</code>
                  </pre>
                  ), */
              })
              //Router.replace(`/${Date.now()}`)
              //Router.prefetch('/dashboard/properties')
              Router.refresh()
              Router.push('/dashboard/properties')
          })
          .catch(() => {
               toast({
                  variant: "destructive",
                  title: "Uh oh! Something went wrong.",
                  description: "There was a problem with your request.",
              })
              //Router.push('/dashboard/properties')
          }).finally(() => {
              setIsLoading(false);
          })
    }
    
    return (
        <PropertyForm 
            propertyFormValues={data}
            onSubmit={onSubmit}
            isLoading={isLoading}
            isEdit={true}
            images={images ?? []}
            setImages={setImages}
        />
    )  
};

export default EditForm;