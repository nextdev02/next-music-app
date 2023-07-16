"use client"

import uniqid from "uniqid"
import { useState } from 'react';
import { useForm, SubmitHandler, FieldValues } from 'react-hook-form';
import Modal from './Modal'
import useUploadModal from '@/hooks/useUploadModal'
import Input from './Input'

import Button from "./Button";

import { toast } from 'react-hot-toast';

import { useRouter } from "next/navigation";

import { useUser } from '@/hooks/useUser';
import { useSupabaseClient } from "@supabase/auth-helpers-react";





const UploadModal = () => {

    const [isloading, setIsLoading] = useState(false);
    const uploadModal = useUploadModal();
    const supabaseClient = useSupabaseClient();
    const { user } = useUser();
    const router = useRouter();
    

  

    const {
        register,
        handleSubmit,
        reset
    } = useForm<FieldValues>({
        defaultValues: {
            author: '',
            title: '',
            song: null,
            image: null,
        }
    })

    const onChange = (open: boolean) =>  {
        if (!open) {
            //Reset the form
            reset();
            uploadModal.onClose();
        }
    }

    const onSubmit: SubmitHandler<FieldValues> = async (values) => {
        //Upload to database
        try{

            setIsLoading(true);

            const imageFile = values.image?.[0];
            const songFile = values.song?.[0];

            if (!imageFile || !songFile || !user) {
                toast.error('Please fill all fields!');
                return;
            }

            const uniqueID = uniqid();

            // Upload song 
            const {
                data: songData,
                error: songError,
            } = await supabaseClient 
            .storage 
            .from('songs')
            .upload(`song-${values.title}-${uniqueID}`, songFile,  {
                cacheControl: '3600',
                upsert: false
            });
            //  IF any Error 

            if ( songError ) {
                setIsLoading(false);
                return toast.error('Song upload failed!')
            }



            // Upload Image
            const {
                data: imageData,
                error: imageError,
            } = await supabaseClient 
            .storage 
            .from('images')
            .upload(`image-${values.title}-${uniqueID}`, imageFile,  {
                cacheControl: '3600',
                upsert: false
            });

            
            if ( imageError ) {
                setIsLoading(false);
                return toast.error('Image upload failed!')
            }

            const { error: supabaseError } = await supabaseClient
            .from('songs')
            .insert({
              user_id: user.id,
              title: values.title,
              author: values.author,
              image_path: imageData.path,
              song_path: songData.path
            });
    
          if (supabaseError) {
            return toast.error(supabaseError.message);
          }
          
          router.refresh();
          setIsLoading(false);
          toast.success('Upload Successfully!');
          reset();
          uploadModal.onClose();
        } catch (error) {
          toast.error('Something went wrong');
        } finally {
          setIsLoading(false);
        }
      }
    

  return (

    <Modal
        title='Upload a new Song'
        description='Share your favourite song here'
        isOpen={uploadModal.isOpen}
        onChange={onChange}
    >
        <form
            onSubmit={handleSubmit(onSubmit)}
            className='flex flex-col gap-y-4'
        >
            <Input 
                id= "title"
                disabled={isloading}
                {...register('title', { required: true })}
                placeholder= "Song title"
            />

            <Input 
                id= "author"
                disabled={isloading}
                {...register('author', { required: true })}
                placeholder= "Song author"
            />

            <div>
                <div className='pb-1'>
                    Select a file .mp3 
                </div>
                <Input 
                    id= "song"
                    type='file'
                    disabled={isloading}
                    accept='.mp3'
                    {...register('song', { required: true })}
                />
            </div>

            <div>
                <div className='pb-1'>
                    Select an image 
                </div>
                <Input 
                    id= "image"
                    type='file'
                    disabled={isloading}
                    accept='image/*'
                    {...register('image', { required: true })}
                />
            </div>

            <Button disabled={isloading} type="submit">
                Upload
            </Button>



        </form>

    </Modal>
  )
}

export default UploadModal
