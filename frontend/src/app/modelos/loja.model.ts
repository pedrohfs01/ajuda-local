import { Usuario } from "./usuario.model";

export class Loja {
  id?: number;
  cnpj?: string;
  nome?: string;
  telefone?: string;
  descricao?: string;
  estado?: string;
  cidade?: string;
  uf?: string;
  categoria?: string;
  usuario?: Usuario;
}
