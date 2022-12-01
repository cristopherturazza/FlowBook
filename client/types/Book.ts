export interface Book {
  _id: string;
  isbn?: string;
  title: string;
  status: string;
  year: string;
  category: string;
  cover?: string;
  removeBook: (id: string) => void;
}
