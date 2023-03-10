import { User } from "./typeorm";

export type CreateUserDetails = {
     email: string;
     password: string;
     firstName: string;
     lastName: string;
};

export type ValidateUserDetails = {
     email: string;
     password: string;
};

export type findUserParams = Partial<{
     id: number;
     email: string;
}>;

export type CreateConversationParams = {
     authorId: number;
     recipientId: number;
     message: string;
};

export type ConversationIdentifyType = 'author' | 'recipient';

export type FindParticipantParams = Partial<{
     id: number;
}>;

export interface AuthenticatedRequest extends Request {
     user: User;
}

export type createParticipantParams = {
     id: number;
}