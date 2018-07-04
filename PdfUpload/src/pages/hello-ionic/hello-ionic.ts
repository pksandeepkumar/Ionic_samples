import { Component } from '@angular/core';
import { FileTransfer, FileUploadOptions, FileTransferObject } from '@ionic-native/file-transfer';
import { File } from '@ionic-native/file';
import { FileChooser } from '@ionic-native/file-chooser';
import { FilePath } from '@ionic-native/file-path';



@Component({
  selector: 'page-hello-ionic',
  templateUrl: 'hello-ionic.html'
})
export class HelloIonicPage {
  thisUri: any;
  dataResp:any;
  filePathString: any;
  respString: any;
  constructor(private transfer: FileTransfer, private file: File, private fileChooser: FileChooser, private filePath: FilePath) {

  }

  performUpload() {
    // alert('Perform upload');
    this.fileChooser.open()
      .then(uri => {
        // alert("Path:" + uri);
        this.thisUri = uri;
        // this.filePathString = uri;
        this.filePath.resolveNativePath(uri)
          .then(filePath => {
            this.filePathString = filePath;
            // alert("File Path:" + filePath);
            console.log(filePath)
          })
          .catch(err => console.log(err));

        console.log(uri)
      })
      .catch(e => { this.handleError(e); });
  }


  upload() {
    if (this.thisUri == null) {
      alert('Choose a file');
      return;
    }

    if (!this.filePathString.endsWith('.pdf')) {
      alert('Choose a pdf file');
      return;
    }

    let options: FileUploadOptions = {
      fileKey: 'file',
      fileName: this.filePathString,
      headers: {}
    }
    const fileTransfer: FileTransferObject = this.transfer.create();
    fileTransfer.upload(this.thisUri, 'http://192.168.6.144:8080/files/uploadFile', options)
      .then((data: any) => {

        this.filePathString = JSON.parse(data.response).fileDownloadUri;
        alert("File url:" + this.filePathString);
      
      }, (err) => {
        alert("Fail");
        // error
      })
  }

  handleError(error: any) {
    const errMsg = error.message ? error.message : error.toString();
    alert("errMsg:" + errMsg);
    return errMsg;
  }
}
