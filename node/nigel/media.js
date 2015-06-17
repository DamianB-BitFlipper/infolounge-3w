var utils = require("../nigel/utils");
var Youtube = require("youtube-api");
Youtube.authenticate({
    type: "key",
    key: "AIzaSyDrATZhqJcmBUE700msJtCWFOe96FIVsx8"
});
var Firebase = require('firebase');
var nigelRef = new Firebase("https://rliu42.firebaseio.com/nigel");

var affirm = ["Very well: ", "Sure thing: ", "Of course: ", "My pleasure: ", "All right: ", "Your wish is my command: "];
var playing = ["I will play: ", "Bey-max will play: ", "Bey-max will play: "];
var enjoy = ["", "Enjoy the music.", "I hope you enjoy.", "Let me know if you want a different selection."];
var another = ["Let me know if you want another song.", "Let me know if you want a different selection."];
var rand = [/something else/, /another/, /different/, /^music$/, /song$/];
var titles = ["Beethoven's Fifth Symphony",
    "selections from Sound of Music",
    "Human by Christina Perri",
    "One Day More from Lay Mis",
    "Bohemian Rhapsody",
    "Somewhere Over the Rainbow",
    "Oh the Thinks you Can Think from Seussical",
    "Phantom of the Opera",
    "Let It Go from Frozen",
    "Don't Stop Believing"
];

function query(input, s_input, tokens, sms, res) {
    var response = "";
    var followup = "";
    var random = false;
    var request = utils.after(input.replace(/(play some|play a|play|^sing) /, "{play} "), "{play} ").trim();
    for (var i in rand) {
        if (rand[i].test(request)) {
            request = utils.random(titles);
            random = true;
        }
    }

    if ( /birthday/.test(request) ) {
        person = request.replace(/(happy )?birthday (to|for)?/, "").trim();
        request = "";
        var people = require("../nigel/people");
        var result = people.query(person);
        if (result.confidence && result.name) {
            response = ["Beymax wishes " + result.name + " a very happy birthday!", 
                        "Would " + result.name + " like a hug from Beymax..?"];
        } else {
            response = ["Sorry, Beymax doesn't know " + person + " well enough to sing Happy Birthday for him or her.", 
                        "Would you still like a hug from Beymax..?"];
        }
        var o = {
                req: input,
                std: s_input,
                res: response,
                followup: followup,
                cmd: "",
                sms: true,
                media: ""
        };
        nigelRef.update(o);
        res.json(o);
    }

    if (request) {
        q = request + " lyrics";
        if (random) {
            response = [utils.random(affirm) + "I'll play: " + request, utils.random(another)];
        } else {
            response = [utils.random(affirm) + utils.random(playing) + request, utils.random(enjoy)];
        }

        Youtube.search.list({
            part: "id,snippet",
            q: q,
            maxResults: 3,
            type: "video",
            videoSyndicated: "true"
        }, function(error, results) {
            if (error) {
                console.log(error);
                var videoID = "";
            } else {
                for (var i in results.items) {
                    var item = results.items[i];
                    console.log('[%s] Title: %s', item.id.videoId, item.snippet.title);
                }
                var videoID = results.items[0].id.videoId;
            }
            var o = {
                req: input,
                std: s_input,
                res: response,
                followup: followup,
                cmd: "",
                sms: true,
                media: {type: "video", link: videoID}
            };
            nigelRef.update(o);
            res.json(o);
        });
    }
}

exports.query = query;