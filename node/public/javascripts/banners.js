//Global variable that will contain the classes of the banners to show
var bannersArray = [];
var currentBanner = undefined;
var lastBanner = undefined;

bannerRotater = function() 
{
    //Try to find the index of the current banner
    var index = bannersArray.indexOf(currentBanner);

    //Remember the currentBanner's state before changing it
    lastBanner = currentBanner

    //The variable `currentBanner` was not found or hit end of `bannersArray`, simply start from the begining
    if(index == -1 || index == bannersArray.length - 1)
        currentBanner = bannersArray[0];
    else
        currentBanner = bannersArray[index + 1]

    //Hide the old banner, only if it is not `undefined`
    if(lastBanner != undefined)
        $(lastBanner).hide()
    
    //Render the new banner, only if it is not `undefined`
    if(currentBanner != undefined)
        $(currentBanner).show()

}

//If multiple banners are showing, rotate them every 10secs
window.setInterval(bannerRotater, 10 * 1000);

