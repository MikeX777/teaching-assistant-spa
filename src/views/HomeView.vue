<script setup lang="ts">
import { useUserStore } from '@/stores/user';
import AssistantHome from './AssistantHome.vue';



const userStore = useUserStore();
</script>

<template>
  <main>
    <div v-if="userStore.user.userTypeId === 2">
      <AssistantHome />
    </div>
  </main>
</template>
