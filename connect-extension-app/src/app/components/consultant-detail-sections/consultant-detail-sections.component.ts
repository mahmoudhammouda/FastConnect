import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ConsultantWithTags } from '../../models/consultant.model';

@Component({
  selector: 'app-consultant-detail-sections',
  standalone: true,
  imports: [CommonModule],
  template: `
    <!-- Sections détaillées -->
    <div class="details-sections">
      <!-- Secteurs d'activité (affiché en premier dans la vue détaillée) -->
      <div class="mb-4" *ngIf="consultant.sectors && consultant.sectors.length > 0">
        <h3 class="text-sm font-medium text-gray-800 mb-1">Secteurs d'activité</h3>
        <div class="flex flex-wrap space-x-1">
          <span *ngFor="let sector of consultant.sectors" class="sector-badge">
            {{ sector }}
          </span>
        </div>
      </div>
      
      <!-- Expertises (mots-clés) -->
      <div class="mb-4" *ngIf="consultant.expertises && consultant.expertises.length > 0">
        <h3 class="text-sm font-medium text-gray-800 mb-1">Expertises</h3>
        <div class="flex flex-wrap space-x-1">
          <span *ngFor="let expertise of consultant.expertises" class="expertise-badge">
            {{ expertise }}
          </span>
        </div>
      </div>
      
      <!-- Compétences techniques (visible aussi sur la carte) -->
      <div class="mb-4">
        <h3 class="text-sm font-medium text-gray-800 mb-1">Compétences techniques</h3>
        <div class="flex flex-wrap">
          <span *ngFor="let skill of consultant.skills" class="skill-badge">
            {{ skill }}
          </span>
        </div>
      </div>
      
      <!-- Dernières expériences -->
      <div *ngIf="consultant.experiences && consultant.experiences.length > 0">
        <h3 class="text-sm font-medium text-gray-800 mb-1">Dernières expériences</h3>
        <ul class="text-sm text-gray-600 space-y-2">
          <li *ngFor="let exp of consultant.experiences" class="flex items-start">
            <div class="mt-0.5 mr-1.5 w-1.5 h-1.5 rounded-full bg-gray-400 flex-shrink-0"></div>
            <div>
              <span class="font-medium">{{ exp.role }}</span>
              <span *ngIf="exp.company" class="ml-1">• {{ exp.company }}</span>
              <span *ngIf="exp.isCurrent" class="text-xs ml-1 text-blue-600">(Actuelle)</span>
            </div>
          </li>
        </ul>
      </div>
    </div>
  `,
  styles: [
    `
    :host {
      display: block;
    }
    
    .sector-badge {
      display: inline-block;
      margin: 0.125rem;
      padding: 0.25rem 0.5rem;
      font-size: 0.75rem;
      border-radius: 0.25rem;
      background-color: rgba(219, 234, 254, 0.8);
      color: #1e40af;
    }
    
    .expertise-badge {
      display: inline-block;
      margin: 0.125rem;
      padding: 0.25rem 0.5rem;
      font-size: 0.75rem;
      border-radius: 0.25rem;
      background-color: rgba(236, 253, 245, 0.8);
      color: #047857;
    }
    
    .skill-badge {
      display: inline-block;
      margin: 0.125rem;
      padding: 0.25rem 0.5rem;
      font-size: 0.75rem;
      border-radius: 0.25rem;
      background-color: rgba(243, 244, 246, 0.8);
      color: #4b5563;
      border: 1px solid #e5e7eb;
    }
    `
  ]
})
export class ConsultantDetailSectionsComponent {
  @Input() consultant!: ConsultantWithTags;
}