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
import { Tag } from 'primevue';
import Divider from 'primevue/divider';
import Popover from 'primevue/popover';


import type { IUserRepository } from '@/interfaces/IUserRepository';
import type { IApplicationRepository } from '@/interfaces/IApplicationRepository';
import { useUserStore } from '@/stores/user';
import type { ApplicationDto } from '@/models/responses/ApplicationDto';
import type { TermDto } from '@/models/responses/TermDto';
import { SubmitApplicaitonRequest } from '@/models/requests/SubmitApplicationRequest';
import { CourseApplicationRequest } from '@/models/requests/CourseApplicationRequest';
import type { ICourseRepository } from '@/interfaces/ICourseRepository';
import { CourseDto } from '@/models/responses/CourseDto';
import type { GradeDto } from '@/models/responses/GradeDto';

const router = useRouter();
const applicationRepository = inject<IApplicationRepository>('applicationRepository');
const userRepository = inject<IUserRepository>('userRepository');
const courseRepository = inject<ICourseRepository>('courseRepository');
const userStore = useUserStore();
const op = ref();
const applications = ref([] as ApplicationDto[]);
const courses = ref([] as CourseDto[]);
const grades = ref([] as GradeDto[]);
const terms = ref([] as TermDto[]);
applicationRepository?.getTerms().then(r => {
    terms.value = r.data.data;
});
courseRepository?.getCourses().then(r => {
    courses.value = r.data.data;
});
courseRepository?.getGrades().then(r => {
    grades.value = r.data.data;
});


const form = reactive({
    termId: 0,
    year: '2025',
    previousTA: false,
    courses: [] as any[],
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
    request.courses = form.courses.map((dto) => ({
        courseId: dto.selectedCourse.courseId,
        gradeId: dto.gradeId,
        termId: dto.termId,
        year: dto.year,
    }));
    applicationRepository?.submitApplicaiton(request)
        .then(r => {
            op.value.hide();
            retrieveApplications();
        });

}

const retrieveApplications = () => {
    applicationRepository?.getUpcomingApplications(userStore.user.userId).then(r => {
        applications.value = r.data.data;
    });
}

const addCourse = () => {
    const course = {
        year: '2024',
    }
    form.courses.push(course);
}

const removeCourse = (course: CourseApplicationRequest) => {
    const index = form.courses.indexOf(course);
    form.courses.splice(index, 1);
}

retrieveApplications();

</script>

<template>
    <Panel>
        <Button label="Create Application" @click="toggle" />
        <h3>Upcoming Applications</h3>
        <div class="card">
        <DataView :value="applications" :dataKey="'applicationId'">
            <template #list="slotProps">
                <div class="flex flex-column">
                    <div v-for="(item, index) in slotProps.items" :key="item.applicationId" class="flex flex-column">
                        <div class="flex flex-col sm:flex-row sm:items-center p-6 gap-4" :class="{ 'border-t border-surface-200 dark:border-surface-700': index !== 0 }">
                            <div class="flex flex-col md:flex-row justify-between md:items-center flex-1 gap-6">
                                {{ item.term.termName }} {{ item.year }} <Tag :value="item.status.status" severity="warn" />
                            </div>
                        </div>
                        <Divider />
                    </div>
                </div>
            </template>
        </DataView>
        </div>
    </Panel>

    <Popover ref="op">
        <h4>Submit Application</h4>
        <div class="flex flex-col pt-3">
            <Select v-model="form.termId" :options="terms" optionLabel="termName" optionValue="termId" placeholder="Select a Term" />
        </div>
        <div class="flex flex-col pt-3">
            <InputText v-model="form.year" type="number" placeholder="Year" :invalid="formErrors.year.length > 0" v-keyfilter.num fluid />
            <Message v-if="formErrors.year.length > 0" severity="error" size="small" variant="simple">
                {{ formErrors.year[0] }}
            </Message>
        </div>
        <div class="flex flex-col pt-3">
            <label for="previousTA">Previous TA</label>
            <ToggleSwitch v-model="form.previousTA" inputId="previousTA" class="ml-3" />
        </div>
        <div class="flex flex-row">
            <h3>Courses</h3>
            <Button icon="pi pi-plus" size="small" variant="text" rounded @click="addCourse" class="ml-2 mt-2" />
        </div>
        <div class="flex flex-column pt-3">
            <div v-for="course in form.courses" class="flex flex-row pb-3">
                <div class="flex pl-2">
                    <Select v-model="course.selectedCourse" :options="courses" optionLabel="code" placeholder="Course">
                        <template #value="slotProps">
                            <div v-if="slotProps.value" class="flex items-center">
                                {{ slotProps.value.prefix }}{{ slotProps.value.code }}
                            </div>
                            <div v-else>
                                {{ slotProps.placeholder }}
                            </div>
                        </template>
                        <template #option="slotProps">
                            {{ slotProps.option.prefix }}{{ slotProps.option.code }}
                        </template>
                    </Select>
                </div>
                <div class="flex pl-2">
                    <Select v-model="course.termId" :options="terms" optionLabel="termName" optionValue="termId" placeholder="Select a Term" />
                </div>
                <div class="flex pl-2">
                    <InputText v-model="course.year" type="number" placeholder="Year" v-keyfilter.num fluid />
                </div>
                <div class="flex pl-2">
                    <Select v-model="course.gradeId" :options="grades" optionLabel="grade" optionValue="gradeId" placeholder="Grade" />
                </div>
                <div class="flex pl-2">
                    <Button icon="pi pi-times" rounded severity="error" variant="text" @click="removeCourse(course)" />
                </div>
            </div>
        </div>
        <div class="flex flex-col pt-3">
            <Button label="Create" @click="createApplication" />
        </div>
    </Popover>

</template>