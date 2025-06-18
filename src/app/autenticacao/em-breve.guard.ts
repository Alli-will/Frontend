import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

@Injectable({ providedIn: 'root' })
export class EmBreveGuard implements CanActivate {
  constructor(private router: Router) {}
  canActivate(): boolean {
    alert('Em breve');
    this.router.navigate(['/diario']);
    return false;
  }
}
