import { Component, OnInit } from '@angular/core';
import {
  FrugtService,
  Frugt,
  Slags,
  Størrelser,
  Farver,
  Modenheder,
  Typer
} from './frugt.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'frugt app';

  public frugt: { [key: string]: string };

  constructor(private frugtService: FrugtService) {}

  ngOnInit(): void {
    this.frugtService
      .hentFrugter()
      .subscribe(frugt => (this.frugt = this.stringify(frugt)));
  }

  getSlags(frugt: Frugt): string {
    return Slags[frugt.slags];
  }

  stringify(frugt: Frugt): { [key: string]: string } {
    return {
      slags: Slags[frugt.slags],
      storrelse: Størrelser[frugt.størrelse],
      farve: Farver[frugt.farve],
      modenhed: Modenheder[frugt.modenhed],
      type: Typer[frugt.type]
    };
  }
}
