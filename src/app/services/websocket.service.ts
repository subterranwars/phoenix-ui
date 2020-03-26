import {Inject, Injectable} from '@angular/core';
import {Client} from '@stomp/stompjs';
import {Token} from '../model/Token';

@Injectable()
export class WebSocketService {

  // Open connection with the back-end socket
  constructor(
    @Inject('BASE_WS_URL') private baseUrl: string) {
  }

  public connect(token: Token): Client {
    const client = new Client({
      brokerURL: `${this.baseUrl}/ws`,
      connectHeaders: {
        Authorization: `Bearer ${token.token}`
      },
    });
    return client;
  }
}
