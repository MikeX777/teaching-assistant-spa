import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import { UserDto } from '@/models/responses/UserDto'

export const useUserStore = defineStore('user', () => {
    const user = ref(new UserDto());

    function setUser(userToSet: UserDto) {
        user.value = userToSet;
    }

  return { user, setUser }
});
