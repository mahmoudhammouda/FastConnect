import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, ReactiveFormsModule } from '@angular/forms';
import { debounceTime, distinctUntilChanged, switchMap, finalize } from 'rxjs/operators';
import { CommonModule } from '@angular/common';
import { Contact } from '../../models/contact.model';
import { ContactService } from '../../services/contact.service';

@Component({
  selector: 'app-contact-list',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './contact-list.component.html',
  styleUrls: ['./contact-list.component.scss']
})
export class ContactListComponent implements OnInit {
  contacts: Contact[] = [];
  filteredContacts: Contact[] = [];
  isLoading: boolean = false;
  errorMessage: string = '';
  
  // Listes pour les filtres
  sectors: string[] = [];
  roles: string[] = [];
  countries: string[] = [];
  cities: string[] = [];

  // Formulaire de recherche
  searchForm = new FormGroup({
    keyword: new FormControl(''),
    sector: new FormControl(''),
    role: new FormControl(''),
    country: new FormControl(''),
    city: new FormControl('')
  });
  
  constructor(private contactService: ContactService) {}

  ngOnInit(): void {
    console.log('ContactListComponent - ngOnInit');
    this.loadContacts();
    this.loadFilterOptions();
    
    // Écouter les changements sur le formulaire pour filtrer automatiquement
    this.searchForm.valueChanges.subscribe(() => {
      this.applyFilters();
    });
  }
  
  loadContacts(): void {
    console.log('ContactListComponent - loadContacts');
    this.isLoading = true;
    this.contactService.getContacts().subscribe({
      next: (contacts) => {
        console.log('Contacts chargés:', contacts);
        this.contacts = contacts;
        this.filteredContacts = contacts;
        this.isLoading = false;
      },
      error: (error) => {
        this.errorMessage = 'Erreur lors du chargement des contacts';
        this.isLoading = false;
        console.error('Erreur lors du chargement des contacts', error);
      }
    });
  }
  
  loadFilterOptions(): void {
    this.contactService.getAvailableSectors().subscribe(sectors => this.sectors = sectors);
    this.contactService.getAvailableRoles().subscribe(roles => this.roles = roles);
    this.contactService.getAvailableCountries().subscribe(countries => this.countries = countries);
    this.contactService.getAvailableCities().subscribe(cities => this.cities = cities);
  }
  
  applyFilters(): void {
    const formValues = this.searchForm.value;
    
    const filters: any = {};
    if (formValues.sector) filters.sector = formValues.sector;
    if (formValues.role) filters.role = formValues.role;
    if (formValues.country) filters.country = formValues.country;
    if (formValues.city) filters.city = formValues.city;
    
    this.isLoading = true;
    this.contactService.searchContacts(formValues.keyword || '', filters).subscribe({
      next: (filteredContacts) => {
        this.filteredContacts = filteredContacts;
        this.isLoading = false;
      },
      error: (error) => {
        this.errorMessage = 'Erreur lors de la recherche de contacts';
        this.isLoading = false;
        console.error('Erreur lors de la recherche de contacts', error);
      }
    });
  }
  
  resetFilters(): void {
    this.searchForm.reset();
    this.applyFilters();
  }
  
  openLinkedIn(url: string): void {
    window.open(url, '_blank');
  }
  
  /**
   * Force le rechargement manuel des contacts
   */
  forceRefreshContacts(): void {
    console.log('Force refresh des contacts');
    this.isLoading = true;
    this.contacts = [];
    this.filteredContacts = [];
    
    // Petit délai pour simuler le chargement
    setTimeout(() => {
      // Recharger les contacts
      this.loadContacts();
      // Recharger les options de filtres
      this.loadFilterOptions();
    }, 500);
  }
}
