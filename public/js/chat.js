let socket = io("/");

let name = "";
let roomId = "";

$(document).ready(function(){
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);

    name = urlParams.get("name");
    roomId = urlParams.get("roomId");

    socket.emit("join-room", name, roomId);
})

socket.on("user-connected", (userName) => {
    let html = `
        <div class="row">
            <div class="col-12 col-md-12 col-lg-12">
                ${userName} just joined the room!
            </div>
        </div>
    `
    $("#chat-area").append(html);
})

$(".send-msg").click(function(){
    let msg = $("#chat-msg").val();
    if (msg === "") {
        ;
    } else {
        socket.emit("message", name, roomId, msg);
        let html = `
            <div class="row">
                <div class="col-12 col-md-12 col-lg-12">
                    Me: ${msg} 
                </div>
            </div>
        `
        $("#chat-area").append(html);
        $("#chat-msg").val("");
    }
})

$("#chat-msg").keydown(function(e){
    if (e.keyCode == 13) {
        $(".send-msg").click();
    }
})

socket.on("receive-msg", (userName, msg) => {
    if (name !== userName) {
        let html = `
            <div class="row">
                <div class="col-12 col-md-12 col-lg-12">
                    ${userName}: ${msg} 
                </div>
            </div>
        `
        $("#chat-area").append(html);
    }
})