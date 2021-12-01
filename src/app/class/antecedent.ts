import { DossierMedical } from "./dossier-medical";

export class Antecedent {
  id:number;
  nom: string;
  remarque: string;
  type: string;
  dossierMedical: DossierMedical;
}

export enum Type{
  CHIRURGICAUX, FAMILIAUX, MEDICAUX, HABITUDES
}
