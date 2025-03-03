import { MigrationInterface, QueryRunner } from 'typeorm'

export class AddRoleColumn1740981231504 implements MigrationInterface {
  name = 'AddRoleColumn1740981231504'

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "users" ADD "role" character varying NOT NULL DEFAULT 'USER'`
    )
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "role"`)
  }
}
