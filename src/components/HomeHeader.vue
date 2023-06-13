<template>
  <v-card :loading="loading">
    <v-card-actions>
      <div>
        <span class="text-subtitle-2 mx-1"> Sort by: </span>
        <v-btn-toggle v-model="sortByModel" density="compact" rounded="0">
          <v-btn value="id">id</v-btn>
          <v-btn value="title">title</v-btn>
        </v-btn-toggle>
      </div>
      <v-spacer></v-spacer>
      <div>
        <v-btn :disabled="pageModel === 1" @click="pageModel--">prev</v-btn>
        <v-btn @click="pageModel++">next</v-btn>
      </div>
      <v-spacer></v-spacer>
      <v-btn @click="add">Add</v-btn>
    </v-card-actions>
  </v-card>
</template>

<script setup lang="ts">
import { computed } from "vue";

const props = defineProps<{
  loading: boolean;
  sortBy: string | null;
  page: number;
}>();

const emit = defineEmits<{
  (e: "update:sortBy", value: string | null): void;
  (e: "update:page", value: number): void;
  (e: "addButton"): void;
}>();

const sortByModel = computed({
  get: () => props.sortBy,
  set: (value) => emit("update:sortBy", value),
});
const pageModel = computed({
  get: () => props.page,
  set: (value) => emit("update:page", value),
});

const add = () => {
  emit("addButton");
};
</script>

<style scoped></style>
