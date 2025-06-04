import { MigrationInterface, QueryRunner } from 'typeorm'

export class CreateProjectUserEntitie1748991096342
  implements MigrationInterface
{
  name = 'CreateProjectUserEntitie1748991096342'

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "projects_users" ("id" SERIAL NOT NULL, "permission" character varying NOT NULL, "userId" integer, "projectId" integer, CONSTRAINT "PK_3fdba03cb5a1887699cb7c629f2" PRIMARY KEY ("id"))`
    )
    await queryRunner.query(
      `ALTER TABLE "projects_users" ADD CONSTRAINT "FK_a5c762f4dc08418212c20674101" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE NO ACTION`
    )
    await queryRunner.query(
      `ALTER TABLE "projects_users" ADD CONSTRAINT "FK_69db3fe69cde18cd819c2d79200" FOREIGN KEY ("projectId") REFERENCES "projects"("id") ON DELETE CASCADE ON UPDATE NO ACTION`
    )
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "projects_users" DROP CONSTRAINT "FK_69db3fe69cde18cd819c2d79200"`
    )
    await queryRunner.query(
      `ALTER TABLE "projects_users" DROP CONSTRAINT "FK_a5c762f4dc08418212c20674101"`
    )
    await queryRunner.query(`DROP TABLE "projects_users"`)
  }
}
