import { HttpInterceptorFn } from '@angular/common/http';

export const tokenInterceptor: HttpInterceptorFn = (req, next) => {
  const BASE_URL = "http://localhost:4000/api"
  const authToken = localStorage.getItem("token") || ""

  const apiReq = req.clone({
    url: BASE_URL + req.url,
    setHeaders: {
      Authorization: `Bearer ${authToken}`
    }
  })

  return next(apiReq)
}
