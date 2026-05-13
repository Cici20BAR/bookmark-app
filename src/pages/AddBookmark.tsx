import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useNavigate } from 'react-router-dom';

import { useBookmarks } from '../context/BookmarkContext';
import { Input } from '../ui/Input';
import { Textarea } from '../ui/Textarea';
import { Tags } from '../components/Tags'; 
import { bookmarkSchema, type BookmarkFormData } from '../Schemas/bookmark';
import { Button } from '../ui/Button';

export function AddBookmarkPage() {
  const { addBookmark } = useBookmarks();
  const [tags, setTags] = useState<string[]>([]);
  const navigate = useNavigate();

  const {
    register,
    setValue,
    handleSubmit,
    formState: { errors },
  } = useForm<BookmarkFormData>({
    resolver: zodResolver(bookmarkSchema),
    defaultValues: { tags: [] }
  });

  const handleInputChange = (newTags: string[]) => {
    setTags(newTags);
    setValue("tags", newTags, { shouldValidate: true });
  }

  const onSubmit = (data: BookmarkFormData) => {
    addBookmark(data);
    navigate('/');
  }

  const onCancel = () => {
    navigate('/'); 
  };

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white shadow-md rounded-2xl mt-10">
      <h2 className="text-2xl font-bold mb-6 text-slate-800">Add New Bookmark</h2>
      
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        
        <Input 
          label="Titlu"
          placeholder="Introdu numele bookmark-ului"
          error={errors.title?.message}
          {...register("title")}
        />
        
        <Input
          label="URL"
          placeholder="Introdu un URL"
          error={errors.url?.message}
          {...register("url")}
        />
        
        <Textarea 
          label="Description"
          placeholder="Descriere optionala (max 200 cuvinte)"
          error={errors.description?.message}
          rows={4}
          {...register("description")} 
        />
        
        <div className="flex flex-col gap-1.5 w-full max-w-7xl">
          <Tags tags={tags} setTags={handleInputChange} />
          
          {errors.tags && (
            <span className="text-xs text-red-500 font-medium mt-1">
              {errors.tags.message}
            </span>
          )}
        </div>

        <div className="flex gap-4 pt-4">
          <Button 
            type="submit" 
            isAdd={true}
            
          >
            Save Bookmark
          </Button>
          
          <button 
            type="button" 
            onClick={onCancel}
            className="bg-slate-100 text-slate-700 px-6 py-2.5 rounded-2xl hover:bg-slate-200 transition-colors font-medium border border-slate-300"
          >
            Cancel
          </button>
        </div>
        
      </form> 
    </div>
  );
}