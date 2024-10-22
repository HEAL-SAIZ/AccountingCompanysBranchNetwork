import { ChangeDetectionStrategy, Component } from '@angular/core';
import { NavbarComponent } from "../../components/common/navbar/navbar.component";
import { OrganizationListComponent } from "../../components/parent-organization/organization-list/organization-list.component";

@Component({
  selector: 'app-organization-list-page',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    NavbarComponent,
    OrganizationListComponent,
  ],
  templateUrl: './organization-list-page.component.html',
  styleUrl: './organization-list-page.component.scss'
})
export class OrganizationListPageComponent {

}
