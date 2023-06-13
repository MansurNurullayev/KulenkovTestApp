import { Form, Post, PostFunc, addPost, getList } from "@/api/posts";

import { debounce } from "@/plugins/helpers";
import { useRoute, useRouter } from "vue-router";

import { Ref, computed, ref, watch } from "vue";

export const useFetch = () => {
  const route = useRoute();
  const router = useRouter();

  const posts: Ref<Post[]> = ref([]);

  const page = computed({
    get: () => parseInt(String(route.query.page)) || 1,
    set: (page) => router.replace({ query: { ...route.query, page } }),
  });
  const sortBy = computed({
    get: () => String(route.query.sortBy) || null,
    set: (sortBy) => router.replace({ query: { ...route.query, sortBy } }),
  });
  const loading = ref(false);

  const fetch = async () => {
    try {
      loading.value = true;
      const response = await getList(page.value, sortBy.value);
      posts.value = response.data;
    } catch (e) {
      console.log(e);
    } finally {
      loading.value = false;
    }
  };

  const debouncedFetch = debounce(fetch);
  watch([sortBy, page], ([newSort], [oldSort]) => {
    if (newSort !== oldSort) page.value = 1;
    debouncedFetch();
  });

  const clearFilters = () => {
    page.value = 1;
    sortBy.value = null;
  };

  return { posts, page, sortBy, loading, fetch, clearFilters };
};

export const useModal = (fetch: () => void, clearFilters: () => void) => {
  const modal = ref(false);
  const id: Ref<number | undefined> = ref();
  const submitFunc: Ref<PostFunc> = ref(addPost);
  const initialData: Ref<Form | undefined> = ref();

  const showModal = (func: PostFunc, data?: Form, idValue?: number) => {
    initialData.value = data;
    id.value = idValue;
    submitFunc.value = func;

    modal.value = true;
  };

  const onSuccess = () => {
    clearFilters();
    fetch();
    modal.value = false;
  };

  return { modal, id, submitFunc, initialData, showModal, onSuccess };
};
