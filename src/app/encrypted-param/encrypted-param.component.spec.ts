import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { EncryptedParamComponent } from './encrypted-param.component';

describe('EncryptedParamComponent', () => {
  let component: EncryptedParamComponent;
  let fixture: ComponentFixture<EncryptedParamComponent>;

  beforeEach(waitForAsync(() => {
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
