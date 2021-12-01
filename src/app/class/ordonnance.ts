import { DoseJour } from "./dose-jour";
import { ExamenClinique } from "./examen-clinique";

export class Ordonnance {
  id: number;
  createDate: Date;
  doctor: string;
  patient: string;

  doses: DoseJour;

  aiguillesJ: number; // 4 a/j
  epaisseure: number; // 8 mm

  // auto-surveillance glycemique
  lancettesJ: number   // 6 l/j
  bandelettesJ: number; // 4 b/j

  //Autre medications
  autre: string;

  examenClinique: ExamenClinique;
}
