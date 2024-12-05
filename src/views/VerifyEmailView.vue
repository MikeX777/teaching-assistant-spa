<script setup lang="ts">
import { ref, inject } from 'vue';
import { useRoute } from 'vue-router';

import type { IUserRepository } from '@/interfaces/IUserRepository';
import { VerifyRequest } from '@/models/requests/VerifyRequest';


import { Panel } from 'primevue';
import { InputOtp } from 'primevue';
import { Button } from 'primevue';
import { Message } from 'primevue';

const props = defineProps({
  email: String
});

const route = useRoute();
const userRepository = inject<IUserRepository>('userRepository');
const verificationCode = ref('');
const verificationError = ref(false);


const onSubmit = async () => {
    const request = new VerifyRequest();
    request.verificationCode = verificationCode.value;
    request.email = decodeURIComponent(props.email ?? '');
    const result = (await userRepository?.verify(request))?.data;
    if (result?.success) {
        console.log('Success');

    } else {
        verificationError.value = true;
    }
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