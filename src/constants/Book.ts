export interface Book {
  id: string;
  title?: string;
  authors?: string[];
  isbn?: string;
  language?: string;
  pageCount?: number;
  genres?: string[];
  description?: string;
  status?: 'read' | 'not read';
  rating?: number;
  dateStarted?: string;
  dateFinished?: string;
  review?: string;
  coverImageUrl?: string;
}