import type {Medicine} from "@/lib/domain/entity/medicine";

export interface MedicineRepository {
    listMedicines(): Promise<Medicine[]|null>;

    registerMedicine(name: string, periodicity: number, startedAt: Date, units: number): Promise<Medicine|null>;
}
