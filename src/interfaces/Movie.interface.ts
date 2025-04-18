export interface Movie {
  title?: string | null;
  rating?: number | null;
  description?: string | null;
  director?: string | null;
  genre?: string | null;
  stars?: string[] | null;
  poster?: string | null;
  createdAt?: Date | null;
  updatedAt?: Date | null;
}
