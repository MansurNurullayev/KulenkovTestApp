<template>
  <v-overlay v-model="modal" class="align-center justify-center">
    <form-modal
      :submit-func="submitFunc"
      :id="id"
      :data="initialData"
      @success="onSuccess"
    />
  </v-overlay>

  <v-row>
    <v-col>
      <home-header
        v-model:page="page"
        v-model:sort-by="sortBy"
        :loading="loading"
        @add-button="showModal(addPost)"
      />
    </v-col>
  </v-row>

  <v-row v-if="!loading">
    <v-col v-for="item in posts" :key="item.id" md="4">
      <post-card
        v-bind="item"
        @edit="(data) => showModal(editPost, data.form, data.id)"
        @remove="remove"
      ></post-card>
    </v-col>
  </v-row>
  <div v-else class="text-center text-subtitle-1 py-10">Loading...</div>
</template>

<script lang="ts" setup>
import PostCard from "@/components/PostCard.vue";
import FormModal from "@/components/FormModal.vue";
import HomeHeader from "@/components/HomeHeader.vue";

import { addPost, deletePost, editPost } from "@/api/posts";

import { useFetch, useModal } from "./home";

import { onMounted } from "vue";

const { posts, page, sortBy, loading, fetch, clearFilters } = useFetch();
const { modal, id, submitFunc, initialData, showModal, onSuccess } = useModal(
  fetch,
  clearFilters
);

const remove = async (id: number) => {
  try {
    await deletePost(id);
    fetch();
  } catch (e) {
    console.log(e);
  }
};

onMounted(() => {
  fetch();
});
</script>
