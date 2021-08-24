

/* 
import { PrimaryGeneratedColumn } from "typeorm"; */


import { IParametriEstratti, ListaTerminaleParametro, mpClas, mpMet, mpPar } from "mpstation";
import { PianoStudio } from "./piano-studio";
import { Entity, getRepository, JoinColumn, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { IListaPianiStudio, IPianoStudio } from "../../mp-classi/utility";
import { Persona } from "./persona";

@Entity({ name: "ListaPianiStudio" })
@mpClas({ percorso: 'ListaPianiStudio' })
export class ListaPianiStudio implements IListaPianiStudio {

    @PrimaryGeneratedColumn()
    id: string;

    @OneToMany(type => PianoStudio, listaPianiStudio => listaPianiStudio.fklistaPianiStudio)
    @JoinColumn({ name: "vettorePianoStudio" })
    vettorePianoStudio: Array<IPianoStudio>;
    /* public get Array(): Array<IPianoStudio> {
        return this;
    } */


    static async Istanziatore(parametri: IParametriEstratti, listaParametri: ListaTerminaleParametro) {
        const tmp = listaParametri.GetAutenticatore();
        if (tmp) {
            const ttt = <string>parametri.valoriParametri[tmp.indexParameter];

            const tmp2 = await getRepository(Persona).findOne({ where: { id: ttt } });
            if (tmp2) {
                return tmp2.listaPianiStudio;
            }
            else {
                throw new Error("Non sei autenticato!!!");
            }
        } else {
            throw new Error("Non sei autenticato!!!");
        }
    }

    async CreaNuovoPianoStudio(): Promise<IPianoStudio | Error> {
        try {
            const item = new PianoStudio();
            const risultato = await getRepository(PianoStudio).save(item);
            return risultato;
        } catch (error: any) {
            return error;
        }
    }

    constructor() {
        super();
    }

    @mpMet({ path: 'AggiungiNuovoPiano', tipo: 'post', Istanziatore: ListaPianiStudio.Istanziatore })
    AggiungiNuovoPiano(@mpPar({ posizione: 'body', tipo: 'object', nome: 'item' }) item: IPianoStudio,
        @mpPar({ autenticatore: true, posizione: 'query', tipo: 'text', nome: 'idPersona' }) idPersona?: string) {
        let posso = true;
        for (let index = 0; index < this.vettorePianoStudio.length && posso == true; index++) {
            const element = this.vettorePianoStudio[index];
            if (element.dataFine == undefined) posso = false;
        }
        if (posso) {
            this.vettorePianoStudio.push(new PianoStudio(item));
            return true;
        }
        else throw new Error("Sessioni aperte");

        return false;
    }

    ModificaPiano(index: number, item: IPianoStudio) {
        this[index].Setta(item);
        return true;
    }
}