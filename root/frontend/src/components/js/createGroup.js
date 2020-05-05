$(document).ready(function () {

    $("#group-form-btn").click(function (event) {
        event.preventDefault();
        const form = $(this).parent();
        const groupName = form.find("#groupName").value;
        if (!groupName) {
            alert("Please input the groupName!")
            return false;
        }
        const groupNotice = form.find("#groupNotice").value;
        if (!groupNotice) {
            alert("Please input the groupNotice!")
            return false;
        }
        const maxAge = form.find("#maxAge").value;
        if (!maxAge) {
            alert("Please input the maxAge!")
            return false;
        }
        if (maxAge < 10 || maxAge > 100) {
            alert("Max Age should be in range 10~100!")
            return false;
        }
        const minAge = form.find("#minAge").value;
        if (!minAge) {
            alert("Please input the minAge!")
            return false;
        }
        if (minAge < 10 || minAge > 100) {
            alert("Min Age should be in range 10~100!")
            return false;
        }
        if (minAge > maxAge) {
            alert("Min Age should not be bigger than max age!")
            return false;
        }
        const maxGroupNo = form.find("#maxGroupNo").value;
        if (!maxGroupNo) {
            alert("Please input the maxGroupNo!")
            return false;
        }

        $.ajax({
            type: "POST",
            url: "http://localhost:4000/group",
            data: {
                name: groupName,
                location: groupNotice,
                manager: maxAge,
                //minAge: minAge,
                description: form.find("select#gender").children("option:selected").val()
                //maxGroupNo: maxGroupNo
            },
            success: function (result) {
                alert('Succes!');
                //window.location.reload();
            },
            error: function (result) {
                alert("Error " + result);
            }
        });
    });
});
