import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { InputMaskModule } from 'primeng/inputmask';
import { DropdownModule } from 'primeng/dropdown';
import { FloatLabelModule } from 'primeng/floatlabel';
import { IBranchUnit } from '../../../models/branch-unit.model';
import { BranchUnitsStateService } from '../../../services/branch-units/branch-units-state.service';
import { first, tap } from 'rxjs';
import { ParentOrganizationsStateService } from '../../../services/parent-organizations/parent-organizations-state.service';

@Component({
  selector: 'app-branch-unit-form',
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    InputTextModule,
    ButtonModule,
    InputMaskModule,
    FloatLabelModule,
    DropdownModule
  ],
  templateUrl: './branch-unit-form.component.html',
  styleUrl: './branch-unit-form.component.scss'
})
export class BranchUnitFormComponent implements OnInit {
  private readonly currentbranchUnit$ = this.branchUnitsStateService.currentbranchUnit$;

  protected readonly organization$ = this.organizationsStateService.organizations$;
  protected readonly organizationIdControl = this.fb.control<number>(1);

  protected branchUnitForm!: FormGroup;
  protected branchUnitId?: number;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private organizationsStateService: ParentOrganizationsStateService,
    private branchUnitsStateService: BranchUnitsStateService,
  ) { }

  ngOnInit() {
    this.initForm();
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.branchUnitId = +id;
      this.loadBranchUnitData(+id);
    }
  }

  private initForm() {
    this.branchUnitForm = this.fb.group({
      id: [null],
      official: ['', Validators.required],
      address: ['',],
      phone: ['',],
    });
  }

  private setForm(branchUnit: IBranchUnit) {
    this.branchUnitForm.patchValue({
      id: branchUnit.id,
      official: branchUnit.official,
      address: branchUnit.address,
      phone: branchUnit.phone,
    });
  }

  private loadBranchUnitData(id: number) {
    this.branchUnitsStateService.getBranchUnitById(id);
    this.currentbranchUnit$.pipe(
      first(),
      tap((unit) => {
        unit && this.setForm(unit);
      })
    ).subscribe();
  }

  private createOrganization() {
    this.branchUnitsStateService.createBranchUnit(this.branchUnitForm.value, this.organizationIdControl.value || 1);
    this.onClose();
  }

  private updateOrganization() {
    this.branchUnitsStateService.updateBranchUnit(this.branchUnitForm.value, this.organizationIdControl.value || 1);
    this.onClose();
  }

  protected onSave() {
    if (this.branchUnitId) {
      this.updateOrganization();
    } else {
      this.createOrganization();
    }
  }

  protected onClose() {
    this.router.navigate([this.route.snapshot.paramMap.get('routePath')]);
  }
}
