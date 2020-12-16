import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SerializeParamComponent } from './serialize-param.component';

describe('SerializeParamComponent', () => {
  let component: SerializeParamComponent;
  let fixture: ComponentFixture<SerializeParamComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SerializeParamComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SerializeParamComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
