import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {CookieService} from 'ngx-cookie-service';
import {ToastrService} from 'ngx-toastr';

@Component({
    selector: 'app-home',
    templateUrl: 'home.component.html',
    styleUrls: ['home.component.css']
})
export class HomeComponent implements OnInit {

    /**in terminal run: npm install ngx-cookie-service --save
     *                  npm install ngx-toastr --save
     *                  npm install @angular/animations --save
     *                  npm install primeng --save
     *                  npm install primeicons --save
     *                  npm install --save @angular/material @angular/cdk
     * **/
    constructor(private router: Router, private cookieService: CookieService, private toastrService: ToastrService) {
    }

  loggedInUser: string;
  isAdmin: string;

  ngOnInit() {
    this.loggedInUser = this.cookieService.get('username');
    this.isAdmin = this.cookieService.get('isAdmin');
    console.log('Admin:' + this.isAdmin);
    }

    logout() {
        console.log('You ve been logout');
        this.router.navigate(['/login']);
      this.cookieService.delete('username');
      this.cookieService.delete('isAdmin');
    }

}
