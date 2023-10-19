import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PerfilSeguidoresComponent } from './perfil-seguidores.component';

describe('PerfilSeguidoresComponent', () => {
  let component: PerfilSeguidoresComponent;
  let fixture: ComponentFixture<PerfilSeguidoresComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PerfilSeguidoresComponent]
    });
    fixture = TestBed.createComponent(PerfilSeguidoresComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
