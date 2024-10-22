import { ChangeDetectionStrategy, Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { TreeTableModule } from 'primeng/treetable';
import { Observable, of, Subscription } from 'rxjs';
import { TreeNode } from 'primeng/api';
import { ROLES } from '../../../models/role.model';
import { UserStateService } from '../../../services/user/user-state.service';
import { CommonModule } from '@angular/common';
import { ParentOrganizationsStateService } from '../../../services/parent-organizations/parent-organizations-state.service';
import { IParentOrganization } from '../../../models/parent-organization.model';

@Component({
  selector: 'app-organization-tree',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    ButtonModule,
    TreeTableModule,
    CommonModule,
  ],
  templateUrl: './organization-tree.component.html',
  styleUrl: './organization-tree.component.scss',
})
export class OrganizationTreeComponent implements OnInit, OnDestroy {
  private readonly organizations$ = this.organizationsStateService.organizations$;
  private readonly routePath = 'organization-tree';

  private organizationsSubscription?: Subscription;

  protected readonly userRole$ = this.userStateService.role$;
  protected readonly roles = ROLES;

  protected organizationsTree$: Observable<TreeNode[]> = of([]);

  constructor(
    private router: Router,
    private userStateService: UserStateService,
    private organizationsStateService: ParentOrganizationsStateService,
  ) { }

  ngOnInit(): void {
    this.subscribeObservables();
  }

  ngOnDestroy(): void {
    this.organizationsSubscription?.unsubscribe();
  }

  private subscribeObservables(): void {
    this.organizationsStateService.getOrganizations();
    this.organizationsSubscription = this.organizations$
      .subscribe((organizations) => {
        this.organizationsTree$ = this.convetOrganizationsToTreeNodeStream(organizations)
      });
  }

  private convetOrganizationsToTreeNodeStream(organizations: IParentOrganization[]): Observable<TreeNode[]> {
    const organizationTree = organizations.map(org => {
      let node: TreeNode = { data: { ...org }, children: [] }
      org.branchUnits?.map(unit => {
        node.children?.push({ data: unit })
      });
      return node
    });
    return of(organizationTree)
  }

  protected routeToOrganizationList(): void {
    this.router.navigate(['/organization-list']);
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
