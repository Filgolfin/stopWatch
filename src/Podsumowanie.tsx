import {Jeden_wynik} from "./Jeden_wynik.tsx";

type Props = {
    czas: number[];
    tabela: number[][]
}

export const Podsumowanie = ({czas, tabela}: Props) => {


    const calculateAverageTime = (tabela: number[][]): number[] => {
        if (tabela.length === 0) return [0, 0, 0]; // Jeśli brak okrążeń, zwróć zerowy czas.

        // Sumuj wszystkie czasy w milisekundach
        const totalMilliseconds = tabela.reduce((total, lap) => {
            const [minutes, seconds, milliseconds] = lap;
            return total + minutes * 60000 + seconds * 1000 + milliseconds * 10;
        }, 0);

        // Oblicz średnią
        const averageMilliseconds = Math.floor(totalMilliseconds / tabela.length);

        // Przelicz z powrotem na format [minuty, sekundy, milisekundy]
        const minutes = Math.floor(averageMilliseconds / 60000);
        const seconds = Math.floor((averageMilliseconds % 60000) / 1000);
        const milliseconds = Math.floor((averageMilliseconds % 1000) / 10);

        return [minutes, seconds, milliseconds];


    };

    const najszybszeAlboNajwolniejsze = (tabela: number[][], operator: string) => {
        if (tabela.length === 0) return [0,0,0];

        let najszybszeIndex = 0;
        let najszybszyCzas = tabela[0][0] * 6000 + tabela[0][1] * 100 + tabela[0][2]; // Minuty, sekundy, milisekundy

        let najwolniejszyIndex = 0;
        let najwolniejszyCzas = tabela[0][0] * 6000 + tabela[0][1] * 100 + tabela[0][2]; // Minuty, sekundy, milisekundy


        tabela.forEach((czas, index) => {
            const totalMilliseconds = czas[0] * 6000 + czas[1] * 100 + czas[2];
            if(operator === 'najszybsze'){
                if (totalMilliseconds < najszybszyCzas) {
                    najszybszyCzas = totalMilliseconds;
                    najszybszeIndex = index;
                }
            } else if(operator === 'najwolniejsze') {
                if (totalMilliseconds > najwolniejszyCzas) {
                    najwolniejszyCzas = totalMilliseconds;
                    najwolniejszyIndex = index;
                }
            }

        });

        return operator === 'najszybsze' ? tabela[najszybszeIndex] : tabela[najwolniejszyIndex]
    };

    const najszybszeOkrążenie = najszybszeAlboNajwolniejsze(tabela, 'najszybsze');
    const najwolniejszeOkrążenie = najszybszeAlboNajwolniejsze(tabela, 'najwolniejsze');

    const averageTime = calculateAverageTime(tabela);
    return (
        <>
            <ul>
                <h3>Łączny czas:</h3>
                <Jeden_wynik wynik={czas}/>
                <h3>Średni czas okrążenia:</h3>
                <Jeden_wynik wynik={averageTime}/>
                <h3>Najszybsze okrążenie:</h3>
                <Jeden_wynik wynik={najszybszeOkrążenie}/>
                <h3>Najwolniejszy okrążenie:</h3>
                <Jeden_wynik wynik={najwolniejszeOkrążenie}/>
                <h3>Łączna liczba okrążeń: {tabela.length}</h3>
            </ul>
        </>
    )
}