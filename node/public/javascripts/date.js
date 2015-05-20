var now = new Date();
var graduation = (now.getMonth() == 5 && now.getDate() <= 6);

function getDate() {

    var aprilfools = [
        ['Tiffany', '#00FFFF'],
        ['Tracy', '#FF3700'],
        ['Anita', '#551a8b'],
        ['Neil'],
        ['Kim', '#ADFFAD'],
        ['William', '#990033'],
        ['Noelle', '#00CED1'],
        ['Abra', '#ADFFAD'],
        ['Steph McHugh', '#39DB4F'],
        ['Piper', '#4099FF']
    ];

    var seniors = [
        ['Norman'],
        ['Kim', '#ADFFAD'],
        ['Becky', 'purple'],
        ['KYC', 'orange'],
        ['Staly', '#228B22'],
        ['Josh Josh'],
        ['Sumit', '#6FA252'],
        ['Fish', '#A5CCA1'],
        ['Hunter'],
        ['Hans'],
        ['Michael X'],
        ['Tommy'],
        ['Eva', '#daf5ba'],
        ['Natalle', '#4099FF'],
        ['Shanthi'],
        ['Kev Hu'],
        ['Yi-Shiuan'],
        ['Jeff'],
        ['Corzo'],
        ['Jenny', '#ff69b4']
        ['Jennie Z', '#8C0D1C'],
        ['Michael W'],
        ['Saya'],
        ['Tony']
    ];

    var senior_photos = [
        "https://scontent-ord.xx.fbcdn.net/hphotos-xaf1/v/t1.0-9/10386761_10204355062212610_229239526421480886_n.jpg?oh=f157d44039349d91fbde9eabfdea80a0&oe=55D89865",
        "https://rliu42.scripts.mit.edu/shenanigans/wing2015.jpg",
        "https://scontent-ord.xx.fbcdn.net/hphotos-xpt1/v/t1.0-9/11127753_10152790139498595_2706544834868440309_n.jpg?oh=9d59ddf7b5b593ffa9f329f480f749c4&oe=55C2BA79",
        "https://fbcdn-sphotos-c-a.akamaihd.net/hphotos-ak-xpa1/v/t1.0-9/65082_10151180062886693_6328247_n.jpg?oh=7e01a12d4b1b0e48ac477fe6a0f15639&oe=55DC89FA&__gda__=1439500490_1884a954ff96f9af2c0cea8c8d375881",
        "https://scontent-iad.xx.fbcdn.net/hphotos-xft1/v/t1.0-9/1979659_830938933586679_142348341_n.jpg?oh=94a0dba41d350f52ee2f074f3977aed7&oe=5604F0F2",
        "https://scontent-ord.xx.fbcdn.net/hphotos-xpf1/v/t1.0-9/1484690_10153248747653156_3059402288226991120_n.jpg?oh=67513bdcf490118780e459a1f29ec625&oe=55DC48A1",
        "https://scontent-ord.xx.fbcdn.net/hphotos-xap1/v/t1.0-9/11065913_10153315185599369_6151834489624610504_n.jpg?oh=60662070f294916c096afa9186d224ea&oe=55C0F04F",
        "https://scontent-ord.xx.fbcdn.net/hphotos-xpf1/v/t1.0-9/r90/10660085_951188108228427_6269089794492253461_n.jpg?oh=d7eade57dabb59f44347aa11fab1258c&oe=55C65723",
        "https://scontent-ord.xx.fbcdn.net/hphotos-xpf1/v/t1.0-9/11102805_10153248743828156_5184281773586079571_n.jpg?oh=3b558218fe8f143cf12c3e8b720939ec&oe=5607C31A",
        "https://scontent-ord.xx.fbcdn.net/hphotos-xfp1/t31.0-8/10687265_10204429908123711_2028066415331487066_o.jpg",
        "https://scontent-iad.xx.fbcdn.net/hphotos-xfa1/v/t1.0-9/10500394_10203559924733124_7711696863885455788_n.jpg?oh=d496a28ff54a2957dc53eb2b63c089a1&oe=55C1D100",
        "https://scontent-ord.xx.fbcdn.net/hphotos-xpa1/v/t1.0-9/10408994_10152845482273595_1161750241559013910_n.jpg?oh=d0de43d1275bf00d4cfac85845a19c8e&oe=560B99A4",
        "https://fbcdn-sphotos-g-a.akamaihd.net/hphotos-ak-xfa1/t31.0-8/1402237_10203424502349195_5784511144195778771_o.jpg",
        "https://scontent-iad.xx.fbcdn.net/hphotos-ash2/v/t1.0-9/575472_10151443847266693_1626602042_n.jpg?oh=9aad63fdff227370a5e4007193f77313&oe=56062C98",
        "https://scontent-ord.xx.fbcdn.net/hphotos-xap1/l/t31.0-8/10258150_10203424471988436_2009526003710316381_o.jpg",
        "https://fbcdn-sphotos-f-a.akamaihd.net/hphotos-ak-xfp1/v/t1.0-9/10270609_10203595222855555_4095790373427279223_n.jpg?oh=3c587d28c718b936f2d32e3ea033e1b5&oe=55C68851&__gda__=1440553268_a14f64c3035b195731be9b518015c6f9",
        "https://scontent-ord.xx.fbcdn.net/hphotos-xpa1/t31.0-8/10333241_10152206786541693_2572404692788622949_o.jpg",
        "https://scontent-ord.xx.fbcdn.net/hphotos-xfp1/t31.0-8/10269290_10203228459848255_8056646643651285502_o.jpg",
        "https://scontent-ord.xx.fbcdn.net/hphotos-xpa1/v/t1.0-9/10364011_886808224668909_563524965081355221_n.jpg?oh=f32b6a4b9bc59770ee45a31a36ef7c04&oe=55DD4B61",
        "https://scontent-ord.xx.fbcdn.net/hphotos-prn2/v/t1.0-9/944410_10200870626382346_1719982975_n.jpg?oh=a436d4e653454d885c9baeec9833350e&oe=55C91C0D",
        "https://scontent-ord.xx.fbcdn.net/hphotos-xaf1/v/t1.0-9/217091_10151419697716693_58434129_n.jpg?oh=d2d42b767e4a5be7b7c9a8d53977f615&oe=5608B434",
        "https://scontent-ord.xx.fbcdn.net/hphotos-xft1/v/t1.0-9/10544353_10152306114152992_5240187597282959879_n.jpg?oh=2b266c0e6371f96ca4bed57afb47d076&oe=55DA1AAA",
        "https://scontent-ord.xx.fbcdn.net/hphotos-xtf1/v/t1.0-9/10556475_10154474059735249_1856510470393487789_n.jpg?oh=ca31f6457694c6a3e2e5f3f6870386a9&oe=55D2C06D",
        "https://scontent-ord.xx.fbcdn.net/hphotos-xft1/v/t1.0-9/11053267_10152790161358595_2693132111354124870_n.jpg?oh=22909c0d9e7b02d98a8b2c3d37000448&oe=55D00C69",
        "https://scontent-ord.xx.fbcdn.net/hphotos-xaf1/v/t1.0-9/268805_10201440939530535_117506243_n.jpg?oh=d4f8bce4dc53c86c2f4f1edd6defe58d&oe=55D243AE",
        "https://scontent-ord.xx.fbcdn.net/hphotos-ash2/v/t1.0-9/554674_10150855057811693_1609350830_n.jpg?oh=34a8bfda5f45a87a851c752ac41910d2&oe=55C2C59C",
        "https://scontent-ord.xx.fbcdn.net/hphotos-prn2/v/t1.0-9/945923_10151565223584487_163039161_n.jpg?oh=1d6a47d0617cebf14fe846e16790f98b&oe=56071454",
        "https://scontent-ord.xx.fbcdn.net/hphotos-xfa1/v/t1.0-9/488344_10151370010731693_845331458_n.jpg?oh=2b373cb3630b88a0b418baa50ec95dd6&oe=55DD3C9B",
        "https://scontent-ord.xx.fbcdn.net/hphotos-xap1/v/t1.0-9/1536749_10202259555824714_1989803274_n.jpg?oh=c3e69642e65222c609c2a3e5c1583368&oe=55DB7318",
        "https://scontent-ord.xx.fbcdn.net/hphotos-xfa1/v/t1.0-9/10389676_886808351335563_3335703894612925778_n.jpg?oh=1c0af2c7356c9b222ae08355fada0da4&oe=560C348B",
        "https://scontent-ord.xx.fbcdn.net/hphotos-xpa1/v/t1.0-9/11082615_10155344503650150_1761106526825879541_n.jpg?oh=bf6d05de29cb3d25e1e2314a90408188&oe=55DB02DC",
        "https://fbcdn-sphotos-g-a.akamaihd.net/hphotos-ak-xpa1/v/t1.0-9/1528550_338776392958329_3526845074410148771_n.jpg?oh=3e3038af339cddc2f6e0bca2fc04a216&oe=55C9AA53&__gda__=1443507566_9b72bf95a660f095d923d8e124979fb8",
        "https://fbcdn-sphotos-d-a.akamaihd.net/hphotos-ak-xpf1/v/t1.0-9/10153091_10100262563133178_4657864132074615896_n.jpg?oh=0478ecb2084b8f8f1b59b9c61b7ddd68&oe=55C5CE19&__gda__=1440375910_904f8536bc92a9f1cd8ec43d4c3ba526",
        "https://scontent-ord.xx.fbcdn.net/hphotos-xfa1/v/t1.0-9/p206x206/488241_10151369914706693_861235209_n.jpg?oh=0879ad454c8bb159a19917863bf16de6&oe=56076CDB",
        "https://scontent-ord.xx.fbcdn.net/hphotos-xpf1/v/t1.0-9/11150962_956506087694768_3886416401804965739_n.jpg?oh=03fcc2aca52e25fc8c4d7e966221570c&oe=560AEC18",
        "https://scontent-ord.xx.fbcdn.net/hphotos-xfa1/v/t1.0-9/603817_10152790155403595_5840575909894179331_n.jpg?oh=c4160b6595ba2e0b96c89463f2117841&oe=55C60409",
        "https://scontent-ord.xx.fbcdn.net/hphotos-xpa1/v/t1.0-9/10320605_10153315185869369_9001252536010922661_n.jpg?oh=ae5a480216b5c904360347285dbf2943&oe=55D210CB",
        "https://scontent-ord.xx.fbcdn.net/hphotos-xpa1/v/t1.0-9/11081235_10153248739988156_667644050547625271_n.jpg?oh=120dfdd51584be0820ea3057575ad50f&oe=55D5E4A4",
        "https://scontent-ord.xx.fbcdn.net/hphotos-xap1/v/t1.0-9/10406875_888106434534734_3962895231180860906_n.jpg?oh=4f1726ac3a914f4ef9ba3f32a4b96e43&oe=55D30AFC",
        "https://scontent-ord.xx.fbcdn.net/hphotos-xfp1/v/t1.0-9/11193325_439075949595039_2668698934790711983_n.jpg?oh=18e3b34218d90d5d03c3d08071db39e8&oe=560CEB2D",
        "https://scontent-ord.xx.fbcdn.net/hphotos-prn2/v/t1.0-9/253376_10151419697086693_648637553_n.jpg?oh=b87758babf321a053e7d77dca9156b5f&oe=55CD6738",
        "https://scontent-ord.xx.fbcdn.net/hphotos-ash2/v/t1.0-9/943055_10151419696716693_1126529450_n.jpg?oh=7e4c5871d977ee738364eea21e86be8e&oe=55C04F99",
        "https://fbcdn-sphotos-b-a.akamaihd.net/hphotos-ak-xfa1/v/t1.0-9/538760_10151373242048595_852092931_n.jpg?oh=8199c05033318d3c7178077928431143&oe=560C27F9&__gda__=1439353550_4d162b02724268f37a5ac4897321ebad",
        "https://scontent-ord.xx.fbcdn.net/hphotos-prn2/v/t1.0-9/524048_10151570630832392_1945509313_n.jpg?oh=9dc5f1ae59b00d706fc9e31b7a0f7335&oe=56075868",
        "https://scontent-ord.xx.fbcdn.net/hphotos-xpa1/v/t1.0-9/10846250_888107897867921_4996614189832948858_n.jpg?oh=1ba1b29db17726b2e26dcbd9bb1a0171&oe=56098971",
        "https://scontent-ord.xx.fbcdn.net/hphotos-xpf1/v/t1.0-9/10704088_10205161486141875_2416907290365957876_n.jpg?oh=bdbd8c31e899322f5336fb3a8dc15175&oe=55C44891",
        "https://scontent-ord.xx.fbcdn.net/hphotos-xpf1/v/t1.0-9/1977353_10152367480103156_141769627_n.jpg?oh=1c5eb0824eabe0766764bbcc371f80a3&oe=560961EB",
        "https://scontent-ord.xx.fbcdn.net/hphotos-frc3/v/t1.0-9/995464_10153105151310392_1012643409_n.jpg?oh=b56e00cede8d800f74ddd5771d2e2132&oe=55CA121E",
        "https://scontent-ord.xx.fbcdn.net/hphotos-frc3/v/t1.0-9/1151061_10153177135915088_1110305342_n.jpg?oh=4425c767f2145048572aac906ab9c43e&oe=55CBD29E",
        "https://scontent-ord.xx.fbcdn.net/hphotos-prn2/v/t1.0-9/935120_10152786314695150_340528530_n.jpg?oh=a87a56ed6a16b859b2fc1f424dd3eedd&oe=55D9D204",
        "https://scontent-ord.xx.fbcdn.net/hphotos-xap1/v/t1.0-9/10563113_10204697038771764_5531064764624964967_n.jpg?oh=1db1f3b1f8e9116e0c965eccb966b713&oe=55D2DE44",
        "https://scontent-ord.xx.fbcdn.net/hphotos-xaf1/v/t1.0-9/208639_146216412214329_1573689040_n.jpg?oh=b5f5ff25ea8ebf25ffb79040238dc54b&oe=5609EFD0",
        "https://scontent-ord.xx.fbcdn.net/hphotos-xpa1/v/t1.0-9/72884_123222801180357_562300330_n.jpg?oh=c452d0636332179fde3d79ba9c405ec3&oe=55CA663C",
        "https://scontent-ord.xx.fbcdn.net/hphotos-xaf1/v/t1.0-9/395362_10150439756742217_501093196_n.jpg?oh=a8d56bdc27a21ca22619e3c1d14b46f8&oe=55DA62F0",
        "https://scontent-ord.xx.fbcdn.net/hphotos-xpf1/v/t1.0-9/378456_10150439727377217_667277377_n.jpg?oh=27eed11e47a7253173256b0b227ff62e&oe=55DBD1DE",
        "https://scontent-ord.xx.fbcdn.net/hphotos-xaf1/v/t1.0-9/384129_4332764993564_805148645_n.jpg?oh=116579af9cd3a690e490ba1aef49e380&oe=55CAAE3B",
        "https://scontent-ord.xx.fbcdn.net/hphotos-xpa1/v/t1.0-9/426084_10150517209403595_458142446_n.jpg?oh=6856e21de0494d7c25482020585fc1c9&oe=55C08F7E",
        "https://fbcdn-sphotos-b-a.akamaihd.net/hphotos-ak-xat1/v/t1.0-9/10915286_516708191805514_2567065416818470832_n.jpg?oh=e7ff981e3c446edd89bf590647bcfeeb&oe=55D32EF4&__gda__=1439120427_e9ab75158a831030fedfed061b0b1996"
    ];

    var people = [
        ['tiffwang', 'January 1, 1995 00:00:00', 'Tiffany', '#00FFFF'],
        ['xtnbui', 'January 4, 1996 00:00:00', 'Xuan', 'green'],
        ['rjliu', 'January 20, 1995 00:00:00', 'Raymond'],
        ['bmatt', 'January 21, 1993 00:00:00', 'Ben'],
        ['jnation', 'February 4, 1989 00:00:00', 'Josh RT', 'red'],
        ['normandy', 'February 5, 1993 00:00:00', 'Norman'],
        ['gopalan', 'February 8, 1996 00:00:00', 'Diits'],
        ['yzhang17', 'February 13, 1996 00:00:00', 'Yaning', '#29F0E2'],
        ['evayeung', 'February 13, 1993 00:00:00', 'Eva', "#ADFFAD"],
        ['akwasio', 'February 15, 1995 00:00:00', 'Akwasi', 'green'],
        ['oropp', 'March 4, 1996 00:00:00', 'Or', '#7D26CD'],
        ['lotusez3', 'March 24, 1995 00:00:00', 'Elton', '#D391DB'],
        ['juesato', 'April 21, 1995 00:00:00', 'Jonathan U'],
        ['psigrest', 'April 27, 1996 00:00:00', 'Piper', '#4099FF'],
        ['lcarter', 'May 3, 1995 00:00:00', 'Landon'],
        ['eurahko', 'May 17, 1993 00:00:00', 'Eurah', '#226A87'],
        ['sallylin', 'May 22, 1993 00:00:00', 'Sally'],
        ['tricias', 'May 23, 1995 00:00:00', 'Tricia', '#00ccff'],
        ['huangjd', 'May 26, 1994 00:00:00', 'William', '#990033'],
        ['smmchugh', 'May 26, 1995 00:00:00', 'Steph', 'green'],
        ['abrashen', 'June 2, 1994 00:00:00', 'Abra'],
        ['ncolant', 'July 21, 1995 00:00:00', 'Noelle', '#00CED1'],
        ['stalyc', 'August 10, 1993 00:00:00', 'Staly', 'green'],
        ['anitaliu', 'August 11, 1998 00:00:00', 'Anita', '#551a8b'],
        ['chenbon', 'August 28, 1996 00:00:00', 'Bonnie'],
        ['kkarthur', 'August 29, 1995 00:00:00', 'Bena', 'green'],
        ['mabrams', 'September 2, 1995 00:00:00', 'Melanie', "#9F7EE6"],
        ['saleeby', 'September 20, 1994 00:00:00', 'Kyle'],
        ['harlin', 'September 23, 1993 00:00:00', 'Harlin'],
        ['joshbs', 'September 26, 1996 00:00:00', 'Josh Josh'],
        ['cmzhang', 'October 8, 1993 00:00:00', 'Clare', '#000047'],
        ['pudjeeb', 'October 10, 1991 00:00:00', 'PJ'],
        ['rliu42', 'October 10, 1994 00:00:00', 'Runpeng', 'black'],
        ['vhung', 'October 16, 1992 00:00:00', 'Victor', 'orange'],
        ['zsheinko', 'October 28, 1994 00:00:00', 'Zoe', 'red'],
        ['fishr', 'October 31, 1992 00:00:00', 'Fish'],
        ['dfavela', 'November 1, 1996 00:00:00', 'Favela', 'red'],
        ['jamesvr', 'December 12, 1995 00:00:00', 'James'],
        ['tianm', 'December 24, 1993 00:00:00', 'Tian'],
        ['lolzhang', 'December 29, 1995 00:00:00', 'Linda']
    ];

    var toDisplay = 3;
    var bg_color;
    var dict = [];
    var elem = '';

    if ((now.getHours() < 6) || (now.getHours() > 22) || (now.getDay() % 6 == 0)) {
        toDisplay = 5;
    }

    if (graduation) {
        toDisplay = 3;
        $('.news-header').html('&nbsp; <span class = "ion-ios-color-wand"></span> memories');
    }

    if (graduation && (now.getSeconds() % 4 == 0)) {
        r = Math.floor(Math.random() * seniors.length);
        var name = seniors[r][0];
        elem = 'Congrats <b>' + name + '</b>! &nbsp;';
        var bg_color = seniors[r][1] || "#860000";
        $('.birthday').find('div').html('<h1>' + elem + '</h1>');
        $('.birthday').css('background-color', bg_color);
        $('.birthday').show();
        $('.warning').hide();
    }

    if (graduation && now.getSeconds() % 10 == 0) {
        if ($('#news').find('img').css('display') == 'none') {} else {
            $('#news').find('img').fadeOut(function() {
                var img_src = senior_photos[Math.floor(Math.random() * senior_photos.length)];
                var img = "<img class = 'senior-photo' style='display:none' src='" + img_src + "' />";
                $('#news').html(img);
                setTimeout($('#news').find('img').fadeIn(750), 250)
            });
        }
    }

    for (var i = 0; i < people.length; i++) {
        var age = 0;
        var date = new Date(people[i][1]);
        while (date < now) {
            age++;
            date.setYear(date.getFullYear() + 1);
        }
        age--;
        date.setYear(date.getFullYear() - 1);
        age += (now - date) / 1000 / 60 / 60 / 24 / (now.getYear() % 4 == 0 ? 366 : 365);
        var ageStr = age.toFixed(8);
        var ageIncStr = (age - 0.000001).toFixed(8);
        var fracpart = ageIncStr.substring(ageIncStr.indexOf('.'));
        if (Number(fracpart) + 0.000001 > 1) {
            partyTime();
        }
        // April fools
        if (now.getMonth() == 3 && now.getDate() == 1) {
            document.body.className = 'transform';
            r = Math.floor(Math.random() * aprilfools.length);
            elem = 'Happy (un)Birthday <b>' + aprilfools[r][0] + '</b>! &nbsp;';
            var bg_color = aprilfools[r][1] || "orange";
        } else {
            if (Number(fracpart) < 0.0026) {
                elem += 'Happy Birthday <b>' + people[i][2] + '</b>! &nbsp;';
                var bg_color = people[i][3] || "orange";
            }
        }
        if (elem.length > 1) {
            $('.birthday').find('div').html('<h1>' + elem + '</h1>');
            $('.birthday').css('background-color', bg_color);
            $('.birthday').show();
            $('.warning').hide();
        } else {
            //$('.birthday').hide();
            //$('.warning').show();
        }
        dict.push([fracpart, '<div class="subdate">' + people[i][0] + ' is ' + ageStr + ' years old</div>']);

    }
    dict.sort();
    if (now.getMonth() == 8)
        var elem = dateFormat(now, 'ddd, d mmm');
    else
        var elem = dateFormat(now, 'ddd, d mmmm');
    for (var i = dict.length; --i >= dict.length - toDisplay;) {
        elem += dict[i][1];
    }
    $("#date").html(elem);

}