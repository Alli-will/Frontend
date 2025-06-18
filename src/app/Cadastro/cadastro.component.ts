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
    password: '',
    companyId: 1
  };

  constructor(private userService: UserService, private router: Router) {}

  onSubmit() {
    const userPayload = {
      first_Name: this.user.firstName,
      last_Name: this.user.lastName,
      email: this.user.email,
      password: this.user.password,
      companyId: this.user.companyId
    };
    this.userService.createUser(userPayload).subscribe(
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