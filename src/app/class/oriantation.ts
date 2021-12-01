import { ExamenClinique } from "./examen-clinique";

export class Oriantation {
  id: number;
  createDate: Date;
  doctor: string;
  patient: string;

  agePatient: number
  cause: string;
  etatPatient: string;

  examenClinique: ExamenClinique;
}
