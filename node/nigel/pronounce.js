key = new Array();

key["kkarthur"] = "K.K. Arthur"
key["akwasio"] =  "Akwasi O."
key["dfavela"]  = "D Favela"
key["joshbs"]   = "Josh B.S."
key["lolzhang"] = "Lol Zhang"
key["rsyang"] =   "R.S. Yang"
key["harlin"] =   "Harlin"
key["gopalan"] =  "Gopalahn"
key["huangjd"] =  "Hu-ong J.D."
key["cmzhang"] =  "C.M. Zhang"
key["ncolant"] =  "En cohlahnt"
key["tianm"] =    "Tien. M."
key["tiffwang"] = "Tiff Wang"
key["tricias"] =  "Tricias"
key["mabrams"] =  "Em Abrahms"
key["zsheinko"] = "Zee Shine-ko"
key["tcheng17"] = "T Chang 17"
key["jnation"] =  "Jay Nation"
key["saleeby"] =  "Sa-leeby"
key["jamesvr"] =  "James V.R."
key["rliu42"] =   "R Liu 42"
key["dyhwong"] =  "D.Y.H. Wong"
key["xtnbui"] =   "X.T.N. Buoy"
key["eurahko"] =  "Yurah Ko";
key["oropp"] =    "Or Op"
key["rjliu"] =    "R.J.Loo"
key["yzhang17"] = "Y Zhang 17"
key["abrashen"] = "Aebra Shin"
key["psigrest"] = "P Sigrest"
key["estrand"] =  "E Strand"
key["ajjaeger"] = "A.J. Yaygger"
key["jgoupil"] =  "J.Goupil"
key["jfabi"] =    "JayFahbi"
key["normandy"] = "Normandy"
key["fishr"] =    "Fish R"
key["stalyc"] =   "Staley C"
key["bmatt"] =    "B Matt"
key["vhung"] =    "V Hung"
key["lcarter"] =  "L Carter"
key["ksmori"] =   "K.S. Mori"
key["kkim17"] =   "K Kim 17"
key["zhoul"] =    "Joe L."
key["parke"]   =  "Park. E."
key["lwang32"] =  "L Wong 32"
key["llruan"] =   "L.L. Ruin"
key["eman17"] =   "E-Man 17"
key["lotusez3"] = "Lotus. E.Z. 3"
key["juesato"] = "J U Esato"
key["jimmy42"] = "Jimmy 42"
key["jtxiao"] =  "J T Shiao"
key["lahuang4"] = "L A Hu-ong 4";
key["ccolombo"] = "C Colombo"
key["reif"] = "Rife";


function pronunciationTest() {
	queue = []; index = 0;
    speak("Baymax will now do a pronunciation test for the names, kerber-i, and common aliases of safety third members.");
    	kerberi = Object.keys(key).sort()
        for (k in kerberi) {
            //aliases = w3[kerberi[k]][1].slice(1);
            //aliases.pop();
            s = [ "Testing kerberos for " + w3[kerberi[k]][0], key[kerberi[k]] ];
            queue.push(s);
        }
        setInterval(speakNext, 7000);
}
        function speakNext() {
            speak(queue[index]);
            index++;
        }


exports.key = key;