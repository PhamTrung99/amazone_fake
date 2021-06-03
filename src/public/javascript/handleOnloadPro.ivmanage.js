function handleOnload() {
    $.ajax({
        type: "POST",
        url: '/productdetail/getinfo',
        data: _id
    }).then((res) => {
        document.getElementById("div_id").innerText = res.id;
    })
}
handleOnload()