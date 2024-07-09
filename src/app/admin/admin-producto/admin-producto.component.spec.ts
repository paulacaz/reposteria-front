import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminProductoComponent } from './admin-producto.component';

describe('AdminProductoComponent', () => {
  let component: AdminProductoComponent;
  let fixture: ComponentFixture<AdminProductoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AdminProductoComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AdminProductoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
