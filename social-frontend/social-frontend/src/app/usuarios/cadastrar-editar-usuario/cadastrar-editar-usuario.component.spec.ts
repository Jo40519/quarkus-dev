import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CadastrarEditarUsuarioComponent } from './cadastrar-editar-usuario.component';

describe('CadastrarEditarUsuarioComponent', () => {
  let component: CadastrarEditarUsuarioComponent;
  let fixture: ComponentFixture<CadastrarEditarUsuarioComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CadastrarEditarUsuarioComponent]
    });
    fixture = TestBed.createComponent(CadastrarEditarUsuarioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
