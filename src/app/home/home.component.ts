import { Component, OnInit } from '@angular/core';
import { MenuComponent } from '../menu/menu.component';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router'; 

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [MenuComponent, CommonModule],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  logout(): void {
    console.log('Logout acionado');
    localStorage.removeItem('token'); 
    localStorage.removeItem('usuario'); 
    this.router.navigate(['/home']); 
    window.location.reload();
  }

}