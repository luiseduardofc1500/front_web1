import type {MedicineRepository as Contract} from "@/lib/domain/repository/medicine";
import {Medicine} from "@/lib/domain/entity/medicine";
import {Repository} from "@/lib/infrastructure/repository/http/repository";
import {data} from "autoprefixer";

export class MedicineRepository extends Repository implements Contract {
    async listMedicines(): Promise<Medicine[] | null> {
        const requestUrl = `${this.baseApiUrl}/medicines`;
        const response = await fetch(requestUrl, {
            method: 'GET',
            headers: {
                ...this.getAuthenticationHeader(),
                'Content-Type': 'application/json',
            },
        });

        if (response.status === 200) {
            return this.castToMedicines(await response.json());
        }

        return null;
    }

    async registerMedicine(name: string, periodicity: number, startedAt: Date, units: number): Promise<Medicine | null> {
        const requestUrl = `${this.baseApiUrl}/medicines`;
        const response = await fetch(requestUrl, {
            method: 'POST',
            headers: {
                ...this.getAuthenticationHeader(),
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                name,
                periodicity,
                startedAt,
                units,
            }),
        });

        if (response.status === 200) {
            const {medicine} = await response.json();

            return this.castToMedicine(medicine);
        }

        return null;
    }

    private castToMedicine(data: any): Medicine {
        return new Medicine(
            data.id,
            data.name,
            data.periodicity,
            new Date(data.startedAt),
            data.units,
        );
    }

    private castToMedicines(data: any): Medicine[] {
        const {medicines} = data;

        return medicines.map(this.castToMedicine)
    }
}
