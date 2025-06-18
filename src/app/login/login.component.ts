import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../services/auth.service'; 
import { MenuComponent } from '../menu/menu.component';
import { Router } from '@angular/router'; 

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, MenuComponent], 
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  email: string = '';
  password: string = '';

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