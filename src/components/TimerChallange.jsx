import { useRef, useState } from "react";
import ResultModal from "./ResultModal";
export default function TimerChallange({ title, targetTime }) {
    // const [timerStarted, setTimerStarted] = useState(false);
    // const [timerExpired, setTimerExpired] = useState(false);
    const [timeRemaining, setTimeRemaining] = useState(targetTime * 1000);

    const timer = useRef();
    const dialog = useRef();

    const timerIsActive = timeRemaining > 0 && timeRemaining < (targetTime * 1000);

    if (timeRemaining <= 0) {
        clearInterval(timer.current);
        dialog.current.open();
    }

    function handleReset() {
        setTimeRemaining(targetTime * 1000);
    }
    function handleStart() {
        timer.current = setInterval(() => {
            setTimeRemaining((prevTimeRemaining) => prevTimeRemaining - 10);
        }, 10);
        // timer.current = setTimeout(() => {
        //     setTimerExpired(true);
        //     setTimerStarted(false);
        //     dialog.current.open();
        // }, targetTime * 1000);
    }
    function handleStop() {
        clearInterval(timer.current);
        dialog.current.open();
    }
    return <>
        <ResultModal
            result='lost'
            ref={dialog}
            targetTime={targetTime}
            timeRemaining={timeRemaining}
            onReset={handleReset}
        />
        <section className="challenge">
            <h2>{title}</h2>
            <p className="challenge-time">
                {targetTime} second{targetTime > 1 ? 's' : ''}
            </p>
            <button
                className={timerIsActive ? 'active' : undefined}
                onClick={timerIsActive ? handleStop : handleStart}>
                {timerIsActive ? "Stop " : "Start "} Challenge
            </button>
            <p className="">
                {timerIsActive ? 'Time is running...' : 'Timer is inactive'}
            </p>
        </section>
    </>;
}