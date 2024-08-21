import { Component } from '@angular/core';
import { DoughnutGraphCarouselComponent } from '../../components/doughnut-graph-carousel/doughnut-graph-carousel.component';
import { ForzenColumnTableComponent } from '../../components/forzen-column-table/forzen-column-table.component';
import { DashboardScoresService } from '../../services/API/dashboard-scores.service';

@Component({
  selector: 'app-dashboard-scorecard',
  standalone: true,
  imports: [DoughnutGraphCarouselComponent, ForzenColumnTableComponent],
  templateUrl: './dashboard-scorecard.component.html',
  styleUrl: './dashboard-scorecard.component.scss',
})
export class DashboardScorecardComponent {
  total_score: any = [];
  categoryWiseScore: any = {};
  columns: any = [
    'Daily Assessment',
    'Live Assessment',
    'Module Assessment',
    'Case Study',
    'Project',
  ];
  columnData: any;
  tableDetailedData: any;
  title: string = 'Total Score';

  avgScores: any[] = [];

  ngOnInit() {
    this.fetchAllScores();
    this.calculateAverageScores();
    this.fetchCategoryWiseScores();
  }
  constructor(private dashboardScoreService: DashboardScoresService) {}

  fetchAllScores() {
    this.dashboardScoreService.getAllScores().subscribe(
      (response) => {
        this.total_score = response;
        const transformedData = this.transformData(this.total_score);
        this.columnData = this.columns;
        this.tableDetailedData = transformedData;
      },
      (error) => {
        console.error('Error creating coupon:', error);
      }
    );
  }

  fetchCategoryWiseScores() {
    this.dashboardScoreService.getCategoryWiseScores().subscribe(
      (response) => {
        console.log('Response:', response);
        this.categoryWiseScore = response;
      },
      (error) => {
        console.error('Error creating coupon:', error);
      }
    );
  }

    // Transform the data
  transformData(data: any[]) {
    return data.map((entry) => ({
      id: entry.id,
      name: entry.name,
      scores: [
        entry.daily_assessment,
        entry.live_assessment,
        entry.module_assessment,
        entry.case_study,
        entry.project,
      ],
    }));
  }


  calculateAverageScores() {
    const totals = {
      daily_assessment: 0,
      live_assessment: 0,
      module_assessment: 0,
      case_study: 0,
      project: 0,
      grand_total: 0,
    };

    const numberOfStudents = this.total_score.length;

    this.total_score.forEach((student: any) => {
      totals.daily_assessment += student.daily_assessment;
      totals.live_assessment += student.live_assessment;
      totals.module_assessment += student.module_assessment;
      totals.case_study += student.case_study;
      totals.project += student.project;
      totals.grand_total +=
        student.daily_assessment +
        student.live_assessment +
        student.module_assessment +
        student.case_study +
        student.project;
    });

    this.avgScores = [
      {
        title: 'Total',
        score: (totals.grand_total / (numberOfStudents * 5)).toFixed(0),
      },
      {
        title: 'Daily Assessment',
        score: (totals.daily_assessment / numberOfStudents).toFixed(0),
      },
      {
        title: 'Live Assessment',
        score: (totals.live_assessment / numberOfStudents).toFixed(0),
      },
      {
        title: 'Module Assessment',
        score: (totals.module_assessment / numberOfStudents).toFixed(0),
      },
      {
        title: 'Case Study',
        score: (totals.case_study / numberOfStudents).toFixed(0),
      },
      {
        title: 'Project',
        score: (totals.project / numberOfStudents).toFixed(0),
      },
    ];
    console.log(this.avgScores);
  }

  handleAssessmentType(scorecardType: any) {
    for (let key in this.categoryWiseScore) {
      // Check if the property exists and has a valid type
      const currentScore =
        this.categoryWiseScore[key as keyof typeof this.categoryWiseScore];

      if (currentScore && currentScore.type === scorecardType) {
        console.log('Entered here:', scorecardType);
        this.columnData = currentScore.tasks;
        this.tableDetailedData = currentScore.taskWiseScores;
        this.title = currentScore.type;
        return;
      } else if (scorecardType === 'Total') {
        this.columnData = this.columns;
        this.title = 'Total Score';
        this.ngOnInit();
        console.log('Entered here:', scorecardType);
      }
    }
  }
}
