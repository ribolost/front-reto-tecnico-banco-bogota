import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DocumentTypeBadgeComponent } from './document-type-badge.component';

describe('DocumentTypeBadgeComponent', () => {
  let component: DocumentTypeBadgeComponent;
  let fixture: ComponentFixture<DocumentTypeBadgeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DocumentTypeBadgeComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DocumentTypeBadgeComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
