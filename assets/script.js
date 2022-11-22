// var previousBtn = document.querySelector('.previous-button');
// var nextBtn = document.querySelector('.next-button');
// var oneBtn = document.querySelector('.one-button');
// var twoBtn = document.querySelector('.two-button');
// var threeBtn = document.querySelector('.three-button');
// var fourBtn = document.querySelector('.four-button');
// var fiveBtn = document.querySelector('.five-button');
// var sixBtn = document.querySelector('.six-button');
// var sevenBtn = document.querySelector('.seven-button');
// var eightBtn = document.querySelector('.eight-button');
// var nineBtn = document.querySelector('.nine-button');
// var tenBtn = document.querySelector('.ten-button');

let nextPageToken = ""
function getVideos(){
    fetch("https://youtube.googleapis.com/youtube/v3/search?part=snippet&channelId=UCHbGq27OiwdNvLoJzYD2WLQ&maxResults=5&order=date&key=AIzaSyBJsQ7ilfRTtjKLJceZOR1zUXa1nVx24K4&pageToken="+nextPageToken)
    .then((result)=>{
        return result.json()
    }).then((data)=>{
        console.log(data)
        let videos = data.items
        nextPageToken = data.nextPageToken;
        let videoContainer = document.querySelector(".youtube-containment-unit")
        for (video of videos){
            videoContainer.innerHTML += `
                <img src=${video.snippet.thumbnails.default.url}>
            `
        }
    })
}

getVideos();
