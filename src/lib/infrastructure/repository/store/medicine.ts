import {defineStore} from "pinia"
import type {Medicine} from "@/lib/domain/entity/medicine";

export const useMedicineStore = defineStore('medicine', {
    state: () => ({
        medicines: [] as Medicine[],
    }),
    actions: {
        addMedicine(medicine: Medicine) {
            this.medicines.push(medicine)
        },
        setMedicines(medicines: Medicine[]) {
            this.medicines = medicines
        }
    },
})
