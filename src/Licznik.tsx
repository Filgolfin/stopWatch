import {useRef, useState} from "react";

import {Tabela_wynikow} from "./Tabela_wynikow.tsx";
import {Formatowanie_wyniku} from "./Formatowanie_wyniku.tsx";
import {Podsumowanie} from "./Podsumowanie.tsx";
import {Button} from "./Button.tsx";

export const Licznik = () => {
    const [firstStoper, setFirstStoper] = useState([0, 0, 0]);
    const [secondStoper, setSecondStoper] = useState([0, 0, 0]);
    const [isOn, setIsOn] = useState(false);
    const [tabela, setTabela] = useState<number[][]>([])
    const intervalRef = useRef<number>();
    const intervalRef2 = useRef<number>();


    const startCount = () => {
        if (!isOn) {
            setIsOn(true)
            intervalRef.current = setInterval(() => {
                setFirstStoper((prevState) => {
                    // Zwiększanie milisekund
                    const newMSeconds = prevState[2] < 99 ? prevState[2] + 1 : 0;
                    // Zwiększanie sekund, jeśli milisekundy osiągną 100
                    let newSeconds = prevState[1];
                    if (newMSeconds === 0) {
                        newSeconds = prevState[1] < 59 ? prevState[1] + 1 : 0;
                    }
                    // Zwiększanie minut, jeśli sekundy osiągną 60
                    let newMinutes = prevState[0];
                    if (newSeconds === 0 && newMSeconds === 0) {
                        newMinutes = prevState[0] + 1;
                    }
                    // Zwracamy nowy stan
                    return [newMinutes, newSeconds, newMSeconds];

                });
            }, 10)
            intervalRef2.current = setInterval(() => {
                setSecondStoper((prevState) => {
                    // Zwiększanie milisekund
                    const newMSeconds = prevState[2] < 99 ? prevState[2] + 1 : 0;
                    // Zwiększanie sekund, jeśli milisekundy osiągną 100
                    let newSeconds = prevState[1];
                    if (newMSeconds === 0) {
                        newSeconds = prevState[1] < 59 ? prevState[1] + 1 : 0;
                    }
                    // Zwiększanie minut, jeśli sekundy osiągną 60
                    let newMinutes = prevState[0];
                    if (newSeconds === 0 && newMSeconds === 0) {
                        newMinutes = prevState[0] + 1;
                    }
                    // Zwracamy nowy stan
                    return [newMinutes, newSeconds, newMSeconds];
                });
            }, 10)

        }
    }

    const stopCount = () => {
        if (isOn) {
            setIsOn(false)
            clearInterval(intervalRef.current)
            clearInterval(intervalRef2.current)
        }
    }


    const reset = () => {
        const zero = [0, 0, 0]
        setFirstStoper([...zero])
        setSecondStoper([...zero])
        setTabela([])
    }

    const new_lap = () => {
        if (isOn) {
            setTabela((prevState) => [...prevState, secondStoper])

            const zero = [0, 0, 0]
            setSecondStoper([...zero])
        }

    }


    return <div className={'container'}>
        <div className={'button_container'}>
            <Button tekst='Start' color='primary' onclick={startCount}/>
            <Button tekst='Stop' color='secondary' onclick={stopCount}/>
            <Button tekst='Reset' color='danger' onclick={reset}/>
            <Button tekst='New lap' color='info' onclick={new_lap}/>

        </div>
        <br/>
        {isOn ?
            <div className={'container_stoper'}>
                <div className={'container-time-circle'}>
                    <div className="time-circle">
                        <Formatowanie_wyniku wynik={firstStoper} extra_string='Total: '/>
                    </div>
                    <div className="time-circle">
                        <Formatowanie_wyniku wynik={secondStoper} extra_string='Lap: '/>
                    </div>
                </div>

                <Tabela_wynikow tabela={tabela}/>
            </div>

            :
            <Podsumowanie czas={firstStoper} tabela={tabela}/>}

    </div>;

};