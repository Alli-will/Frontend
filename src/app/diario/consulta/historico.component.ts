import { Component, OnInit } from '@angular/core';
import { DiaryService } from '../../services/diary.service'; 
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-historico',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './historico.component.html',
  styleUrls: ['./historico.component.css'],
})
export class HistoricoComponent implements OnInit {
  entradas: any[] = []; 

  constructor(
    private diaryService: DiaryService, 
    private router: Router 
  ) {}

  ngOnInit(): void {
    this.carregarEntradas(); 
  }

  
  carregarEntradas(): void {
    const token = localStorage.getItem('token');

    if (!token) {
      alert('Você precisa estar logado para visualizar o diário.');
      return;
    }

    this.diaryService.getDiaryEntries(token).subscribe({
      next: (data) => {
        this.entradas = data; 
      },
      error: (err) => {
        console.error('Erro ao carregar entradas:', err);
        alert('Erro ao carregar entradas. Tente novamente.');
      },
    });
  }

  
  navegarHistorico(): void {
    this.router.navigate(['/diario']); 
  }
}