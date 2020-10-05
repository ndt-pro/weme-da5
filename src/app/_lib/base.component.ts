import { Injector, Renderer2 } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

export class BaseComponent {
    public _renderer:any;
    public _route: ActivatedRoute;

    constructor(injector: Injector) {
        this._renderer = injector.get(Renderer2);
        this._route = injector.get(ActivatedRoute);
    }

    public loadScripts() {
        this.renderExternalScript('assets/js/night-mode.js').onload = () => {}
        this.renderExternalScript('assets/js/main.js').onload = () => {}
    }

    public renderExternalScript(src: string): HTMLScriptElement {
        const script = document.createElement('script');
        script.type = 'text/javascript';
        script.src = src;
        script.async = true;
        script.defer = true;
        this._renderer.appendChild(document.body, script);
        return script;
    }
}