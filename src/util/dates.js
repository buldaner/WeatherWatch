import { addMinutes, addSeconds } from 'date-fns';

export const getDateFromUTCSecondsOffset = (offset) => {
    let now = new Date();
    let UTCDate = addMinutes(now, now.getTimezoneOffset());
    return addSeconds(UTCDate, offset);
}