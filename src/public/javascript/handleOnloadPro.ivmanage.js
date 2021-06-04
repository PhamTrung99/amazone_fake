function handleOnload() {
    let _id = document.currentScript.getAttribute('_id');
    if (_id != '') {
        $.ajax({
            type: "POST",
            url: '/productdetail/getinfo',
            data: {
                _id: _id
            }
        }).then((res) => {
            document.getElementById("div_" + _id).innerHTML =
            `<div class="thumbnail" style="display: inline-flex;height: 4rem;">
            <img src="${res.image}" alt="">
            <div class="caption">
              <p>${res.name}</p>
              <p>Price: ${res.price}</p>
            </div>
          </div>`;
        })
    }

}
handleOnload()