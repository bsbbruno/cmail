import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DetalheEmailComponent } from './detalhe-email.component';
import { SharedComponentsModule } from 'src/app/components/shared-components.module';

@NgModule({
  declarations: [DetalheEmailComponent],
  imports: [
    CommonModule,
    SharedComponentsModule
  ],
  exports: [DetalheEmailComponent]
})
export class DetalheEmailModule { }
