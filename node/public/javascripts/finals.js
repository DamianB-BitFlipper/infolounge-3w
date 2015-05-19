function getFinals() {

now = new Date();
elem = '';

if (now.getMonth() == 4) {

if (now.getDate() == 19) {
	elem += '<li><span class="foodtype">' + 'AM' + '</span> <b>' + '2.071   6.S03   7.01x   7.05' + '</b></li><br>'
	elem += '<li><span class="foodtype">' + 'PM' + '</span> <b>' + '2.006   6.036   18.03' + '</b></li>'
}

if (now.getDate() == 20) {
	elem += '<li><span class="foodtype">' + 'AM' + '</span> <b>' + '2.005   6.006   6.046/18.410   9.24' + '</b></li><br>'
	elem += '<li><span class="foodtype">' + 'PM' + '</span> <b>' + '8.284   9.00   14.02' + '</b></li>'
}

if (now.getDate() == 21) {
	elem += '<li><span class="foodtype">' + 'AM' + '</span> <b>' + '2.003   10.301   18.02' + '</b></li><br>'
	elem += '<li><span class="foodtype">' + 'PM' + '</span> <b>' + '6.033' + '</b></li>'
}

if (now.getDate() == 22) {
	elem += '<li><span class="foodtype">' + 'AM' + '</span> <b>' + '7.02   9.40' + '</b></li><br>'
	elem += '<li><span class="foodtype">' + 'PM' + '</span> <b>' + '7.06' + '</b></li>'
}

}

if (elem.length == 0) {
	$('#finalspanel').slideUp();
} else {
	$('#finals').html(elem);
	$('#finalspanel').slideDown();
}

}