import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private usuario: string = "";
  private cedula: string = "";
  private imagenuser: File | null = null;
  private imageUrl: string | null = null;

  constructor() { }

  setUser(usuario: string) {
    this.usuario = usuario;
  }

  getUser(): string {
    return this.usuario;
  }

  setCedula(cedula: string) {
    this.cedula = cedula;
  }

  getCedula(): string {
    return this.cedula;
  }

  setImagenUser(imagenuser: File) {
    this.imagenuser = imagenuser;
    this.updateImageUrl(imagenuser);
  }

  getImagenUser(): File | null {
    return this.imagenuser;
  }

  private updateImageUrl(file: File) {
    const reader = new FileReader();
    reader.onload = () => {
      this.imageUrl = reader.result as string;
    };
    reader.readAsDataURL(file);
  }

  getImageUrl(): string | null {
    return this.imageUrl;
  }
}
