import { IPersona, IPianoStudio } from "../../mp-classi/utility";
import { ListaPianiStudio } from "./lista-piani-studio";

import { PrimaryGeneratedColumn, Column, OneToOne, getRepository, Entity } from "typeorm";
import { mpClas, mpMet, mpPar } from "mpstation";

@Entity({ name: "Persona" })
@mpClas({ percorso: 'Persona' })
export class Persona implements IPersona {

  @PrimaryGeneratedColumn()
  id: string;

  @Column('varchar', { name: 'username' })
  username: '';
  @Column('varchar', { name: 'password' })
  password: '';

  @OneToOne(type => ListaPianiStudio, { nullable: false, eager: true, cascade: true, onDelete: 'CASCADE' })
  listaPianiStudio = new ListaPianiStudio();
  constructor() {

  }

  @mpMet({path:'GetPersona', tipo:'get'})
  static async GetPersona(@mpPar({nome:'id', tipo:'text', posizione:'query'}) id: string) {
    const tmp2 = await getRepository(Persona).findOne({ where: { id: id } });
    if (tmp2) {
      return tmp2;
    }
    return undefined
  }


  async AggiungiPianoStudio(item: IPianoStudio) {
    try {
      await this.listaPianiStudio.AggiungiNuovoPiano(item);
      return true;
    } catch (error) {
      console.log(error);
      return false;
    }
  }

}