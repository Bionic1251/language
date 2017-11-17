import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { KptChangeComponent } from './kpt-change.component';

describe('KptChangeComponent', () => {
  let component: KptChangeComponent;
  let fixture: ComponentFixture<KptChangeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ KptChangeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(KptChangeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
