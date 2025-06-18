import { Component, OnInit } from '@angular/core';
import { MenuComponent } from '../menu/menu.component';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms'; // Para usar [(ngModel)]
import { DiaryService } from '../services/diary.service'; // Serviço para integração com o back-end
import { Router } from '@angular/router'; // Importando o Router para navegação

@Component({
  selector: 'app-diario',
  standalone: true,
  imports: [MenuComponent, CommonModule, FormsModule],
  templateUrl: './diario.component.html',
  styleUrls: ['./diario.component.css'],
})
export class DiarioComponent implements OnInit {
  // Propriedades para capturar os dados do formulário
  data: string = '';
  emocao: string = '';
  descricao: string = '';
  pesquisa: string = '';
  entradas: any[] = []; 

  reasons = [
    { id: 1, nome: 'Trabalho' },
    { id: 2, nome: 'Família' },
    { id: 3, nome: 'Relacionamento' },
    { id: 4, nome: 'Estudos' },
    { id: 5, nome: 'Saúde' },
    { id: 6, nome: 'Financeiro' },
    { id: 7, nome: 'Amizades' },
    { id: 8, nome: 'Outro' }
    // Adicione aqui os motivos reais do seu seed
  ];
  reasonIdSelecionado: number | null = null;

  constructor(private diaryService: DiaryService, private router: Router) {}

  ngOnInit(): void {
    // Garantir que o array reasons esteja inicializado corretamente
    this.reasons = [
      { id: 1, nome: 'Trabalho' },
      { id: 2, nome: 'Família' },
      { id: 3, nome: 'Relacionamento' },
      { id: 4, nome: 'Estudos' },
      { id: 5, nome: 'Saúde' },
      { id: 6, nome: 'Financeiro' },
      { id: 7, nome: 'Amizades' },
      { id: 8, nome: 'Outro' }
    ];

    console.log('Array reasons inicializado:', this.reasons);

    this.carregarEntradas();
  }

  
  onSubmit(): void {
    const novaEntrada = {
      date: this.data,
      emotion: this.emocao,
      description: this.descricao,
      reasonIds: this.reasonIdSelecionado ? [this.reasonIdSelecionado] : []
    };

    const token = localStorage.getItem('token'); 

    if (!token) {
      alert('Você precisa estar logado para criar uma entrada.');
      return;
    }

    this.diaryService.createDiaryEntry(novaEntrada, token).subscribe({
      next: () => {
        alert('Entrada criada com sucesso!');
        this.carregarEntradas(); 
        this.resetarFormulario(); 
      },
      error: (err) => {
        console.error('Erro ao criar entrada:', err);
        const msg = err?.error?.message || err?.message || 'Erro ao criar entrada. Tente novamente.';
        alert('Erro ao criar entrada: ' + JSON.stringify(msg));
      },
    });
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

  
  resetarFormulario(): void {
    this.data = '';
    this.emocao = '';
    this.descricao = '';
  }

  
  navegarHistorico(): void {
    this.router.navigate(['/historico']);
  }

  
  navegarHome(): void {
    this.router.navigate(['/home']); 
  }

  
  sair(): void {
    localStorage.removeItem('token');
    this.router.navigate(['/login']);
  }
}