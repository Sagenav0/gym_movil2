import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CambiarContraOlvidadaPage } from './cambiar-contra-olvidada.page';

describe('CambiarContraOlvidadaPage', () => {
  let component: CambiarContraOlvidadaPage;
  let fixture: ComponentFixture<CambiarContraOlvidadaPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(CambiarContraOlvidadaPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
