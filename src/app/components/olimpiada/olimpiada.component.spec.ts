import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OlimpiadaComponent } from './olimpiada.component';

describe('OlimpiadaComponent', () => {
  let component: OlimpiadaComponent;
  let fixture: ComponentFixture<OlimpiadaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OlimpiadaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OlimpiadaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
