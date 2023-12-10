import {defineStore} from "pinia"
import {Toast} from "@/lib/domain/entity/toast";

export const useToastsStore = defineStore('toasts', {
    state: () => ({
        toasts: [] as Toast[],
    }),
    actions: {
        addToast(toast: Toast) {
            this.toasts.push(toast)

            setTimeout(() => this.removeToastById(toast.id), 5000)
        },
        removeToastById(id: string) {
            this.toasts = this.toasts.filter(toast => toast.id !== id)
        },
    },
    getters: {
        getToasts(): Toast[] {
            return this.toasts
        },
    },
})
