import { Component } from '@angular/core';
import { AttractionService } from '../Service/attraction.service';
import { CritiqueService } from '../Service/critique.service';
import { CommonModule } from '@angular/common';
import { Observable } from 'rxjs';
import { AttractionInterface } from '../Interface/attraction.interface';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { CritiqueDialogComponent } from '../critique-dialog/critique-dialog.component';

@Component({
  selector: 'app-accueil',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatButtonModule, MatDialogModule, MatIconModule],
  templateUrl: './accueil.component.html',
  styleUrl: './accueil.component.scss'
})
export class AccueilComponent {

  public attractionsData: { [key: number]: { critiques: any[], moyenne: number | null } } = {};

  constructor(
    public attractionService: AttractionService,
    private critiqueService: CritiqueService,
    private dialog: MatDialog
  ) { }

  public attractions: Observable<AttractionInterface[]> = this.attractionService.getVisibleAttractions()

  ngOnInit() {
    this.attractions.subscribe(attractions => {
      attractions.forEach(attraction => {
        this.loadCritiques(attraction.attraction_id!);
      });
    });
  }

  loadCritiques(attractionId: number) {
    this.critiqueService.getCritiquesByAttraction(attractionId).subscribe(result => {
      this.attractionsData[attractionId] = {
        critiques: result.critiques || [],
        moyenne: result.moyenne
      };
    });
  }

  openCritiqueDialog(attraction: AttractionInterface) {
    const dialogRef = this.dialog.open(CritiqueDialogComponent, {
      width: '500px',
      data: { attractionId: attraction.attraction_id, attractionNom: attraction.nom }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.loadCritiques(attraction.attraction_id!);
      }
    });
  }

  getCritiques(attractionId: number) {
    return this.attractionsData[attractionId]?.critiques || [];
  }

  getMoyenne(attractionId: number) {
    return this.attractionsData[attractionId]?.moyenne;
  }
}
