import { Component, OnInit, EventEmitter, Input } from '@angular/core';
import { Global } from '../shared/global';
import { ItemService } from '../shared/itemService/item.service';
import { UploadOutput, UploadInput, UploadFile, humanizeBytes, UploaderOptions } from 'ngx-uploader';
import { toast } from 'angular2-materialize';

@Component({
  selector: 'upload',
  templateUrl: './upload.component.html',
  styleUrls: ['./upload.component.css']
})
export class UploadComponent implements OnInit {
  options: UploaderOptions;
  formData: FormData;
  files: UploadFile[];
  mediaIds: string[] = [];
  uploadInput: EventEmitter<UploadInput>;
  humanizeBytes: Function;
  dragOver: boolean; 
  @Input() itemId:string;

  constructor(private global: Global, private itemSvc: ItemService) { 
     // Set file types in options. 
    // this.options = { concurrency: 0, allowedContentTypes: ['image/jpeg', 'image/png', 'image/gif'] };
    this.files = []; // local uploading files array
    this.uploadInput = new EventEmitter<UploadInput>(); // input events, we use this to emit data to ngx-uploader
    this.humanizeBytes = humanizeBytes;
  }

  ngOnInit() {
    this.removeAllFiles();
  }
 
  sizeLimit = 5000000; // 5mb limit
  showFile: any;

  onUploadOutput(output: UploadOutput): void {
    console.log('onUploadOutput: ', output.type);
    if (output.type === 'allAddedToQueue') { // when all files added in queue
      // uncomment this if you want to auto upload files when added
      // const event: UploadInput = {
      //   type: 'uploadAll',
      //   url: '/upload',
      //   method: 'POST',
      //   data: { foo: 'bar' }
      // };
      // this.uploadInput.emit(event);
    } else if (output.type === 'addedToQueue'  && typeof output.file !== 'undefined') { // add file to array when added
      this.files.push(output.file);
      let total = this.getTotalSize();
      console.log(output.file.size);
      if (total > this.sizeLimit){
        toast(`Total size of ${total} has exceeded the upload limit of ${this.sizeLimit}`, 4000, 'alert-danger');
      }
    } else if (output.type === 'uploading' && typeof output.file !== 'undefined') {
      // update current data in files array for uploading file
      const index = this.files.findIndex(file => typeof output.file !== 'undefined' && file.id === output.file.id);
      this.files[index] = output.file;
    } else if (output.type === 'removed') {
      // remove file from array when removed
      this.files = this.files.filter((file: UploadFile) => file !== output.file);
    } else if (output.type === 'dragOver') {
      this.dragOver = true;
    } else if (output.type === 'dragOut') {
      this.dragOver = false;
    } else if (output.type === 'drop') {
      this.dragOver = false;
    }else if(output.type == 'done'){
      this.showFile = output.file.nativeFile;
      let newMediaId = output.file.response;
      console.log('output', output.file.size)
      if(newMediaId){
        this.itemSvc.updateItemIdInMedia(this.itemId, newMediaId);
      }
    //  this.mediaIds.push(output.file.response);
    }
  }

  startUpload(): void {
    const event: UploadInput = {
      type: 'uploadAll',
      url: `${this.global.apiMediaUrl}/upload`,
      method: 'POST',
      data: { foo: 'bar' } // Initial data. Set upon choosing of file
    };
    this.uploadInput.emit(event);
  }

  getTotalSize(): number {
    let total = 0;
    this.files.forEach(file => {
      total += file.size;
    });
    return total;
  }
  cancelUpload(id: string): void {
    this.uploadInput.emit({ type: 'cancel', id: id });
  }

  removeFile(id: string): void {
    this.uploadInput.emit({ type: 'remove', id: id });
  }

  removeAllFiles(): void {
    this.uploadInput.emit({ type: 'removeAll' });
  }

  downloadFile(): void{
    // Handle file download 

  }

}