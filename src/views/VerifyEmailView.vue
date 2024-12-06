<script setup lang="ts">
import { ref, inject } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import axios, { type AxiosResponse } from 'axios';

import type { IUserRepository } from '@/interfaces/IUserRepository';
import { VerifyRequest } from '@/models/requests/VerifyRequest';


import { Panel } from 'primevue';
import { InputOtp } from 'primevue';
import { Button } from 'primevue';
import { Message } from 'primevue';
import { useUserStore } from '@/stores/user';

const props = defineProps({
  email: String
});

const route = useRoute();
const router = useRouter();
const userRepository = inject<IUserRepository>('userRepository');
const verificationCode = ref('');
const verificationError = ref(false);
const userStore = useUserStore();


const onSubmit = () => {
    const request = new VerifyRequest();
    request.verificationCode = verificationCode.value;
    request.email = decodeURIComponent(props.email ?? '');
    userRepository?.verify(request)
        .then(r => {
            const result = r.data;
            if (result?.success) {
                userStore.setUser(result.data);
                router.push('/');
            } else {
                verificationError.value = true;
            }
        })
        .catch(e => {
            verificationError.value = true;
        });
}

</script>

<template>
    <Panel class="flex justify-center gap-2">
        <h4 class="p-3">An email has been sent to the supplied email address, please enter the verification code here.</h4>
        <InputOtp v-model="verificationCode" :length="8" :invalid="verificationError"class="p-3" />
        <Button @click="onSubmit" class="m-3">Submit</Button>
        <Message v-if="verificationError" severity="error" size="small" variant="simple">
            There was an error verifiying you email. Please try again.
        </Message>
    </Panel>
</template> 