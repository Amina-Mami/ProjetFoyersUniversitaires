import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AjoutBlocComponent } from './ajout-bloc.component';

describe('AjoutBlocComponent', () => {
  let component: AjoutBlocComponent;
  let fixture: ComponentFixture<AjoutBlocComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AjoutBlocComponent]
    });
    fixture = TestBed.createComponent(AjoutBlocComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
