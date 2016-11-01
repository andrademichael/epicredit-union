//business logic

var Account = function(name, balance) {
  this.name = name;
  this.balance = balance;
  this.history = [balance];
};

Account.prototype.withdraw = function(amount) {
    this.balance = this.balance - amount;
    this.history.unshift(this.balance);
};

Account.prototype.deposit = function(amount) {
  this.balance = this.balance + amount;
  this.history.unshift(this.balance);
};

var Transaction = function(amount) {
  this.amount = amount;
  var currentTime = new Date(Date.now()).toUTCString();
  console.log(currentTime);
  this.time = currentTime;
}

var getTime = function() {
  console.log(Date.now);
return Date.now();
}

//UI logic
$(document).ready(function(){
  $("form#registrationForm").submit(function(event){
    event.preventDefault();
    var nameInput = $("input#name").val();
    var initialDepositInput = parseInt($("input#initialDeposit").val());
    var userAccount = new Account(nameInput, initialDepositInput);
    $("#historyList").append("<li>Initial Balance: " + userAccount.history[0] + "</li>");


    $(".btn#transact").click(function(){
      var withdrawalInput = parseInt($("input#withdrawal").val());
      var depositInput = parseInt($("input#deposit").val());
      var transactionTypeInput = $("input:radio[name=transactionType]:checked").val();
      var amountInput = parseInt($("input#transactionAmount").val());

      if (transactionTypeInput === "withdrawal" && amountInput < userAccount.balance) {
        userAccount.withdraw(amountInput);
        $("#historyList").prepend("<li>" + userAccount.history[0] + "</li><li class='red'>  -" + amountInput + "</li>");
      } else if (transactionTypeInput === "deposit"){
        userAccount.deposit(amountInput);
        $("#historyList").prepend("<li>" + userAccount.history[0] + "</li><li class='green'>  +" + amountInput + "</li>");
      } else {
        alert("You can't overdraw your account!");
      }

    });//end of click function

  });//end of submit function
});//end of document ready
