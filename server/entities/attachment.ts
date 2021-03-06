import { User } from '@things-factory/auth-base'
import { Domain } from '@things-factory/shell'
import { Column, CreateDateColumn, Entity, Index, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm'

const { ATTACHMENT_PATH } = require('../attachment-const')

@Entity('attachments')
@Index('ix_attachment_0', (attachment: Attachment) => [attachment.domain, attachment.name], { unique: false })
@Index('ix_attachment_1', (attachment: Attachment) => [attachment.domain, attachment.category, attachment.name], {
  unique: false
})
@Index('ix_attachment_2', (attachment: Attachment) => [attachment.domain, attachment.refBy], {
  unique: false
})
export class Attachment {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @ManyToOne(type => Domain, {
    nullable: false
  })
  domain: Domain

  @Column()
  name: string

  @Column({
    nullable: true
  })
  description: string

  @Column()
  mimetype: string

  @Column('text')
  encoding: string

  @Column({
    nullable: true
  })
  category: string

  @Column({
    nullable: true
  })
  refBy: String

  @Column()
  path: string

  @Column()
  size: string

  @CreateDateColumn()
  createdAt: Date

  @UpdateDateColumn()
  updatedAt: Date

  @ManyToOne(type => User, {
    nullable: true
  })
  creator: User

  @ManyToOne(type => User, {
    nullable: true
  })
  updater: User

  get fullpath(): string {
    return `/${ATTACHMENT_PATH}/${this.path}`
  }
}
