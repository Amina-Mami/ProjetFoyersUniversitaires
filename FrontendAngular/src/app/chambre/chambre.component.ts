import { Component, OnInit, ViewChild } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import {
  DomSanitizer,
  SafeHtml,
  SafeResourceUrl,
} from '@angular/platform-browser';
import { Foyer } from '../Models/Foyer';

@Component({
  selector: 'app-chambre',
  templateUrl: './chambre.component.html',
  styleUrls: ['./chambre.component.css'],
})
export class ChambreComponent implements OnInit {
  rows: Chambre[] = [];
  filteredRows: Chambre[] = [];

  blocs: Bloc[] = [];
  searchValue = '';
  ColumnMode = { force: 'force' };

  @ViewChild('addCertificateModal') addCertificateModal: any;
  certificateForm: FormGroup;
  isEditMode: boolean = false;
  currentEditingId: null | undefined;
  showModal = false;
  modalVirtualTourURL: SafeResourceUrl | undefined;
  visualViewport: boolean = false;
  visualUrl: SafeHtml | undefined;

  // chambre.component.ts

  constructor(
    private http: HttpClient,
    private modalService: NgbModal,
    private fb: FormBuilder,
    private sanitizer: DomSanitizer
  ) {
    this.certificateForm = this.fb.group({
      numeroChambre: ['', Validators.required],
      type: ['', Validators.required],
      virtualTourURL: ['', Validators.required],
      bloc: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    this.fetchData();
    this.getAllBlocs();
  }

  fetchData() {
    const url = 'http://localhost:8081/foyer/api/chambres/getAll';
    this.http.get<any[]>(url).subscribe({
      next: (response) => {
        this.rows = response.map((chambre) => ({
          idChambre: chambre.idChambre,
          numeroChambre: chambre.numeroChambre,
          typeChambre: chambre.typeChambre,
          virtualTourURL: chambre.virtualTourURL,
          bloc: chambre.bloc
            ? {
                idBloc: chambre.bloc.idBloc,
                nomBloc: chambre.bloc.nomBloc,
                capaciteBloc: chambre.bloc.capaciteBloc,
              }
            : null,
        }));

        this.filteredRows = [...this.rows];
        console.log('Fetched rooms:', this.rows);
      },
      error: (err) => console.error('Error fetching rooms:', err),
    });
  }

  getAllBlocs() {
    const url = `http://localhost:8081/foyer/api/blocs/getAll`;
    this.http.get<any>(url).subscribe({
      next: (response) => {
        this.blocs = response;
      },
      error: (err) => console.error(err),
    });
  }

  // chambre.component.ts

  openAddCertificateModal() {
    this.isEditMode = false;
    this.currentEditingId = null;
    this.certificateForm.reset();
    this.modalService.open(this.addCertificateModal, {
      ariaLabelledBy: 'modal-basic-title',
    });
  }

  onSubmit(modal: any) {
    if (this.certificateForm.valid) {
      const formData = {
        numeroChambre: this.certificateForm.value.numeroChambre,
        type: this.certificateForm.value.type,
        virtualTourURL: this.certificateForm.value.virtualTourURL,
        bloc: {
          idBloc: this.certificateForm.value.bloc,
        },
      };

      if (this.isEditMode) {
        const updateUrl = `http://localhost:8081/foyer/api/chambres/get/${this.currentEditingId}`;
        this.http.put(updateUrl, formData).subscribe({
          next: (response) => {
            console.log('Formation mise à jour :', response);
            modal.close();
            this.fetchData(); // Refresh data after update
          },
          error: (error) => {
            console.error('Error updating certificate:', error);
          },
        });
      } else {
        this.http
          .post('http://localhost:8081/foyer/api/chambres/add', formData)
          .subscribe({
            next: (response) => {
              console.log('Certificate added:', response);
              modal.close();
              this.fetchData(); // Refresh data after add
            },
            error: (error) => {
              console.error('Error adding certificate:', error);
            },
          });
      }
    } else {
      console.error('Form is not valid');
    }
  }

  openEditModal(rowData: any, b: boolean) {
    this.visualViewport = b;
    this.visualUrl = this.sanitizer.bypassSecurityTrustHtml(
      rowData.virtualTourURL
    );
    this.currentEditingId = rowData.idChambre;
    this.isEditMode = true;
    this.certificateForm.patchValue({
      numeroChambre: rowData.numeroChambre,
      type: rowData.type,
      virtualTourURL: rowData.virtualTourURL,
      bloc: rowData.bloc.idBloc,
    });
    this.modalService.open(this.addCertificateModal);
  }

  deleteFormation(row: any) {
    const chambre_id = row.idChambre;
    const url = `http://localhost:8081/foyer/api/chambres/get/${chambre_id}`;
    this.http.delete(url).subscribe({
      next: (response) => {
        console.log('Certificate deleted:', response);
        this.fetchData(); // Refresh data after delete
      },
      error: (error) => {
        console.error('Error deleting certificate:', error);
      },
    });
  }

  // chambre.component.ts

  filterUpdate(event: any) {
    const searchValue = event.target.value.toLowerCase().trim();

    if (searchValue) {
      this.filteredRows = this.rows.filter(
        (row) =>
          row.numeroChambre.toLowerCase().includes(searchValue) ||
          row.typeChambre.toLowerCase().includes(searchValue) ||
          row.bloc.nomBloc.toLowerCase().includes(searchValue) ||
          row.bloc.capaciteBloc.toString().includes(searchValue)
      );
    } else {
      this.filteredRows = [...this.rows]; // Reset to all rows if searchValue is empty
    }
  }

  openVirtualTourModal() {
    this.visualViewport = true;
  }

  closeModal() {
    this.showModal = false;
  }
}

interface Chambre {
  idChambre: number;
  numeroChambre: string;
  typeChambre: string;
  virtualTourURL: string;
  bloc: {
    idBloc: number;
    nomBloc: string;
    capaciteBloc: number;
  };
}

export interface Bloc {
  idBloc: number;
  nomBloc: string;
  capaciteBloc: number;
  foyer: Foyer;
}
