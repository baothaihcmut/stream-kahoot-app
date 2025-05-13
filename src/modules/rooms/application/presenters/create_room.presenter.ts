export class CreateRoomInput {
  title: string;
  description?: string;
  startedAt: Date;
  maxParticipant: number;
}

export class CreateRoomOutput {}
