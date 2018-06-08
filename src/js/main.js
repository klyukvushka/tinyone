// $(document).ready(function() {
//   $("#btn").click(function() {
//     $.ajax({
//       type: "POST",
//       url: "php/mail.php",
//       data: $(this).serialize(),
//       dataType: "json"
//     }).done(function() {
//       alert("Thank you!");
//     });
//     return false;
//   });
// });

$(document).ready(function() {
  //E-mail Ajax Send
  $("#form").submit(function() {
    //Change
    var th = $(this);
    $.ajax({
      type: "POST",
      url: "php/mail.php", //Change
      data: th.serialize()
    }).done(function() {
      alert("Thank you!");
      setTimeout(function() {
        // Done Functions
        th.trigger("reset");
      }, 1000);
    });
    return false;
  });
});
