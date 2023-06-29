"use client"

import * as React from "react"

import { cn } from "@/lib/utils"
import Button from "@/components/ui/button";
import Input from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Icons } from "@/components/icons"
import { toast } from "@/components/ui/use-toast";

import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useCallback, useState } from 'react';
import {
    FieldValues,
    SubmitHandler,
    useForm
} from 'react-hook-form';


const UserAuthForm = () => {
  const router = useRouter();
  const [isLoading, setIsLoading] = React.useState<boolean>(false)

  const {
    register,
    handleSubmit,
    formState: {
        errors,
    }
    } = useForm<FieldValues>({
        defaultValues:{
            email:'',
            password:''
        }
    });

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    setIsLoading(true);

    signIn('credentials', {
        ... data,
        redirect: false,
    })
    .then((callback) => {
        setIsLoading(false);

        if (callback?.ok) {
            toast({
              title: "Logged in",
            });
            router.refresh();
        }

        if (callback?.error) {
            toast({
              variant: "destructive",
              title: callback.error,
              description: "",
          });
        }
    })
  }


  return (
    <div className="grid gap-6">
      <form onSubmit={onSubmit}>
        <div className="grid gap-2">
          <div className="grid gap-1">
            <Label className="sr-only" htmlFor="email">
              Correo
            </Label>
            <Input
              id="email"
              errors={errors}
              label="Correo"
              type="email"
              register={register}
              disabled={isLoading}
            />
          </div>
          <div className="grid gap-1">
            <Label className="sr-only" htmlFor="password">
              Contraseña
            </Label>
            <Input
              id="password"
              label="Password"
              type="password"
              errors={errors}
              disabled={isLoading}
              register={register}
            />
          </div>
         
          <Button
            label="Continue"
            onClick={handleSubmit(onSubmit)}
            disabled={isLoading}
            isLoading={isLoading}
          />

        </div>
      </form>
    </div>
  )
}

export default UserAuthForm;
