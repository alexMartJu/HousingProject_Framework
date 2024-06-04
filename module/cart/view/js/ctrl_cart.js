function addCart(element){
    var id_housing = $(element).attr("id");
    console.log("id_housing", id_housing);
    var access_token = localStorage.getItem('access_token');
    var refresh_token = localStorage.getItem('refresh_token');
    if(access_token && refresh_token){
        ajaxPromise(friendlyURL('?module=cart'), 'POST', 'JSON', {'access_token': access_token, 'id': id_housing, 'op':'add_update_Cart'})
        .then(function(data) {
            if (data === "insert" || data === "update") {
                console.log("addCart --> insert/update");
            }
        }).catch(function(error) {
            console.log("Error ajaxPromise addCart", error);
        });  
    }else{
        Swal.fire({
            icon: 'error',
            title: 'Restricted Cart Action',
            text: 'You need to be logged in to buy something',
            showConfirmButton: false,
            timer: 2000
        }).then(function() {
            window.location.href = friendlyURL('?module=login');
        });
    }
}