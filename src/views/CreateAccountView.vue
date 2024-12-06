<script setup lang="ts">
import { inject, reactive, ref} from 'vue';
import { Form } from '@primevue/forms';
import { zodResolver } from '@primevue/forms/resolvers/zod';
import { z } from 'zod';
import { useToast } from 'primevue/usetoast';
import { Message } from 'primevue';
import { FormField } from '@primevue/forms';
import { Panel } from 'primevue';
import { InputText } from 'primevue';
import { Button } from 'primevue';
import { Password } from 'primevue';
import { Select } from 'primevue';
import type { IUserRepository } from '@/interfaces/IUserRepository';
import type { UserTypeDto } from '@/models/responses/UserTypeDto';
import { CreateUserRequest } from '@/models/requests/CreateUserRequest';
import { useRouter } from 'vue-router';


const toast = useToast();
const userRepository = inject<IUserRepository>('userRepository');
const userTypes = ref((await userRepository?.getUserTypes())?.data.data ?? [] as UserTypeDto[]);
const router = useRouter();

const form = reactive({
    givenName: '',
    familyName: '',
    phoneNumber: '',
    email: '',
    password: '',
    confirmPassword: '',
    userType: { userTypeId: 2, type: 'Teaching Assistant'},
});

const formErrors = reactive({
    givenName: [] as string[],
    familyName: [] as string[],
    phoneNumber: [] as string[],
    email: [] as string[],
    password: [] as string[],
    confirmPassword: [] as string[],
})

const confirmPasswordMatches = (value: string) => {
    console.log(value)
    if (value !== form.password) {
        return false;
    } else {
        return true;
    }
}

const formSchema = z.object({
    givenName: z.string().min(1, { message: 'Given Name is required.' }),
    familyName: z.string().min(1, { message: 'Family Name is required.' }),
    // phone: z.string().min(5, { message: 'Phone is requried.'}).regex(new RegExp(
//   /^([+]?[\s0-9]+)?(\d{3}|[(]?[0-9]+[)])?([-]?[\s]?[0-9])+$/
// ), {message: 'Invalid phone number'}),
    email: z.string().min(1, { message: 'Email is required.' }).email('Value must be a valid email.'),
    password: z.string().min(1, { message: 'Password is required.'}),
    confirmPassword: z.custom<{ arg: string }>(confirmPasswordMatches, 'Confirm Password must match password.'),
});



const onFormSubmit = async () => {
    console.log('test testx ')
    const result = formSchema.safeParse(form);
    if (!result.success) {
        formErrors.givenName = result.error.errors.filter(e => e.path.toString() === 'givenName').map(e => e.message);
        formErrors.familyName = result.error.errors.filter(e => e.path.toString() === 'familyName').map(e => e.message);
        formErrors.phoneNumber = result.error.errors.filter(e => e.path.toString() === 'phoneNumber').map(e => e.message);
        formErrors.email = result.error.errors.filter(e => e.path.toString() === 'email').map(e => e.message);
        formErrors.password = result.error.errors.filter(e => e.path.toString() === 'password').map(e => e.message);
        formErrors.confirmPassword = result.error.errors.filter(e => e.path.toString() === 'confirmPassword').map(e => e.message);
    } else {
        const request = new CreateUserRequest();
        request.givenName = form.givenName;
        request.familyName = form.familyName;
        request.phoneNumber = form.phoneNumber;
        request.email = form.email;
        request.password = form.password;
        request.userTypeId = form.userType.userTypeId;
        await userRepository?.createUser(request);
        router.push(`/login`);
    }
};

</script>

<template>
    <Panel class="flex flex-col justify-center col-3 col-offset-4">
        <div class="flex flex-col pt-3">
            <h2>Create User</h2>
        </div>
        <div class="flex flex-col pt-3">
            <InputText v-model="form.givenName" type="text" placeholder="Given Name" :invalid="formErrors.givenName.length > 0" fluid />
            <Message v-if="formErrors.givenName.length > 0" severity="error" size="small" variant="simple">
                {{ formErrors.givenName[0] }}
            </Message>
        </div>
        <div class="flex flex-col  pt-3">
            <InputText v-model="form.familyName" type="text" placeholder="Family Name" :invalid="formErrors.familyName.length > 0" fluid />
            <Message v-if="formErrors.familyName.length > 0" severity="error" size="small" variant="simple">
                {{ formErrors.familyName[0] }}
            </Message>
        </div>
        <div class="flex flex-col  pt-3">
            <InputText v-model="form.phoneNumber" type="text" placeholder="Phone Number" :invalid="formErrors.phoneNumber.length > 0" fluid />
            <Message v-if="formErrors.phoneNumber.length > 0" severity="error" size="small" variant="simple">
                {{ formErrors.phoneNumber[0] }}
            </Message>
        </div>
        <div class="flex flex-col pt-3">
            <InputText v-model="form.email" type="text" placeholder="Email" :invalid="formErrors.email.length > 0" fluid />
            <Message v-if="formErrors.email.length > 0" severity="error" size="small" variant="simple">
                {{ formErrors.email[0] }}
            </Message>
        </div>
        <div class="flex flex-col pt-3">
            <Password v-model="form.password" type="text" placeholder="Password" :feedback="false" toggleMask fluid :invalid="formErrors.password.length > 0"/>
            <Message v-if="formErrors.password.length > 0" severity="error" size="small" variant="simple">
                {{ formErrors.password[0] }}
            </Message>
        </div>
        <div class="flex flex-col pt-3">
            <Password v-model="form.confirmPassword" type="text" placeholder="Confirm Password" :feedback="false" fluid :invalid="formErrors.confirmPassword.length > 0"/>
            <Message v-if="formErrors.confirmPassword.length > 0" severity="error" size="small" variant="simple">
                {{ formErrors.confirmPassword[0] }}
            </Message>
        </div>
        <div class="flex flex-col pt-3">
            <Select v-model="form.userType" :options="userTypes" optionLabel="type">
            </Select>
        </div>
        <div class="flex flex-col pt-3">
            <Button type="submit" severity="secondary" label="Submit" @click="onFormSubmit" />
        </div>
    </Panel>
</template>