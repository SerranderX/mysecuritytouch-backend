import { SubscribeMessage, WebSocketGateway, OnGatewayInit, WsResponse, OnGatewayConnection, OnGatewayDisconnect } from '@nestjs/websockets';
import { Logger } from '@nestjs/common';
import { Socket, Server } from 'socket.io';

@WebSocketGateway()
export class VideollamadaGateway implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect{

  Logger: Logger = new Logger('VideollamadaGateway');

  afterInit(server:Server){
    this.Logger.log('WebSocket inicializado!');
  }

  handleDisconnect(client:Socket){
    this.Logger.log(`Client disconected: ${client.id}`);
  }

  handleConnection(client:Socket, ...args: any[]){
    this.Logger.log(`Client connected: ${client.id}`);
  }

  @SubscribeMessage('messageToServer')
  handleMessage(client: Socket, data: string): WsResponse<string> {
    //client.emit('msgToClient', 'I got it!');
    return {event: 'msgToClient', data: data};
  }

  @SubscribeMessage('llamarTimbre')
  handleEvent(client: Socket, data: string): WsResponse<string> {
    //client.emit('msgToClient', 'I got it!');
    Logger.log(client.id);
    Logger.log(data);
    return {event: 'msgToClient', data: "llamando al usuario Administrador"};
  }
}
