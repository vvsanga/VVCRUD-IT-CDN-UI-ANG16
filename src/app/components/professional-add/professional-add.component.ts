import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ProfessionalService } from 'src/app/services/professional.service';

@Component({
  selector: 'app-professional-add',
  templateUrl: './professional-add.component.html',
  styleUrls: ['./professional-add.component.scss'],
})
export class ProfessionalAddComponent implements OnInit {

  formProfessional: FormGroup;

  constructor(
    private professionalService: ProfessionalService,
    private dialogRef: MatDialogRef<ProfessionalAddComponent>,
    private formBuilder: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) {
    this.formProfessional = this.formBuilder.group({
      username: ['', Validators.required],
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

      this.professionalService.addProfessional(formValue).subscribe({
        next: (val: any) => {
          alert('Professional added successfully!');
          this.formProfessional.reset();
          this.dialogRef.close(true);
        },
        error: (err: any) => {
          console.error(err);
          alert("Error while adding the Professional!");
        },
      });
    }
  }
}
