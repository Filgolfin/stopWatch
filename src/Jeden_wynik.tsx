import {Formatowanie_wyniku} from "./Formatowanie_wyniku.tsx";

type Props = {
    wynik: number[];
    klucz?: number
}

export const Jeden_wynik = ({wynik, klucz}: Props) => {




    return (
        <li key={klucz} className={'time-display'}><Formatowanie_wyniku wynik={wynik}/></li>
    )
}