'use client';

import FormDatePicker from '@/src/components/form/FormDatePicker';
import FormInput from '@/src/components/form/FormInput';
import FormSelect from '@/src/components/form/FormSelect';
import { AddIcon, Cancle } from '@/src/components/icons';
import dateToIso from '@/src/utils/dateToISO';
import { Button } from '@nextui-org/button';
import { Divider } from '@nextui-org/divider';
import { allDistict } from '@bangladeshi/bangladesh-address';
import React, { ChangeEvent } from 'react';
import {
  FieldValues,
  FormProvider,
  SubmitHandler,
  useFieldArray,
  useForm,
} from 'react-hook-form';
import { useAllCategory } from '@/src/hooks/category.hook';
import { ICategory } from '@/src/types';
import FormTextarea from '@/src/components/form/FormTextarea';
import { useUser } from '@/src/context/user.provider';
import { useCreatePost } from '@/src/hooks/post.hook';
import Loading from '@/src/components/ui/Loading';

const options = allDistict()
  .sort()
  .map((city: string) => ({ key: city, label: city }));

export default function page() {
  const [imageFiles, setImageFiles] = React.useState<File[] | []>([]);
  const [imagePreviews, setImagePreviews] = React.useState<string[] | []>([]);
  const { user } = useUser();
  const {
    mutate: handleCreatePost,
    isPending: createPostLoading,
    isSuccess: createPostSuccess,
  } = useCreatePost();
  const methods = useForm();
  const { control, handleSubmit, reset } = methods;
  const { append, fields, remove } = useFieldArray({
    control,
    name: 'questions',
  });

  const {
    data: categoriesData,
    isLoading: categoryLoading,
    isSuccess: categorySuccess,
  } = useAllCategory();

  let categoryOptions = [];

  if (categoriesData?.data && !categoryLoading) {
    categoryOptions = categoriesData?.data
      ?.sort()
      .map((category: ICategory) => ({
        key: category._id,
        label: category.name,
      }));
  }

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    const formData = new FormData();
    const postData = {
      ...data,
      questions: data.questions.map(
        (question: { value: string }) => question.value
      ),

      dateFound: dateToIso(data.dateFound),
      user: user?._id,
    };

    formData.append('data', JSON.stringify(postData));

    for (let image of imageFiles) {
      formData.append('itemImages', image);
    }

    handleCreatePost(formData, {
      onSuccess: () => {
        // Reset the form and clear images on success
        reset();
        setImageFiles([]);
        setImagePreviews([]);
      },
    });
    // handleCreatePost(formData);

    // if (createPostSuccess) {
    //   reset();
    //   setImageFiles([]);
    //   setImagePreviews([]);
    // }
  };

  const handleQuestionAppend = () => {
    append({ name: 'questions' });
  };

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files![0];

    setImageFiles((prev) => [...prev, file]);

    if (file) {
      const reader = new FileReader();

      reader.onloadend = () => {
        setImagePreviews((prev) => [...prev, reader.result as string]);
      };

      reader.readAsDataURL(file);
    }
  };

  return (
    <>
      {createPostLoading && <Loading />}
      <div className='h-full rounded-xl bg-gradient-to-b from-default-100 px-12 md:px-[73px] py-12'>
        <h1 className='text-2xl font-semibold'>Post a found item</h1>
        <Divider className='mb-5 mt-3' />
        <FormProvider {...methods}>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className='flex flex-wrap gap-2 py-2'>
              <div className='min-w-fit flex-1'>
                <FormInput label='Title' name='title' />
              </div>
              <div className='min-w-fit flex-1'>
                <FormDatePicker name='dateFound' label='Found Date' />
              </div>
            </div>
            <div className='flex flex-wrap gap-2 py-2'>
              <div className='min-w-fit flex-1'>
                <FormInput label='Location' name='location' />
              </div>
              <div className='min-w-fit flex-1'>
                <FormSelect
                  options={options}
                  label='Select a city'
                  name='city'
                />
              </div>
            </div>
            <div className='flex flex-wrap gap-2 py-2'>
              <div className='min-w-fit flex-1'>
                <FormSelect
                  options={categoryOptions}
                  label='Select a categroy'
                  name='category'
                  disabled={!categorySuccess}
                />
              </div>
              <div className='min-w-fit flex-1'>
                <label
                  className='flex h-14 text-sm w-full cursor-pointer pt-4 pl-3 rounded-xl border-2 border-default-200 text-default-500 shadow-sm transition-all duration-100 hover:border-default-400'
                  htmlFor='image'
                >
                  Upload Image
                </label>
                <input
                  multiple
                  className='hidden'
                  type='file'
                  id='image'
                  name='image'
                  onChange={handleImageChange}
                />
              </div>
            </div>

            {imagePreviews.length > 0 && (
              <div className='flex gap-8 my-5 flex-wrap'>
                {imagePreviews.map((imageDataUrl) => (
                  <div
                    key={imageDataUrl}
                    className='relative size-48 rounded-xl border-2 border-dashed border-default-300 p-2'
                  >
                    <img
                      alt='item'
                      className='h-full w-full object-cover object-center rounded-md'
                      src={imageDataUrl}
                    />
                  </div>
                ))}
              </div>
            )}

            <div className='flex flex-wrap-reverse gap-2 py-2'>
              <div className='min-w-fit flex-1'>
                <FormTextarea label='Description' name='description' />
              </div>
            </div>

            <Divider className='mt-5 mb-3' />
            <div className='flex justify-between items-center'>
              <h2>Owner verification questions</h2>
              <Button isIconOnly onClick={() => handleQuestionAppend()}>
                <AddIcon />
              </Button>
            </div>
            <Divider className='mt-3 mb-5' />

            {fields.map((field, index) => (
              <div key={field.id} className='relative mb-5'>
                <FormInput label='Question' name={`questions.${index}.value`} />
                <button
                  className='absolute right-4 top-4'
                  onClick={() => remove(index)}
                >
                  <Cancle />
                </button>
              </div>
            ))}

            <Button type='submit'>Post</Button>
          </form>
        </FormProvider>
      </div>
    </>
  );
}
