import { FormControl } from "@angular/forms";
import { User } from "src/app/models/user";

export interface PesquisaUsuarioForm {
    nameUsuario: FormControl<string>;
}
