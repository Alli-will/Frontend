import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../services/auth.service'; 
import { MenuComponent } from '../menu/menu.component';
import { Router } from '@angular/router'; 
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, MenuComponent, CommonModule], 
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  email: string = '';
  password: string = '';
  mensagem: string | null = null;

  constructor(private authService: AuthService, private router: Router) {} 

  onSubmit() {
    this.authService.login(this.email, this.password).subscribe(
      (response) => {
        this.router.navigate(['/diario']); 
        localStorage.setItem('token', response.token); 
        alert('Login realizado com sucesso!');
      },
      (error) => { 
        alert('Credenciais inválidas.');
      }
    );
  }
}