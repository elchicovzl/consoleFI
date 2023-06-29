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
            removed.push(images[index]);
            images?.slice(index, 1);
            
            setImagesRemove(removed);
            setImages(images?.filter((img, i) => i !== index));
            //form.setValue("imageMultipleSrc", images?.filter((img, i) => i !== index));
        }
    };

    const destroyImages = () => {
        if (imagesRemove?.length > 0) {
            imagesRemove?.map(img => {
                destroyImageRequest({
                    img,
                    successCallback: () => {},
                    errorCallback: () => {},
                });
            })
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
                    <div className="flex -mx-2">
                        <FormField
                            control={form.control}
                            name="title"
                            render={({ field }) => (
                                <FormItem className="mb-3 w-1/2 px-2">
                                    <FormLabel>Title</FormLabel>
                                    <FormControl>
                                        <Input placeholder="title.." {...field} />  
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="address"
                            render={({ field }) => (
                                <FormItem className="mb-3 w-1/2 px-2">
                                    <FormLabel>Address</FormLabel>
                                    <FormControl>
                                        <Input placeholder="Address.." {...field} />  
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </div>

                    <div className="flex -mx-2">
                        <FormField
                            control={form.control}
                            name="code"
                            render={({ field }) => (
                                <FormItem className="mb-3 w-1/2 px-2">
                                    <FormLabel>Code</FormLabel>
                                    <FormControl>
                                        <Input placeholder="AXSDFG" {...field} />  
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="typeListing"
                            render={({ field }) => (
                                <FormItem className="mb-3 w-1/2 px-2">
                                    <FormLabel>Type</FormLabel>
                                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                                        <FormControl>
                                        <SelectTrigger>
                                            <SelectValue placeholder="Select a type of property" />
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
                                <FormLabel>Description</FormLabel>
                                <FormControl>
                                    <Textarea rows={10} {...field} />  
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <div className="flex -mx-2">
                        <FormField
                            control={form.control}
                            name="roomCount"
                            render={({ field }) => (
                                <FormItem className="mb-3 w-1/3 px-2">
                                    <FormLabel></FormLabel>
                                    <FormControl>
                                        <Counter title="Rooms" subtitle="number of rooms" onChange={field.onChange} value={field.value} />
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
                                    <Counter title="Bathrooms" subtitle="number of bathrooms" onChange={field.onChange} value={field.value} />
            
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
                                    <Counter title="Parking" subtitle="number of parking" onChange={field.onChange} value={field.value} />
            
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
                                    <Counter title="Floor" subtitle="number of floor" onChange={field.onChange} value={field.value} />
            
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
                                    <Counter title="Stratum" subtitle="number of stratum" onChange={field.onChange} value={field.value} />
            
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
                                    <FormLabel>Antique</FormLabel>
                                    <FormControl>
                                        <Input placeholder="de 6 a 8 años." {...field} />  
                                    </FormControl>
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
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </div>
                    <FormField
                        control={form.control}
                        name="imageSrc"
                        render={({ field }) => (
                            <FormItem className="mb-3">
                                <FormLabel>Image</FormLabel>
                                <FormControl>
                                <ImageUpload
                                    onChange={field.onChange}
                                    value={field.value || ""}
                                />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    {isEdit && (
                        <div>
                            <p className="font-medium">Edit Images for Gallery</p>
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
                                <FormLabel className="text-sm">Images for gallery</FormLabel>
                                <FormControl>
                                <ImageUploadMultiple onChange={field.onChange}  value={ field.value } />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />


                    <FormField
                        control={form.control}
                        name="locationValue"
                        render={({ field }) => (
                            <FormItem className="mb-3">
                                <FormLabel>Map for direction of property</FormLabel>
                                <FormControl>
                                    <Map onChange={field.onChange} value={field.value} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <div className="flex -mx-2">
                        <FormField
                            control={form.control}
                            name="price"
                            render={({ field }) => (
                                <FormItem className="mb-3 w-1/2 px-2">
                                    <FormLabel>Price</FormLabel>
                                    <FormControl>
                                        <Input type="number" placeholder="0" {...field} />  
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="administration"
                            render={({ field }) => (
                                <FormItem className="mb-3 w-1/2 px-2">
                                    <FormLabel>Administration</FormLabel>
                                    <FormControl>
                                        <Input type="number" placeholder="0" {...field} />  
                                    </FormControl>
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
                                    <FormLabel>State</FormLabel>
                                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                                        <FormControl>
                                        <SelectTrigger>
                                            <SelectValue placeholder="Select a State" />
                                        </SelectTrigger>
                                        </FormControl>
                                        <SelectContent>
                                            <SelectItem value="Active">Active</SelectItem>
                                            <SelectItem value="Pending">Pending</SelectItem>
                                            <SelectItem value="Expired">Expired</SelectItem>
                                            <SelectItem value="Sold">Sold</SelectItem>
                                        </SelectContent>
                                    </Select>
                                
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                    )}



                    <Button type="submit" onClick={() => destroyImages()} disabled={isLoading}>
                        {isLoading && (
                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        )}
                        
                        {isEdit ? 'Edit' : 'Create'} property
                    </Button>
                </form>
            </Form>
        </div>
    );
}
 
export default PropertyForm;