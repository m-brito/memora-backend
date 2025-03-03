import { MigrationInterface, QueryRunner } from 'typeorm'

export class AddTextMarkdownColumn1741044284771 implements MigrationInterface {
  name = 'AddTextMarkdownColumn1741044284771'

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "notes" ADD "textMarkdown" text NOT NULL`
    )
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "notes" DROP COLUMN "textMarkdown"`)
  }
}
