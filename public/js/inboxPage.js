$(document).ready(() =>{
    $.get("/api/chats", (data, statys, xhr) =>{
        if(xhr.status == 400){
            alert("Não foi possivel abrir o chat.");
        }
        else{
            outputChatList(data, $(".resultsContainer"));
        }
    })
})

function outputChatList(chatList, container){
    chatList.forEach(chat => {
        var html = createChatHtml(chat);
        container.append(html);
    })

    if(chatList.length == 0 ){
        container.append("<span class='noResults'>Nada a ser mostrado.'</span>")
    }
}

function createChatHtml(chatData){
    var chatName = getChatName(chatData);
    var latestMessage = "Essa é a ultima mensagem";

    return `<a href='/messages/${chatData._id}' class='resultListItem'>
        <div class='resultsDetailsContainer ellipsis'>
            <span class='heading ellipsis'>${chatName}</span>
            <span class='subText ellipsis'>${latestMessage}</span>
        </div>
    </a>`
}

