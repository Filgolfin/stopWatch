import {Jeden_wynik} from "./Jeden_wynik.tsx";

type Props = {
    tabela: number[][]
}

export const Tabela_wynikow = ({tabela}: Props) => {

    return <>
        {tabela.length === 0 ? <h3>Brak wyników</h3> : <h3>Wyniki okrążeń: </h3>}

        <ol>
        {tabela.map((el, index) => <Jeden_wynik wynik={el} key={index}/>)}
        </ol>

    </>
}