const getVideoDurationInSeconds = timeStatus => {
    const array = timeStatus.textContent.trim().split(':');

    if (array.some(_ => isNaN(_)))
        return 0;

    if (array.length === 3)
        return (parseInt(array[0]) * 3600) + (parseInt(array[1]) * 60) + parseInt(array[2]);

    if (array.length == 2)
        return (parseInt(array[0]) * 60) + parseInt(array[1]);

    return parseInt(array[0]);
};

const getUnwatchedVideoDurationInSeconds = () => {
    Array.from(document.querySelectorAll('ytd-thumbnail')).map(thumbnail => {
        const timeStatus = thumbnail.querySelector('#time-status');
    
        if (!timeStatus) {
            console.error('[YT Playlist Analysis] Time status was not found for thumbnail: ', thumbnail)
            return 0;
        }

        const duration = getVideoDurationInSeconds(timeStatus);
        const progress = thumbnail.querySelector('ytd-thumbnail-overlay-resume-playback-renderer #progress');
    
        if (!progress)
            return duration;

        const percentageWatched = progress.style.width.replace('%', '').trim();

        if (isNaN(percentageWatched)) {
            console.error('[YT Playlist Analysis] Watched percentage is non-numeric: ', percentageWatched)
            return duration;
        }

        const unwatchedFloat = 1 - (Number(percentageWatched) / 100); 

        if (unwatchedFloat > 1 || unwatchedFloat < 0) {
            console.error('[YT Playlist Analysis] Unwatched float is out of range: ', unwatchedFloat)
            return duration;
        }
        
        return unwatchedFloat * duration;
    }).reduce((a, b) => a + b, 0) 
};

const getRemainingWatchTime = playbackSpeed => {
    const remainingSeconds = getUnwatchedVideoDurationInSeconds() * playbackSpeed;
    const hours = Math.floor(remainingSeconds / 3600);
    const hoursRemainder = remainingSeconds % 3600;
    const minutes = Math.floor(hoursRemainder / 60);
    const seconds = hoursRemainder % 60;

    let watchTime = '';

    if (hours > 0)
        watchTime += `${hours} hr `;

    if (minutes > 0)
        watchTime += `${minutes} min `;

    if (seconds > 1)
        watchTime += `${seconds} sec`;

    return watchTime;
};
// / 3600;