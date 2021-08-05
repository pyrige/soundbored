import { v4 as uuid4 } from "uuid";
import { ISound, SoundboredDatabase } from "./Database";

export enum SoundType {
  Music,
  Ambience,
  Effect,
}

export class Sound implements ISound {
  readonly id: string = uuid4();

  /**
   * Create a new Sound of a specific type
   * @param name is the name displayed for this Sound
   * @param url is the data or remote URL for the audio source
   * @param type is the type of sound
   **/
  constructor(
    public name: string,
    public url: string,
    public type: SoundType
  ) {}

  /**
   * Store this Sound instance in the IndexedDB
   * @returns the ID of the saved Sound
   **/
  public async save(): Promise<string> {
    const db = new SoundboredDatabase();
    return db.sounds.put(this);
  }

  /**
   * Load Sounds from the IndexedDB
   * @param type is the type of Sound to load
   * @returns an Array of Sounds of the specified type
   **/
  static async load(type: SoundType): Promise<Array<Sound>> {
    const db = new SoundboredDatabase();
    db.sounds.mapToClass(Sound);

    return db.sounds.where("type").equals(type).sortBy("name");
  }

  /**
   * Delete a specific Sound from the database
   * @param id is the ID of the Sound to delete
   **/
  static async delete(id: string) {
    const db = new SoundboredDatabase();
    await db.sounds.delete(id);
  }
}
