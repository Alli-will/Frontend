import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../services/user.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-cadastro',
  standalone: true,
  templateUrl: './cadastro.component.html',
  styleUrls: ['./cadastro.component.css'],
  imports: [FormsModule, CommonModule]
})
export class CadastroComponent {
  user = {
    firstName: '',
    lastName: '',
    email: '',
    password: ''
  };

  constructor(private userService: UserService, private router: Router) {}

  onSubmit() {
    this.userService.createUser(this.user).subscribe(
      (response) => {
        alert('Usuário cadastrado com sucesso!');
        this.router.navigate(['/login']); // Redireciona para login
      },
      (error) => {
        alert('Erro ao cadastrar. Tente novamente.');
      }
    );
  }

  voltar() {
    this.router.navigate(['/login']);
  }
}