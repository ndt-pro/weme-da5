import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FileUploadModule } from 'primeng/fileupload';
import { GetImagePipe } from '../_pipe/getimage.pipe';
import { LoadingDirective } from '../_directive/loading.directive';
import { TruncatePipe } from '../_pipe/truncate.pipe';
import { EditorModule } from 'primeng/editor';
import { CalendarModule } from 'primeng/calendar';
import { DialogModule } from 'primeng/dialog';
import { ButtonModule } from 'primeng/button';

@NgModule({
  declarations: [
    GetImagePipe,
    TruncatePipe,
    LoadingDirective
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    EditorModule,
    CalendarModule,
    DialogModule,
    ButtonModule
  ],
  exports: [
    ReactiveFormsModule,
    FormsModule,
    CalendarModule,
    DialogModule,
    ButtonModule,
    EditorModule,
    FileUploadModule,
    GetImagePipe,
    TruncatePipe,
    LoadingDirective,
    CommonModule
  ]
})
export class ShareModule { }
