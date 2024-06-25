// ajouter-foyer.component.ts

import { Component, OnInit, Renderer2, AfterViewInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Foyer } from 'src/app/Models/Foyer';
import { FoyerService } from 'src/app/Services/foyer.service';
import { MatDialogRef } from '@angular/material/dialog';
import { Universite } from 'src/app/Models/Universite';
import { Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-ajouter-foyer',
  templateUrl: './ajouter-foyer.component.html',
  styleUrls: ['./ajouter-foyer.component.css']
})
export class AjouterFoyerComponent implements OnInit {
  FoyerForm: FormGroup;
  blurBackground: boolean = false;

  nouveauFoyer: Foyer = new Foyer();
  universites: Universite[] = [];
  messageAjout: string = '';

  @Output() foyerAjouteAvecSucces: EventEmitter<void> = new EventEmitter<void>();

  constructor(
    private foyerService: FoyerService,
    private fb: FormBuilder,
    private renderer: Renderer2,
    private dialogRef: MatDialogRef<AjouterFoyerComponent>
  ) {
    dialogRef.disableClose = true; // Empêche la fermeture par clic à l'extérieur
  }

  ngOnInit(): void {
    this.initializeForm();
    this.fetchUniversites();
  }

  initializeForm(): void {
    this.FoyerForm = this.fb.group({
      nomFoyer: ['', [Validators.required, Validators.minLength(3)]],
      capaciteFoyer: ['', [Validators.required, Validators.pattern('[0-9]+'), Validators.min(100), Validators.max(600)]],
      idUniversite: ['', Validators.required], 
      
    });
  }

  fetchUniversites(): void {
    this.foyerService.getUniversites().subscribe(
      universities => {
        this.universites = universities;
      },
      error => {
        console.error('Error fetching universities', error);
      }
    );
  }

  onSubmit(): void {
  

    console.log('Données du formulaire avant envoi:', this.FoyerForm.value);
    
    const formData = { ...this.FoyerForm.value, idUniversite: Number(this.FoyerForm.value.idUniversite) };
   
  
    this.foyerService.ajouterFoyer(formData).subscribe(
      response => {
        console.log('Foyer ajouté avec succès', response);
        this.messageAjout = 'Foyer ajouté avec succès';
  
        this.foyerAjouteAvecSucces.emit();
  
        setTimeout(() => {
          this.dialogRef.close();
          this.blurBackground = false;
          this.renderer.removeClass(document.body, 'blur-background');
        }, 2000);
      },
      error => {
        console.error("Erreur dans l'ajout du foyer", error);
        this.messageAjout = 'Erreur lors de l\'ajout du foyer';
      }
    );
  }
  

  onAnnulerClick(): void {
    // Fermez le dialogue en utilisant la méthode close
    this.dialogRef.close();
  }
} 