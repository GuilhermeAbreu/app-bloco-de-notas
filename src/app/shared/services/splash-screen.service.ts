import { ApplicationRef, ComponentRef, createComponent, EnvironmentInjector, Injectable } from '@angular/core';
import { SplashScreenComponent } from '../components/splash-screen/splash-screen.component';

@Injectable({
  providedIn: 'root'
})
export class SplashScreenService {

  private componentRef: ComponentRef<SplashScreenComponent> | null = null;
  private container: HTMLElement | null = null;

  constructor(
    private appRef: ApplicationRef,
    private envInjector: EnvironmentInjector,
  ) { }

  public async hide(): Promise<void> {
    await this.applyEffectOut();
    this.removeComponent();
    return Promise.resolve();
  }

  public async show(): Promise<void> {
    await this.addComponent();
    return Promise.resolve();
  }

  private async applyEffectOut() {
    if (this.componentRef === null) {
      return;
    }

    const element = this.componentRef.location.nativeElement.querySelector('.splash-screen');

    return await new Promise(async (res) => {
      element.addEventListener('animationend', res, { once: true });
      element.classList.add('splash-screen-hide');
    })
  }

  private async addComponent(): Promise<void> {
    if (this.componentRef) {
      this.removeComponent();
    }

    this.container = document.createElement('div');
    this.container.id = 'splash-container';
    document.body.appendChild(this.container);

    this.componentRef = createComponent(SplashScreenComponent, {
      hostElement: this.container,
      environmentInjector: this.envInjector
    });
    this.appRef.attachView(this.componentRef.hostView);
    this.componentRef.changeDetectorRef.detectChanges();
  }

  private removeComponent(): void {
    if (this.componentRef) {
      this.appRef.detachView(this.componentRef.hostView);
      this.componentRef.destroy();
      this.componentRef = null;
    }

    if (this.container) {
      this.container.remove();
      this.container = null;
    }
  }
}
