import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  @Output() tabChange = new EventEmitter<string>();
  activeTab: string = 'consultants'; // Par défaut, l'onglet "Consultants" est actif

  constructor(private router: Router, private route: ActivatedRoute) {}

  ngOnInit() {
    // Récupérer l'onglet actif à partir de l'URL si disponible
    this.route.queryParams.subscribe(params => {
      if (params['tab']) {
        this.activeTab = params['tab'];
      }
    });
  }

  setActiveTab(tab: string) {
    if (this.activeTab !== tab) {
      this.activeTab = tab;
      this.tabChange.emit(tab);
      
      // Mettre à jour l'URL avec l'onglet actif (sans rechargement de page)
      this.router.navigate([], {
        relativeTo: this.route,
        queryParams: { tab: tab },
        queryParamsHandling: 'merge',
        skipLocationChange: false
      });
    }
  }
}
