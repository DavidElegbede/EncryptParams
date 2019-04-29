import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EncryptedParamComponent } from './encrypted-param.component';

describe('EncryptedParamComponent', () => {
  let component: EncryptedParamComponent;
  let fixture: ComponentFixture<EncryptedParamComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EncryptedParamComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EncryptedParamComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
