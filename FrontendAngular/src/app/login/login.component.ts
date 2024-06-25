import { Component } from '@angular/core';
import { AuthentificationService } from '../authentification.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  username: string = '';
  password: string = '';
  loginError: string = '';

  constructor(public authService: AuthentificationService) {}

  login(): void {
    this.authService.login(this.username, this.password)
      .subscribe(
        (response) => {
          this.authService.setToken(response.token);
          // Rediriger l'utilisateur ou effectuer d'autres actions nécessaires après la connexion réussie.
        },
        (error) => {
          console.error('Erreur de connexion:', error);
          this.loginError = 'Échec de la connexion. Veuillez vérifier vos informations d\'identification.';
        }
      );
  }

  logout(): void {
    this.authService.logout();
    // Rediriger l'utilisateur ou effectuer d'autres actions nécessaires après la déconnexion.
  }
}



