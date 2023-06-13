<template>
  <v-card variant="tonal">
    <v-card-title> {{ title }} </v-card-title>
    <v-card-subtitle>{{ subtitle }}</v-card-subtitle>
    <v-card-text class="text">
      {{ body }}
    </v-card-text>
    <v-card-actions>
      <v-btn @click="emit('edit', { id, form })"> Edit </v-btn>
      <v-btn @click="emit('remove', id)"> Remove </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script setup lang="ts">
import { Form, Post } from "@/api/posts";
import { ComputedRef } from "vue";

import { computed } from "vue";

const props = defineProps<Post>();
const emit = defineEmits<{
  (
    e: "edit",
    data: {
      id: number;
      form: Form;
    }
  ): void;
  (e: "remove", id: number): void;
}>();

const subtitle = computed(() => `id: ${props.id} user id: ${props.userId}`);
const form: ComputedRef<Form> = computed(() => ({
  title: props.title,
  body: props.body,
  userId: 1,
}));
</script>

<style scoped lang="scss">
.text {
  overflow: hidden;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 4;
  text-overflow: ellipsis;
  white-space: pre-wrap;

  padding: 0;
  border: 16px solid transparent;
}
</style>
