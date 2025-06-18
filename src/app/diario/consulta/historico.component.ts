import { Component, OnInit, AfterViewInit, ViewChild, ElementRef } from '@angular/core';
import { DiaryService } from '../../services/diary.service'; 
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import Chart from 'chart.js/auto';

@Component({
  selector: 'app-historico',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './historico.component.html',
  styleUrls: ['./historico.component.css'],
})
export class HistoricoComponent implements OnInit, AfterViewInit {
  entradas: any[] = [];
  @ViewChild('emocaoChart') emocaoChartRef!: ElementRef;
  chart: any;

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

  ngAfterViewInit(): void {
    if (this.entradas.length > 0) {
      this.renderChart();
    }
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
    // Após carregar as entradas:
    setTimeout(() => this.renderChart(), 0);
  }

  renderChart(): void {
    if (!this.emocaoChartRef) return;
    const data = this.entradas.map((entrada, idx) => ({
      x: new Date(entrada.date),
      y: this.getEmotionValue(entrada.emotion)
    }));
    if (this.chart) this.chart.destroy();
    this.chart = new Chart(this.emocaoChartRef.nativeElement, {
      type: 'scatter',
      data: {
        datasets: [{
          label: 'Emoções ao longo do tempo',
          data,
          backgroundColor: '#4A4E69',
        }]
      },
      options: {
        scales: {
          x: {
            type: 'time',
            time: { unit: 'day' },
            title: { display: true, text: 'Data' }
          },
          y: {
            title: { display: true, text: 'Emoção' },
            ticks: {
              callback: (value: any) => this.getEmotionLabel(Number(value))
            },
            min: 1,
            max: 5
          }
        }
      }
    });
  }

  getEmotionValue(emotion: string): number {
    switch (emotion) {
      case 'feliz': return 5;
      case 'calmo': return 4;
      case 'ansioso': return 3;
      case 'triste': return 2;
      case 'raiva': return 1;
      default: return 0;
    }
  }

  getEmotionLabel(value: number): string {
    switch (value) {
      case 5: return 'Feliz';
      case 4: return 'Calmo';
      case 3: return 'Ansioso';
      case 2: return 'Triste';
      case 1: return 'Raiva';
      default: return '';
    }
  }

  
  navegarHistorico(): void {
    this.router.navigate(['/diario']); 
  }
}