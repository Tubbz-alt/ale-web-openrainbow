import { Contact } from './Contact';

export interface Message {
    id: string
    from : Contact,
    to: Contact,
    messageText: string,
    read: boolean
}