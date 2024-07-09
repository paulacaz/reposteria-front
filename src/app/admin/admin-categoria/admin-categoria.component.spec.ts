import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminCategoriaComponent } from './admin-categoria.component';

describe('AdminCategoriaComponent', () => {
  let component: AdminCategoriaComponent;
  let fixture: ComponentFixture<AdminCategoriaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AdminCategoriaComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AdminCategoriaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
