export class SwalAlert {
    Alert(title, text, icon, confirmButton = true) {
        Swal.fire({
            title: title,
            text: text,
            icon: icon,
            showConfirmButton: confirmButton,
        });
    }
    AlertImg(urlImg, title) {
        Swal.fire({
            imageUrl: urlImg,
            imageAlt: 'image',
            title: title
        });
    }
    Error(icon, title, text) {
        Swal.fire({
            icon: icon,
            title: title,
            text: text
        });
    }
    Confirm(title, message, formName) {
        Swal.fire({
            title: title,
            text: message,
            type: 'question',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: BtnSubmit,
            cancelButtonText: BtnCancel
        }).then((result) => {
            if (result.value) {
                $('#' + formName).submit();
            }
        })
    }
    Redirect(icon, title, confirmButtonText, text, url) {
        Swal.fire({
            title: title,
            confirmButtonText: confirmButtonText,
            text: text,
            footer: '',
            icon: icon,
            showCloseButton: true
        }).then(function(result) {
            if (result.value) {
                window.location = url;
            }
        })
    }
    Logout(url) {
        Swal.fire({
            title: 'Are you sure?',
            text: "Are you sure to close session?",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes'
        }).then((result) => {
            if (result.isConfirmed) {
                localStorage.removeItem("context");
                window.location.href = url
            }
        });
    }
    Toaster(title, icon){
        const Toast = Swal.mixin({
            toast: true,
            position: 'top-end',
            showConfirmButton: false,
            timer: 3000,
            timerProgressBar: true,
            didOpen: (toast) => {
              toast.addEventListener('mouseenter', Swal.stopTimer)
              toast.addEventListener('mouseleave', Swal.resumeTimer)
            }
        })
        Toast.fire({
            icon: icon,
            title: title
          })
    }
}