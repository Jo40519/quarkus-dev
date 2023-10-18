import { FormControl } from "@angular/forms";

export interface UserLoginForm {
    email: FormControl<string>;
    senha: FormControl<string>;
}
