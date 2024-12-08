import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DataService } from '../../services/data.service';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';  // Import DomSanitizer
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-literary-work',
  imports: [MatIconModule],
  template: `
    <div class="container">
    <div class="flex">
    <div class="">
      <button
      (click)="goBack()"
      class="bg-transparent text-blue-500 p-2 rounded hover:bg-blue-100"
      aria-label="Back to Authors"
    >
      <mat-icon>arrow_back</mat-icon>  <!-- Arrow Back Icon -->
    </button>
    </div>
    <h1 class="text-3xl font-bold mb-4">Tác Phẩm: {{ workName }}</h1>

  </div>
      <div class="flex justify-center items-center" [innerHTML]="workContent"></div>  <!-- Render raw HTML safely -->
    </div>
  `,
})
export class LiteraryWorkComponent implements OnInit {
  actorName!: string;
  workName!: string;
  workContent: SafeHtml = '';  // Use SafeHtml type for sanitized HTML content

  constructor(
    private route: ActivatedRoute,
    private dataService: DataService,
    private sanitizer: DomSanitizer,  // Inject DomSanitizer
    private router: Router,

  ) {}

  ngOnInit(): void {
    this.actorName = this.route.snapshot.params['name'];
    this.workName = this.route.snapshot.params['work'];

    // Fetch the HTML content
    this.dataService.getLiteraryWork(this.actorName, this.workName).subscribe(data => {
      // Sanitize the HTML content
      this.workContent = this.sanitizer.bypassSecurityTrustHtml(data);
      this.workName = this.workName.replace(/-/g, ' ').replace(/\.html$/, '');
    });
  }
  goBack(): void {
    this.router.navigate(['/actor', this.actorName]);
  }
}
