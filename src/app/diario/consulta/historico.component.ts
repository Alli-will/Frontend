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

  reasonMap: { [key: number]: string } = {
    1: 'Trabalho',
    2: 'Família',
    3: 'Relacionamento',
    4: 'Estudos',
    5: 'Saúde',
    6: 'Financeiro',
    7: 'Amizades',
    8: 'Outro',
  };

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
        console.log('Entradas recebidas:', data);
        // Adiciona reasonName baseado no reasonId retornado
        this.entradas = data.map((entrada: any) => {
          let reasonName = Array.isArray(entrada.reasons) && entrada.reasons.length > 0 ? entrada.reasons[0].reason : 'N/A';
          return {
            ...entrada,
            reasonName,
          };
        });
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