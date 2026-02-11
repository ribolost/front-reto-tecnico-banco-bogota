import { Component, signal, WritableSignal, inject, effect } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterLink, RouterLinkActive, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs';
import { menuItems } from './menu.model';

@Component({
  selector: 'bog-admin-layout',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterLinkActive],
  templateUrl: './admin-layout.component.html',
  styleUrl: './admin-layout.component.scss',
})
export class AdminLayoutComponent {
  private _router = inject(Router);

  isMobileMenuOpen: WritableSignal<boolean> = signal<boolean>(false);

  menuItems = menuItems;

  constructor() {
    this._router.events.pipe(filter((event) => event instanceof NavigationEnd)).subscribe(() => {
      this.isMobileMenuOpen.set(false);
    });
  }

  toggleMenu(itemId: string): void {
    this.menuItems.update((items) =>
      items.map((item) => {
        if (item.id === itemId) {
          return { ...item, isOpen: !item.isOpen };
        }
        return item;
      }),
    );
  }

  toggleMobileSidebar(): void {
    this.isMobileMenuOpen.update((val) => !val);
  }

  closeMobileSidebar(): void {
    this.isMobileMenuOpen.set(false);
  }
}
