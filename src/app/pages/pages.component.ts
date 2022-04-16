import { Component, OnInit } from '@angular/core';
import { SettingsService } from '../services/settings.service';
import { SidebarService } from '../services/sidebar.service';
declare function customInitFunctions(): any;

@Component({
  selector: 'app-pages',
  templateUrl: './pages.component.html',
})
export class PagesComponent implements OnInit {
  constructor(
    private settings: SettingsService,
    private sidebarService: SidebarService
  ) {}

  ngOnInit(): void {
    customInitFunctions();
    this.sidebarService.getMenu();
  }
}
