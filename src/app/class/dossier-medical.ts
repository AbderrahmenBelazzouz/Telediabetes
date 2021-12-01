import { Consultation } from "./consultation";
import { Antecedent } from "./antecedent";

export class DossierMedical {
  id: number;
  description: string;
  patientId: number;
  createDate :string;
  consultations: Consultation[];
  antecedents:Antecedent[];
}
