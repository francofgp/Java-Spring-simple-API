import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TextoNuevoComponent } from './texto-nuevo.component';

describe('TextoNuevoComponent', () => {
  let component: TextoNuevoComponent;
  let fixture: ComponentFixture<TextoNuevoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TextoNuevoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TextoNuevoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
