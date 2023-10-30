import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PesquisarUsuariosComponent } from './pesquisar-usuarios.component';

describe('PesquisarUsuariosComponent', () => {
  let component: PesquisarUsuariosComponent;
  let fixture: ComponentFixture<PesquisarUsuariosComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PesquisarUsuariosComponent]
    });
    fixture = TestBed.createComponent(PesquisarUsuariosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
