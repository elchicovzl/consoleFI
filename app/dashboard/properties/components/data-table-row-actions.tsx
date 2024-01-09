"use client"

import { Row } from "@tanstack/react-table";
import { Copy, MoreHorizontal, Pen, Star, Tags, Trash, CheckCircle2 } from "lucide-react";
import axios from "axios";
import { toast } from "@/components/ui/use-toast";

import { Button } from "@/components/ui/ButtonUI";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

import { labels } from "../data/data";
import { listingSchema } from "../data/schema";
import { useRouter } from "next/navigation";
import { useCallback, useState } from "react";

interface DataTableRowActionsProps<TData> {
  row: Row<TData>
}

export function DataTableRowActions<TData>({
  row,
}: DataTableRowActionsProps<TData>) {
  const task = listingSchema.parse(row.original)
  const [isLoading, setIsLoading] = useState(false);

  const router = useRouter();

  const handleSubmit = useCallback(() => {
    setIsLoading(true);
    axios.post(`/api/listings/${task.id}/publish`)
    .then(() => {
       toast({
            title: "Propiedad Publicada!",
        })
        router.refresh()
        router.push('/dashboard/properties')
    })
    .catch(() => {
         toast({
            variant: "destructive",
            title: "Uh oh! Something went wrong.",
            description: "There was a problem with your request.",
        })
    }).finally(() => {
        setIsLoading(false);
    })
  }, []);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          className="flex h-8 w-8 p-0 data-[state=open]:bg-muted"
        >
          <MoreHorizontal className="h-4 w-4" />
          <span className="sr-only">Abrir menu</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-[160px]">
        <DropdownMenuItem onClick={handleSubmit}>
          <CheckCircle2 className="mr-2 h-3.5 w-3.5 text-muted-foreground/70" />
          Publicar
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => { router.refresh(), router.push(`/dashboard/properties/${task.id}/edit`)}}>
          <Pen className="mr-2 h-3.5 w-3.5 text-muted-foreground/70" />
          Editar
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        
        <DropdownMenuItem>
          <Trash className="mr-2 h-3.5 w-3.5 text-muted-foreground/70" />
          Eliminar
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}