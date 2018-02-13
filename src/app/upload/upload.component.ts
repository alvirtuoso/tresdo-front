import { Component, OnInit, Input } from '@angular/core';
import { Global } from '../shared/global';
import { ItemService } from '../shared/itemService/item.service';

@Component({
  selector: 'upload',
  templateUrl: './upload.component.html',
  styleUrls: ['./upload.component.css']
})
export class UploadComponent implements OnInit {
@Input() param;

  constructor(private global: Global, private itemSvc: ItemService) { }

  ngOnInit() {

  }

  uploadFile: any;
  hasBaseDropZoneOver: boolean = false;
  options: Object = {
    url:  `${this.global.apiItemUrl}/upload`
  };
  sizeLimit = 5000000; // 5mb
 
  handleUpload(data): void {
    console.log("hererere", data);
    if (data && data.response) {
      let d = JSON.parse(data.response);
      this.itemSvc.updateItemIdInMedia(this.param.itemId, d).subscribe();
    }
  }
 
  fileOverBase(e:any):void {
    this.hasBaseDropZoneOver = e;
  }
 
  beforeUpload(uploadingFile): void {
    if (uploadingFile.size > this.sizeLimit) {
      uploadingFile.setAbort();
      alert('File is too large');
    }
  }

}