import { useForm } from "react-hook-form";
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
  } from "@/components/react-hook-form/form";

import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Input } from "@/components/ui/InputUI";
import { 
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue, 
} from "@/components/ui/select";
import { Button } from "@/components/ui/ButtonUI";
import { Loader2 } from "lucide-react";
import {
    FieldValues,
    SubmitHandler,
} from 'react-hook-form';

import { userFormSchema, userFormEditSchema } from "../data/schema";

type UserFormValues = z.infer<typeof userFormSchema>

interface UserFormProps {
    propertyFormValues: Partial<UserFormValues>
    onSubmit: SubmitHandler<UserFormValues>
    isLoading: boolean
    isEdit: boolean
}

const UserForm = ({ propertyFormValues, onSubmit, isLoading, isEdit}: UserFormProps) => {

    const defaultValues = propertyFormValues;
    const form = useForm<UserFormValues>({
        resolver: (isEdit) ? zodResolver(userFormEditSchema) : zodResolver(userFormSchema),
        defaultValues,
        mode: "onChange",
    });

    return (
        <div>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="flex-1">
                    <div className="flex -mx-2">
                        <FormField
                            control={form.control}
                            name="name"
                            render={({ field }) => (
                                <FormItem className="mb-3 w-1/2 px-2">
                                    <FormLabel>Nombre</FormLabel>
                                    <FormControl>
                                        <Input placeholder="name.." {...field} />  
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="email"
                            render={({ field }) => (
                                <FormItem className="mb-3 w-1/2 px-2">
                                    <FormLabel>Correo eléctronico</FormLabel>
                                    <FormControl>
                                        <Input placeholder="correo eléctronico.." {...field} />  
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </div>
                    <div className="flex -mx-2">
                        <FormField
                            control={form.control}
                            name="password"
                            render={({ field }) => (
                                <FormItem className="mb-3 w-1/2 px-2">
                                    <FormLabel>Contraseña</FormLabel>
                                    <FormControl>
                                        <Input type="password" placeholder="" {...field} />  
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="confirmPassword"
                            render={({ field }) => (
                                <FormItem className="mb-3 w-1/2 px-2">
                                    <FormLabel>Confirmar contraseña</FormLabel>
                                    <FormControl>
                                        <Input type="password" placeholder="    " {...field} />  
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </div>
                    <div className="flex -mx-2 mb-4">
                        <FormField
                            control={form.control}
                            name="role"
                            render={({ field }) => (
                                <FormItem className="mb-3 w-1/2 px-2">
                                    <FormLabel>Rol</FormLabel>
                                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                                        <FormControl>
                                        <SelectTrigger>
                                            <SelectValue placeholder="Select a role for user" />
                                        </SelectTrigger>
                                        </FormControl>
                                        <SelectContent>
                                            <SelectItem value="Admin">Administrador</SelectItem>
                                            <SelectItem value="Publisher">Publicador</SelectItem>
                                        </SelectContent>
                                    </Select>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </div>
                    <Button type="submit" disabled={isLoading}>
                        {isLoading && (
                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        )}
                        
                        {isEdit ? 'Editar' : 'Crear'} usuario
                    </Button>
                </form>
            </Form>
        </div>
    )
}

export default UserForm;