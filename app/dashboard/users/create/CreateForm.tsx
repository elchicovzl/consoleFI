'use client'

import axios from "axios";
import * as z from "zod";
import { toast } from "@/components/ui/use-toast";
import { useRouter } from 'next/navigation';
import { useState } from "react";
import UserForm from "../components/UserForm";
import { userFormSchema } from "../data/schema";


type PropertyFormValues = z.infer<typeof userFormSchema>

const defaultValues: Partial<PropertyFormValues> = {
    name: "",
}

export function CreateForm () {
    const [isLoading, setIsLoading] = useState(false);
    const Router = useRouter();

    function onSubmit(data: PropertyFormValues) {
        
        setIsLoading(true);

        axios.post('/api/register', data)
            .then(() => {
                toast({
                    title: "User Created!",
                })
                Router.push('/dashboard/users')
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
        <UserForm 
            propertyFormValues={defaultValues}
            onSubmit={onSubmit}
            isLoading={isLoading}
            isEdit={false}
        />
    );
}