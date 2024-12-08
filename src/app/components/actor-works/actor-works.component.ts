import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DataService } from '../../services/data.service';
import { CommonModule, NgFor } from '@angular/common';
import { FormsModule, NgModel } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-actor-works',
  templateUrl: './actor-works.component.html',
  imports: [NgFor, FormsModule, MatIconModule],
  standalone: true
})
export class ActorWorksComponent implements OnInit {
  actorName!: string;
  actorNameDisplay!: string;
  works: string[] = [];
  filteredWorks: string[] = [];
  searchQuery: string = '';
  currentPage: number = 1;
  pageSize: number = 10; // Number of works to show per page
  totalPages: number = 1;

  constructor(private route: ActivatedRoute, private dataService: DataService, private router: Router  // Inject Router
  ) { }

  ngOnInit(): void {
    this.actorName = this.route.snapshot.params['name'];
    this.dataService.getActors().subscribe(data => {
      const actor = data.actors.find((a: any) => a.name === this.actorName);
      this.works = actor.works;
      if (actor) {
        this.totalPages = Math.ceil(this.works.length / this.pageSize);
        this.updateFilteredWorks();
        this.actorNameDisplay = this.actorName.replace(/-/g, ' ');
      }
    });
  }

  // Update filtered works based on current page and search query
  updateFilteredWorks(): void {
    const startIndex = (this.currentPage - 1) * this.pageSize;
    const endIndex = startIndex + this.pageSize;

    this.filteredWorks = this.works
      .filter(work => work.toLowerCase().includes(this.searchQuery.toLowerCase()))
      .slice(startIndex, endIndex);
  }

  // Navigate to a specific work
  viewWork(work: string): void {
    this.router.navigate(['/actor', this.actorName, 'work', work]);

  }

  // Handle search input change
  onSearchChange(): void {
    this.currentPage = 1; // Reset to the first page whenever search query changes
    this.updateFilteredWorks();
  }

  // Handle page change
  changePage(page: number): void {
    this.currentPage = page;
    this.updateFilteredWorks();
  }
  goBack(): void {
    this.router.navigate(['/']);
  }
}
