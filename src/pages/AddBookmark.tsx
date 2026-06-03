import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useNavigate, useParams } from 'react-router-dom';

import { useBookmarks } from '../context/BookmarkContext';
import { Input } from '../ui/Input';
import { Textarea } from '../ui/Textarea';
import { Tags } from '../components/Tags'; 
import { bookmarkSchema, type BookmarkFormData } from '../Schemas/bookmark';
import { Button } from '../ui/Button';

export function AddBookmarkPage() {
  const { addBookmark, updateBookmark, bookmarks } = useBookmarks();
  const [tags, setTags] = useState<string[]>([]);
  const navigate = useNavigate();
  const { bookmarkId } = useParams();
  const bookmarkToEdit = bookmarkId
    ? bookmarks.find((bookmark) => bookmark.id === bookmarkId)
    : undefined;
  const isEditing = Boolean(bookmarkId);

  const {
    register,
    setValue,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<BookmarkFormData>({
    resolver: zodResolver(bookmarkSchema),
    defaultValues: {
      title: bookmarkToEdit?.title ?? "",
      url: bookmarkToEdit?.url ?? "",
      description: bookmarkToEdit?.description ?? "",
      tags: bookmarkToEdit?.tags ?? [],
    }
  });

  useEffect(() => {
    if (!bookmarkToEdit) return;

    const initialTags = bookmarkToEdit.tags ?? [];
    setTags(initialTags);
    reset({
      title: bookmarkToEdit.title,
      url: bookmarkToEdit.url,
      description: bookmarkToEdit.description ?? "",
      tags: initialTags,
    });
  }, [bookmarkToEdit, reset]);

  const handleInputChange = (newTags: string[]) => {
    setTags(newTags);
    setValue("tags", newTags, { shouldValidate: true });
  }

  const onSubmit = (data: BookmarkFormData) => {
    if (bookmarkToEdit) {
      updateBookmark(bookmarkToEdit.id, data);
    } else {
      addBookmark(data);
    }

    navigate('/');
  }

  const onCancel = () => {
    navigate('/'); 
  };

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white dark:bg-slate-900 shadow-md dark:shadow-xl border border-transparent dark:border-slate-800 rounded-2xl mt-10 transition-all duration-300">
      
      <h2 className="text-2xl font-bold mb-6 text-slate-800 dark:text-slate-100">
        {isEditing ? "Edit Bookmark" : "Add New Bookmark"}
      </h2>
      
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        
        <Input 
          label="Titlu"
          placeholder="Introdu numele bookmark-ului"
          error={errors.title?.message}
          {...register("title")}
        />
        
        <Input
          label="URL"
          placeholder="Introdu un URL (de exemplu example.com)"
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
            {isEditing ? "Save Changes" : "Save Bookmark"}
          </Button>
          
          <button 
            type="button" 
            onClick={onCancel}
            className="bg-slate-100 text-slate-700 hover:bg-slate-200 border-slate-300 dark:bg-slate-800 dark:text-slate-300 dark:hover:bg-slate-700 dark:border-slate-700 px-6 py-2.5 rounded-2xl transition-colors font-medium border text-sm"
          >
            Cancel
          </button>
        </div>
        
      </form> 
    </div>
  );
}
