import { Component, EventEmitter, Input, Output } from '@angular/core';
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
  
  @Input() scoreCardData:ScoreCardData[] = [];
  @Output() assessmentType=new EventEmitter<string>(); 

  emitTitle(scorecardTitle:string){
    this.assessmentType.emit(scorecardTitle);
    console.log(scorecardTitle);
  }
}
