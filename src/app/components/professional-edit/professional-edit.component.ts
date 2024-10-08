import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ProfessionalService } from 'src/app/services/professional.service';

@Component({
  selector: 'app-professional-edit',
  templateUrl: './professional-edit.component.html',
  styleUrls: ['./professional-edit.component.scss'],
})
export class ProfessionalEditComponent implements OnInit {

  formProfessional: FormGroup;

  constructor(
    private professionalService: ProfessionalService,
    private dialogRef: MatDialogRef<ProfessionalEditComponent>,
    private formBuilder: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) {
    this.formProfessional = this.formBuilder.group({
      mail: ['', Validators.required],
      phoneNumber: ['', Validators.required],
      skillset: ['', Validators.required],
      hobby: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.formProfessional.patchValue(this.data);
  }

  onSubmit() {
    if (this.formProfessional.valid) {
      // Extract the form value
      const formValue = this.formProfessional.value;

      // Check if skillset is a comma-separated string and convert it
      if (formValue.skillset) {
        const skillNames = formValue.skillset.split(',').map((name: string) => name.trim());
        formValue.skillset = skillNames.map((name: any) => ({
          name: name
        }));
      }

      if (this.data) {
        this.professionalService
          .updateProfessional(this.data.id, formValue)
          .subscribe({
            next: (val: any) => {
              alert('Professional details updated successfully!');
              this.dialogRef.close(true);
            },
            error: (err: any) => {
              console.error(err);
              alert("Error while updating the Professional!");
            },
          });
      }
    }
  }

}
