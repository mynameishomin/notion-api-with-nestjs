import { Entity, PrimaryGeneratedColumn } from 'typeOrm';

@Entity()
export class NotionDB {
  @PrimaryGeneratedColumn()
  databaseId: string;
}
