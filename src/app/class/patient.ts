import { User } from "./user";

export class Patient extends User {
  CIN: string;
  nom: string;
  prenom: string;
  dateNaissance: Date;
  sexe: string;
  type: string;
  age: number;
  adresse: string;
  parent: User;
  deviceKey: string;
}
