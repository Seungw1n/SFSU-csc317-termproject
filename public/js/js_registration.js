var user_id = document.getElementById("user_id").value;
var user_pw = document.getElementById("user_pw").value;
var check_pw = document.getElementById("check_pw").value;
var SC = ["~", "!", "@", "#", "$", "%", "^", "&", "*", "(", ")", "-", "+"];
var check_SC = 0;

if (user_pw.length < 8) {
    window.alert("Must include at least 8 characters");
}

for (var i = 0; i < SC.length; i++) {
    if (user_pw.indexOf(SC[i]) != -1) {
        check_SC = 1;
    }
}

if (check_SC == 0) {
    window.alert("Must include at least 1 of the following: (~!@#$%^&*_+)");
}

if (user_pw != check_pw) {
    window.alert("Password is not matched");
}