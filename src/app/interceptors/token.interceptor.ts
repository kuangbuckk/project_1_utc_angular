import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from "@angular/common/http";
import { TokenService } from "../services/token.service";

@Injectable()
export class TokenInterceptor implements HttpInterceptor{
  constructor(private tokenService: TokenService) { }
  //gán Authorization header cho mỗi request nếu có token, nếu không có token thì request vẫn được gửi nhưng ko đi kèm token
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const token = this.tokenService.getToken();
    if(token){
      req = req.clone({
        setHeaders: {
          'Authorization': `Bearer ${token}`
        }
      })
    }
    return next.handle(req);
  }
}