$(document).ready(function(){$("#friendship-button").click(function(t){t.preventDefault();t=$(this).attr("href").split("/").pop();console.log(t),$.ajax({url:$(this).attr("href"),type:"get"}).done(function(t){(t.data.friend?($("#friendship-button").text("Add Friend"),new Noty({theme:"relax",text:"Added Friend",type:"success",layout:"topRight",timeout:1500})):($("#friendhship-button").text("Unfriend"),new Noty({theme:"relax",text:"Removed Friend",type:"success",layout:"topRight",timeout:1500}))).show()})})});