import { MigrationInterface, QueryRunner } from "typeorm";
import * as bcrypt from "bcryptjs";
import { v4 as uuidv4 } from "uuid";

export class Start1727638232666 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    const password = await bcrypt.hash("123", 10); // Hash da senha

    await queryRunner.query("CREATE SCHEMA adm;");
    await queryRunner.query("CREATE SCHEMA venda;");

    await queryRunner.query(
      `CREATE TABLE "adm"."tbl_adm_usuarios" ("id_usuario" uuid NOT NULL, "nm_usuario" character varying(100) NOT NULL, "ds_login" character varying(50) NOT NULL, "ds_senha" character varying(100), "ds_senha2" character varying(100), "ds_senha3" character varying(100), "in_ativo" boolean NOT NULL DEFAULT true, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "UQ_99feda46fb8d75d199aa2dc38a4" UNIQUE ("ds_login"), CONSTRAINT "PK_8b663718ed5a42697bace66f3cd" PRIMARY KEY ("id_usuario"))`,
    );
    await queryRunner.query(`CREATE UNIQUE INDEX "tbl_adm_usuarios_pkey" ON "adm"."tbl_adm_usuarios" ("id_usuario") `);
    await queryRunner.query(
      `CREATE TABLE "adm"."tbl_adm_perfis" ("id_perfil" uuid NOT NULL, "nm_perfil" character varying(100), "ds_perfil" character varying(200), "in_ativo" boolean NOT NULL DEFAULT true, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "UQ_ff1fbcac4c10975e50db57d6cc4" UNIQUE ("nm_perfil"), CONSTRAINT "PK_8bab78b64f20e574acd1c3c0a3b" PRIMARY KEY ("id_perfil"))`,
    );
    await queryRunner.query(`CREATE UNIQUE INDEX "tbl_adm_perfis_pkey" ON "adm"."tbl_adm_perfis" ("id_perfil") `);
    await queryRunner.query(
      `CREATE TABLE "adm"."tbl_adm_acessos" ("id_acesso" uuid NOT NULL, "nm_acesso" character varying(100), "ds_acesso" character varying(200), "in_ativo" boolean NOT NULL DEFAULT true, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "UQ_a1fa6d765877209bffeb39af773" UNIQUE ("nm_acesso"), CONSTRAINT "PK_f6914bca1e38e3bf78ad3ce5a73" PRIMARY KEY ("id_acesso"))`,
    );
    await queryRunner.query(`CREATE UNIQUE INDEX "tbl_adm_acessos_pkey" ON "adm"."tbl_adm_acessos" ("id_acesso") `);
    await queryRunner.query(
      `CREATE TABLE "adm"."tbl_adm_usuarios_tokens" ("id_token" uuid NOT NULL, "token" uuid NOT NULL, "id_usuario" character varying NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_9f6ec55ed35cb4306b0ce822187" PRIMARY KEY ("id_token"))`,
    );
    await queryRunner.query(
      `CREATE UNIQUE INDEX "tbl_adm_usuarios_tokens_pkey" ON "adm"."tbl_adm_usuarios_tokens" ("id_usuario") `,
    );
    await queryRunner.query(
      `CREATE TABLE "adm"."tbl_adm_usuarios_perfis" ("id_usuario" uuid NOT NULL, "id_perfil" uuid NOT NULL, CONSTRAINT "PK_bedb465ccde8c96c7b7441f1d7b" PRIMARY KEY ("id_usuario", "id_perfil"))`,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_76c56d715db9d1c95b0d3994c5" ON "adm"."tbl_adm_usuarios_perfis" ("id_usuario") `,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_cc7cbe055ae3695ba38338db8b" ON "adm"."tbl_adm_usuarios_perfis" ("id_perfil") `,
    );
    await queryRunner.query(
      `CREATE TABLE "adm"."tbl_adm_perfis_acessos" ("id_perfil" uuid NOT NULL, "id_acesso" uuid NOT NULL, CONSTRAINT "PK_6af289d91d9161cc9bb16516849" PRIMARY KEY ("id_perfil", "id_acesso"))`,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_b9a8fbf6e849560c91b4ebc30a" ON "adm"."tbl_adm_perfis_acessos" ("id_perfil") `,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_473e34053b28bb89b80ebe277f" ON "adm"."tbl_adm_perfis_acessos" ("id_acesso") `,
    );
    await queryRunner.query(
      `ALTER TABLE "adm"."tbl_adm_usuarios_perfis" ADD CONSTRAINT "FK_76c56d715db9d1c95b0d3994c54" FOREIGN KEY ("id_usuario") REFERENCES "adm"."tbl_adm_usuarios"("id_usuario") ON DELETE CASCADE ON UPDATE CASCADE`,
    );
    await queryRunner.query(
      `ALTER TABLE "adm"."tbl_adm_usuarios_perfis" ADD CONSTRAINT "FK_cc7cbe055ae3695ba38338db8b2" FOREIGN KEY ("id_perfil") REFERENCES "adm"."tbl_adm_perfis"("id_perfil") ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "adm"."tbl_adm_perfis_acessos" ADD CONSTRAINT "FK_b9a8fbf6e849560c91b4ebc30a8" FOREIGN KEY ("id_perfil") REFERENCES "adm"."tbl_adm_perfis"("id_perfil") ON DELETE CASCADE ON UPDATE CASCADE`,
    );
    await queryRunner.query(
      `ALTER TABLE "adm"."tbl_adm_perfis_acessos" ADD CONSTRAINT "FK_473e34053b28bb89b80ebe277f1" FOREIGN KEY ("id_acesso") REFERENCES "adm"."tbl_adm_acessos"("id_acesso") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );

    //**Insere Usuarios */
    await queryRunner.query(`
      INSERT INTO adm.tbl_adm_usuarios (id_usuario,ds_login,nm_usuario, ds_senha)
      VALUES ('${uuidv4()}','ADMIN','ADMINISTRADOR_1','${password}'),
      ('${uuidv4()}','OPERADOR_1','OPERADOR_1','${password}'),
       ('${uuidv4()}','OPERADOR_2','OPERADOR_2','${password}'),
        ('${uuidv4()}','OPERADOR_3','OPERADOR_3','${password}'),
         ('${uuidv4()}','USUARIO_1','USUARIO_1','${password}'),
       ('${uuidv4()}','USUARIO_2','USUARIO_2','${password}'),
        ('${uuidv4()}','USUARIO_3','USUARIO_3','${password}')
  `);
    //**Insere Perfis */
    await queryRunner.query(`
      INSERT INTO adm.tbl_adm_perfis (id_perfil,nm_perfil)
    VALUES
    ('${uuidv4()}','ADMINISTRADOR'),
    ('${uuidv4()}','OPERADOR'),
  ('${uuidv4()}','USER') `);

    //**Insere Acessos */
    await queryRunner.query(`
  INSERT INTO adm.tbl_adm_acessos (id_acesso,nm_acesso)
VALUES
('${uuidv4()}','ADMINISTRADOR'),
('${uuidv4()}','USUARIO_LISTAR'),
('${uuidv4()}','USUARIO_CRIAR'),
('${uuidv4()}','USUARIO_ALTERAR'),
('${uuidv4()}','USUARIO_REMOVER'),
('${uuidv4()}','PERFIL_LISTAR'),
('${uuidv4()}','PERFIL_CRIAR'),
('${uuidv4()}','PERFIL_ALTERAR'),
('${uuidv4()}','PERFIL_REMOVER'),
('${uuidv4()}','ACESSO_LISTAR'),
('${uuidv4()}','ACESSO_CRIAR'),
('${uuidv4()}','ACESSO_ALTERAR'),
('${uuidv4()}','ACESSO_REMOVER'),
('${uuidv4()}','TELEFONE_LISTAR'),
('${uuidv4()}','TELEFONE_CRIAR'),
('${uuidv4()}','TELEFONE_ALTERAR'),
('${uuidv4()}','TELEFONE_REMOVER');

`);

    /**Adiciona Perfis Aos Usuarios */
    await queryRunner.query(`INSERT into adm.tbl_adm_usuarios_perfis(id_usuario,id_perfil)
  VALUES ((SELECT id_usuario from adm.tbl_adm_usuarios WHERE ds_login='ADMIN'),
  (SELECT id_perfil from adm.tbl_adm_perfis WHERE nm_perfil='ADMINISTRADOR') ),
   ((SELECT id_usuario from adm.tbl_adm_usuarios WHERE ds_login='OPERADOR_1'),
  (SELECT id_perfil from adm.tbl_adm_perfis WHERE nm_perfil='OPERADOR') ),
   ((SELECT id_usuario from adm.tbl_adm_usuarios WHERE ds_login='OPERADOR_2'),
  (SELECT id_perfil from adm.tbl_adm_perfis WHERE nm_perfil='OPERADOR') ),
   ((SELECT id_usuario from adm.tbl_adm_usuarios WHERE ds_login='USUARIO_1'),
  (SELECT id_perfil from adm.tbl_adm_perfis WHERE nm_perfil='USER') ),
   ((SELECT id_usuario from adm.tbl_adm_usuarios WHERE ds_login='USUARIO_2'),
  (SELECT id_perfil from adm.tbl_adm_perfis WHERE nm_perfil='USER') )`);

    /**Adiciona acesso ADMINISTRADOR ao Perfil ADMINISTRADOR */
    await queryRunner.query(`INSERT into adm.tbl_adm_perfis_acessos(id_perfil,id_acesso)
    VALUES ((SELECT id_perfil from adm.tbl_adm_perfis WHERE nm_perfil='ADMINISTRADOR'),
    (SELECT id_acesso from adm.tbl_adm_acessos WHERE nm_acesso='ADMINISTRADOR') )`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query("DROP SCHEMA adm CASCADE;");
  }
}
