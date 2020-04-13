import { NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';

export class Registration {
    constructor(
      public playlistName: string = "",
      public songTitle: string = "",
      public artist: string = "",
      public description: string = "",
      public duration: number = 0
    ) {}
  }

