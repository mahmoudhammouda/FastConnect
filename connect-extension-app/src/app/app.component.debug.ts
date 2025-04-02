import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { CommonModule } from '@angular/common';
import { filter } from 'rxjs/operators';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AuthService } from './services/auth.service';
import { User } from './models/user.model';
import { ModalService } from './services/modal.service';
import { environment } from '../environments/environment';
import { ApiService } from './services/api.service';
import { ConsultantService } from './services/consultant.service';
import { ConsultantListComponent } from './components/consultant-list/consultant-list.component';
import { ConsultantCardComponent } from './components/consultant-card/consultant-card.component';
import { LoginComponent } from './components/auth/login/login.component';

@Component({
  selector: 'app-debug',
  standalone: true,
  imports: [
    CommonModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule
  ],
  template: `
    <div class="bg-white p-4 shadow-lg fixed top-0 left-0 right-0 z-50">
      <h1 class="text-xl font-bold">FastConnect Debug Console</h1>
      <div class="mt-2">
        <p><strong>Environment:</strong> {{ debugInfo.environment }}</p>
        <p><strong>API URL:</strong> {{ debugInfo.apiUrl }}</p>
        <p><strong>isExtension:</strong> {{ debugInfo.isExtension }}</p>
        <p><strong>Base href:</strong> {{ debugInfo.baseHref }}</p>
        <button (click)="testApiConnection()" class="mt-2 px-4 py-2 bg-blue-500 text-white rounded">
          Test API Connection
        </button>
        <div *ngIf="apiStatus" class="mt-2 p-2" [ngClass]="apiStatus === 'OK' ? 'bg-green-100' : 'bg-red-100'">
          <p>API Status: {{ apiStatus }}</p>
          <p *ngIf="apiData">Data: {{ apiData.length }} consultants loaded</p>
        </div>
      </div>
    </div>
  `,
})
export class AppDebugComponent implements OnInit {
  debugInfo = {
    baseHref: document.getElementsByTagName('base')[0]?.getAttribute('href') || 'undefined',
    location: window.location.href,
    environment: environment.envName || 'undefined',
    apiUrl: environment.apiUrl || 'undefined',
    isExtension: environment.isExtension,
    appStartTime: new Date().toISOString()
  };

  apiStatus: string | null = null;
  apiData: any[] | null = null;

  constructor(
    private apiService: ApiService,
    private consultantService: ConsultantService
  ) {
    console.log('🔍 FastConnect Debug Module initialisé:', this.debugInfo);
  }

  ngOnInit() {
    console.log('Debug component initialized');
  }

  testApiConnection() {
    this.apiStatus = 'Testing...';
    
    this.consultantService.getConsultants().subscribe(
      (data) => {
        console.log('API response received:', data);
        this.apiStatus = 'OK';
        this.apiData = data;
      },
      (error) => {
        console.error('API error:', error);
        this.apiStatus = 'Error: ' + (error.message || 'Unknown error');
      }
    );
  }
}