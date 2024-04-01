
export interface NewsResponseInterface {
  id?: string | null;
  source?: string | null;
  author?: string | null;
  title: string;
  description: string;
  url?: string;
  imageUrl: string;
  date?: string;
}
export interface NewsApiResponse {
  uri: string;
  source: { title: string };
  author: { name: string };
  title: string;
  body: string;
  url: string;
  image: string;
  date: string;
};