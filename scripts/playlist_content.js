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
    
        if (!timeStatus)
            return 0;
    
        const duration = getVideoDurationInSeconds(timeStatus);
        const progress = thumbnail.querySelector('ytd-thumbnail-overlay-resume-playback-renderer #progress');
    
        if (!progress)
            return duration;

        const progressFloat = 0;
    
    }).reduce((a, b) => a + b, 0) 
};

// / 3600;