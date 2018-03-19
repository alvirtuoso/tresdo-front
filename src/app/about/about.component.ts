import { Component, OnInit, NgZone, Inject } from '@angular/core';
import { Router } from '@angular/router';
import { Global } from '../shared/global';

// import { FileUploader, Headers} from 'ng2-file-upload/ng2-file-upload';

// import {EditorModule,SharedModule} from 'primeng/primeng';
// import {SliderModule} from 'primeng/primeng';
// import { InlineEditorComponent } from 'ng2-inline-editor';

@Component({
  selector: 'my-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss'],
  styles: [
    `
    [mwlDraggable] {
      background-color: red;
      width: 200px;
      height: 200px;
      position: relative;
      z-index: 1;
      float: left;
      margin-right: 10px;
    }
    [mwlDroppable] {
      background-color: green;
      width: 400px;
      height: 400px;
      position: relative;
      top: 50px;
      left: 100px;
    }
    [mwlDraggable],
    [mwlDroppable] {
      color: white;
      text-align: center;
      display: flex;
      align-items: center;
      justify-content: center;
    }
    .dropOverActive {
      border: dashed 1px black;
      background-color: lightgreen;
    }
  `
  ]
})
export class AboutComponent implements OnInit {

    constructor(private router: Router, private global: Global) {

  }
 public myHeaders: Headers[] = [];
 showDialog = false;
  ngOnInit() {
  }

  id: string = "testing334";
  uploadFile: any;
  hasBaseDropZoneOver: boolean = false;
  options: Object = {
    url: `${this.global.apiItemUrl}/upload`,
      filterExtensions: true,
      allowedExtensions: ['jpg', 'png', 'jpeg', 'zip', 'gif', 'pdf', 'bmp', 'tif', 'doc', 'docx', 'xlsx', 'xltx', 'txt', 'ppt', 'pptx'],
      maxSize: 2097152,
  };
  sizeLimit = 2000000;
 
  handleUpload(data): void {
    if (data && data.response) {
  
      console.log("hanlddd", typeof data.response);
        // this.uploadFile = 'data:image/png;base64,' + data.response;
        
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

  onTestBoardCards(){
    this.router.navigate(['/board', '2b6aa40b-84b6-4088-99e9-1aa96f093572']);
  }

  title = 'My component!';
  val: number = 30;
  editableContent = 'myText';
  editablePassword = 'myPassword';
  editableTextArea = 'Text in text area';
  editableSelect = 2;
  showEditor: boolean = false;
  editableSelectOptions =[
    {value: 1, text: 'status1'},
    {value: 2, text: 'status2'},
    {value: 3, text: 'status3'},
    {value: 4, text: 'status4'}
  ];
  // toolbarOptions = {
  //   toolbar: [
  //     'bold', 'italic', 'underline', 'strike'
  //   ]
  // };
text1: string = '<div>Hello World!</div><div>PrimeNG <b>Editor</b> Rocks</div><div><br></div>';

/**
 * Handles inline text editor's change event
 * @param event object
  {
    editor: editorInstance,
    html: html,
    text: text,
    delta: delta,
    oldDelta: oldDelta,
    source: source
  }
 */
  saveEditable(value) {
     console.log('editable: ', value.html);

  }
myfunction(val:string){
  console.log('myfunc', val);
}
log(val){
  console.log('hellooooo', val);
}


  //   onContentChanged({ quill, html, text }) {
  //   console.log(quill, html, text);
  // }

}
