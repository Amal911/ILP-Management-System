import { Component, Input } from '@angular/core';
import { DoughnutGraphChartComponent } from '../doughnut-graph-chart/doughnut-graph-chart.component';
interface ScoreCardData{
  title:string;
  score:number
}
@Component({
  selector: 'app-doughnut-graph-carousel',
  standalone: true,
  imports: [DoughnutGraphChartComponent],
  templateUrl: './doughnut-graph-carousel.component.html',
  styleUrl: './doughnut-graph-carousel.component.scss'
})

export class DoughnutGraphCarouselComponent {
  
  @Input() scoreCardData:ScoreCardData[] = [
    {
      title:'Total',
      score:85
    },
    {
      title:'Daily Assessment',
      score:65
    },
    {
      title:'Live Assessment',
      score:100
    },
    {
      title:'Module Assessment',
      score:70
    },
    {
      title:'Case Study',
      score:95
    },
    {
      title:'Case Study',
      score:65
    },
    {
      title:'Case Study',
      score:35
    },
    {
      title:'Case Study',
      score:85
    },
    {
      title:'Case Study',
      score:85
    },
    {
      title:'Case Study',
      score:85
    },
  ]

  
}
