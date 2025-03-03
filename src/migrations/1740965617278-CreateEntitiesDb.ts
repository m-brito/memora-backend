import { MigrationInterface, QueryRunner } from 'typeorm'

export class CreateEntitiesDb1740965617278 implements MigrationInterface {
  name = 'CreateEntitiesDb1740965617278'

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "types" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_33b81de5358589c738907c3559b" PRIMARY KEY ("id"))`
    )
    await queryRunner.query(
      `CREATE TABLE "feedbacks" ("id" SERIAL NOT NULL, "text" text NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "senderId" integer, "receiverId" integer, "projectId" integer, CONSTRAINT "PK_79affc530fdd838a9f1e0cc30be" PRIMARY KEY ("id"))`
    )
    await queryRunner.query(
      `CREATE TABLE "notes" ("id" SERIAL NOT NULL, "text" text NOT NULL, "typeId" integer, "projectId" integer, "userId" integer, CONSTRAINT "PK_af6206538ea96c4e77e9f400c3d" PRIMARY KEY ("id"))`
    )
    await queryRunner.query(
      `ALTER TABLE "feedbacks" ADD CONSTRAINT "FK_de0937b86a073583f4c57b8cf4d" FOREIGN KEY ("senderId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE NO ACTION`
    )
    await queryRunner.query(
      `ALTER TABLE "feedbacks" ADD CONSTRAINT "FK_b622603a151c6009fdaf3330d93" FOREIGN KEY ("receiverId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE NO ACTION`
    )
    await queryRunner.query(
      `ALTER TABLE "feedbacks" ADD CONSTRAINT "FK_3efdff2b6dc31de247fc611e9f6" FOREIGN KEY ("projectId") REFERENCES "projects"("id") ON DELETE CASCADE ON UPDATE NO ACTION`
    )
    await queryRunner.query(
      `ALTER TABLE "notes" ADD CONSTRAINT "FK_7adc0a78b29eb564ba9e74f9d2e" FOREIGN KEY ("typeId") REFERENCES "types"("id") ON DELETE CASCADE ON UPDATE NO ACTION`
    )
    await queryRunner.query(
      `ALTER TABLE "notes" ADD CONSTRAINT "FK_abf7aa9bc3c992c60498f4a5448" FOREIGN KEY ("projectId") REFERENCES "projects"("id") ON DELETE CASCADE ON UPDATE NO ACTION`
    )
    await queryRunner.query(
      `ALTER TABLE "notes" ADD CONSTRAINT "FK_829532ff766505ad7c71592c6a5" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE NO ACTION`
    )
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "notes" DROP CONSTRAINT "FK_829532ff766505ad7c71592c6a5"`
    )
    await queryRunner.query(
      `ALTER TABLE "notes" DROP CONSTRAINT "FK_abf7aa9bc3c992c60498f4a5448"`
    )
    await queryRunner.query(
      `ALTER TABLE "notes" DROP CONSTRAINT "FK_7adc0a78b29eb564ba9e74f9d2e"`
    )
    await queryRunner.query(
      `ALTER TABLE "feedbacks" DROP CONSTRAINT "FK_3efdff2b6dc31de247fc611e9f6"`
    )
    await queryRunner.query(
      `ALTER TABLE "feedbacks" DROP CONSTRAINT "FK_b622603a151c6009fdaf3330d93"`
    )
    await queryRunner.query(
      `ALTER TABLE "feedbacks" DROP CONSTRAINT "FK_de0937b86a073583f4c57b8cf4d"`
    )
    await queryRunner.query(`DROP TABLE "notes"`)
    await queryRunner.query(`DROP TABLE "feedbacks"`)
    await queryRunner.query(`DROP TABLE "types"`)
  }
}
