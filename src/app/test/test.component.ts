import { Component } from '@angular/core';
import { Http, RequestOptions, Headers, Response } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import { Global } from '../shared/global';

@Component({
  selector: 'testcomp',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.css']
})

export class TestComponent {

  constructor(private http: Http, private global: Global) {
  }
//file upload event
  fileChange(event) {
    // debugger;
    let fileList: FileList = event.target.files;
    if (fileList.length > 0) {
      let file: File = fileList[0];
      let formData: FormData = new FormData();
      formData.append('uploadFile', file, file.name);
      let headers = new Headers({ 'Content-Type': 'undefined' });

      //headers.append('Content-Type', 'json');
      //headers.append('Accept', 'application/json');
      let options = new RequestOptions({ headers: headers });
      let apiUrl1 = `${this.global.apiItemUrl}/upload`;
      this.http.put(apiUrl1, formData, options)
        .map(res => res.json())
        .catch(error => Observable.throw(error))
        .subscribe(
        data => console.log('successUploadtest', data),
        error => console.log(error)
        )
    }

  }

}