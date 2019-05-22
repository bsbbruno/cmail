import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CmailFormFieldDirective } from './cmail-form-field.directive';
import { CmailFormGroupComponent } from './cmail-form-group.component';

@NgModule({
  declarations: [
    CmailFormGroupComponent,
    CmailFormFieldDirective
  ],
  imports: [
    CommonModule
  ],
  exports: [
    CmailFormFieldDirective,
    CmailFormGroupComponent
  ]
})
export class CmailFormGroupModule { }
