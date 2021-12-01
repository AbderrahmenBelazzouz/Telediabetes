import { Certificat } from "./certificat";
import { Ordonnance } from "./ordonnance";
import { Oriantation } from "./oriantation";

export class ExamenClinique {
    id: number;
    createDate: string;
    general: number[];
    appareil: number[];
    ordonnance: Ordonnance
    rapport: string;
    certificat: Certificat;
    evacuation: string;
    orientation: Oriantation;
}
