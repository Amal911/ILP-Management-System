import { CommonModule } from '@angular/common';
import { Component, Inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MSAL_GUARD_CONFIG, MsalGuardConfiguration, MsalService, MsalBroadcastService } from '@azure/msal-angular';
import { InteractionStatus } from '@azure/msal-browser';
import { filter, Subject, takeUntil } from 'rxjs';
import { MainLayoutComponent } from '../../Layout/main-layout/main-layout.component';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule,CommonModule, MainLayoutComponent],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {

  loginForm!: FormGroup;
  submitted:boolean=false;
  loginDisplay: boolean = false;
  isIframe = false;
  private readonly _destroying$ = new Subject<void>();
  
  constructor(
  @Inject(MSAL_GUARD_CONFIG) private msalGuardConfig: MsalGuardConfiguration,
  private userService: UserService,
  private authService: MsalService,
  private msalBroadcastService: MsalBroadcastService
) {}

  ngOnInit(): void {

    const user = { name: 'DCruz', role: 'trainee' };
    this.userService.setCurrentUser(user);


    this.loginForm = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [
        Validators.required
      ])
    });

    this.authService.handleRedirectObservable().subscribe();
    // this.isIframe = window !== window.parent && !window.opener; 

        this.setLoginDisplay();
        this.authService.instance.enableAccountStorageEvents();

        this.msalBroadcastService.inProgress$
            .pipe(
                filter((status: InteractionStatus) => status === InteractionStatus.None),
                takeUntil(this._destroying$)
            )
            .subscribe(() => {
                this.setLoginDisplay();
                this.checkAndSetActiveAccount();
            });
    }

    setLoginDisplay() {
        this.loginDisplay = this.authService.instance.getAllAccounts().length > 0;
    }

    checkAndSetActiveAccount() {
        const activeAccount = this.authService.instance.getActiveAccount();
        if (!activeAccount && this.authService.instance.getAllAccounts().length > 0) {
            this.authService.instance.setActiveAccount(this.authService.instance.getAllAccounts()[0]);
        }
    }

    loginRedirect() {
        this.authService.loginRedirect(this.msalGuardConfig.authRequest as any);
    }

    logout() {
        this.authService.logoutRedirect();
    }

    ngOnDestroy(): void {
        this._destroying$.next(undefined);
        this._destroying$.complete();
    }

  onSubmit(): void {
    if (this.loginForm.valid) {
      console.log(this.loginForm.value);
      this.submitted=true;
    }
  }

}
