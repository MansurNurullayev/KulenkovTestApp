import api from "@/plugins/api";

export type Post = {
  body: string;
  id: number;
  title: string;
  userId: number;
};
export const getList = (page: number, sortBy: string | null = null) =>
  api.get<Post[]>("/posts", {
    params: {
      _page: page,
      _sort: sortBy,
    },
  });

export type Form = {
  body: string | null;
  title: string | null;
  userId: number;
};
export const addPost = (form: Form) => api.post<Post>("/posts", form);
export const editPost = (form: Form, id: number) =>
  api.put<Post>(`/posts/${id}`, form);
export const deletePost = (id: number) => api.delete<Post>(`/posts/${id}`);

type editPostFunc = (form: Form, id: number) => Promise<unknown>;
type addPostFunc = (form: Form) => Promise<unknown>;
export type PostFunc = addPostFunc | editPostFunc;
