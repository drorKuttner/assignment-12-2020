import {Component, NgZone} from '@angular/core';
import {Router} from '@angular/router';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
declare var Fingerprint;
declare var navigator;
declare var cordova;

@Component({
  selector: 'app-deposits-page',
  templateUrl: './deposits-page.component.html',
  styleUrls: ['./deposits-page.component.scss']
})
export class DepositsPageComponent {

  public depositForm: FormGroup;
  public authenticationFailedFlag: boolean;

  constructor(private router: Router, private formBuilder: FormBuilder, private ngZone: NgZone) {
    this.authenticationFailedFlag = false;
    this.depositForm = this.formBuilder.group({
      email: [null, [Validators.required, Validators.email]],
      amount: [null, [Validators.required, Validators.min(0.01)]],
    });
  }

  public back(): void {
    this.router.navigate(['']);
  }

  public submit(): void {
    this.authenticationFailedFlag = false;
    Fingerprint.isAvailable(this.authenticateDeposit.bind(this), this.isAvailableRejectCallback);
  }


  private authenticateDeposit(): void {
    Fingerprint.show({
      description: 'Please tap your finger'
    }, this.depositApprovedDialog.bind(this),
      () => {
        this.authenticationFailedFlag = true;
      });
  }

  private isAvailableRejectCallback(error): void {
    navigator.notification.alert( error.message, null);
  }

  private depositApprovedDialog(): void {
    const message = `Email: ${this.depositForm.controls.email.value}\n Amount: ${this.depositForm.controls.amount.value}`;

    navigator.notification.confirm(message, () => {
      this.ngZone.run(() => {
        this.router.navigate(['']);
      });
      this.saveMessageOnKeyStore(message);
    }, 'Deposit Made', ['Okay']);
  }

  private saveMessageOnKeyStore(message: string): void {
    cordova.plugins.SecureKeyStore.set((res) => {
      navigator.notification.confirm(res, null, '', ['Okay']); // res - string securely stored
    },  (error) => {
      navigator.notification.alert( error, null);
    }, Math.ceil(10 * Math.random()).toString(), message);
  }
}
