type Props = {
    wynik: number[]
    extra_string?: string;
}

export const Formatowanie_wyniku = ({wynik, extra_string}: Props) => {

    const formatTime = (time: number) => {
        return (time < 10 ? `0${time}` : `${time}`);
    };

    return (
    <p className={'time-display'}>{extra_string}
        {formatTime(wynik[0])}:{formatTime(wynik[1])}:{formatTime(wynik[2])}

    </p>
    )
}