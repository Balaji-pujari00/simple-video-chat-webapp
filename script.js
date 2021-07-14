let mute =false;
let mystream;

let client = AgoraRTC.createClient({
    mode: "rtc",
    codec: "vp8",
});

client.init("b0e9c34910fe45fa86c67c8ddb611c61")


client.join("006b0e9c34910fe45fa86c67c8ddb611c61IABwqw3mW+FOEoUN9rvQyBrprGwPEwRPhLvn/BOOneITgqDfQtYAAAAAEADQXSp/GBjwYAEAAQAZGPBg", 
"demo", null, (uid)=>{
    // Create a local stream
    let localStream = AgoraRTC.createStream({
        audio: true,
        video: true,
    });
    // Initialize the local stream
    localStream.init(()=>{
        localStream.play("local");
        client.publish(localStream);
    });
  }
  );

  // Subscribe to the remote stream when it is published
client.on("stream-added", function(evt){
    client.subscribe(evt.stream);
});
// Play the remote stream when it is subsribed
client.on("stream-subscribed", function(evt){
    let stream = evt.stream;
    let streamId = String(stream.getId());
    let right = document.getElementById('remote');
    let div = document.createElement("div");
    div.id = streamId;
    right.appendChild(div);
    stream.play(streamId)
});
  function muteAudio() {
    mystream.muteAudio();
  }
  
  function unmuteAudio() {
    mystream.unmuteAudio();
  }