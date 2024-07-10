import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class CoreService {

  constructor(private _snakebar: MatSnackBar) { }

  openSnackBar (message: string, action: string = '') {
    this._snakebar.open(message, action,{
      duration: 1000,
      verticalPosition: 'top'
  });
  }
}
