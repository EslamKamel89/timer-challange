import { forwardRef, useImperativeHandle, useRef } from 'react';
import { createPortal } from 'react-dom';

const ResultModal = forwardRef(function ResultModal({ result, targetTime, timeRemaining, onReset }, ref) {
    const dialog = useRef();
    useImperativeHandle(
        ref,
        () => {
            return {
                open() {
                    dialog.current.showModal();
                }
            }
        },
    );
    const userLost = timeRemaining <= 0;
    // consoleLog(timeRemaining);
    // consoleLog(targetTime * 1000);
    const score = Math.round((1 - (timeRemaining / (targetTime * 1000))) * 100);
    const formattedTimeRemaining = (timeRemaining / 1000).toFixed(2);
    return createPortal(<dialog ref={dialog} className='result-modal' >
        {userLost && <h2> You Lost</h2>}
        {!userLost && <h2> You Score is {score}</h2>}
        <p>The target time was <strong>{targetTime} seconds.</strong> </p>
        {!userLost && <p>You stopped the timer with <strong>{formattedTimeRemaining} seconds left</strong></p>}
        <form method="dialog" onSubmit={onReset}>
            <button >Close</button>
        </form>
    </dialog>, document.getElementById('modal'))
})
export default ResultModal;