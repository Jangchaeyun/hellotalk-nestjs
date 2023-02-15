import { Participant } from "src/utils/typeorm";
import { createParticipantParams, FindParticipantParams } from "src/utils/types";

export interface IParticipantsService {
   findParticipant(params: FindParticipantParams): Promise<Participant | null>;
   createParticipant(params: createParticipantParams): Promise<Participant>;
}