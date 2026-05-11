export type User = {
  id: number;
  name: string;
  email: string;
  role: string;
};

export type UserList = { 
  data: User[],
  pagination?: {
    currentPage: number;
    totalPages: number;
  }
};

export type UserFilters = {
  name?: string;
  email?: string;
  role?: string;
  page?: number;
};