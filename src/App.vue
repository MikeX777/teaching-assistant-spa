<script setup lang="ts">
import { ref, provide } from 'vue';
import { RouterLink, RouterView } from 'vue-router'

import type { IUserRepository } from './interfaces/IUserRepository';
import { UserRepository } from './repositories/UserRepository';
import type { IApplicationRepository } from './interfaces/IApplicationRepository';
import { ApplicationRepository } from './repositories/ApplicationRepository';

import Menubar from 'primevue/menubar';

provide<IUserRepository>('userRepository', new UserRepository('https://apitaassistant-app-2024102921080.nicecliff-6fd000a2.eastus2.azurecontainerapps.io/v1/'));
provide<IApplicationRepository>('applicationRepository', new ApplicationRepository('https://apitaassistant-app-2024102921080.nicecliff-6fd000a2.eastus2.azurecontainerapps.io/v1/'));

const items = ref([
  {
    label: 'Home',
    icon: 'pi pi-home',
    route: '/',
  },
  {
    label: 'Features',
    icon: 'pi pi-star',
    route: '/about',
  },
  {
    label: 'Create Account',
    route: '/create-account',
  },
  {
    label: 'Login',
    route: '/login',
  }
])

</script>

<template>
  <Menubar :model="items" class="nav-bar">
    <template #start>
      <img src="./assets/images/owlhead-logo.png" /> <h2 style="padding-left: 20px;">Florida Atlantic University</h2>
    </template>
    <template #item="{ item, props, hasSubmenu }">
      <router-link v-if="item.route" v-slot="{ href, navigate }" :to="item.route" custom>
        <a v-ripple :href="href" v-bind="props.action" @click="navigate">
          <span :class="item.icon" />
          <span>{{ item.label }}</span>
        </a>
      </router-link>
      <a v-else v-ripple :href="item.url" :target="item.target" v-bind="props.action">
        <span :class="item.icon" />
        <span>{{ item.label }}</span>
        <span v-if="hasSubmenu" class="pi pi-fw pi-angle-down" />
      </a>
  </template>
  </Menubar>
  <div class="col-8 col-offset-2">
    <Suspense>
      <RouterView />
    </Suspense>
  </div>
</template>

<style scoped>
</style>
