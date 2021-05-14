import { Loja } from "./loja.model";
import { Usuario } from "./usuario.model"

export class Rating{
  loja?: Loja[];
  usuario?: Usuario[];
  rating?: number;
}
