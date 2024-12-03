import './style.scss'

type Props = {
    tekst: string;
    color: string;
    onclick: () => void;
}

export const Button = ({tekst, color, onclick}: Props) => {
    return <button onClick={onclick} className={`button button-${color}`}>{tekst}</button>
}