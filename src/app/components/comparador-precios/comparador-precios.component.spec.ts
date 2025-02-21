import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ComparadorPreciosComponent } from './comparador-precios.component';

describe('ComparadorPreciosComponent', () => {
  let component: ComparadorPreciosComponent;
  let fixture: ComponentFixture<ComparadorPreciosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ComparadorPreciosComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ComparadorPreciosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
