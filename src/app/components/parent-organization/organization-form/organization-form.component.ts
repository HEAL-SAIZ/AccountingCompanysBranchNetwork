import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { InputMaskModule } from 'primeng/inputmask';
import { FloatLabelModule } from 'primeng/floatlabel';
import { ParentOrganizationsStateService } from '../../../services/parent-organizations/parent-organizations-state.service';
import { first, tap } from 'rxjs';
import { IParentOrganization } from '../../../models/parent-organization.model';

@Component({
  selector: 'app-organization-form',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    InputTextModule,
    ButtonModule,
    InputMaskModule,
    FloatLabelModule,
  ],
  templateUrl: './organization-form.component.html',
  styleUrl: './organization-form.component.scss'
})
export class OrganizationFormComponent implements OnInit {
  private readonly currentOrganization$ = this.organizationsStateService.currentOrganization$;

  protected organizationForm!: FormGroup;
  protected organizationId?: number;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private organizationsStateService: ParentOrganizationsStateService,
  ) { }

  ngOnInit() {
    this.initForm();
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.organizationId = +id;
      this.loadOrganizationData(+id);
    }
  }

  private initForm() {
    this.organizationForm = this.fb.group({
      id: [null],
      name: ['', Validators.required],
      shortName: ['',],
      inn: ['', [Validators.pattern(/^\d{10}$/)]],
      kpp: ['', [Validators.pattern(/^\d{9}$/)]],
      founder: ['',],
      address: ['',],
      phone: ['',],
    });
  }

  private setForm(organization: IParentOrganization) {
    this.organizationForm.patchValue({
      id: organization.id,
      name: organization.name,
      shortName: organization.shortName,
      inn: organization.inn,
      kpp: organization.kpp,
      founder: organization.founder,
      address: organization.address,
      phone: organization.phone,
    });
  }

  private loadOrganizationData(id: number) {
    this.organizationsStateService.getOrganizationById(id);
    this.currentOrganization$.pipe(
      first(),
      tap((organization) => {
        organization && this.setForm(organization);
      })
    ).subscribe();
  }

  private createOrganization() {
    this.organizationsStateService.createOrganization(this.organizationForm.value);
    this.onClose();
  }

  private updateOrganization() {
    this.organizationsStateService.updateOrganization(this.organizationForm.value);
    this.onClose();
  }

  protected onSave() {
    if (this.organizationId) {
      this.updateOrganization();
    } else {
      this.createOrganization();
    }
  }

  protected onClose() {
    this.router.navigate([this.route.snapshot.paramMap.get('routePath')]);
  }
}
