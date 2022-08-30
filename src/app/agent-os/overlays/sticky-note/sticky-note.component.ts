import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-sticky-note',
  templateUrl: './sticky-note.component.html',
  styleUrls: ['./sticky-note.component.scss']
})
export class StickyNoteComponent implements OnInit {

  accountNumbers = ['8245100030092203'];

  @Output() closeSticky = new EventEmitter<void>();

  constructor(private snackbar: MatSnackBar) { }

  ngOnInit(): void {
  }

  copyData(accountNumber: string) {
    navigator.clipboard.writeText(accountNumber);

    this.snackbar.open('Copied', '', { duration: 1500 });
  }

  close(): void {
    this.closeSticky.emit();
  }
}
