<template>
  <v-card width="500" class="pa-5" rounded :loading="loading">
    <v-form @submit.prevent="submit" :loading="loading">
      <div class="mb-5 text-center text-h5">Post form</div>
      <v-text-field label="Title" v-model="form.title"></v-text-field>
      <v-textarea label="Body" v-model="form.body"></v-textarea>
      <v-btn type="submit" block variant="tonal"> Submit </v-btn>
    </v-form>
  </v-card>
</template>

<script setup lang="ts">
import { Form, PostFunc } from "@/api/posts";

import { reactive, ref } from "vue";

const props = defineProps<{
  data?: Form;
  id?: number;
  submitFunc: PostFunc;
}>();
const emit = defineEmits<{
  (e: "success"): void;
}>();

const formData = props.data || { body: null, title: null, userId: 1 };
const form = reactive(formData);
const loading = ref(false);
const error = ref("");

const submit = async () => {
  try {
    loading.value = true;
    await props.submitFunc(form, props.id || 0);
    emit("success");
  } catch (e: unknown) {
    error.value = e as string;
  } finally {
    loading.value = false;
  }
};
</script>
