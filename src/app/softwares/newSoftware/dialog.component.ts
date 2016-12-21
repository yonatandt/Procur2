import { Component, Renderer, Output, EventEmitter } from '@angular/core';

import { Title } from '@angular/platform-browser';
import {
  MdlDialogService,
  MdlDialogReference,
  MdlSnackbarService,
  IOpenCloseRect
} from 'angular2-mdl';
// Mine
import { NewSoftwareDialog } from  './newSoftwareDialog.component';
import { Software } from '../software';

@Component({
  selector: 'dialog-demo',
  templateUrl: 'dialog.component.html'
})
export class DialogDemo {

  @Output() newSoftware = new EventEmitter<Software>();
  constructor(
    private dialogService: MdlDialogService,
    private snackbarService: MdlSnackbarService
  ) {}

  public showAlert() {
    let result = this.dialogService.alert('This is a simple Alert');
    result.subscribe( () => console.log('alert closed') );
  }

  public showConfirmMessage() {
    let result = this.dialogService.confirm('Would you like a mug of coffee?', 'No', 'Yes');
    // if you need booth answers
    result.subscribe( () => {
        console.log('confirmed');
      },
      (err: any) => {
        console.log('declined');
      }
    );
    // if you only need the confirm answer
    result.onErrorResumeNext().subscribe( () => {
      console.log('confirmed 2');
    })
  }

  public showDialogFullWidthAction($event: MouseEvent) {
    let pDialog = this.dialogService.showDialog({
      title: 'Your choice?',
      message: 'What drink do you prefer to your meal?',
      actions: [
        {
          handler: () => {
              this.snackbarService.showToast('Coke');
          },
          text: 'One Coke' ,
          isClosingAction: true
        },
        {
          handler: () => {
            this.snackbarService.showToast('Vine');
          },
          text: 'A bottle of vine'
        },
        {
          handler: () => {
            this.snackbarService.showToast('Beer');
          },
          text: 'A pint of beer'
        }
      ],
      fullWidthAction: true,
      isModal: false,
      openFrom: $event,
      closeTo: {
        left: document.body.offsetWidth/2,
        height: 0,
        top: document.body.offsetHeight/2,
        width: 0} as IOpenCloseRect
    });
    pDialog.subscribe( (dialogReference) => console.log('dialog visible', dialogReference) );
  }

  public showDialog($event: MouseEvent) {

    let pDialog = this.dialogService.showCustomDialog({
      component: NewSoftwareDialog,
      providers: [],
      isModal: true,
      styles: {'width': '300px'},
      clickOutsideToClose: true,
      openFrom: $event,
      enterTransitionDuration: 400,
      leaveTransitionDuration: 400
    });
    pDialog.subscribe( (dialogReference: MdlDialogReference) => {
      console.log('dialog visible', dialogReference);
    });
    pDialog.subscribe( () => console.log('alert closed') );


  }
}