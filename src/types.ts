export interface User {
  id: string;
  username: string;
}

export interface Note {
  id: string;
  userId: string;
  title: string;
  content: string;
  tags: string[];
  category: string;
  isFavorite: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface AuthState {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
}

export interface NotesState {
  notes: Note[];
  search: string;
  category: string;
  sortBy: "createdAt" | "updatedAt" | "title";
  viewMode: "list" | "grid";
}
