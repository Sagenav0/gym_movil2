import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CambiarCorreoPage } from './cambiar-correo.page';

describe('CambiarCorreoPage', () => {
  let component: CambiarCorreoPage;
  let fixture: ComponentFixture<CambiarCorreoPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(CambiarCorreoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
