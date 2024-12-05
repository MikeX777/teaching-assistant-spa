<script setup lang="ts">
import { reactive, ref, inject } from 'vue';
import { useRouter } from 'vue-router';

import { SignInRequest } from '@/models/requests/SignInRequest';
import type { IUserRepository } from '@/interfaces/IUserRepository';

const userRepository = inject<IUserRepository>('userRepository');
const router = useRouter();

const formError = ref(false);
const form = reactive({
    email: '',
    password: '',
});

const onLogin = async () => {
    const request = new SignInRequest();
    request.email = form.email;
    request.password = form.password;
    const response = (await userRepository?.signIn(request))?.data;
    if (response?.success) {
        router.push(`/verify-email/${encodeURIComponent(form.email)}`);
    } else {
        formError.value = true;
    }
}

</script>

<template>
    <main>
        <Panel class="flex flex-col justify-center col-3 col-offset-4">
            <div class="flex flex-col pt-3">
                <h2>Login</h2>
            </div>
            <div class="flex flex-col pt-3">
                <InputText v-model="form.email" type="text" placeholder="Email" :invalid="formError" fluid />
            </div>
            <div class="flex flex-col  pt-3">
                <Password v-model="form.password" placeholder="Password" :invalid="formError" toggleMask fluid />
            </div>
            <div class="flex flex-col pt-3">
                <Message v-if="formError" severity="error" size="small" variant="simple">
                    Error Logging In
                </Message>
            </div>
            <div class="flex flex-col pt-3">
                <Button type="submit" severity="secondary" label="Submit" @click="onLogin" />
            </div>
        </Panel>
    </main>
</template>