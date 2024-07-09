import { TestBed } from '@angular/core/testing';

import { AdminCategoriaService } from './admin-categoria.service';

describe('AdminCategoriaService', () => {
  let service: AdminCategoriaService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AdminCategoriaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
