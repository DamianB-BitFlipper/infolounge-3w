lastUpdated = -1;
var isItLateYet = function() {
    var now = new Date();
    if (now.getHours() >= 2 && now.getHours() <= 7) {

        //Show the stfu banner
        if(!bannersArray.includes('.shutthefuckup'))
            bannersArray.push('.shutthefuckup')

    } else {
        //Remove the stfu banner
        var index = bannersArray.indexOf('.shutthefuckup');
        if(index > -1) 
            bannersArray.splice(index, 1);

        $('.shutthefuckup').hide();
    }
    setTimeout(isItLateYet, 5000);
}
