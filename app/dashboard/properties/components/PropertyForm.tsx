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
import { Textarea } from "@/components/ui/textarea";
import ImageUpload from "@/components/ImageUpload";
import ImageUploadMultiple from "@/components/ImageUploadMultiple";
import Counter from "@/components/Counter";
import { 
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue, 
  } from "@/components/ui/select";

import { toast } from "@/components/ui/use-toast";
import { Button } from "@/components/ui/ButtonUI";
import { Loader2 } from "lucide-react";
import {
    FieldValues,
    SubmitHandler,
} from 'react-hook-form';

import {
    destroyImageRequest
  } from "@/cloudinary/cloudinaryHelper";

import { useCallback, useEffect, useMemo, useState } from "react";
import dynamic from 'next/dynamic';
import { propertyFormSchema } from "../data/schema";
import ImageViewer from 'react-simple-image-viewer';
import { Trash2 } from 'lucide-react';

type PropertyFormValues = z.infer<typeof propertyFormSchema>

interface PropertyFormProps {
    propertyFormValues: Partial<PropertyFormValues>
    onSubmit: SubmitHandler<PropertyFormValues>
    isLoading: boolean
    isEdit: boolean
    images: Array<string>
    setImages: any
}

const PropertyForm = ({ propertyFormValues, onSubmit, isLoading, isEdit, images, setImages}: PropertyFormProps) => {
    const [location, setLocation] = useState([propertyFormValues.locationValue]);
    //const [images, setImages] = useState<Array<string> | undefined>(propertyFormValues.imageMultipleSrc);
    const [imagesRemove, setImagesRemove] = useState<Array<string> | undefined>([]);

    if (isEdit) {
        propertyFormValues.imageMultipleSrc = [];
    }

    const defaultValues = propertyFormValues;

    const form = useForm<PropertyFormValues>({
        resolver: zodResolver(propertyFormSchema),
        defaultValues,
        mode: "onChange",
    });

    const Map = useMemo(() => dynamic(() => import('@/components/Map'), {
        ssr: false 
    }), [location]);

    const [currentImage, setCurrentImage] = useState(0);
    const [isViewerOpen, setIsViewerOpen] = useState(false);
    const openImageViewer = useCallback((index:any) => {
        setCurrentImage(index);
        setIsViewerOpen(true);
    }, []);

    const removeImage = (index:number) => {
        if (index > -1) {
            const removed = [];
            if (images != undefined) {
                removed.push(images[index]);
                images?.slice(index, 1);
                setImagesRemove(removed);
                setImages(images?.filter((img, i) => i !== index));
            }
        }
    };

    const destroyImages = () => {
        if (imagesRemove != undefined) {
            if (imagesRemove.length  > 0) {
                imagesRemove?.map(img => {
                    destroyImageRequest({
                        img,
                        successCallback: () => {},
                        errorCallback: () => {},
                    });
                })
            }
        }
    } 

    const closeImageViewer = () => {
        setCurrentImage(0);
        setIsViewerOpen(false);
    };

    return (
        <div>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="flex-1">
                    <div className="flex -mx-2 mb-5">
                        <FormField
                            control={form.control}
                            name="title"
                            render={({ field }) => (
                                <FormItem className="mb-3 w-1/2 px-2">
                                    <FormLabel>Título</FormLabel>
                                    <FormControl>
                                        <Input placeholder="título.." {...field} />  
                                    </FormControl>
                                    <FormDescription className="text-xs">
                                        Campo para agregar el título de la propiedad, se mostrara al acceder al perfil de la propiedad.
                                    </FormDescription>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="address"
                            render={({ field }) => (
                                <FormItem className="mb-3 w-1/2 px-2">
                                    <FormLabel>Dirección</FormLabel>
                                    <FormControl>
                                        <Input placeholder="Dirección.." {...field} />  
                                    </FormControl>
                                    <FormDescription className="text-xs">
                                        Campo para agregar la Dirección de la proiedad.
                                    </FormDescription>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </div>

                    <div className="flex -mx-2 mb-5">
                        <FormField
                            control={form.control}
                            name="code"
                            render={({ field }) => (
                                <FormItem className="mb-3 w-1/2 px-2">
                                    <FormLabel>Codigo</FormLabel>
                                    <FormControl>
                                        <Input placeholder="AXSDFG.." {...field} />  
                                    </FormControl>
                                    <FormDescription className="text-xs">
                                        Campo para agregar el codigo de la propiedad es usado para identificar la propiedad.
                                    </FormDescription>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="typeListing"
                            render={({ field }) => (
                                <FormItem className="mb-3 w-1/2 px-2">
                                    <FormLabel>Tipo de propiedad</FormLabel>
                                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                                        <FormControl>
                                        <SelectTrigger>
                                            <SelectValue placeholder="Selecciona un tipo de propiedad" />
                                        </SelectTrigger>
                                        </FormControl>
                                        <SelectContent>
                                        <SelectItem value="Apartamento">Apartamento</SelectItem>
                                        <SelectItem value="Apartaestudio">Apartaestudio</SelectItem>
                                        <SelectItem value="Casa">Casa</SelectItem>
                                        <SelectItem value="Finca">Finca</SelectItem>
                                        <SelectItem value="Habitacion">Habitacion</SelectItem>
                                        <SelectItem value="Lote">Lote</SelectItem>
                                        <SelectItem value="Bodega">Bodega</SelectItem>
                                        <SelectItem value="Local">Local</SelectItem>
                                        <SelectItem value="Oficina">Oficina</SelectItem>
                                        <SelectItem value="Edificio">Edificio</SelectItem>
                                        <SelectItem value="Parqueadero">Parqueadero</SelectItem>
                                        </SelectContent>
                                    </Select>
                                    <FormDescription className="text-xs">
                                        El tipo de propidad ayuda a la busqueda de propiedades a travez de su filtro por tipo.
                                    </FormDescription>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </div>
                    <FormField
                        control={form.control}
                        name="description"
                        render={({ field }) => (
                            <FormItem className="mb-3">
                                <FormLabel>Descripción</FormLabel>
                                <FormControl>
                                    <Textarea rows={10} {...field} />  
                                </FormControl>
                                <FormDescription className="text-xs">
                                    Campo de descripción de la propiedad, donde se describe mayores razgos de la propiedad, que no se encuentren visibles en la data suministrada en el formulario.
                                </FormDescription>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <hr className="mt-5" />
                    <h2 className="mt-5 font-bold text-xl mb-5">Características</h2>
                    
                    <div className="flex -mx-2 mt-5">
                        <FormField
                            control={form.control}
                            name="roomCount"
                            render={({ field }) => (
                                <FormItem className="mb-3 w-1/3 px-2">
                                    <FormLabel></FormLabel>
                                    <FormControl>
                                        <Counter title="Habitaciones" subtitle="Número de habitaciones" onChange={field.onChange} value={field.value ?? 0} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="bathroomCount"
                            render={({ field }) => (
                                <FormItem className="mb-3 w-1/3 px-2">
                                    <FormLabel></FormLabel>
                                    <FormControl>
                                    <Counter title="Baños" subtitle="Número de baños" onChange={field.onChange} value={field.value ?? 0} />
            
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="parking"
                            render={({ field }) => (
                                <FormItem className="mb-3 w-1/3 px-2">
                                    <FormLabel></FormLabel>
                                    <FormControl>
                                    <Counter title="Parqueadero" subtitle="Número de parqueaderos" onChange={field.onChange} value={field.value ?? 0} />
            
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </div>
                    <div className="flex -mx-2">
                        <FormField
                            control={form.control}
                            name="floor"
                            render={({ field }) => (
                                <FormItem className="mb-3 w-1/3 px-2">
                                    <FormLabel></FormLabel>
                                    <FormControl>
                                    <Counter title="Pisos" subtitle="Número de pisos" onChange={field.onChange} value={field.value ?? 0} />
            
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="stratum"
                            render={({ field }) => (
                                <FormItem className="mb-3 w-1/3 px-2">
                                    <FormLabel></FormLabel>
                                    <FormControl>
                                    <Counter title="Estrato" subtitle="Número de estrato" onChange={field.onChange} value={field.value ?? 0} />
            
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </div>
                    <div className="flex -mx-2">
                        <FormField
                            control={form.control}
                            name="antique"
                            render={({ field }) => (
                                <FormItem className="mb-3 w-1/3 px-2">
                                    <FormLabel>Antiguedad</FormLabel>
                                    <FormControl>
                                        <Input placeholder="de 1 a 8 años..." {...field} />  
                                    </FormControl>
                                    <FormDescription className="text-xs">
                                        Años desde que se Construyo la propiedad.
                                    </FormDescription>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="area"
                            render={({ field }) => (
                                <FormItem className="mb-3 w-1/3 px-2">
                                    <FormLabel>Area</FormLabel>
                                    <FormControl>
                                        <Input type="number" placeholder="0" {...field} />  
                                    </FormControl>
                                    <FormDescription className="text-xs">
                                        Area en metros cuadrados de la propiedad.
                                    </FormDescription>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </div>
                    <hr className="mt-5" />
                    <h2 className="mt-5 font-bold text-xl mb-5">Multimedia</h2>
                    <FormField
                        control={form.control}
                        name="imageSrc"
                        render={({ field }) => (
                            <FormItem className="mb-3">
                                <FormLabel>Imagen principal</FormLabel>
                                <FormControl>
                                <ImageUpload
                                    onChange={field.onChange}
                                    value={field.value || ""}
                                />
                                </FormControl>
                                <FormDescription className="text-xs">
                                    Campo para la imagen principal, esta imagen se visualiza en el inicio de la pagina, seccion de listado de propiedades, ideal que sean imagenes mayores a 400x400.
                                </FormDescription>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    {isEdit && (
                        <div>
                            <p className="font-medium">Editar imagenes para galeria</p>
                            <div className="flex">
                                {images?.map((src, index) => (
                                    <div className="relative ">
                                        <span onClick={() => {removeImage(index)}} className="absolute top-[2px] right-[2px] z-10 bg-black bg-opacity-60 cursor-pointer p-1"><Trash2 width={15} className="text-white hover:text-red-600" /></span>
                                        <img
                                        src={ src }
                                        onClick={ () => openImageViewer(index) }
                                        
                                        className="bg-cover bg-center w-36 h-28 bg-blend-overlay"
                                        key={ index }
                                        style={{ margin: '2px' }}
                                        alt=""
                                        />
                                    </div>
                                    
                                ))}

                                {isViewerOpen && (
                                    <ImageViewer
                                    src={ images || [] }
                                    currentIndex={ currentImage }
                                    disableScroll={ false }
                                    closeOnClickOutside={ true }
                                    onClose={ closeImageViewer }
                                    />
                                )}
                            </div>
                        </div>
                    )}
                    
                    <FormField
                        control={form.control}
                        name="imageMultipleSrc"
                        render={({ field }) => (
                            <FormItem className="mb-3">
                                <FormLabel className="text-sm">Imágenes para la galería</FormLabel>
                                <FormControl>
                                <ImageUploadMultiple onChange={field.onChange}  value={ field.value ?? []} />
                                </FormControl>
                                <FormDescription className="text-xs">
                                    Campo multiple para la imagenes de la galeria, estas imagenes se muestran en el perfil de la propiedad, ideal que sean imagenes mayores a 400x400 .
                                </FormDescription>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name="locationValue"
                        render={({ field }) => (
                            <FormItem className="mb-3">
                                <FormLabel>Mapa para ubicar la propiedad</FormLabel>
                                <FormControl>
                                    <Map onChange={field.onChange} value={field.value} />
                                </FormControl>
                                <FormDescription className="text-xs">
                                    Mapa donde puede mover y ubicar la propiedad, se muestra en el perfil de propiedad y da mejor visibilidad para el cliente.
                                </FormDescription>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <hr className="mt-5" />
                    <h2 className="mt-5 font-bold text-xl mb-5">Precios y administración</h2>
                    <div className="flex -mx-2">
                        <FormField
                            control={form.control}
                            name="price"
                            render={({ field }) => (
                                <FormItem className="mb-3 w-1/2 px-2">
                                    <FormLabel>Precio de la propiedad</FormLabel>
                                    <FormControl>
                                        <Input type="number" placeholder="0" {...field} />  
                                    </FormControl>
                                    <FormDescription className="text-xs">
                                        Campo para agregar el precio de venta de la propiedad.
                                    </FormDescription>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="administration"
                            render={({ field }) => (
                                <FormItem className="mb-3 w-1/2 px-2">
                                    <FormLabel>Administracion</FormLabel>
                                    <FormControl>
                                        <Input type="number" placeholder="0" {...field} />  
                                    </FormControl>
                                    <FormDescription className="text-xs">
                                        Campo para agregar el precio de la administracion donde se esta la propiedad(si esto lo requiere).
                                    </FormDescription>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </div>

                    {isEdit && (

                        <FormField
                            control={form.control}
                            name="state"
                            render={({ field }) => (
                                <FormItem className="mb-3 w-1/2 px-2">
                                    <FormLabel>Estatus de la propiedad</FormLabel>
                                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                                        <FormControl>
                                        <SelectTrigger>
                                            <SelectValue placeholder="Select a State" />
                                        </SelectTrigger>
                                        </FormControl>
                                        <SelectContent>
                                            <SelectItem value="Active">Publicado</SelectItem>
                                            <SelectItem value="Pending">Pendiente</SelectItem>
                                            <SelectItem value="Expired">Expirado</SelectItem>
                                            <SelectItem value="Sold">Vendido</SelectItem>
                                            <SelectItem value="Deleted">Eliminado</SelectItem>
                                        </SelectContent>
                                    </Select>
                                    <FormDescription className="text-xs">
                                        Campo para ver el estatus que se encuentra del inmueble publicado.
                                    </FormDescription>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                    )}



                    <Button className="mt-10" type="submit" onClick={() => destroyImages()} disabled={isLoading}>
                        {isLoading && (
                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        )}
                        
                        {isEdit ? 'Edita' : 'Crear'} propiedad
                    </Button>
                </form>
            </Form>
        </div>
    );
}
 
export default PropertyForm;