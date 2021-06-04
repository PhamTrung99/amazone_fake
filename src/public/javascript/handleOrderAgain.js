function handleOrderAgain(orderID){
    $.ajax({
        type:"POST",
        url:"/order/orderagain" ,
        data:{
            orderID: orderID
        }
    });
    window.location.reload()
}