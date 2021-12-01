import { Patient } from "./patient";

export class User {
  id: number;
  username: string;
  password: string;
  role: string;
  state: string;
  telephone: string;
  children: Patient[];
}
