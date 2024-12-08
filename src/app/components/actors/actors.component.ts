import { Component, OnInit } from '@angular/core';
import { DataService } from '../../services/data.service';
import { Router } from '@angular/router';
import { JsonPipe, NgFor } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-actors',
  imports: [NgFor,MatIconModule, FormsModule ],
  template: `
<div class="container mx-auto p-4">
  <h1 class="text-3xl font-bold mb-6 text-center">Gio-o Các Tác Giả</h1>

  <!-- Search Bar -->
  <div class="mb-4 flex justify-center">
    <input
      [(ngModel)]="searchQuery"
      (input)="onSearchChange()"
      type="text"
      placeholder="Search authors..."
      class="p-2 border border-gray-300 rounded w-full sm:w-1/2"
    />
  </div>

  <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-6">
    <div *ngFor="let actor of filteredActors" class="max-w-sm bg-white border border-gray-200 rounded-lg shadow-md flex flex-col">
      <!-- Actor name and icon section -->
      <div class="flex items-center p-4 flex-grow">
        <mat-icon class="mr-4 text-xl">person</mat-icon> <!-- Icon before the name -->
        <span class="text-lg font-medium">{{ actor.nameDisplay }}</span>
      </div>
      <!-- Button section with a fixed height -->
      <div class="p-4 mt-auto">
        <button (click)="viewWorks(actor.name)" class="w-full bg-blue-500 text-white font-semibold py-2 px-4 rounded hover:bg-blue-600">
          View Works
        </button>
      </div>
    </div>
  </div>
</div>

  `,
})
export class ActorsComponent implements OnInit {
  actors: any[] = [];
  filteredActors: any[] = []; // Holds filtered actors list
  searchQuery: string = '';   // Holds the search query

  constructor(private dataService: DataService, private router: Router) {}

  ngOnInit(): void {
    this.dataService.getActors().subscribe(data => {
      this.actors = data.actors.map((act:any)=>({
        ...act,
        nameDisplay: act.name.replace(/-/g, ' ')
      }));
      this.filteredActors = this.actors;  // Initially display all actors
    });
  }

  // Filter actors based on the search query
  onSearchChange(): void {
    this.filteredActors = this.actors.filter(actor =>
      actor.name.toLowerCase().includes(this.searchQuery.toLowerCase())
    );
  }

  viewWorks(actorName: string): void {
    this.router.navigate(['/actor', actorName]);
  }
}
