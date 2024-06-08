function paint_userProfile_data() {
    var access_token = localStorage.getItem('access_token');
    var refresh_token = localStorage.getItem('refresh_token');
    console.log("Entro paint_userProfile_data()");
    if (access_token && refresh_token) {
        ajaxPromise(friendlyURL('?module=userProfile'), 'POST', 'JSON', {'access_token': access_token, 'op': 'paint_userProfile_data'})
        .then(function(data) {
            if (data) {
            console.log(data);

            document.querySelector('.name').innerText = data.username;
            document.querySelector('.info-email').innerText = data.email;
            document.querySelector('.likes-count').innerText = data.likes_count;
            document.querySelector('.purchases-count').innerText = data.purchases_count;
            document.querySelector('.descriptions').innerText = `Thank you, ${data.username} for using our application! We appreciate your support.`;

            var photoDiv = document.querySelector('.photo');
            photoDiv.style.backgroundImage = `url('${data.avatar}')`;
            }

            document.querySelector('.read-username').value = data.username;
            document.querySelector('.read-email').value = data.email;
        })
        .catch(function() {
            console.log("Error consulta paint_userProfile_data");
        });
    } else {
        Swal.fire({
            icon: 'error',
            title: 'Restricted Action',
            text: 'You need to be logged',
            showConfirmButton: false,
            timer: 2000
        }).then(function() {
            window.location.href = friendlyURL('?module=login');
        });
    }
}

$(document).ready(function() {
    paint_userProfile_data();
});