var tweets = [];
var boolstop = true;

const tweetsList = document.getElementById('tweet-List');

function getTweets() {
    fetch ('http://ec2-18-209-247-77.compute-1.amazonaws.com:3000/feed/random?q=weather').then(function (response) {
        return response.json();
    }).then(function(data) {

        for (let i =0; Object.keys(data.statuses).length; i++) {
            if(checkDuplicates(data.statuses[i].id)){
                var temptweet = [];
                temptweet.push(data.statuses[i].text);
                temptweet.push(data.statuses[i].user.profile_image_url);
                temptweet.push(data.statuses[i].created_at);
                temptweet.push(data.statuses[i].user.name);
                temptweet.push(data.statuses[i].id);
                tweets.push(temptweet);
                console.log(tweets);
            }
        }
    }).catch(function(err) {
        console.warn("Something went wrong!!!", err);
    });
}

function showtweets(){
    if(boolstop){
        getTweets(); 
        console.log(tweets.length);
        for( var i=0 in tweets){
        //for (var i= tweets.length-1; i>=0; i--){
            const newDiv = document.createElement("div");
            console.log("add");
            newDiv.classList.add("whitediv");
            const tweetpic = document.createElement("img");
            tweetpic.src = tweets[i][1];
            newDiv.appendChild(tweetpic);
            const tweetName = document.createTextNode(tweets[i][3]);
            newDiv.appendChild(tweetName);
            const tweetText = document.createTextNode(tweets[i][0]);
            newDiv.appendChild(tweetText);
            const tweetdate = document.createTextNode(tweets[i][2]);
            newDiv.appendChild(tweetdate);
            tweetsList.appendChild(newDiv);
        } 
    }
}

function stopButton(){
    if(boolstop==true){boolstop=false;}
    else boolstop=true;
    console.log("Button Pressed");
}

function checkDuplicates(id){
    for(var y=0 in tweets){
        if(tweets[y][4]==id){
            console.log("Found Duplicate!!");
            return false;
        }
    }
    return true;
}