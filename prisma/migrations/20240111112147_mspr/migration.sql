-- AlterTable
CREATE SEQUENCE annonce_id_annonce_seq;
ALTER TABLE "Annonce" ALTER COLUMN "Id_Annonce" SET DEFAULT nextval('annonce_id_annonce_seq');
ALTER SEQUENCE annonce_id_annonce_seq OWNED BY "Annonce"."Id_Annonce";
