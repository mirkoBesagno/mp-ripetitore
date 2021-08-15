import { IPersona, IPianoStudio } from "../../mp-classi/utility";
import { ListaPianiStudio } from "./lista-piani-studio";

import { PrimaryGeneratedColumn, Column, OneToOne, JoinColumn } from "typeorm";
import { ListaSessioniStudio } from "./lista-sessioni-studio";

export class Persona implements IPersona {

    @Column('varchar', { name: 'username' })
    username:'';
    @Column('varchar', { name: 'password' })
    password:'';
    
    @OneToOne(type => ListaSessioniStudio, { nullable: false, eager: true, cascade: true, onDelete: 'CASCADE' })
    listaPianiStudio=new ListaPianiStudio();
    constructor() {
        
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