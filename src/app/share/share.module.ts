import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FileUploadModule } from 'primeng/fileupload';
import { GetImagePipe } from '../_pipe/getimage.pipe';
import { LoadingDirective } from '../_directive/loading.directive';
import { TruncatePipe } from '../_pipe/truncate.pipe';

@NgModule({
  declarations: [
    GetImagePipe,
    TruncatePipe,
    LoadingDirective
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule
  ],
  exports: [
    ReactiveFormsModule,
    FormsModule,
    FileUploadModule,
    GetImagePipe,
    TruncatePipe,
    LoadingDirective,
    CommonModule
  ]
})
export class ShareModule { }
