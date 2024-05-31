import { ComponentFixture, TestBed } from '@angular/core/testing';
import { OlvidasteContrasenaPage } from './olvidaste-contrasena.page';

describe('OlvidasteContrasenaPage', () => {
  let component: OlvidasteContrasenaPage;
  let fixture: ComponentFixture<OlvidasteContrasenaPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(OlvidasteContrasenaPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
