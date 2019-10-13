import {MigrationInterface, QueryRunner} from "typeorm";

export class CreateSuite1570952572874 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`ALTER TABLE "suite" ADD "media" character varying NOT NULL DEFAULT 'FB'`, undefined);
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`ALTER TABLE "suite" DROP COLUMN "media"`, undefined);
    }

}
