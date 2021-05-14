import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class StorageService{
  constructor() { }

  getLocalUser() {
    let usr = localStorage.getItem("localUser");
    if (usr == null) {
      return null;
    }
    else {
      return JSON.parse(usr);
    }
  }

  setLocalUser(obj) {
    if (obj == null) {
      localStorage.removeItem("localUser");
    }
    else {
      localStorage.setItem("localUser", JSON.stringify(obj));
    }
  }
}
