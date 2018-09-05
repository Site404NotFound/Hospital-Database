function deletePerson(id){
    $.ajax({
        url: '/diagnostic:' + id,
        type: 'DELETE',
        success: function(result){
            window.location.reload(true);
        }
    })
};
