import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModifBlocComponent } from './modif-bloc.component';

describe('ModifBlocComponent', () => {
  let component: ModifBlocComponent;
  let fixture: ComponentFixture<ModifBlocComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ModifBlocComponent]
    });
    fixture = TestBed.createComponent(ModifBlocComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
