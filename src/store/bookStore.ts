import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { zustandStorage } from './storage';
import { Book } from '@/constants/Book'; 

interface BookState {
  books: Book[];
  addBook: (book: Book) => void;
  removeBook: (id: string) => void;
  updateBook: (id: string, updatedData: Partial<Book>) => void;
  getBookById: (id: string) => Book | undefined;
}

export const useBookStore = create<BookState>()(
  persist(
    (set, get) => ({
      books: [],

      addBook: (newBook) => 
        set((state) => ({ 
          books: [newBook, ...state.books]
        })),

      removeBook: (id) => 
        set((state) => ({ 
          books: state.books.filter((book) => book.id !== id) 
        })),

      updateBook: (id, updatedData) => 
        set((state) => ({
          books: state.books.map((book) => 
            book.id === id ? { ...book, ...updatedData } : book
          ),
        })),
    
      getBookById: (id) => get().books.find((b) => b.id === id),
    }),
    {
      name: 'book-store', 
      storage: createJSONStorage(() => zustandStorage), 
    }
  )
);