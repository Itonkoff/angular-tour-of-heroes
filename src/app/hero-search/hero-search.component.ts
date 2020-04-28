import {Component, OnInit} from '@angular/core';
import {HeroService} from "../hero.service";
import {Hero} from "../hero";

@Component({
  selector: 'app-hero-search',
  templateUrl: './hero-search.component.html',
  styleUrls: ['./hero-search.component.css']
})
export class HeroSearchComponent implements OnInit {
  heroes: Hero[];
  filteredHeroes: Hero[];

  _searchTerm: string;
  get searchTerm(): string {
    return this._searchTerm;
  }

  set searchTerm(value) {
    this._searchTerm = value;
    this.filteredHeroes = this.searchTerm ?
      this.filter(this._searchTerm) : [];
  }

  constructor(private heroService: HeroService) {
  }

  ngOnInit(): void {
    this.getHeroes();
  }

  private filter(searchTerm: string): Hero[] {
    searchTerm = searchTerm.toLocaleLowerCase();
    return this.heroes.filter((hero: Hero) =>
      hero.name.toLocaleLowerCase().indexOf(searchTerm) !== -1);
  }

  private getHeroes() {
    this.heroService.getHeroes()
      .subscribe(heroes => this.heroes = heroes);
  }
}
