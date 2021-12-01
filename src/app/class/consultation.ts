import { DossierMedical } from "./dossier-medical";
import { Element } from "./element";

export class Consultation {
  id: number;
  motifs: Element[];
  createDate: string;
  ecId: number;
  bpId: number[];
  state: string;
  appointmentDate: string;
  dm: DossierMedical;
}
