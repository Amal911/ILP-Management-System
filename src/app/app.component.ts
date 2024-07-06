import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { DoughnutGraphChartComponent } from './components/doughnut-graph-chart/doughnut-graph-chart.component';
import { DoughnutGraphCarouselComponent } from './components/doughnut-graph-carousel/doughnut-graph-carousel.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet,DoughnutGraphChartComponent,DoughnutGraphCarouselComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'ilp-management-system';
}
