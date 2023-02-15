import { Inject, Injectable } from '@nestjs/common';
import { HttpStatus } from '@nestjs/common/enums';
import { HttpException } from '@nestjs/common/exceptions';
import { InjectRepository } from '@nestjs/typeorm';
import { IParticipantsService } from 'src/participants/participants';
import { IUserService } from 'src/users/user';
import { Services } from 'src/utils/constants';
import { Conversation, Participant, User } from 'src/utils/typeorm';
import { CreateConversationParams } from 'src/utils/types';
import { Repository } from 'typeorm';
import { IConversationsService } from './conversations';

@Injectable()
export class ConversationsService implements IConversationsService {
   constructor(
      @InjectRepository(Conversation)
      private readonly conversationRepository: Repository<Conversation>,
      @Inject(Services.PARTICIPANTS)
      private readonly participantsService: IParticipantsService,
      @Inject(Services.USERS)
      private readonly userService: IUserService,
   ) { }
   
   async createConversation(user: User, params: CreateConversationParams) {
      const userDB = await this.userService.findUser({ id: user.id });
      const { authorId, recipientId } = params;
      const participants: Participant[] = [];
      if (!userDB.participant) {
         const participant = await this.createParticipantAndSaveUser(
            userDB,
            authorId,
         );
         participants.push(participant);
      } else participants.push(userDB.participant);
      
      const recipient = await this.userService.findUser({ id: recipientId });
      if (!recipient)
         throw new HttpException('Recipient Not Found', HttpStatus.BAD_REQUEST);
      
      if (!recipient.participant) {
         const participant = await this.createParticipantAndSaveUser(
            recipient,
            recipientId,
         );
         participants.push(participant);
      } else participants.push(recipient.participant);
      const converation = this.conversationRepository.create({
         participants,
      });
      return this.conversationRepository.save(converation);
   }

   public async createParticipantAndSaveUser(user: User, id: number) {
      const participant = await this.participantsService.createParticipant({
         id,
      });
      user.participant = participant;
      await this.userService.saveUser(user);
      return participant;
   }
}