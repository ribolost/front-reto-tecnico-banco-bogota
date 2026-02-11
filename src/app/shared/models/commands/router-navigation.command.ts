import { Router } from '@angular/router';
import { Command } from './command';

export class RouterNavigationCommand implements Command {
  constructor(
    private readonly router: Router,
    private readonly route: string,
  ) {}

  execute(): void {
    this.router.navigate([this.route]);
  }
}
