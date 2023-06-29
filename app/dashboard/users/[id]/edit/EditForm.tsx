'use client';

import * as z from "zod";
import axios from "axios";
import { SafeUser, SafeListing } from "@/types";
import { toast } from "@/components/ui/use-toast";
import { useRouter } from 'next/navigation';
import { userFormEditSchema } from "../../data/schema";
import UserForm from "../../components/UserForm";
import { useState } from "react";

interface EditFormProps {
    user: SafeUser;
    currentUser?: SafeUser | null;
}

type UserFormValues = z.infer<typeof userFormEditSchema>

const EditForm: React.FC<EditFormProps> = ({
    user,
    currentUser
}) => {
    const data: UserFormValues = user;
    const [isLoading, setIsLoading] = useState(false);

    const Router = useRouter();

    function onSubmit(data: UserFormValues) {
      setIsLoading(true);

      axios.put(`/api/register/${user.id}/edit`, data)
          .then(() => {
             toast({
                  title: "User Updated!",
              })
              Router.refresh()
              Router.push('/dashboard/users')
          })
          .catch(() => {
               toast({
                  variant: "destructive",
                  title: "Uh oh! Something went wrong.",
                  description: "There was a problem with your request.",
              })
          }).finally(() => {
              setIsLoading(false);
          });
    }
    
    return (
        <UserForm 
            propertyFormValues={data}
            onSubmit={onSubmit}
            isLoading={isLoading}
            isEdit={true}
        />
    )  
};

export default EditForm;