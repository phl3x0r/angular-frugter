import { Injectable } from '@angular/core';
import { Observable, interval } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { MockExecutor } from 'protractor/built/driverProviders';

@Injectable({
  providedIn: 'root'
})
export class FrugtService {
  constructor() {}

  hentFrugter(): Observable<Frugt> {
    return interval(1000).pipe(
      map(() => this.skabFrugt()),
      tap(x => console.log('frugt skabt: ', x))
    );
  }

  private skabFrugt(): Frugt {
    const slags: Slags =
      Slags[Slags[Math.floor((Math.random() * Object.keys(Slags).length) / 2)]];

    const modenhed: Modenheder =
      Slags[
        Slags[Math.floor((Math.random() * Object.keys(Modenheder).length) / 2)]
      ];

    const type = this.getType(slags);

    const farve: Farver = this.getFarve(slags, modenhed);

    const størrelse = this.getStørrelse(slags);
    return <Frugt>{
      slags: slags,
      type: type,
      farve: farve,
      størrelse: størrelse,
      modenhed: modenhed
    };
  }

  private getType(slags: Slags): Typer {
    switch (slags) {
      case Slags.KIRSEBÆR:
        return Typer.STENFRUGT;
      case Slags.PÆRE:
      case Slags.ÆBLE:
      case Slags.BANAN:
      case Slags.GRAPEFRUGT:
      case Slags.APPELSIN:
        return Typer.BÆR;
      case Slags.ANANAS:
      default:
        return Typer.ANDET;
    }
  }

  getFarve(slags: Slags, modenhed: Modenheder): Farver {
    const rand = Math.random();
    switch (slags) {
      case Slags.KIRSEBÆR:
        return modenhed === Modenheder.UMODEN
          ? Farver.GRØN
          : rand < 0.2
            ? Farver.GUL
            : Farver.RØD;
      case Slags.PÆRE:
        return modenhed === Modenheder.UMODEN
          ? Farver.GRØN
          : rand < 0.2
            ? Farver.GUL
            : Farver.GRØN;
      case Slags.ÆBLE:
        return modenhed === Modenheder.UMODEN
          ? Farver.GRØN
          : rand < 0.2
            ? Farver.GUL
            : rand > 0.7
              ? Farver.RØD
              : Farver.GRØN;
      case Slags.BANAN:
        return modenhed === Modenheder.UMODEN ? Farver.GRØN : Farver.GUL;
      case Slags.GRAPEFRUGT:
        return modenhed === Modenheder.UMODEN
          ? Farver.GRØN
          : rand < 0.2
            ? Farver.ORANGE
            : rand > 0.7
              ? Farver.PINK
              : Farver.GUL;
      case Slags.APPELSIN:
        return modenhed === Modenheder.UMODEN ? Farver.GRØN : Farver.ORANGE;
      case Slags.ANANAS:
        return Farver.GUL;
    }
  }

  getStørrelse(slags: Slags): Størrelser {
    const rand = Math.random();
    switch (slags) {
      case Slags.KIRSEBÆR:
        return Størrelser.XS;
      case Slags.PÆRE:
        return rand < 0.1
          ? Størrelser.S
          : rand > 0.9
            ? Størrelser.L
            : Størrelser.M;
      case Slags.ÆBLE:
        return rand < 0.1
          ? Størrelser.S
          : rand > 0.9
            ? Størrelser.L
            : Størrelser.M;
      case Slags.BANAN:
        return rand < 0.3
          ? Størrelser.S
          : rand > 0.6
            ? Størrelser.L
            : Størrelser.M;
      case Slags.GRAPEFRUGT:
        return rand < 0.2 ? Størrelser.M : Størrelser.L;
      case Slags.APPELSIN:
        return rand < 0.2
          ? Størrelser.S
          : rand > 0.9
            ? Størrelser.L
            : Størrelser.M;
      case Slags.ANANAS:
        return rand < 0.5 ? Størrelser.L : Størrelser.XL;
    }
  }
}

export interface Frugt {
  slags?: Slags;
  størrelse?: Størrelser;
  farve?: Farver;
  type?: Typer;
  modenhed?: Modenheder;
}

export enum Slags {
  ÆBLE = 0,
  PÆRE = 1,
  KIRSEBÆR = 2,
  BANAN = 3,
  ANANAS = 4,
  APPELSIN = 5,
  GRAPEFRUGT = 6
}

export enum Størrelser {
  XS = 0,
  S = 1,
  M = 2,
  L = 3,
  XL = 4
}

export enum Farver {
  GRØN,
  GUL,
  ORANGE,
  RØD,
  PINK,
  LILLA
}

export enum Typer {
  STENFRUGT,
  BÆR,
  ANDET
}

export enum Modenheder {
  UMODEN,
  MODEN
}
