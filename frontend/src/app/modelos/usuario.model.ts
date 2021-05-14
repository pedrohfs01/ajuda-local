import { Loja } from "./loja.model";
import { Rating } from "./rating.model";

export class Usuario{

  id?: number;
  nome?: string;
  email?: string;
  senha?: string;
  estado?: string;
  cidade?: string;
  uf?: string;
  lojas?: Loja[];
  ratings: Rating[];
  empresario: boolean = false;
}
