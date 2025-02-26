export interface SendMessageResponse {
  idMessage: string;
  chatId: string;
}

export interface ReceiveNotificationResponse {
  receiptId: string;
  body: {
    typeWebhook: string;
    instanceData: {
      idInstance: number;
      wid: string;
      typeInstance: string;
    };
    timestamp: string;
    idMessage: string;
    senderData: {
      chatId: string;
      sender: string;
      senderName: string;
      phoneNumber: string;
    };
    messageData: {
      typeMessage: string;
      textMessageData: {
        textMessage: string;
      };
    };
  };
}

export interface Message {
  id: string;
  text: string;
  isUser: boolean;
  timestamp: string;
}
