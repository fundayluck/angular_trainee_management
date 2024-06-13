import { Component, OnInit, ViewChild } from '@angular/core';
import { GradesService } from '../../../service/trainee/grades.service';
import {
  ApexTitleSubtitle,
  ChartComponent,
  NgApexchartsModule,
} from 'ng-apexcharts';
import {
  ApexNonAxisChartSeries,
  ApexResponsive,
  ApexChart,
  ApexStroke,
  ApexFill,
  ApexDataLabels,
} from 'ng-apexcharts';

@Component({
  selector: 'app-grades',
  standalone: true,
  imports: [NgApexchartsModule],
  templateUrl: './grades.component.html',
  styleUrls: ['./grades.component.css'],
})
export class GradesComponent implements OnInit {
  chartSeries: ApexNonAxisChartSeries = [];
  chartDetails: ApexChart = {
    type: 'polarArea',
    toolbar: {
      show: false,
    },
  };
  title: ApexTitleSubtitle = {
    text: 'Trainee Grades',
  };
  chartLabels: any[] = ['Frontend', 'Backend', 'Mobile'];
  chartStroke: ApexStroke = {
    colors: ['#fff'],
  };
  chartFill: ApexFill = {
    opacity: 0.8,
  };
  chartResponsive: ApexResponsive[] = [
    {
      breakpoint: 480,
      options: {
        legend: {
          position: 'bottom',
        },
      },
    },
  ];
  chartDataLabels: ApexDataLabels = {
    enabled: true,
  };

  constructor(private gradesService: GradesService) {}

  ngOnInit() {
    this.gradesService.getTraineeGrades().subscribe({
      next: (res: any) => {
        console.log(res);
        this.chartSeries = res.data.map((item: any) => item.grade);
        console.log(this.chartSeries);
        console.log(this.chartLabels);
      },
      error: (error: any) => {
        console.log(error);
      },
    });
  }
}
