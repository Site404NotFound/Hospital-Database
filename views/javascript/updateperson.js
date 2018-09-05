function updatePerson(id){
    $.ajax({
        url: '/departments/' + did,
        type: 'PUT',
        data: $('#update_departments').serialize(),
        success: function(result){
            window.location.replace("./");
        }
    })
};
