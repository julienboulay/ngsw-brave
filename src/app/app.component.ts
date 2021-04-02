import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';

interface Result {
  success: boolean,
  error?: { message: string }
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'ngsw-brave';

  resultWithSw: Result;
  resultSkipSw: Result;

  constructor(httpClient: HttpClient) {

    httpClient.get('https://sentry.io/api/0/').subscribe(this.onResponse(res => this.resultWithSw = res));

    httpClient.get('https://sentry.io/api/0/?ngsw-bypass').subscribe(this.onResponse(res => this.resultSkipSw = res))
  }

  private onResponse(cb: (res: Result) => void) {
    return {
      next: () => {
          cb({ success: true });
        },
      error: (error: any) => {
        console.error(error);
        cb({ success: false, error });
      }
    }
  }
}
