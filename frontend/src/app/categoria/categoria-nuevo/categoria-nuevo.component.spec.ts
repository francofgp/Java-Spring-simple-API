import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CategoriaNuevoComponent } from './categoria-nuevo.component';

describe('CategoriaNuevoComponent', () => {
  let component: CategoriaNuevoComponent;
  let fixture: ComponentFixture<CategoriaNuevoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CategoriaNuevoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CategoriaNuevoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
