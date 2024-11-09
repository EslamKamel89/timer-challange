import { useRef, useState } from "react";
import consoleLog from "../consoleLog";
import ResultModal from "./ResultModal";

export default function TimerChallange({ title, targetTime }) {
    const [timerStarted, setTimerStarted] = useState(false);
    const [timerExpired, setTimerExpired] = useState(false);
    const timer = useRef();
    const dialog = useRef();
    function handleStart() {
        setTimerStarted(true);
        timer.current = setTimeout(() => {
            setTimerExpired(true);
            setTimerStarted(false);
            dialog.current.open();
        }, targetTime * 1000);
    }
    function handleStop() {
        consoleLog('hello world');
        clearTimeout(timer.current);
    }
    return <>
        <ResultModal result='lost' ref={dialog} targetTime={targetTime} />
        <section className="challenge">
            <h2>{title}</h2>
            {timerExpired && <p> You Lost!</p>}
            <p className="challenge-time">
                {targetTime} second{targetTime > 1 ? 's' : ''}
            </p>
            <button
                className={timerStarted ? 'active' : undefined}
                onClick={timerStarted ? handleStop : handleStart}>
                {timerStarted ? "Stop " : "Start "} Challenge
            </button>
            <p className="">
                {timerStarted ? 'Time is running...' : 'Timer is inactive'}
            </p>
        </section>
    </>;
}