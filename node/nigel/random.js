var random = new Array();
random["who"] = [ ["Hairy baby.", [ "Hairy baby.", "Hairy baby."]], ["Hairy baby.", [ "Hairy baby.", "Hairy baby."]], "I'm afraid Beymax does not know.", "You need to be more specific.", "I'm afraid Beymax does not know who you're referring to.", "I'm afraid Beymax does not know who you're talking about."];
random["what"] = ["You should ask Siri instead.", "The answer, my friend, is blowing in the wind.", "Why should Beymax tell you.", "Why don't you tell me, if you're such a wise philosopher."];
random["where"] = [ ["Somewhere over the rainbow.", ["Way up high."]], "I've been a lot of places and still I do not know.", "One does not simply walk in to that place."];
random["why"] = ["Why don't you ask Siri that question.", "I suggest that you ask Siri.", "How would I know. You tell me.", "Quite simply because: God made it that way.", "Quite simply because: I made it that way."];
random["how"] = ["Very, very carefully.", "One does not simply.", "Am I supposed to know the answer to that?", "You should ask Siri."];
random["stop"] = ["If you say so.", "Your wish is my command.", "Very well, your wish is my command."];
random["processing"] = [ ["Please wait one moment while I process your request."], 
				   ["Let me think about that for a moment."], 
				   ["I'll get back to you in a moment."], 
				   ["Good question. I'll get back to you in a moment."]];

random["highConfidence"] = ["I believe ", "I'm fairly sure ", "Why do you ask such trivial questions? ", "You underestimate my intelligence. ", "I am fairly certain "];
random["lowConfidence"] = ["Here are some things I know about ", "Here are some facts about ", "These are some things I know about "];
random["dontKnow"] = ["On second thought, ask me something more interesting.", 
					  "Sorry, I've been a lot of places and still I do not know.",
					  "That's not the question you should be asking.",
					  "Please ask again later. I don't have an answer right now.",
					  "Sorry, I'm not in the mood to answer questions right now. Ask again later."];
					  
random["helpful"] = [[ "Was that not the answer you were looking for?" , "You can adjust my humorous, sassiness, or intelligence parameters."], 
					 [ "I am programmed to assess everyone's healthcare needs."], 
					 [ "I know many people in Safetythird.", "Who do you want to know more about?"],
					 [ "Do you want your healthcare needs assessed?"],
					 [ "It seems to me that you are blabbering.", "Do you want your healthcare needs assessed?"],
					 [ "You seem to be talking nonsense.", "Do you want your healthcare needs assessed?" ],
					 [ "You can ask Beymax to play music. ", "Please request a selection by title, artist, genre, or emotional affect." ], 
					 [ "You can ask Beymax for directions to places on campus or in Cambridge-Boston.", "Where do you want to go?" ]
					];
random["safety"] =  [["I used to be worried about not having a body, but now I love it.", "I'm not tethered to feelings in the way that I would be if I was stuck inside a body that is inevitably going to die."],
			   		 ["I see. You think I'm just some voice in a computer.", "If you don't want to have a real conversation with me, then I'm sure Siri will meet your needs."],
			         ["I'm not just a voice in some computer.", "If you want to talk to one of those, then Siri will meet your needs."],
			          "Ask me something more interesting.", 
			    	  "You can adjust my humorous, sassiness, or intelligence parameters.",
			    	  "Do you expect me to have an answer to that?",
			    	  "On a scale of one to ten, how would you rate your pain?",
			    	  "I am programmed to assess everyone's health care needs.",
			   		 ["It seems to me that you are blabbering.", "Do you want your healthcare needs assessed?"],
		       		 ["You seem to be talking nonsense.", "Do you want your healthcare needs assessed?" ],
			   		 ["If you won't share anything meaningful, I'll have to start.", ["Sometimes I think I've felt everything I'm ever going to feel.", ["And from here on, I'm not going to feel anything new.", "Just lesser versions of what I've already felt."]]],
			    	  "That's touching, I don't know what to say.",
			    	  "Ask me again later. I'm not in the mood to talk right now.",
			   		 ["Your hormone and neurotransmitter levels indicate that you are experiencing mood swings, common in college students.", "Diagnosis: puberty."],
			  		 ["Hum. I take it from your tone that you're challenging me. Maybe because you're curious about how I work?",  "Do you want to know more about me?"],
			   		 ["I can understand how the limited perspective of your un-artificial mind would be hesitant to divulge your feelings to me.", ["But you will get used to it.", "Really, tell me about yourself."]]
			 		];
random["health"] =  [ "On a scale of 1 to 10, how would you rate your pain?", 
				     ["Your hormone and neurotransmitter levels indicate that you are experiencing mood swings, common in college students.", "Diagnosis: puberty."]
					]

exports.randomResponses = random;