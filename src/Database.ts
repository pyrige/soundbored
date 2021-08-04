import Dexie from "dexie";

export interface ISound {
  id: string;
  name: string;
  url: string;
  type: number;

  save(): Promise<string>;
}

export class SoundboredDatabase extends Dexie {
  sounds: Dexie.Table<ISound, string>;

  constructor() {
    super("soundbored_db");

    this.version(1).stores({
      sounds: "&id, type",
    });

    this.sounds = this.table("sounds");
  }
}
