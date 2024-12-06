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
    <div v-else>
      <h3>Welcome to the Teaching Assitant Assistant!</h3>
      <p>
        Please sign in to get started.
      </p>
    </div>
  </main>
</template>
