export interface userBook {
  id: string;
  title: string;
  key: string;
  cover?: string;
  removeBook: (id: string) => void;
}
