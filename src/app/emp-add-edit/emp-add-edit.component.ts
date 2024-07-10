import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { EmployeeService } from '../services/employee.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { CoreService } from '../core/core.service';

@Component({
  selector: 'app-emp-add-edit',
  templateUrl: './emp-add-edit.component.html',
  styleUrls: ['./emp-add-edit.component.scss']
})
export class EmpAddEditComponent implements OnInit {
  empForm: FormGroup;
  education: string[] = [
    'School',
    'Polytechnique',
    'UG',
    'PG'
  ];

  constructor(
    private _fb: FormBuilder, 
    private _empService: EmployeeService,
    private _coreService: CoreService,
    private _dialogRef: MatDialogRef<EmpAddEditComponent>,
    @Inject(MAT_DIALOG_DATA) public data:any
  ) {
    this.empForm = this._fb.group({
      id: ['', Validators.required], // Add validators.required for required fields
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]], // Add email validator
      dob: ['', Validators.required],
      gender: ['', Validators.required],
      education: ['', Validators.required],
      company: ['', Validators.required],
      experience: ['', Validators.required],
      package: ['', Validators.required]
    });
  }


  ngOnInit(): void {
    this.empForm.patchValue(this.data);
  }

  onFormSubmit() {
    if (this.empForm.valid) {
      if(this.data){
        this._empService.updateEmployee(this.data.id,this.empForm.value).subscribe({
          next: (val: any) => {
            this._coreService.openSnackBar('Employee updated!')

            this._dialogRef.close(true); // Close the dialog on successful submission
          },
          error: (err: any) => {
            console.error(err);
            // Handle error (e.g., display error message)
          }
        });
      }
      else {
        this._empService.addEmployee(this.empForm.value).subscribe({
          next: (value: any) => {
            this._coreService.openSnackBar('Employee added successfully!')
            this._dialogRef.close(true); // Close the dialog on successful submission
          },
          error: (error) => {
            console.error('Error adding employee:', error);
            // Handle error (e.g., display error message)
          }
        });
      }
     
    }
  }
}