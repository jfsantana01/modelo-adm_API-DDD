import { MigrationInterface, QueryRunner } from "typeorm";
import * as bcrypt from "bcryptjs";
import { v4 as uuidv4 } from "uuid";
export class InsertUsuarios1731291979607 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    const password = await bcrypt.hash("123", 10); // Hash da senha

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
    await queryRunner.query(`DELETE FROM adm.tbl_adm_perfis_acessos`);
    await queryRunner.query(`DELETE FROM adm.tbl_adm_usuarios`);
    await queryRunner.query(`DELETE FROM adm.tbl_adm_acessos`);
    await queryRunner.query(`DELETE FROM adm.tbl_adm_perfis`);
    await queryRunner.query(`DELETE FROM adm.tbl_adm_usuarios`);
  }
}
