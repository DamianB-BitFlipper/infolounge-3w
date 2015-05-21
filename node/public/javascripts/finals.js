function getFinals() {

now = new Date();
finals_elem = '';

if (now.getMonth() == 4) {

if (now.getDate() == 19) {
	finals_elem += '<li><span class="foodtype">' + 'AM' + '</span> <b>' + '2.071   6.S03   7.01x   7.05' + '</b></li><br>'
	finals_elem += '<li><span class="foodtype">' + 'PM' + '</span> <b>' + '2.006   6.036   18.03' + '</b></li>'
}

if (now.getDate() == 20) {
	finals_elem += '<li><span class="foodtype">' + 'AM' + '</span> <b>' + '2.005   6.006   6.046/18.410   9.24   11.330' + '</b></li><br>'
	finals_elem += '<li><span class="foodtype">' + 'PM' + '</span> <b>' + '8.284   9.00   14.02' + '</b></li>'
}

if (now.getDate() == 21) {
	finals_elem += '<li><span class="foodtype">' + 'AM' + '</span> <b>' + '2.003   6.042/18.062   10.301   18.02' + '</b></li><br>'
	finals_elem += '<li><span class="foodtype">' + 'PM' + '</span> <b>' + '6.01   6.033' + '</b></li>'
}

if (now.getDate() == 22) {
	finals_elem += '<li><span class="foodtype">' + 'AM' + '</span> <b>' + '7.02   9.40   18.100B/C' + '</b></li><br>'
	finals_elem += '<li><span class="foodtype">' + 'PM' + '</span> <b>' + '7.06' + '</b></li>'
}

}

if (finals_elem.length == 0) {
	$('#finalspanel').slideUp();
} else {	
	$('#finals').html(finals_elem);
	$('#finalspanel').slideDown();
}

}