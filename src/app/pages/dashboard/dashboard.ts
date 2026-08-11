import { Component, OnInit, inject, signal } from '@angular/core';
import { DatePipe } from '@angular/common';
import { MasterSrv } from '../../core/services/master-srv';
import { IDashboard } from '../../core/model/Interfaces/User.Model';

@Component({
  selector: 'app-dashboard',
  imports: [DatePipe],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css',
})
export class Dashboard implements OnInit {

  private readonly masterSrv = inject(MasterSrv);
  dashboardData = signal<IDashboard | null>(null);

  ngOnInit(): void {
    this.masterSrv.getDashboard().subscribe({
      next: (response) => this.dashboardData.set(response)
    });
  }
}
