export interface Exchange {
  _id: string;
  sender: {
    _id: string;
    fullname: string;
  };
  receiver: {
    _id: string;
    fullname: string;
    email?: string;
  };
  book: {
    _id: string;
    isbn: string;
    title: string;
    cover?: string;
  };
  createdAt: string;
  status: string;
  replyMessage?: string;
}
