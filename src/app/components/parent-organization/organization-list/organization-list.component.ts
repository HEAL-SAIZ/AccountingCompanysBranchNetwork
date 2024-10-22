import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { Router } from '@angular/router';
import { UserStateService } from '../../../services/user/user-state.service';
import { CommonModule } from '@angular/common';
import { ROLES } from '../../../models/role.model';
import { ParentOrganizationsStateService } from '../../../services/parent-organizations/parent-organizations-state.service';
import { BranchUnitsStateService } from '../../../services/branch-units/branch-units-state.service';
import { combineLatest, map } from 'rxjs';

@Component({
  selector: 'app-organization-list',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    TableModule,
    ButtonModule,
    CommonModule
  ],
  templateUrl: './organization-list.component.html',
  styleUrl: './organization-list.component.scss'
})
export class OrganizationListComponent implements OnInit {
  private readonly organizations$ = this.organizationsStateService.organizations$;
  private readonly branchUnits$ = this.branchUnitsStateService.branchUnits$;
  private readonly routePath = 'organization-list';

  protected readonly roles = ROLES;
  protected readonly userRole$ = this.userStateService.role$;

  protected readonly combinedData$ = combineLatest([this.organizations$, this.branchUnits$]).pipe(
    map(([organizations, branchUnits]) => [...organizations, ...branchUnits])
  );

  constructor(
    private router: Router,
    private userStateService: UserStateService,
    private organizationsStateService: ParentOrganizationsStateService,
    private branchUnitsStateService: BranchUnitsStateService,
  ) { }

  ngOnInit(): void {
    this.organizationsStateService.getOrganizations();
    this.branchUnitsStateService.getBranchUnits();
  }

  protected routeToOrganizationTree(): void {
    this.router.navigate(['/organization-tree']);
  }

  protected onCreateOrganization(): void {
    this.router.navigate(['/parent-organization', { routePath: this.routePath }]);
  }

  protected onOpenOrganization(id: number): void {
    this.router.navigate(['/parent-organization', { id, routePath: this.routePath }]);
  }

  protected onCreateBranchUnit(): void {
    this.router.navigate(['/branch-unit', { routePath: this.routePath }]);
  }

  protected onOpenBranchUnit(id: number): void {
    this.router.navigate(['/branch-unit', { id, routePath: this.routePath }]);
  }
}
