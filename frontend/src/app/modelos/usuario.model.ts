import { Loja } from "./loja.model";

export class Usuario{

  id?: number;
  nome?: string;
  email?: string;
  senha?: string;
  estado?: string;
  cidade?: string;
  uf?: string;
  lojas?: Loja[];
}
