import { ChangeDetectionStrategy, Component } from '@angular/core';
import { BreadcrumbModule } from 'primeng/breadcrumb';
import { SidebarModule } from 'primeng/sidebar';
import { MenuModule } from 'primeng/menu';
import { MenuItem, MessageService } from 'primeng/api';
import { CommonModule } from '@angular/common';
import { UserStateService } from '../../../services/user/user-state.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    BreadcrumbModule,
    SidebarModule,
    MenuModule,
    CommonModule,
  ],
  providers: [MessageService],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})
export class NavbarComponent {
  sidebarVisible: boolean = false;

  menuItems: MenuItem[] = [
    {
      label: 'Навигация',
      items: [
        {
          label: 'Организации листом',
          icon: 'pi pi-list',
          routerLink: ['/organization-list']
        },
        {
          label: 'Организации деревом',
          icon: 'pi pi-directions',
          routerLink: ['/organization-tree']
        }
      ]
    },
    {
      label: 'Действия',
      items: [{
        label: 'Выйти',
        icon: 'pi pi-sign-out',
        command: () => {
          this.logout();
        },
      }]
    }
  ];

  constructor(
    private userStateService: UserStateService,
    private router: Router,
  ) {
  }

  private logout() {
    this.userStateService.logout();
    this.router.navigate(['auth']);
  }
}
