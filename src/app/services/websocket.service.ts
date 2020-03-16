import {Inject, Injectable} from '@angular/core';

import * as SockJs from 'sockjs-client';
import * as Stomp from 'stompjs';

@Injectable()
export class WebSocketService {

  // Open connection with the back-end socket
  constructor(
    @Inject('BASE_API_URL') private baseUrl: string) {
  }

  public connect() {
    const socket = new SockJs(`${this.baseUrl}/ws`);
    const stompClient = Stomp.over(socket);
    stompClient.debug = null;
    return stompClient;
  }
}
