import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Hospital } from 'src/app/models/hospital';
import { Medic } from 'src/app/models/medic';
import { User } from 'src/app/models/user.model';
import { SearchService } from 'src/app/services/search.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss'],
})
export class SearchComponent implements OnInit {
  constructor(
    private activatedRoute: ActivatedRoute,
    private searchService: SearchService
  ) {}

  public users: User[] = [];
  public medics: Medic[] = [];
  public hospitals: Hospital[] = [];

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(({ term }) => this.globalSearch(term));
  }

  globalSearch(term: string) {
    this.searchService.globalSearch(term).subscribe((resp: any) => {
      this.users = resp.user;
      this.medics = resp.medic;
      this.hospitals = resp.hospital;
    });
  }
}
