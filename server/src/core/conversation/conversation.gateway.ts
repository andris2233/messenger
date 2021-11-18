import { WebSocketGateway } from '@nestjs/websockets';

@WebSocketGateway({
  namespace: '/socket/conversation',
  cors: {
    origin: 'http://localhost:8080',
    methods: ['GET', 'POST'],
    allowedHeaders: ['Authorization'],
    credentials: true,
  },
})
export default class ConversationGateway {}
