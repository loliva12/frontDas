import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { CommonModule } from '@angular/common'; 
import { IMessage } from '../../models/i-message';

@Component({
  selector: 'app-message-dialog',
  standalone: true, 
  imports: [CommonModule], 
  templateUrl: './message-dialog.component.html',
  styleUrls: ['./message-dialog.component.scss']
})
export class MessageDialogComponent {
  message: IMessage | undefined;

  constructor(public activeModal: NgbActiveModal) {}
}
