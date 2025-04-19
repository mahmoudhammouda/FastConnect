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
      
      // Naviguer vers la route correspondante en fonction de l'onglet
      switch (tab) {
        case 'consultants':
          this.router.navigate(['/consultants']);
          break;
        case 'missions':
          this.router.navigate(['/missions']);
          break;
        case 'contacts':
          this.router.navigate(['/contacts']);
          break;
        default:
          this.router.navigate(['/consultants']);
      }
    }
  }
}
