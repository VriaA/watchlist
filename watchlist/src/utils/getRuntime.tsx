import UnknownValuePlaceHolder from "../components/UnknownValuePlaceHolder"

export default function getRunTime(time: number | null): number | JSX.Element {
    return time ? time : UnknownValuePlaceHolder()
}