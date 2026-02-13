import { Component, Inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatSliderModule } from '@angular/material/slider';
import { CritiqueService } from '../Service/critique.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-critique-dialog',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, MatDialogModule, MatFormFieldModule, MatInputModule, MatButtonModule, MatCheckboxModule, MatSliderModule],
  templateUrl: './critique-dialog.component.html',
  styleUrl: './critique-dialog.component.scss'
})
export class CritiqueDialogComponent {

  public formulaireCritique = this.formBuilder.group({
    attraction_id: [this.data.attractionId, Validators.required],
    texte: ['', Validators.required],
    note: [3, [Validators.required, Validators.min(1), Validators.max(5)]],
    prenom: [''],
    nom: [''],
    anonyme: [false]
  });

  constructor(
    public dialogRef: MatDialogRef<CritiqueDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { attractionId: number, attractionNom: string },
    private formBuilder: FormBuilder,
    private critiqueService: CritiqueService
  ) { }

  onSubmit() {
    if (this.formulaireCritique.valid) {
      const formValue = this.formulaireCritique.getRawValue();

      const critique = {
        critique_id: null,
        attraction_id: formValue.attraction_id!,
        texte: formValue.texte!,
        note: formValue.note!,
        prenom: formValue.anonyme ? null : (formValue.prenom || null),
        nom: formValue.anonyme ? null : (formValue.nom || null),
        date_creation: ''
      };

      this.critiqueService.postCritique(critique).subscribe(() => {
        this.dialogRef.close(true);
      });
    }
  }

  onCancel() {
    this.dialogRef.close(false);
  }
}
