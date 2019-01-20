import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { UploadImageDto } from '../dto/uploadimage.dto';
import { Observable } from 'rxjs';
import { UploadImageResponse } from '../interfaces/upload-image.interface';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UploadImageImgurService {
  base64: String;
  constructor(private http: HttpClient) { }

  UploadImage(dto: UploadImageDto): Observable<UploadImageResponse> {
    console.log(dto.image);
    
    const requestOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'multipart/form-data',
        'Authorization': `Bearer b9f6e04fdc9749e11c5ce335896217a805174359`,
       // 'Authorization': `Client-ID 9651b22f8558b3e`,
        // 'Access-Control-Allow-Origin': '*'
      })
    };
    return this.http.post<UploadImageResponse>(`${environment.imgUr}/image`, dto.image, requestOptions);
  }



}
