import { ChangeDetectionStrategy, Component } from '@angular/core';
import { NavbarComponent } from "../../components/common/navbar/navbar.component";
import { BranchUnitFormComponent } from "../../components/branch-unit/branch-unit-form/branch-unit-form.component";

@Component({
  selector: 'app-branch-unit-page',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [NavbarComponent, BranchUnitFormComponent],
  templateUrl: './branch-unit-page.component.html',
  styleUrl: './branch-unit-page.component.scss'
})
export class BranchUnitPageComponent {

}
