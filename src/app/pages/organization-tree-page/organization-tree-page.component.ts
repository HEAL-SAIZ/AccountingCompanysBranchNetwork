import { ChangeDetectionStrategy, Component } from '@angular/core';
import { NavbarComponent } from "../../components/common/navbar/navbar.component";
import { OrganizationTreeComponent } from "../../components/parent-organization/organization-tree/organization-tree.component";

@Component({
  selector: 'app-organization-tree-page',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [NavbarComponent, OrganizationTreeComponent],
  templateUrl: './organization-tree-page.component.html',
  styleUrl: './organization-tree-page.component.scss'
})
export class OrganizationTreePageComponent {

}
