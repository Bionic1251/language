import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminWordEditorComponent } from './admin-word-editor.component';

describe('AdminWordEditorComponent', () => {
  let component: AdminWordEditorComponent;
  let fixture: ComponentFixture<AdminWordEditorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminWordEditorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminWordEditorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
