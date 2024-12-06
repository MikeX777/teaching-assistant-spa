<script setup lang="ts">
import { inject, reactive, ref} from 'vue';
import { useRouter } from 'vue-router';
import { useToast } from 'primevue/usetoast';
import { Message } from 'primevue';
import { Panel } from 'primevue';
import { InputText } from 'primevue';
import { Button } from 'primevue';
import { Password } from 'primevue';
import { Select } from 'primevue';
import { ToggleSwitch } from 'primevue';
import { DataView } from 'primevue';
import Divider from 'primevue/divider';
import Popover from 'primevue/popover';


import type { IUserRepository } from '@/interfaces/IUserRepository';
import type { IApplicationRepository } from '@/interfaces/IApplicationRepository';
import { useUserStore } from '@/stores/user';
import type { ApplicationDto } from '@/models/responses/ApplicationDto';
import type { TermDto } from '@/models/responses/TermDto';
import { SubmitApplicaitonRequest } from '@/models/requests/SubmitApplicationRequest';

const router = useRouter();
const applicationRepository = inject<IApplicationRepository>('applicationRepository');
const userRepository = inject<IUserRepository>('userRepository');
const userStore = useUserStore();
const op = ref();
const applications = ref([] as ApplicationDto[]);

const terms = ref([] as TermDto[]);
applicationRepository?.getTerms().then(r => {
    terms.value = r.data.data;
});

const form = reactive({
    termId: 0,
    year: '0',
    previousTA: false
});

const formErrors = reactive({
    termId: [] as string[],
    year: [] as string[],
});

const toggle = (event: any) => {
    op.value.toggle(event);
}

const createApplication = (event: any) => {
    const request = new SubmitApplicaitonRequest();
    request.userId = userStore.user.userId;
    request.termId = form.termId;
    request.year = parseInt(form.year);
    request.previousTA = form.previousTA;
    console.log('i am here')
    applicationRepository?.submitApplicaiton(request)
        .then(r => {
            router.push('/');
        });

}

const retrieveApplications = () => {
    applicationRepository?.getUpcomingApplications(userStore.user.userId).then(r => {
        applications.value = r.data.data;
    });
}

retrieveApplications();

</script>

<template>
    <Panel>
        <Button label="Create Application" @click="toggle" />
        <h3>Upcoming Applications</h3>
        <DataView :value="applications" :dataKey="'applicationId'">
            <template #list="slotProps">
                <div class="flex flex-col">
                    <div v-for="(item, index) in slotProps.items" :key="index">
                        <div class="flex flex-col sm:flex-row sm:items-center p-6 gap-4" :class="{ 'border-t border-surface-200 dark:border-surface-700': index !== 0 }">
                            <div class="flex flex-col md:flex-row justify-between md:items-center flex-1 gap-6">
                                {{ item.term.termName }} {{ item.year }} {{  item.status.status }}
                            </div>
                        </div>
                    </div>
                </div>
            </template>
        </DataView>
    </Panel>

    <Popover ref="op">
        <h4>Submit Application</h4>
        <div class="flex flex-col pt-3">
            <Select v-model="form.termId" :options="terms" optionLabel="termName" optionValue="termId" placeholder="Select a Term" />
        </div>
        <div class="flex flex-col pt-3">
            <InputText v-model="form.year" type="number" placeholder="Given Name" :invalid="formErrors.year.length > 0" v-keyfilter.num fluid />
            <Message v-if="formErrors.year.length > 0" severity="error" size="small" variant="simple">
                {{ formErrors.year[0] }}
            </Message>
        </div>
        <div class="flex flex-col pt-3">
            <label for="previousTA">Previous TA</label>
            <ToggleSwitch v-model="form.previousTA" inputId="previousTA" class="ml-3" />
        </div>
        <div class="flex flex-col pt-3">
            <Button label="Create" @click="createApplication" />
        </div>
    </Popover>

</template>