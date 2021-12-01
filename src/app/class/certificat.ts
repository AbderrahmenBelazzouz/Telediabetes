import { ExamenClinique } from "./examen-clinique";

export class Certificat {
  id: number;
  createDate: Date;
  doctor: string;
  patient: string;
  patientBD: string; // date of birth Patient
  cause: string;
  recommandation: string;
  examenClinique: ExamenClinique;
}
