import { ChangeDetectionStrategy, Component } from '@angular/core';
import { NavbarComponent } from "../../components/common/navbar/navbar.component";
import { OrganizationFormComponent } from "../../components/parent-organization/organization-form/organization-form.component";

@Component({
  selector: 'app-parent-organization-page',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [NavbarComponent, OrganizationFormComponent],
  templateUrl: './parent-organization-page.component.html',
  styleUrl: './parent-organization-page.component.scss'
})
export class ParentOrganizationPageComponent {

}
