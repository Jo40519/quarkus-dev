import { FormControl } from "@angular/forms";

export interface UsuarioForm {
    name: FormControl<string>
    age: FormControl<number>
    email: FormControl<string>
    senha: FormControl<string>;
    sexo: FormControl<string>
}
