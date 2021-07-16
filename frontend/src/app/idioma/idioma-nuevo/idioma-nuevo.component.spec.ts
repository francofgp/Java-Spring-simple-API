import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IdiomaNuevoComponent } from './idioma-nuevo.component';

describe('IdiomaNuevoComponent', () => {
  let component: IdiomaNuevoComponent;
  let fixture: ComponentFixture<IdiomaNuevoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ IdiomaNuevoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(IdiomaNuevoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
